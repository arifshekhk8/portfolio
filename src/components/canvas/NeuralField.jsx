import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * The latent space.
 *
 * Points are seeded in discrete z-planes with heavy jitter, so the cloud
 * reads as stacked network layers rather than a random starfield. Each point
 * carries a seed used to give it its own drift phase, and a `layer` value in
 * 0..1 that drives the colour ramp from mint signal into amber.
 */

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uScroll;
  uniform vec2  uPointer;
  uniform float uSize;
  uniform float uPixelRatio;

  attribute float aSeed;
  attribute float aLayer;
  attribute float aScale;

  varying float vLayer;
  varying float vFade;
  varying float vPulse;

  void main() {
    vec3 pos = position;

    // Slow organic drift, unique phase per point.
    float t = uTime * 0.16 + aSeed * 6.2831;
    pos.x += sin(t * 0.9) * 0.55;
    pos.y += cos(t * 0.7 + aSeed) * 0.55;
    pos.z += sin(t * 0.5 + aSeed * 2.0) * 0.35;

    // Parallax: the pointer nudges near layers more than far ones.
    float depthWeight = 1.0 - aLayer;
    pos.x += uPointer.x * 1.9 * depthWeight;
    pos.y += uPointer.y * 1.2 * depthWeight;

    // Scrolling pulls the whole field toward the camera and recycles points
    // that pass behind it, so the flight never runs out of space.
    float travel = uScroll * 64.0;
    pos.z = mod(pos.z + travel + 40.0, 80.0) - 40.0;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    float dist = -mv.z;

    // A firing pulse that sweeps along z, like activation moving through
    // the network.
    float wave = sin(pos.z * 0.28 - uTime * 1.5 + aSeed * 3.0);
    vPulse = smoothstep(0.86, 1.0, wave);

    vLayer = aLayer;
    vFade = smoothstep(58.0, 12.0, dist) * smoothstep(0.4, 3.5, dist);

    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * aScale * uPixelRatio * (26.0 / max(dist, 0.6));
    gl_PointSize *= 1.0 + vPulse * 1.6;
  }
`

const fragmentShader = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uOpacity;

  varying float vLayer;
  varying float vFade;
  varying float vPulse;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;

    // Soft core with a hard-ish centre so points still read at small sizes.
    float core = smoothstep(0.5, 0.0, d);
    float alpha = pow(core, 2.4) * vFade * uOpacity;

    vec3 col = mix(uColorA, uColorB, vLayer);
    col = mix(col, vec3(1.0), vPulse * 0.55);
    col += core * 0.18;

    gl_FragColor = vec4(col, alpha);
  }
`

export default function NeuralField({ count = 9000, scrollRef, pointerRef }) {
  const matRef = useRef()
  const smoothed = useRef({ x: 0, y: 0, scroll: 0 })

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry()
    const positions = new Float32Array(count * 3)
    const seeds = new Float32Array(count)
    const layers = new Float32Array(count)
    const scales = new Float32Array(count)

    const PLANES = 14
    for (let i = 0; i < count; i += 1) {
      // Two thirds snap to a layer plane, the rest fill the space between.
      const planed = i % 3 !== 0
      const plane = Math.floor(Math.random() * PLANES)
      const zPlane = -40 + (plane / (PLANES - 1)) * 80

      const z = planed ? zPlane + (Math.random() - 0.5) * 2.4 : -40 + Math.random() * 80

      // Radial spread widens with distance so the field feels like a tunnel.
      const spread = 9 + Math.abs(z) * 0.34
      const angle = Math.random() * Math.PI * 2
      const radius = Math.sqrt(Math.random()) * spread

      positions[i * 3 + 0] = Math.cos(angle) * radius
      positions[i * 3 + 1] = Math.sin(angle) * radius * 0.62
      positions[i * 3 + 2] = z

      seeds[i] = Math.random()
      layers[i] = planed ? plane / (PLANES - 1) : Math.random()
      scales[i] = 0.55 + Math.random() * Math.random() * 1.9
    }

    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    g.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1))
    g.setAttribute('aLayer', new THREE.BufferAttribute(layers, 1))
    g.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))
    return g
  }, [count])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uPointer: { value: new THREE.Vector2() },
      uSize: { value: 1.5 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) },
      uColorA: { value: new THREE.Color('#4fe3b0') },
      uColorB: { value: new THREE.Color('#f0a83c') },
      uOpacity: { value: 0.9 },
    }),
    [],
  )

  useFrame((state, delta) => {
    const u = matRef.current?.uniforms
    if (!u) return

    const dt = Math.min(delta, 0.05)
    const p = pointerRef?.current ?? { x: 0, y: 0 }
    const s = scrollRef?.current?.progress ?? 0

    // Lerp everything. Raw pointer and scroll values make the field twitch.
    smoothed.current.x += (p.x - smoothed.current.x) * dt * 3.2
    smoothed.current.y += (p.y - smoothed.current.y) * dt * 3.2
    smoothed.current.scroll += (s - smoothed.current.scroll) * dt * 4.5

    u.uTime.value = state.clock.elapsedTime
    u.uPointer.value.set(smoothed.current.x, smoothed.current.y)
    u.uScroll.value = smoothed.current.scroll
  })

  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
