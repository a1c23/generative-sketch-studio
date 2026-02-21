import { useRef, useEffect } from 'react';
import p5 from 'p5';
import categories from '../categories/categoryRegistry.js';
import textureList from '../lib/textureRegistry.js';
import { applyLightRig } from '../lib/lighting.js';
import { drawParticles } from '../categories/decoratives/particles.js';
import { drawConnectors } from '../categories/decoratives/connectors.js';
import { drawFractures } from '../categories/decoratives/fractures.js';
import { drawGrid } from '../categories/decoratives/grid.js';

export default function SketchCanvas({ category, seed, paramsRef, onCanvasReady }) {
  const containerRef = useRef(null);
  const p5Ref = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (p5Ref.current) {
      p5Ref.current.remove();
      p5Ref.current = null;
    }

    const cat = categories[category];
    if (!cat) return;

    const textures = {};
    let ready = false;

    const instance = new p5((p) => {
      p.setup = async () => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        p.createCanvas(w, h, p.WEBGL);
        p.pixelDensity(2);

        // Load all textures async in setup (p5 2.0 style)
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

        const params = paramsRef.current;
        const compose = params.composeParams;
        const refine = params.refineParams;
        const frame = params.frameParams;

        // Off-white background — matches page
        p.background(245, 243, 240);

        // Camera: static spherical position
        const angle = frame.cameraAngle;
        const dist = frame.cameraDistance;
        const camX = dist * p.sin(angle);
        const camZ = dist * p.cos(angle);
        p.camera(camX, -100, camZ, 0, 0, 0, 0, 1, 0);

        // Lighting
        applyLightRig(p, refine);

        // Material: texture or flat color
        const texKey = refine.texture;
        if (texKey && texKey !== 'none' && textures[texKey]) {
          p.texture(textures[texKey]);
        } else {
          p.fill(p.color(refine.baseColor));
        }
        p.shininess(refine.shininess);

        // Wireframe toggle
        if (compose.wireframe) {
          p.stroke(0);
          p.strokeWeight(0.5);
        } else {
          p.noStroke();
        }

        // Grid decorative (behind shape)
        if (compose.gridOn) drawGrid(p, compose);

        // Main shape
        cat.shape(p, compose);

        // Decoratives
        if (compose.particlesOn) drawParticles(p, compose);
        if (compose.connectorsOn) drawConnectors(p, compose);
        if (compose.fracturesOn) drawFractures(p, compose);
      };

      p.windowResized = () => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        p.resizeCanvas(w, h);
      };
    }, container);

    p5Ref.current = instance;

    setTimeout(() => {
      const canvas = container.querySelector('canvas');
      if (canvas && onCanvasReady) onCanvasReady(canvas);
    }, 100);

    return () => {
      if (p5Ref.current) {
        p5Ref.current.remove();
        p5Ref.current = null;
      }
    };
  }, [category, seed]);

  return <div ref={containerRef} className="sketch-container" />;
}
