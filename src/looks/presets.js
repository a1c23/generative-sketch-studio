/**
 * Look Presets — starter canvas + palette combinations.
 * Each preset overrides canvas.background, canvas.lighting, canvas.material,
 * canvas.stroke, canvas.blendMode, canvas.camera, canvas.postProcessing, and palette.
 */

const presets = [
  {
    key: 'studio',
    name: 'Studio',
    canvas: {
      background: { type: 'solid', colorA: '#F5F3F0', colorB: '#EDEAE6' },
      lighting: {
        ambientIntensity: 80,
        keyLightColor: '#FFFFFF',
        keyLightPos: [200, -200, 300],
        fillLightColor: '#8888CC',
        fillLightPos: [-200, 200, -200],
      },
      material: { mode: 'default', shininess: 40 },
      stroke: { enabled: false, weight: 1, color: '#000000' },
      blendMode: 'BLEND',
      camera: { projection: 'perspective' },
      postProcessing: {
        grain: { enabled: false, intensity: 0.08, speed: 1.0 },
        bloom: { enabled: false, threshold: 0.6, strength: 1.5, blurAmount: 15 },
        vignette: { enabled: false, strength: 0.3, radius: 0.8 },
        chromaticAberration: { enabled: false, offset: 0.003 },
      },
    },
    palette: {
      noun0: '#8888CC',
      noun1: '#CC8888',
      decorative0: '#CCAA66',
      decorative1: '#66AACC',
      accent: '#5A7A8A',
    },
  },
  {
    key: 'midnight',
    name: 'Midnight',
    canvas: {
      background: { type: 'gradient', colorA: '#1A1A2E', colorB: '#16213E' },
      lighting: {
        ambientIntensity: 40,
        keyLightColor: '#6688FF',
        keyLightPos: [200, -200, 300],
        fillLightColor: '#334466',
        fillLightPos: [-200, 200, -200],
      },
      material: { mode: 'specular', shininess: 120 },
      stroke: { enabled: true, weight: 0.5, color: '#4466AA' },
      blendMode: 'ADD',
      camera: { projection: 'perspective' },
      postProcessing: {
        grain: { enabled: true, intensity: 0.06, speed: 1.0 },
        bloom: { enabled: true, threshold: 0.5, strength: 1.8, blurAmount: 12 },
        vignette: { enabled: true, strength: 0.4, radius: 0.75 },
        chromaticAberration: { enabled: false, offset: 0.003 },
      },
    },
    palette: {
      noun0: '#6688FF',
      noun1: '#FF6688',
      decorative0: '#FFAA44',
      decorative1: '#44FFAA',
      accent: '#8866FF',
    },
  },
  {
    key: 'warm',
    name: 'Warm',
    canvas: {
      background: { type: 'solid', colorA: '#FFF5EB', colorB: '#FFE8D6' },
      lighting: {
        ambientIntensity: 100,
        keyLightColor: '#FFDDBB',
        keyLightPos: [200, -200, 300],
        fillLightColor: '#CC8866',
        fillLightPos: [-200, 200, -200],
      },
      material: { mode: 'default', shininess: 30 },
      stroke: { enabled: false, weight: 1, color: '#000000' },
      blendMode: 'BLEND',
      camera: { projection: 'perspective' },
      postProcessing: {
        grain: { enabled: false, intensity: 0.08, speed: 1.0 },
        bloom: { enabled: false, threshold: 0.6, strength: 1.5, blurAmount: 15 },
        vignette: { enabled: true, strength: 0.25, radius: 0.85 },
        chromaticAberration: { enabled: false, offset: 0.003 },
      },
    },
    palette: {
      noun0: '#E07A5F',
      noun1: '#F2CC8F',
      decorative0: '#81B29A',
      decorative1: '#3D405B',
      accent: '#D4A574',
    },
  },
  {
    key: 'cool',
    name: 'Cool',
    canvas: {
      background: { type: 'solid', colorA: '#EDF2F4', colorB: '#D9E2EC' },
      lighting: {
        ambientIntensity: 90,
        keyLightColor: '#E0E8FF',
        keyLightPos: [200, -200, 300],
        fillLightColor: '#6688AA',
        fillLightPos: [-200, 200, -200],
      },
      material: { mode: 'specular', shininess: 80 },
      stroke: { enabled: false, weight: 1, color: '#000000' },
      blendMode: 'BLEND',
      camera: { projection: 'perspective' },
      postProcessing: {
        grain: { enabled: true, intensity: 0.04, speed: 0.8 },
        bloom: { enabled: false, threshold: 0.6, strength: 1.5, blurAmount: 15 },
        vignette: { enabled: false, strength: 0.3, radius: 0.8 },
        chromaticAberration: { enabled: true, offset: 0.002 },
      },
    },
    palette: {
      noun0: '#457B9D',
      noun1: '#A8DADC',
      decorative0: '#1D3557',
      decorative1: '#E63946',
      accent: '#F1FAEE',
    },
  },
];

export default presets;
