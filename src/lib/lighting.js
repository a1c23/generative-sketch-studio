/**
 * Lighting helpers — applies a light rig to the p5 WEBGL context.
 *
 * @param {p5} p — p5 instance in WEBGL mode
 * @param {object} refineParams — { ambientIntensity, keyLightColor, fillLightColor, lightRig }
 */
export function applyLightRig(p, refineParams = {}) {
  const ambient = refineParams.ambientIntensity ?? 80;
  const keyColor = refineParams.keyLightColor ?? '#FFFFFF';
  const fillColor = refineParams.fillLightColor ?? '#8888CC';

  p.ambientLight(ambient);
  p.pointLight(
    p.color(keyColor),
    200, -200, 300
  );
  p.pointLight(
    p.color(fillColor),
    -200, 200, -200
  );
}
