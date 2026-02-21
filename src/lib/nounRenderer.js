/**
 * Noun Renderer — bridges Look noun objects to the existing shape drawing system.
 * Applies material mode, opacity, and palette colors per noun.
 */

import categories from '../categories/categoryRegistry.js';
import { applyMaterial } from './lookRenderer.js';

/**
 * Render a single noun using the category shape system.
 *
 * @param {p5} p — p5 instance
 * @param {object} noun — noun from look.nouns[]
 * @param {object} look — full Look object (for palette access)
 * @param {object} textures — loaded texture map
 * @param {number} nounIndex — index in nouns array (for palette color)
 */
export function renderNoun(p, noun, look, textures, nounIndex) {
  if (!noun.source || noun.source.type !== 'procedural') return;

  const cat = categories[noun.source.categoryKey];
  if (!cat) return;

  // Build the flat params the shape functions expect
  const flatParams = {
    shapeScale: noun.scale ?? 1,
    shapeCount: 1,
    rotationX: noun.rotation?.x ?? 0,
    rotationY: noun.rotation?.y ?? 0,
  };

  // Resolve material: per-noun override or global
  const nounMaterial = noun.material || look.canvas.material;
  const materialMode = nounMaterial.mode ?? 'default';

  // Resolve fill color from palette (only used for default/specular modes)
  const paletteKey = `noun${nounIndex}`;
  const paletteColor = look.palette?.[paletteKey] ?? nounMaterial.baseColor ?? '#8888CC';

  p.push();

  // Position the noun
  p.translate(
    noun.position?.x ?? 0,
    noun.position?.y ?? 0,
    noun.position?.z ?? 0,
  );

  // Apply material via the centralized renderer
  applyMaterial(p, nounMaterial, textures, paletteColor);

  // Apply global opacity as alpha on fill colors (not for normal mode)
  const opacity = look.canvas.opacity ?? 255;
  if (materialMode !== 'normal' && opacity < 255) {
    // Get the current fill and apply alpha
    const currentFill = p.color(paletteColor);
    currentFill.setAlpha(opacity);
    p.fill(currentFill);
  }

  // Draw the shape
  cat.shape(p, flatParams);

  p.pop();
}
