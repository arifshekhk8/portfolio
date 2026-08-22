import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'

/**
 * Split into its own chunk so mid-tier devices, which run without bloom,
 * never download the postprocessing pipeline at all.
 */
export default function Effects() {
  return (
    <EffectComposer enableNormalPass={false}>
      <Bloom intensity={0.5} luminanceThreshold={0.3} luminanceSmoothing={0.5} mipmapBlur />
      <Vignette eskil={false} offset={0.22} darkness={0.72} />
    </EffectComposer>
  )
}
