export const CAMERA_DEFAULTS = {
  focalLength: 50,
  tilt: -15,
  pan: 0,
  distance: 600,
  autoRotate: true,
  rotateSpeed: 0.5,
  projection: 'perspective',
};

/**
 * Apply camera settings to a p5 WEBGL instance.
 * Supports perspective and orthographic projection.
 * Call once per frame in draw().
 */
export function applyCamera(p, cameraParams, frameCount) {
  const fov = ((cameraParams.focalLength ?? CAMERA_DEFAULTS.focalLength) / 100) * p.PI;
  const dist = cameraParams.distance ?? CAMERA_DEFAULTS.distance;
  const tilt = p.radians(cameraParams.tilt ?? CAMERA_DEFAULTS.tilt);
  let pan = p.radians(cameraParams.pan ?? CAMERA_DEFAULTS.pan);

  const autoRotate = cameraParams.autoRotate ?? CAMERA_DEFAULTS.autoRotate;
  const rotateSpeed = cameraParams.rotateSpeed ?? CAMERA_DEFAULTS.rotateSpeed;
  const projection = cameraParams.projection ?? CAMERA_DEFAULTS.projection;

  if (autoRotate) {
    pan += frameCount * 0.005 * rotateSpeed;
  }

  const camX = dist * p.cos(tilt) * p.sin(pan);
  const camY = dist * p.sin(tilt);
  const camZ = dist * p.cos(tilt) * p.cos(pan);

  if (projection === 'ortho') {
    // Scale ortho frustum based on distance for zoom-like behavior
    const scale = dist / 400;
    const hw = (p.width / 2) * scale;
    const hh = (p.height / 2) * scale;
    p.ortho(-hw, hw, -hh, hh, 1, 5000);
  } else {
    p.perspective(fov, p.width / p.height, 10, 5000);
  }

  p.camera(camX, camY, camZ, 0, 0, 0, 0, 1, 0);
}
