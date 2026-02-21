import ParamSlider from './ParamSlider.jsx';
import ParamColorSwatch from './ParamColorSwatch.jsx';

export default function LightEditor({ lighting, setLookPath }) {
  return (
    <div className="light-editor">
      <ParamSlider
        label="Ambient"
        value={lighting.ambientIntensity ?? 80}
        min={0}
        max={255}
        step={1}
        onChange={(val) => setLookPath('canvas.lighting.ambientIntensity', val)}
      />
      <ParamColorSwatch
        label="Key Light"
        value={lighting.keyLightColor ?? '#FFFFFF'}
        onChange={(val) => setLookPath('canvas.lighting.keyLightColor', val)}
      />
      <ParamColorSwatch
        label="Fill Light"
        value={lighting.fillLightColor ?? '#8888CC'}
        onChange={(val) => setLookPath('canvas.lighting.fillLightColor', val)}
      />
    </div>
  );
}
