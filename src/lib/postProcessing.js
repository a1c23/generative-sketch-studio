/**
 * Post-Processing — GPU filter shaders using p5.strands.
 * All shaders are created once in setup() and applied per-frame based on look settings.
 * Uniform callbacks read from getLook() each frame for live parameter updates.
 */

/**
 * Create all post-processing shaders. Call once in setup() after createCanvas().
 * @param {p5} p — p5 instance
 * @param {() => object} getLook — getter returning current Look object
 * @returns {{ grain, bloom, bloomBuffer, vignette, chromatic }}
 */
export function createPostProcessingShaders(p, getLook) {
  const shaders = {};

  // --- Grain: pseudo-random noise overlay ---
  // Scope passes closure variables into the transpiled new Function() context
  shaders.grain = p.baseFilterShader().modify(() => {
    const uIntensity = uniformFloat(() => {
      return getLook()?.canvas?.postProcessing?.grain?.intensity ?? 0.08;
    });
    const uSpeed = uniformFloat(() => {
      return getLook()?.canvas?.postProcessing?.grain?.speed ?? 1.0;
    });
    const uTime = uniformFloat(() => p.millis());

    getColor((inputs, canvasContent) => {
      const col = texture(canvasContent, inputs.texCoord);
      // GPU pseudo-random noise via sin(dot()) hash
      const n = fract(
        sin(dot(inputs.texCoord * (uTime * 0.001 * uSpeed), [12.9898, 78.233])) * 43758.5453
      );
      const grain = (n - 0.5) * uIntensity;
      return [col.r + grain, col.g + grain, col.b + grain, col.a];
    });
  }, { getLook, p });

  // --- Bloom: framebuffer for scene capture ---
  shaders.bloomBuffer = p.createFramebuffer();

  // --- Vignette: radial darkening from center ---
  shaders.vignette = p.baseFilterShader().modify(() => {
    const uStrength = uniformFloat(() => {
      return getLook()?.canvas?.postProcessing?.vignette?.strength ?? 0.3;
    });
    const uRadius = uniformFloat(() => {
      return getLook()?.canvas?.postProcessing?.vignette?.radius ?? 0.8;
    });

    getColor((inputs, canvasContent) => {
      const col = texture(canvasContent, inputs.texCoord);
      const dist = length(inputs.texCoord - [0.5, 0.5]);
      const vig = smoothstep(uRadius, uRadius - 0.3, dist);
      const factor = mix(1.0 - uStrength, 1.0, vig);
      return [col.r * factor, col.g * factor, col.b * factor, col.a];
    });
  }, { getLook });

  // --- Chromatic Aberration: RGB channel offset ---
  shaders.chromatic = p.baseFilterShader().modify(() => {
    const uOffset = uniformFloat(() => {
      return getLook()?.canvas?.postProcessing?.chromaticAberration?.offset ?? 0.003;
    });

    getColor((inputs, canvasContent) => {
      const uv = inputs.texCoord;
      const dir = normalize(uv - [0.5, 0.5]) * uOffset;
      const r = texture(canvasContent, uv + dir).r;
      const g = texture(canvasContent, uv).g;
      const b = texture(canvasContent, uv - dir).b;
      return [r, g, b, 1.0];
    });
  }, { getLook });

  return shaders;
}

/**
 * Apply post-processing filter shaders (grain, vignette, chromatic).
 * Bloom is handled separately in the orchestrator via framebuffer workflow.
 * @param {p5} p
 * @param {() => object} getLook
 * @param {object} shaders — from createPostProcessingShaders
 */
export function applyPostProcessing(p, getLook, shaders) {
  if (!shaders) return;
  const pp = getLook()?.canvas?.postProcessing;
  if (!pp) return;

  if (pp.grain?.enabled && shaders.grain) {
    p.filter(shaders.grain);
  }

  if (pp.vignette?.enabled && shaders.vignette) {
    p.filter(shaders.vignette);
  }

  if (pp.chromaticAberration?.enabled && shaders.chromatic) {
    p.filter(shaders.chromatic);
  }
}
