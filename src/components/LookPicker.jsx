export default function LookPicker({ presets, activePreset, onApplyPreset }) {
  return (
    <div className="look-picker-grid">
      {presets.map((preset) => (
        <button
          key={preset.key}
          className={`look-card${activePreset === preset.key ? ' active' : ''}`}
          onClick={() => onApplyPreset(preset.key)}
        >
          <div className="look-card-swatches">
            {Object.values(preset.palette).map((color, i) => (
              <span
                key={i}
                className="look-swatch"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <span className="look-card-name">{preset.name}</span>
        </button>
      ))}
    </div>
  );
}
