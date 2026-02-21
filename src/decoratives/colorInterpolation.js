/**
 * Color Interpolation decorative — GPU gradient mapped onto noun surfaces.
 * Uses string-based GLSL .modify({}) with uniforms callbacks to interpolate
 * color in getCameraInputs, retaining full lighting response.
 */

/** Convert hex color string to [r, g, b] in 0-1 range */
function hexToRgb01(hex) {
  const c = (hex || '#888888').replace('#', '');
  return [
    parseInt(c.substring(0, 2), 16) / 255,
    parseInt(c.substring(2, 4), 16) / 255,
    parseInt(c.substring(4, 6), 16) / 255,
  ];
}

const colorInterpolation = {
  name: 'colorInterpolation',
  label: 'Color Interpolation',
  defaults: {
    animated: true,
    blend: 0.5,
    mode: 'surface',
    axis: 'y',
    colorA: null,
    colorB: null,
    midpoint: 0.5,
  },

  /**
   * Create the GPU gradient shader.
   * @param {p5} p — p5 instance (must be called after createCanvas)
   * @param {() => object} getParams — getter returning current params
   * @param {() => object} getLook — getter returning current look (for palette fallback)
   * @returns {p5.Shader}
   */
  createShader(p, getParams, getLook) {
    return p.baseMaterialShader().modify({
      uniforms: {
        // Color A components
        'float uAr': () => hexToRgb01(getParams().colorA || getLook()?.palette?.decorative0 || '#CCAA66')[0],
        'float uAg': () => hexToRgb01(getParams().colorA || getLook()?.palette?.decorative0 || '#CCAA66')[1],
        'float uAb': () => hexToRgb01(getParams().colorA || getLook()?.palette?.decorative0 || '#CCAA66')[2],
        // Color B components
        'float uBr': () => hexToRgb01(getParams().colorB || getLook()?.palette?.decorative1 || '#66AACC')[0],
        'float uBg': () => hexToRgb01(getParams().colorB || getLook()?.palette?.decorative1 || '#66AACC')[1],
        'float uBb': () => hexToRgb01(getParams().colorB || getLook()?.palette?.decorative1 || '#66AACC')[2],
        // Midpoint and axis
        'float uMid': () => getParams().midpoint ?? 0.5,
        'float uAxis': () => {
          const axis = getParams().axis ?? 'y';
          return axis === 'x' ? 0 : axis === 'y' ? 1 : 2;
        },
      },
      'Vertex getCameraInputs': `(Vertex inputs) {
        vec3 pos = inputs.position;

        // Select axis component
        float t;
        if (uAxis < 0.5) t = pos.x;
        else if (uAxis < 1.5) t = pos.y;
        else t = pos.z;

        // Normalize position to 0-1 range (adjust scale to scene)
        t = t * 0.005 + 0.5;
        t = smoothstep(0.0, 1.0, (t - (uMid - 0.5)));

        // Interpolate colors
        inputs.color.r = mix(uAr, uBr, t);
        inputs.color.g = mix(uAg, uBg, t);
        inputs.color.b = mix(uAb, uBb, t);
        inputs.color.a = 1.0;
        return inputs;
      }`,
    });
  },

  generate(params, seed) {
    return null;
  },

  // No-op: rendering is handled by the orchestrator activating the shader per-noun
  draw() {},
};

export default colorInterpolation;
