/**
 * Model Loader — stub for .obj file loading.
 * Will be implemented in a future prompt to support custom 3D model uploads.
 */

/**
 * Load an .obj file from a URL or File object.
 * @param {p5} p — p5 instance
 * @param {string|File} source — URL or File object
 * @returns {Promise<object|null>} loaded model or null
 */
export async function loadObjModel(p, source) {
  // Stub — returns null until OBJ loading is implemented
  console.warn('OBJ loading not yet implemented');
  return null;
}

/**
 * Render a loaded OBJ model.
 * @param {p5} p — p5 instance
 * @param {object} model — loaded model from loadObjModel
 */
export function renderObjModel(p, model) {
  if (!model) return;
  // Stub — will call p.model(model) when implemented
}
