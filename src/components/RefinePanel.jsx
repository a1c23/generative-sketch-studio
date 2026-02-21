import SectionLabel from './SectionLabel.jsx';
import ParamSlider from './ParamSlider.jsx';
import ParamColorSwatch from './ParamColorSwatch.jsx';
import TexturePicker from './TexturePicker.jsx';

export default function RefinePanel({ refineParams, onRefineChange }) {
  const set = (key) => (val) => onRefineChange(key, val);

  return (
    <>
      <SectionLabel>Texture</SectionLabel>
      <TexturePicker
        active={refineParams.texture}
        onChange={set('texture')}
      />

      <SectionLabel>Material</SectionLabel>
      <ParamColorSwatch
        label="Base Color"
        value={refineParams.baseColor}
        onChange={set('baseColor')}
      />
      <ParamSlider
        label="Shininess"
        value={refineParams.shininess}
        min={1}
        max={200}
        step={1}
        onChange={set('shininess')}
      />

      <SectionLabel>Lighting</SectionLabel>
      <ParamSlider
        label="Ambient"
        value={refineParams.ambientIntensity}
        min={0}
        max={255}
        step={1}
        onChange={set('ambientIntensity')}
      />
      <ParamColorSwatch
        label="Key Light"
        value={refineParams.keyLightColor}
        onChange={set('keyLightColor')}
      />
      <ParamColorSwatch
        label="Fill Light"
        value={refineParams.fillLightColor}
        onChange={set('fillLightColor')}
      />
    </>
  );
}
