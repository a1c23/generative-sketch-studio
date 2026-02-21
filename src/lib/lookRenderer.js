/**
 * Look Renderer — applies background, lighting, material, and post-processing
 * from a Look object to a p5 WEBGL context.
 */

/**
 * Apply background based on look.canvas.background.
 * Solid: simple p.background(). Gradient: fullscreen quad with per-vertex color.
 */
export function applyBackground(p, background) {
  const colorA = background.colorA ?? '#F5F3F0';

  if (background.type === 'gradient' && background.colorB) {
    const cA = p.color(colorA);
    const cB = p.color(background.colorB);

    // Clear with colorA first
    p.background(cA);

    // Draw fullscreen gradient quad in screen-space
    p.push();
    p.resetMatrix();
    p.noLights();
    p.noStroke();

    // Set up ortho projection for screen-space drawing
    const hw = p.width / 2;
    const hh = p.height / 2;
    p.ortho(-hw, hw, -hh, hh, -1, 1);

    // Draw a TRIANGLE_STRIP quad with per-vertex color
    p.beginShape(p.TRIANGLE_STRIP);
    p.fill(cA);
    p.vertex(-hw, -hh, 0);
    p.vertex(hw, -hh, 0);
    p.fill(cB);
    p.vertex(-hw, hh, 0);
    p.vertex(hw, hh, 0);
    p.endShape();

    p.pop();
  } else {
    p.background(p.color(colorA));
  }
}

/**
 * Apply lighting from look.canvas.lighting.
 */
export function applyLighting(p, lighting) {
  const ambient = lighting.ambientIntensity ?? 80;
  const keyColor = lighting.keyLightColor ?? '#FFFFFF';
  const keyPos = lighting.keyLightPos ?? [200, -200, 300];
  const fillColor = lighting.fillLightColor ?? '#8888CC';
  const fillPos = lighting.fillLightPos ?? [-200, 200, -200];

  p.ambientLight(ambient);
  p.pointLight(p.color(keyColor), ...keyPos);
  p.pointLight(p.color(fillColor), ...fillPos);
}

/**
 * Apply material settings based on mode.
 * @param {p5} p
 * @param {object} material — { mode, texture, baseColor, shininess, emissiveColor }
 * @param {object} textures — loaded texture map { key: p5.Image }
 * @param {string} [fillColor] — override color (e.g. from palette)
 */
export function applyMaterial(p, material, textures, fillColor) {
  const mode = material.mode ?? 'default';
  const baseColor = fillColor ?? material.baseColor ?? '#8888CC';

  switch (mode) {
    case 'normal':
      p.normalMaterial();
      return;

    case 'emissive':
      p.emissiveMaterial(p.color(material.emissiveColor ?? '#FF4444'));
      break;

    case 'specular':
      p.specularMaterial(p.color(baseColor));
      p.shininess(material.shininess ?? 40);
      break;

    case 'default':
    default: {
      const texKey = material.texture;
      if (texKey && texKey !== 'none' && textures && textures[texKey]) {
        p.texture(textures[texKey]);
      } else {
        p.fill(p.color(baseColor));
      }
      p.shininess(material.shininess ?? 40);
      break;
    }
  }
}

/**
 * Apply post-processing effects.
 * Vignette: concentric semi-transparent black ellipses in screen-space.
 * Bloom: no-op (requires shader pipeline — future work).
 */
export function applyPostProcessing(p, postProcessing) {
  const vignette = postProcessing.vignetteStrength ?? 0;

  if (vignette > 0) {
    p.push();
    p.resetMatrix();
    p.noLights();
    p.noStroke();

    // Set up ortho for screen-space overlay
    const hw = p.width / 2;
    const hh = p.height / 2;
    p.ortho(-hw, hw, -hh, hh, -1, 1);

    // Draw concentric ellipses with quadratic alpha falloff
    const steps = 30;
    const maxAlpha = (vignette / 100) * 180; // max darkness at edges
    const maxDim = Math.max(p.width, p.height);

    for (let i = steps; i >= 0; i--) {
      const t = i / steps; // 1 = outer, 0 = center
      const alpha = maxAlpha * t * t; // quadratic falloff
      const size = 0.5 + 0.7 * t; // ring size (0.5 inner → 1.2 outer)

      p.fill(0, 0, 0, alpha);
      p.ellipse(0, 0, maxDim * size, maxDim * size * (p.height / p.width));
    }

    p.pop();
  }

  // Bloom: no-op — requires shader pipeline
}
