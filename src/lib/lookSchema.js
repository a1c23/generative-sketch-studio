/**
 * Look Schema — canonical shape of a Look object.
 * A Look fully describes a scene: canvas, palette, nouns, decoratives, and seed.
 */

export const DEFAULT_LOOK = {
  seed: '000000',

  canvas: {
    background: {
      type: 'solid',
      colorA: '#F5F3F0',
      colorB: '#EDEAE6',
    },
    camera: {
      focalLength: 50,
      tilt: -15,
      pan: 0,
      distance: 600,
      autoRotate: false,
      rotateSpeed: 0.5,
      projection: 'perspective',
    },
    lighting: {
      ambientIntensity: 80,
      ambientColor: '#FFFFFF',
      keyLightColor: '#FFFFFF',
      keyLightPos: [200, -200, 300],
      fillLightColor: '#8888CC',
      fillLightPos: [-200, 200, -200],
    },
    material: {
      mode: 'default',
      texture: 'none',
      baseColor: '#8888CC',
      shininess: 40,
      emissiveColor: '#FF4444',
    },
    stroke: {
      enabled: false,
      weight: 1,
      color: '#000000',
    },
    blendMode: 'BLEND',
    opacity: 255,
    postProcessing: {
      grain: { enabled: false, intensity: 0.08, speed: 1.0 },
      bloom: { enabled: false, threshold: 0.6, strength: 1.5, blurAmount: 15 },
      vignette: { enabled: false, strength: 0.3, radius: 0.8 },
      chromaticAberration: { enabled: false, offset: 0.003 },
    },
    exportScale: 1,
  },

  palette: {
    noun0: '#8888CC',
    noun1: '#CC8888',
    decorative0: '#CCAA66',
    decorative1: '#66AACC',
    accent: '#5A7A8A',
  },

  nouns: [
    {
      id: 'noun-0',
      source: { type: 'procedural', categoryKey: 'flow' },
      position: { x: 0, y: 0, z: 0 },
      scale: 1,
      rotation: { x: 0, y: 0, z: 0 },
      material: null,
    },
  ],

  decoratives: [],
};
