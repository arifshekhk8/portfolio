import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * A ground plane drawn as a receding measurement grid with a scan line
 * running away from the camera. It gives the point cloud a floor to sit on
 * and the whole scene a sense of scale.
 */

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  varying float vDist;

  void main() {
    vUv = uv;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vDist = -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uScroll;
  uniform vec3  uColor;
  uniform vec3  uScanColor;
  uniform float uOpacity;

  varying vec2 vUv;
  varying float vDist;

  // Anti-aliased grid line using screen-space derivatives.
  float gridLine(vec2 uv, float cells, float weight) {
    vec2 g = fract(uv * cells) - 0.5;
    vec2 d = fwidth(uv * cells);
    vec2 line = smoothstep(d * weight, vec2(0.0), abs(g));
    return max(line.x, line.y);
  }

  void main() {
    vec2 uv = vUv;
    uv.y += uScroll * 3.2;

    float fine = gridLine(uv, 90.0, 1.4) * 0.22;
    float coarse = gridLine(uv, 15.0, 1.8) * 0.5;
    float g = max(fine, coarse);

    // Scan line sweeping along the plane.
    float sweep = fract(uv.y * 1.0 - uTime * 0.09);
    float scan = smoothstep(0.0, 0.02, sweep) * smoothstep(0.10, 0.02, sweep);

    // Fade out well before the horizon, otherwise the far edge of the plane
    // lands on the eye line as a hard bright seam.
    float horizon = smoothstep(0.82, 0.10, vUv.y);
    float edge = smoothstep(0.0, 0.16, vUv.x) * smoothstep(1.0, 0.84, vUv.x);
    float depth = smoothstep(170.0, 10.0, vDist);

    vec3 col = mix(uColor, uScanColor, scan * 0.85);
    float a = (g * 0.9 + scan * 0.35) * horizon * edge * depth * uOpacity;

    if (a < 0.002) discard;
    gl_FragColor = vec4(col, a);
  }
`

export default function ScanGrid({ scrollRef, y = -9, opacity = 0.5 }) {
  const matRef = useRef()
  const eased = useRef(0)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uColor: { value: new THREE.Color('#1c4a44') },
      uScanColor: { value: new THREE.Color('#4fe3b0') },
      uOpacity: { value: opacity },
    }),
    [opacity],
  )

  useFrame((state, delta) => {
    const u = matRef.current?.uniforms
    if (!u) return
    const target = scrollRef?.current?.progress ?? 0
    eased.current += (target - eased.current) * Math.min(delta, 0.05) * 4.5
    u.uTime.value = state.clock.elapsedTime
    u.uScroll.value = eased.current
  })

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, y, -60]}>
      <planeGeometry args={[300, 300, 1, 1]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}
