/**
 * Sketch registry — each entry defines a generative sketch.
 *
 * Shape of an entry:
 *   name    — display name shown in the sidebar dropdown
 *   params  — array of parameter definitions auto-rendered by ControlPanel
 *   sketch  — function(p, { seed, params }) called with a p5 instance
 */

// Helper: build a canvas gradient from two hex colors + angle (degrees)
function makeGradient(ctx, w, h, cx, cy, radius, color1, color2, angleDeg) {
  const angle = (angleDeg * Math.PI) / 180;
  const dx = Math.cos(angle) * radius;
  const dy = Math.sin(angle) * radius;
  const grad = ctx.createLinearGradient(cx - dx, cy - dy, cx + dx, cy + dy);
  grad.addColorStop(0, color1);
  grad.addColorStop(1, color2);
  return grad;
}

// Helper: parse hex to rgba string with alpha
function hexAlpha(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

const W = 1280;
const H = 720;

export const sketches = {
  combined: {
    name: 'Blobs + Light + Circles',
    params: [
      { label: 'Blobs', type: 'separator' },
      { key: 'blobCount', label: 'Count', type: 'range', min: 3, max: 20, default: 8 },
      { key: 'blobSize', label: 'Size', type: 'range', min: 40, max: 250, default: 120 },
      { key: 'blobColor', label: 'Color', type: 'color', default: '#e94560' },
      { key: 'blobGradient', label: 'Gradient', type: 'toggle', default: false },
      { key: 'blobColor2', label: 'Color 2', type: 'color', default: '#ff6b9d', showWhen: { key: 'blobGradient', value: true, defaultRef: false } },
      { key: 'blobGradDir', label: 'Direction', type: 'range', min: 0, max: 360, step: 15, default: 45, showWhen: { key: 'blobGradient', value: true, defaultRef: false } },

      { label: 'Light', type: 'separator' },
      { key: 'rays', label: 'Ray Count', type: 'range', min: 10, max: 300, default: 100 },
      { key: 'rayLength', label: 'Ray Length', type: 'range', min: 40, max: 500, default: 200 },
      { key: 'lightIntensity', label: 'Intensity', type: 'range', min: 1, max: 10, step: 0.5, default: 3 },
      { key: 'lightGlow', label: 'Glow', type: 'range', min: 0, max: 40, step: 1, default: 8 },
      { key: 'lightColor', label: 'Color', type: 'color', default: '#f0e68c' },
      { key: 'lightGradient', label: 'Gradient', type: 'toggle', default: false },
      { key: 'lightColor2', label: 'Color 2', type: 'color', default: '#ffe4a0', showWhen: { key: 'lightGradient', value: true, defaultRef: false } },
      { key: 'lightGradDir', label: 'Direction', type: 'range', min: 0, max: 360, step: 15, default: 90, showWhen: { key: 'lightGradient', value: true, defaultRef: false } },

      { label: 'Circles', type: 'separator' },
      { key: 'circleCount', label: 'Count', type: 'range', min: 10, max: 300, default: 80 },
      { key: 'dotSize', label: 'Size', type: 'range', min: 2, max: 40, default: 8 },
      { key: 'circleColor', label: 'Color', type: 'color', default: '#4ecdc4' },
      { key: 'circleGradient', label: 'Gradient', type: 'toggle', default: false },
      { key: 'circleColor2', label: 'Color 2', type: 'color', default: '#45b7aa', showWhen: { key: 'circleGradient', value: true, defaultRef: false } },
      { key: 'circleGradDir', label: 'Direction', type: 'range', min: 0, max: 360, step: 15, default: 0, showWhen: { key: 'circleGradient', value: true, defaultRef: false } },

      { label: 'Effects', type: 'separator' },
      { key: 'randomizeOpacity', label: 'Randomize Opacity', type: 'button' },
    ],
    sketch: (p, { seed, params }) => {
      const blobCount = params.blobCount ?? 8;
      const blobSize = params.blobSize ?? 120;
      const blobC1 = params.blobColor ?? '#e94560';
      const blobGrad = params.blobGradient ?? false;
      const blobC2 = params.blobColor2 ?? '#ff6b9d';
      const blobDir = params.blobGradDir ?? 45;

      const rays = params.rays ?? 100;
      const rayLength = params.rayLength ?? 200;
      const lightIntensity = params.lightIntensity ?? 3;
      const lightGlow = params.lightGlow ?? 8;
      const lightC1 = params.lightColor ?? '#f0e68c';
      const lightGrad = params.lightGradient ?? false;
      const lightC2 = params.lightColor2 ?? '#ffe4a0';
      const lightDir = params.lightGradDir ?? 90;

      const circleCount = params.circleCount ?? 80;
      const dotSize = params.dotSize ?? 8;
      const circleC1 = params.circleColor ?? '#4ecdc4';
      const circleGrad = params.circleGradient ?? false;
      const circleC2 = params.circleColor2 ?? '#45b7aa';
      const circleDir = params.circleGradDir ?? 0;

      // Trigger value changes each time button is pressed
      const opacitySeed = params.randomizeOpacity ?? 0;

      p.setup = () => {
        p.createCanvas(W, H);
        p.randomSeed(Number(seed));
        p.noiseSeed(Number(seed));
        p.background(p.color('#003145'));

        const ctx = p.drawingContext;

        // Use opacitySeed to seed a separate rng for opacity randomization
        const hasOpacityRand = opacitySeed > 0;
        let opacityRng = null;
        if (hasOpacityRand) {
          // Simple seeded rng (mulberry32)
          let s = opacitySeed | 0;
          opacityRng = () => {
            s = (s + 0x6d2b79f5) | 0;
            let t = Math.imul(s ^ (s >>> 15), 1 | s);
            t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
          };
        }
        const randAlpha = (base) =>
          hasOpacityRand ? opacityRng() * 255 : base;

        // ── Store blob positions ──
        const blobs = [];
        for (let i = 0; i < blobCount; i++) {
          const x = p.random(140, W - 140);
          const y = p.random(100, H - 100);
          const s = p.random(blobSize * 0.5, blobSize * 1.5);
          blobs.push({ x, y, s });
        }

        // ── Layer 1: Blobs ──
        p.noStroke();
        for (let i = 0; i < blobs.length; i++) {
          const blob = blobs[i];
          const alpha = randAlpha(p.random(50, 130)) / 255;

          if (blobGrad) {
            const grad = makeGradient(ctx, W, H, blob.x, blob.y, blob.s, hexAlpha(blobC1, alpha), hexAlpha(blobC2, alpha), blobDir);
            ctx.fillStyle = grad;
          } else {
            const c = p.color(blobC1);
            p.fill(p.red(c), p.green(c), p.blue(c), alpha * 255);
          }

          p.beginShape();
          for (let a = 0; a < p.TWO_PI; a += 0.08) {
            const r = blob.s + p.noise(i * 3, a * 0.5) * blob.s * 0.8;
            p.vertex(blob.x + p.cos(a) * r, blob.y + p.sin(a) * r);
          }
          p.endShape(p.CLOSE);
        }

        // ── Layer 2: Light reflections on each blob (with glow blur) ──
        if (lightGlow > 0) {
          ctx.filter = `blur(${lightGlow}px)`;
        }

        const raysPerBlob = Math.ceil(rays / blobs.length);

        for (const blob of blobs) {
          for (let i = 0; i < raysPerBlob; i++) {
            const angle = p.random(p.TWO_PI);
            const len = p.random(rayLength * 0.3, rayLength);
            const offsetX = p.random(-blob.s * 0.3, blob.s * 0.3);
            const offsetY = p.random(-blob.s * 0.3, blob.s * 0.3);
            const alpha = Math.min(p.random(10, 45) * lightIntensity, 255) / 255;
            const sw = p.random(0.3, 2) * Math.max(1, lightIntensity * 0.5);

            const x1 = blob.x + offsetX;
            const y1 = blob.y + offsetY;
            const x2 = x1 + p.cos(angle) * len;
            const y2 = y1 + p.sin(angle) * len;

            if (lightGrad) {
              const grad = ctx.createLinearGradient(x1, y1, x2, y2);
              grad.addColorStop(0, hexAlpha(lightC1, alpha));
              grad.addColorStop(1, hexAlpha(lightC2, alpha));
              ctx.strokeStyle = grad;
              ctx.lineWidth = sw;
              ctx.beginPath();
              ctx.moveTo(x1, y1);
              ctx.lineTo(x2, y2);
              ctx.stroke();
            } else {
              const c = p.color(lightC1);
              p.stroke(p.red(c), p.green(c), p.blue(c), alpha * 255);
              p.strokeWeight(sw);
              p.line(x1, y1, x2, y2);
            }
          }

          // Soft glow at blob center
          p.noStroke();
          for (let r = blob.s * 0.6; r > 0; r -= 4) {
            const glowAlpha = Math.min(p.map(r, blob.s * 0.6, 0, 1, 18) * lightIntensity, 255);
            if (lightGrad) {
              const t = 1 - r / (blob.s * 0.6);
              const c1 = p.color(lightC1);
              const c2 = p.color(lightC2);
              p.fill(
                p.lerp(p.red(c1), p.red(c2), t),
                p.lerp(p.green(c1), p.green(c2), t),
                p.lerp(p.blue(c1), p.blue(c2), t),
                glowAlpha
              );
            } else {
              const c = p.color(lightC1);
              p.fill(p.red(c), p.green(c), p.blue(c), glowAlpha);
            }
            p.ellipse(blob.x, blob.y, r * 2);
          }
        }

        // Clear blur for subsequent layers
        ctx.filter = 'none';

        // ── Layer 3: Circles scattered randomly on canvas ──
        p.noStroke();

        for (let i = 0; i < circleCount; i++) {
          const x = p.random(0, W);
          const y = p.random(0, H);
          const s = dotSize * p.random(0.3, 1.8);
          const alpha = randAlpha(p.random(40, 200));

          if (circleGrad) {
            const t = i / circleCount;
            const c1 = p.color(circleC1);
            const c2 = p.color(circleC2);
            p.fill(
              p.lerp(p.red(c1), p.red(c2), t),
              p.lerp(p.green(c1), p.green(c2), t),
              p.lerp(p.blue(c1), p.blue(c2), t),
              alpha
            );
          } else {
            const c = p.color(circleC1);
            p.fill(p.red(c), p.green(c), p.blue(c), alpha);
          }
          p.ellipse(x, y, s);
        }

        p.noLoop();
      };
    },
  },

  blobs: {
    name: 'Blobs',
    params: [
      { key: 'count', label: 'Count', type: 'range', min: 3, max: 20, default: 8 },
      { key: 'size', label: 'Size', type: 'range', min: 40, max: 250, default: 120 },
      { key: 'color', label: 'Color', type: 'color', default: '#e94560' },
      { key: 'gradient', label: 'Gradient', type: 'toggle', default: false },
      { key: 'color2', label: 'Color 2', type: 'color', default: '#ff6b9d', showWhen: { key: 'gradient', value: true, defaultRef: false } },
      { key: 'gradDir', label: 'Direction', type: 'range', min: 0, max: 360, step: 15, default: 45, showWhen: { key: 'gradient', value: true, defaultRef: false } },
      { key: 'randomizeOpacity', label: 'Randomize Opacity', type: 'button' },
    ],
    sketch: (p, { seed, params }) => {
      const count = params.count ?? 8;
      const size = params.size ?? 120;
      const c1 = params.color ?? '#e94560';
      const grad = params.gradient ?? false;
      const c2 = params.color2 ?? '#ff6b9d';
      const dir = params.gradDir ?? 45;
      const opacitySeed = params.randomizeOpacity ?? 0;

      p.setup = () => {
        p.createCanvas(W, H);
        p.randomSeed(Number(seed));
        p.noiseSeed(Number(seed));
        p.background(p.color('#003145'));
        p.noStroke();

        const ctx = p.drawingContext;
        const hasOpacityRand = opacitySeed > 0;
        let s2 = opacitySeed | 0;
        const opacityRng = () => {
          s2 = (s2 + 0x6d2b79f5) | 0;
          let t = Math.imul(s2 ^ (s2 >>> 15), 1 | s2);
          t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
          return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
        const randAlpha = (base) => hasOpacityRand ? opacityRng() * 255 : base;

        for (let i = 0; i < count; i++) {
          const x = p.random(140, W - 140);
          const y = p.random(100, H - 100);
          const sz = p.random(size * 0.5, size * 1.5);
          const alpha = randAlpha(p.random(40, 120)) / 255;

          if (grad) {
            const gradient = makeGradient(ctx, W, H, x, y, sz, hexAlpha(c1, alpha), hexAlpha(c2, alpha), dir);
            ctx.fillStyle = gradient;
          } else {
            const c = p.color(c1);
            p.fill(p.red(c), p.green(c), p.blue(c), alpha * 255);
          }

          p.beginShape();
          for (let a = 0; a < p.TWO_PI; a += 0.1) {
            const r = sz + p.noise(i, a * 0.5) * sz * 0.8;
            p.vertex(x + p.cos(a) * r, y + p.sin(a) * r);
          }
          p.endShape(p.CLOSE);
        }
        p.noLoop();
      };
    },
  },

  lightReflection: {
    name: 'Light Reflection',
    params: [
      { key: 'rays', label: 'Ray Count', type: 'range', min: 10, max: 200, default: 80 },
      { key: 'spread', label: 'Spread', type: 'range', min: 20, max: 400, default: 150 },
      { key: 'intensity', label: 'Intensity', type: 'range', min: 1, max: 10, step: 0.5, default: 3 },
      { key: 'glow', label: 'Glow', type: 'range', min: 0, max: 40, step: 1, default: 8 },
      { key: 'color', label: 'Color', type: 'color', default: '#f0e68c' },
      { key: 'gradient', label: 'Gradient', type: 'toggle', default: false },
      { key: 'color2', label: 'Color 2', type: 'color', default: '#ffe4a0', showWhen: { key: 'gradient', value: true, defaultRef: false } },
      { key: 'gradDir', label: 'Direction', type: 'range', min: 0, max: 360, step: 15, default: 90, showWhen: { key: 'gradient', value: true, defaultRef: false } },
      { key: 'randomizeOpacity', label: 'Randomize Opacity', type: 'button' },
    ],
    sketch: (p, { seed, params }) => {
      const rayCount = params.rays ?? 80;
      const spread = params.spread ?? 150;
      const intensity = params.intensity ?? 3;
      const glowAmt = params.glow ?? 8;
      const c1 = params.color ?? '#f0e68c';
      const grad = params.gradient ?? false;
      const c2 = params.color2 ?? '#ffe4a0';
      const opacitySeed = params.randomizeOpacity ?? 0;

      p.setup = () => {
        p.createCanvas(W, H);
        p.randomSeed(Number(seed));
        p.background(p.color('#003145'));

        const ctx = p.drawingContext;
        const hasOpacityRand = opacitySeed > 0;
        let s2 = opacitySeed | 0;
        const opacityRng = () => {
          s2 = (s2 + 0x6d2b79f5) | 0;
          let t = Math.imul(s2 ^ (s2 >>> 15), 1 | s2);
          t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
          return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
        const randAlpha = (base) => hasOpacityRand ? opacityRng() * 255 : base;

        const cx = p.random(200, W - 200);
        const cy = p.random(150, H - 150);

        if (glowAmt > 0) {
          ctx.filter = `blur(${glowAmt}px)`;
        }

        for (let i = 0; i < rayCount; i++) {
          const angle = p.random(p.TWO_PI);
          const len = p.random(100, 400);
          const offsetX = p.random(-spread, spread);
          const offsetY = p.random(-spread, spread);
          const sw = p.random(0.5, 3) * Math.max(1, intensity * 0.5);
          const alpha = Math.min(randAlpha(p.random(15, 60)) * intensity, 255) / 255;

          const x1 = cx + offsetX;
          const y1 = cy + offsetY;
          const x2 = x1 + p.cos(angle) * len;
          const y2 = y1 + p.sin(angle) * len;

          if (grad) {
            const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
            gradient.addColorStop(0, hexAlpha(c1, alpha));
            gradient.addColorStop(1, hexAlpha(c2, alpha));
            ctx.strokeStyle = gradient;
            ctx.lineWidth = sw;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          } else {
            const c = p.color(c1);
            p.stroke(p.red(c), p.green(c), p.blue(c), alpha * 255);
            p.strokeWeight(sw);
            p.line(x1, y1, x2, y2);
          }
        }

        p.noStroke();
        for (let r = 80; r > 0; r -= 4) {
          const glowAlpha = Math.min(randAlpha(p.map(r, 80, 0, 2, 30)) * intensity, 255);
          if (grad) {
            const t = 1 - r / 80;
            const pc1 = p.color(c1);
            const pc2 = p.color(c2);
            p.fill(p.lerp(p.red(pc1), p.red(pc2), t), p.lerp(p.green(pc1), p.green(pc2), t), p.lerp(p.blue(pc1), p.blue(pc2), t), glowAlpha);
          } else {
            const c = p.color(c1);
            p.fill(p.red(c), p.green(c), p.blue(c), glowAlpha);
          }
          p.ellipse(cx, cy, r * 2);
        }

        ctx.filter = 'none';
        p.noLoop();
      };
    },
  },

  circleForms: {
    name: 'Circle Forms',
    params: [
      { key: 'count', label: 'Count', type: 'range', min: 10, max: 300, default: 80 },
      { key: 'dotSize', label: 'Size', type: 'range', min: 2, max: 40, default: 8 },
      { key: 'color', label: 'Color', type: 'color', default: '#4ecdc4' },
      { key: 'gradient', label: 'Gradient', type: 'toggle', default: false },
      { key: 'color2', label: 'Color 2', type: 'color', default: '#45b7aa', showWhen: { key: 'gradient', value: true, defaultRef: false } },
      { key: 'gradDir', label: 'Direction', type: 'range', min: 0, max: 360, step: 15, default: 0, showWhen: { key: 'gradient', value: true, defaultRef: false } },
      { key: 'randomizeOpacity', label: 'Randomize Opacity', type: 'button' },
    ],
    sketch: (p, { seed, params }) => {
      const count = params.count ?? 80;
      const dotSz = params.dotSize ?? 8;
      const c1 = params.color ?? '#4ecdc4';
      const grad = params.gradient ?? false;
      const c2 = params.color2 ?? '#45b7aa';
      const opacitySeed = params.randomizeOpacity ?? 0;

      p.setup = () => {
        p.createCanvas(W, H);
        p.randomSeed(Number(seed));
        p.background(p.color('#003145'));
        p.noStroke();

        const hasOpacityRand = opacitySeed > 0;
        let s2 = opacitySeed | 0;
        const opacityRng = () => {
          s2 = (s2 + 0x6d2b79f5) | 0;
          let t = Math.imul(s2 ^ (s2 >>> 15), 1 | s2);
          t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
          return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
        const randAlpha = (base) => hasOpacityRand ? opacityRng() * 255 : base;

        for (let i = 0; i < count; i++) {
          const x = p.random(0, W);
          const y = p.random(0, H);
          const s = dotSz * p.random(0.3, 1.8);
          const alpha = randAlpha(p.random(40, 200));

          if (grad) {
            const t = i / count;
            const pc1 = p.color(c1);
            const pc2 = p.color(c2);
            p.fill(p.lerp(p.red(pc1), p.red(pc2), t), p.lerp(p.green(pc1), p.green(pc2), t), p.lerp(p.blue(pc1), p.blue(pc2), t), alpha);
          } else {
            const c = p.color(c1);
            p.fill(p.red(c), p.green(c), p.blue(c), alpha);
          }
          p.ellipse(x, y, s);
        }

        p.noLoop();
      };
    },
  },
};
