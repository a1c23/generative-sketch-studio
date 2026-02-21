/**
 * Look Utilities — path-based state helpers for the Look object.
 */

/**
 * Deep-get a value from a nested object using a dot-separated path.
 * getIn({ a: { b: 3 } }, 'a.b') → 3
 */
export function getIn(obj, path) {
  const keys = path.split('.');
  let current = obj;
  for (const key of keys) {
    if (current == null) return undefined;
    current = current[key];
  }
  return current;
}

/**
 * Immutably set a value at a dot-separated path.
 * setIn({ a: { b: 1 } }, 'a.b', 2) → { a: { b: 2 } }
 * Supports numeric keys for array access (e.g., 'nouns.0.scale').
 */
export function setIn(obj, path, value) {
  const keys = path.split('.');
  if (keys.length === 0) return obj;

  function recurse(current, idx) {
    const key = keys[idx];
    const isLast = idx === keys.length - 1;
    const numKey = /^\d+$/.test(key) ? Number(key) : null;

    if (isLast) {
      if (Array.isArray(current)) {
        const copy = [...current];
        copy[numKey ?? key] = value;
        return copy;
      }
      return { ...current, [key]: value };
    }

    const child = current?.[key];
    const nextKey = keys[idx + 1];
    const nextIsNum = /^\d+$/.test(nextKey);
    const nextDefault = nextIsNum ? [] : {};

    if (Array.isArray(current)) {
      const copy = [...current];
      copy[numKey ?? key] = recurse(child ?? nextDefault, idx + 1);
      return copy;
    }

    return {
      ...current,
      [key]: recurse(child ?? nextDefault, idx + 1),
    };
  }

  return recurse(obj, 0);
}

/**
 * Generate a random 6-digit seed string.
 */
export function generateSeed() {
  return Math.floor(Math.random() * 999999)
    .toString()
    .padStart(6, '0');
}

let nounCounter = 0;

/**
 * Create a new noun entry with defaults.
 */
export function createNoun(categoryKey = 'flow') {
  nounCounter += 1;
  return {
    id: `noun-${Date.now()}-${nounCounter}`,
    source: { type: 'procedural', categoryKey },
    position: { x: 0, y: 0, z: 0 },
    scale: 1,
    rotation: { x: 0, y: 0, z: 0 },
    material: null,
  };
}

let decCounter = 0;

/**
 * Create a new decorative instance from its registry entry defaults.
 */
export function createDecorativeInstance(registryEntry) {
  decCounter += 1;
  return {
    id: `dec-${Date.now()}-${decCounter}`,
    type: registryEntry.name,
    params: { ...registryEntry.defaults },
  };
}
