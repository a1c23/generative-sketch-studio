/**
 * Sketch Orchestrator — creates and manages the p5 instance.
 * Reads from a getLook() getter each frame so all mutations flow through the ref.
 * p5 instance is only recreated on seed change (handled externally).
 */

import p5 from 'p5';
import textureList from './textureRegistry.js';
import { applyCamera } from './camera3d.js';
import { applyBackground, applyLighting, applyMaterial, applyPostProcessing } from './lookRenderer.js';
import { renderNoun } from './nounRenderer.js';
import { registryMap } from '../decoratives/registry.js';

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

  const instance = new p5((p) => {
    p.setup = async () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      p.createCanvas(w, h, p.WEBGL);
      p.pixelDensity(2);

      // Load all textures async (p5 2.0 — no preload)
      const loads = textureList
        .filter((t) => t.path)
        .map(async (t) => {
          textures[t.key] = await p.loadImage(t.path);
        });
      await Promise.all(loads);
      ready = true;
    };

    p.draw = () => {
      if (!ready) return;
      frameCount += 1;

      const look = getLook();
      if (!look) return;

      // 1. Background
      applyBackground(p, look.canvas.background);

      // 2. Apply blend mode
      const blendMode = look.canvas.blendMode ?? 'BLEND';
      if (p[blendMode]) {
        p.blendMode(p[blendMode]);
      }

      // 3. Camera
      applyCamera(p, look.canvas.camera, frameCount);

      // 4. Lighting
      applyLighting(p, look.canvas.lighting);

      // 5. Stroke setup
      const stroke = look.canvas.stroke;
      if (stroke && stroke.enabled) {
        p.stroke(p.color(stroke.color ?? '#000000'));
        p.strokeWeight(stroke.weight ?? 1);
      } else {
        p.noStroke();
      }

      // 6. Render decoratives (behind nouns)
      for (const dec of look.decoratives) {
        const entry = registryMap[dec.type];
        if (entry && entry.draw) {
          p.push();
          entry.draw(p, dec.params, look, frameCount);
          p.pop();
        }
      }

      // 7. Render nouns
      look.nouns.forEach((noun, idx) => {
        renderNoun(p, noun, look, textures, idx);
      });

      // 8. Reset blend mode before post-processing
      p.blendMode(p.BLEND);

      // 9. Post-processing
      applyPostProcessing(p, look.canvas.postProcessing);
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
