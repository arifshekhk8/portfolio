import { Suspense, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'
import NeuralField from './NeuralField.jsx'
import ScanGrid from './ScanGrid.jsx'
import { tierSettings } from '../../utils/device.js'

/** Camera drifts on the pointer and banks slightly as the page scrolls. */
function CameraRig({ scrollRef, pointerRef }) {
  const { camera } = useThree()
  const target = useRef(new THREE.Vector3(0, 0, 0))
  const roll = useRef(0)

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05)
    const p = pointerRef?.current ?? { x: 0, y: 0 }
    const s = scrollRef?.current?.progress ?? 0

    camera.position.x += (p.x * 1.5 - camera.position.x) * dt * 1.8
    camera.position.y += (p.y * 0.9 + s * 1.6 - camera.position.y) * dt * 1.8

    target.current.set(p.x * 0.5, p.y * 0.3, -20)
    camera.lookAt(target.current)

    // lookAt() rewrites the whole quaternion, so the bank has to go on after.
    roll.current += (-p.x * 0.035 - roll.current) * dt * 1.6
    camera.rotateZ(roll.current)
  })

  return null
}

export default function Experience({ tier = 'high', scrollRef, pointerRef }) {
  const cfg = tierSettings[tier] ?? tierSettings.mid
  if (cfg.particles === 0) return null

  return (
    <Canvas
      className="stage__canvas"
      dpr={cfg.dpr}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
      }}
      camera={{ position: [0, 0, 16], fov: 58, near: 0.1, far: 300 }}
      // The scene is decorative. Screen readers get the DOM copy instead.
      aria-hidden="true"
    >
      <fog attach="fog" args={['#05070b', 26, 92]} />
      <Suspense fallback={null}>
        <CameraRig scrollRef={scrollRef} pointerRef={pointerRef} />
        <NeuralField count={cfg.particles} scrollRef={scrollRef} pointerRef={pointerRef} />
        <ScanGrid scrollRef={scrollRef} opacity={tier === 'high' ? 0.55 : 0.34} />
        {cfg.bloom && (
          <EffectComposer enableNormalPass={false}>
            <Bloom intensity={0.72} luminanceThreshold={0.22} luminanceSmoothing={0.5} mipmapBlur />
            <Vignette eskil={false} offset={0.22} darkness={0.72} />
          </EffectComposer>
        )}
      </Suspense>
    </Canvas>
  )
}
