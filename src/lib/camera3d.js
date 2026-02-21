export const CAMERA_DEFAULTS = {
  focalLength: 50,
  tilt: -15,
  pan: 0,
  distance: 600,
  autoRotate: true,
  rotateSpeed: 0.5,
};

/**
 * Apply camera settings to a p5 WEBGL instance.
 * Call once per frame in draw().
 */
export function applyCamera(p, cameraParams, frameCount) {
  const fov = ((cameraParams.focalLength ?? CAMERA_DEFAULTS.focalLength) / 100) * p.PI;
  const dist = cameraParams.distance ?? CAMERA_DEFAULTS.distance;
  const tilt = p.radians(cameraParams.tilt ?? CAMERA_DEFAULTS.tilt);
  let pan = p.radians(cameraParams.pan ?? CAMERA_DEFAULTS.pan);

  const autoRotate = cameraParams.autoRotate ?? CAMERA_DEFAULTS.autoRotate;
  const rotateSpeed = cameraParams.rotateSpeed ?? CAMERA_DEFAULTS.rotateSpeed;

  if (autoRotate) {
    pan += frameCount * 0.005 * rotateSpeed;
  }

  const camX = dist * p.cos(tilt) * p.sin(pan);
  const camY = dist * p.sin(tilt);
  const camZ = dist * p.cos(tilt) * p.cos(pan);

  p.perspective(fov, p.width / p.height, 10, 5000);
  p.camera(camX, camY, camZ, 0, 0, 0, 0, 1, 0);
}
