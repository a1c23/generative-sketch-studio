import SectionLabel from './SectionLabel.jsx';
import ParamSlider from './ParamSlider.jsx';

export default function FrameExportPanel({
  frameParams,
  onFrameChange,
  onExport,
}) {
  const set = (key) => (val) => onFrameChange(key, val);

  return (
    <>
      <SectionLabel>Camera</SectionLabel>
      <ParamSlider
        label="Angle"
        value={frameParams.cameraAngle}
        min={0}
        max={6.28}
        step={0.01}
        onChange={set('cameraAngle')}
      />
      <ParamSlider
        label="Distance"
        value={frameParams.cameraDistance}
        min={200}
        max={1200}
        step={10}
        onChange={set('cameraDistance')}
      />

      <SectionLabel>Resolution</SectionLabel>
      <ParamSlider
        label="Width"
        value={frameParams.exportWidth}
        min={512}
        max={4096}
        step={64}
        onChange={set('exportWidth')}
      />
      <ParamSlider
        label="Height"
        value={frameParams.exportHeight}
        min={512}
        max={4096}
        step={64}
        onChange={set('exportHeight')}
      />

      <div className="export-row">
        <button className="btn-ghost btn-ghost-full" onClick={onExport}>
          Export PNG
        </button>
      </div>
    </>
  );
}
