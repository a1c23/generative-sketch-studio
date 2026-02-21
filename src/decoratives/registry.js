/**
 * Decoratives Registry — central registry of all decorative modules.
 */

import bezierField from './bezierField.js';
import noiseDisplacement from './noiseDisplacement.js';
import kaleidoscope from './kaleidoscope.js';
import particleField from './particleField.js';
import colorInterpolation from './colorInterpolation.js';
import grid from './grid.js';

/** Ordered list for UI display */
export const registryList = [
  bezierField,
  noiseDisplacement,
  kaleidoscope,
  particleField,
  colorInterpolation,
  grid,
];

/** Map by name for fast lookup in the render loop */
export const registryMap = {};
for (const entry of registryList) {
  registryMap[entry.name] = entry;
}
