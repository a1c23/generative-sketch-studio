import SectionLabel from './SectionLabel.jsx';
import ParamSlider from './ParamSlider.jsx';
import ParamToggle from './ParamToggle.jsx';
import CategoryPicker from './CategoryPicker.jsx';

export default function ComposePanel({
  category,
  onCategoryChange,
  seed,
  onSeedChange,
  onRefreshSeed,
  composeParams,
  onComposeChange,
}) {
  const set = (key) => (val) => onComposeChange(key, val);

  return (
    <>
      <SectionLabel>Category</SectionLabel>
      <CategoryPicker active={category} onChange={onCategoryChange} />

      <SectionLabel>Seed</SectionLabel>
      <div className="seed-row">
        <input
          className="seed-input"
          type="text"
          value={seed}
          onChange={(e) => onSeedChange(e.target.value)}
          spellCheck={false}
        />
        <button className="btn-ghost" onClick={onRefreshSeed}>
          Refresh
        </button>
      </div>

      <SectionLabel>Shape</SectionLabel>
      <ParamSlider
        label="Scale"
        value={composeParams.shapeScale}
        min={0.2}
        max={3}
        step={0.05}
        onChange={set('shapeScale')}
      />
      <ParamSlider
        label="Count"
        value={composeParams.shapeCount}
        min={1}
        max={8}
        step={1}
        onChange={set('shapeCount')}
      />
      <ParamSlider
        label="Horizontal"
        value={composeParams.rotationY}
        min={0}
        max={6.28}
        step={0.01}
        onChange={set('rotationY')}
      />
      <ParamSlider
        label="Vertical"
        value={composeParams.rotationX}
        min={0}
        max={6.28}
        step={0.01}
        onChange={set('rotationX')}
      />

      <ParamToggle
        label="Wireframe"
        value={composeParams.wireframe}
        onChange={set('wireframe')}
      />

      <SectionLabel>Decoratives</SectionLabel>
      <ParamToggle
        label="Particles"
        value={composeParams.particlesOn}
        onChange={set('particlesOn')}
      />
      <ParamToggle
        label="Connectors"
        value={composeParams.connectorsOn}
        onChange={set('connectorsOn')}
      />
      <ParamToggle
        label="Fractures"
        value={composeParams.fracturesOn}
        onChange={set('fracturesOn')}
      />
      <ParamToggle
        label="Grid"
        value={composeParams.gridOn}
        onChange={set('gridOn')}
      />
    </>
  );
}
