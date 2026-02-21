/**
 * Sketch Orchestrator — creates and manages the p5 instance.
 * Shader-aware rendering pipeline: per-noun GPU decoratives,
 * GPU-instanced particles, bloom framebuffer, and p5.strands filter shaders.
 *
 * Reads from a getLook() getter each frame so all mutations flow through the ref.
 * p5 instance is only recreated on seed change (handled externally).
 */

import p5 from 'p5';
import textureList from './textureRegistry.js';
import { applyCamera } from './camera3d.js';
import { applyBackground, applyLighting } from './lookRenderer.js';
import { renderNoun } from './nounRenderer.js';
import { registryMap } from '../decoratives/registry.js';
import { createPostProcessingShaders, applyPostProcessing } from './postProcessing.js';

// GPU decorative types handled specially by the orchestrator
const GPU_DECORATIVE_TYPES = new Set([
  'noiseDisplacement',
  'particleField',
  'colorInterpolation',
]);

/**
 * Create a p5 sketch bound to a container element.
 *
 * @param {() => object} getLook — returns the current Look object
 * @param {HTMLElement} container — DOM element to attach canvas to
 * @returns {{ instance: p5, destroy: () => void }}
 */
export function createSketch(getLook, container) {
  const textures = {};
  let ready = false;
  let frameCount = 0;

  // Shader storage — created once in setup
  let postShaders = null;
  const decorativeShaders = {};

  const instance = new p5((p) => {
    p.setup = async () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      p.createCanvas(w, h, p.WEBGL);
      p.setAttributes('antialias', true);
      p.pixelDensity(2);

      // Load all textures async (p5 2.0 — no preload)
      const loads = textureList
        .filter((t) => t.path)
        .map(async (t) => {
          textures[t.key] = await p.loadImage(t.path);
        });
      await Promise.all(loads);

      // Enable global strands mode for instance-mode p5.
      // p5.strands transpiles .modify() callbacks via new Function(),
      // which needs uniformFloat/sin/etc. on window. This flag makes
      // .modify() temporarily set prototype methods on window.
      p._runStrandsInGlobalMode = true;

      // Create post-processing shaders
      postShaders = createPostProcessingShaders(p, getLook);

      ready = true;
    };

    /**
     * Ensure a GPU decorative shader exists for the given type.
     * Creates it lazily on first use so decoratives added after setup work.
     */
    function ensureDecorativeShader(p, getLook, decType) {
      if (decorativeShaders[decType]) return;

      const entry = registryMap[decType];
      if (!entry || !entry.createShader) return;

      // Param getter that reads live values from getLook()
      const getParams = () => {
        const current = getLook();
        const found = current?.decoratives?.find((d) => d.type === decType);
        return found?.params ?? entry.defaults;
      };

      try {
        if (decType === 'colorInterpolation') {
          decorativeShaders[decType] = entry.createShader(p, getParams, getLook);
        } else {
          decorativeShaders[decType] = entry.createShader(p, getParams);
        }
      } catch (err) {
        console.warn(`Failed to create shader for ${decType}:`, err);
      }
    }

    p.draw = () => {
      if (!ready) return;
      frameCount += 1;

      const look = getLook();
      if (!look) return;

      const pp = look.canvas.postProcessing;
      const bloomOn = pp?.bloom?.enabled && postShaders?.bloomBuffer;

      // --- 1. Begin bloom framebuffer capture ---
      if (bloomOn) {
        postShaders.bloomBuffer.begin();
      }

      // --- 2. Background ---
      applyBackground(p, look.canvas.background);

      // --- 3. Blend mode ---
      const blendMode = look.canvas.blendMode ?? 'BLEND';
      if (p[blendMode]) {
        p.blendMode(p[blendMode]);
      }

      // --- 4. Camera ---
      applyCamera(p, look.canvas.camera, frameCount);

      // --- 5. Lighting ---
      applyLighting(p, look.canvas.lighting);

      // --- 6. Stroke setup ---
      const stroke = look.canvas.stroke;
      if (stroke && stroke.enabled) {
        p.stroke(p.color(stroke.color ?? '#000000'));
        p.strokeWeight(stroke.weight ?? 1);
      } else {
        p.noStroke();
      }

      // --- 7. Detect active GPU decoratives & lazily create shaders ---
      const hasNoise = look.decoratives.some((d) => d.type === 'noiseDisplacement');
      const hasGradient = look.decoratives.some((d) => d.type === 'colorInterpolation');
      const particleDec = look.decoratives.find((d) => d.type === 'particleField');

      if (hasNoise) ensureDecorativeShader(p, getLook, 'noiseDisplacement');
      if (hasGradient) ensureDecorativeShader(p, getLook, 'colorInterpolation');
      if (particleDec) ensureDecorativeShader(p, getLook, 'particleField');

      // --- 8. Kaleidoscope wrapper ---
      const kalDec = look.decoratives.find((d) => d.type === 'kaleidoscope');
      const segments = kalDec ? Math.max(1, Math.floor(kalDec.params?.segments ?? 6)) : 1;
      const angleStep = p.TWO_PI / segments;

      for (let seg = 0; seg < segments; seg++) {
        if (segments > 1) {
          p.push();
          p.rotateY(seg * angleStep);
        }

        // --- 9. Render nouns with per-noun shader decoratives ---
        look.nouns.forEach((noun, idx) => {
          // Activate noise displacement shader (takes priority over gradient)
          if (hasNoise && decorativeShaders.noiseDisplacement) {
            p.shader(decorativeShaders.noiseDisplacement);
          } else if (hasGradient && decorativeShaders.colorInterpolation) {
            p.shader(decorativeShaders.colorInterpolation);
          }

          renderNoun(p, noun, look, textures, idx);
          p.resetShader();
        });

        // --- 10. CPU decoratives (bezierField, grid, kaleidoscope's own shapes) ---
        for (const dec of look.decoratives) {
          if (GPU_DECORATIVE_TYPES.has(dec.type)) continue;
          if (dec.type === 'kaleidoscope') continue; // kaleidoscope is the loop wrapper

          const entry = registryMap[dec.type];
          if (entry && entry.draw) {
            p.push();
            entry.draw(p, dec.params, look, frameCount);
            p.pop();
          }
        }

        // --- 11. Particle field (GPU instanced) ---
        if (particleDec && decorativeShaders.particleField) {
          const { shader: partShader, geometry: partGeo } = decorativeShaders.particleField;

          const decColor = p.color(look.palette?.decorative1 ?? '#66AACC');
          decColor.setAlpha(180);
          p.fill(decColor);
          p.noStroke();

          // Uniforms are auto-updated via callbacks in setDefaultUniforms()
          p.shader(partShader);
          p.model(partGeo, particleDec.params?.count ?? 50);
          p.resetShader();
        }

        if (segments > 1) {
          p.pop();
        }
      }

      // --- 12. Reset blend mode ---
      p.blendMode(p.BLEND);

      // --- 13. Bloom composite ---
      if (bloomOn) {
        postShaders.bloomBuffer.end();

        // Draw original scene to canvas
        p.push();
        p.resetMatrix();
        p.noLights();
        p.noStroke();
        p.imageMode(p.CENTER);
        p.image(postShaders.bloomBuffer, 0, 0);
        p.pop();

        // Blur for glow spread
        p.filter(p.BLUR, pp.bloom?.blurAmount ?? 15);

        // Composite: overlay original on blurred via additive blend
        p.push();
        p.resetMatrix();
        p.noLights();
        p.noStroke();
        p.blendMode(p.ADD);
        p.imageMode(p.CENTER);
        p.image(postShaders.bloomBuffer, 0, 0);
        p.blendMode(p.BLEND);
        p.pop();
      }

      // --- 14. Post-processing filter shaders ---
      applyPostProcessing(p, getLook, postShaders);
    };

    p.windowResized = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      p.resizeCanvas(w, h);
    };
  }, container);

  return {
    instance,
    destroy() {
      instance.remove();
    },
  };
}
