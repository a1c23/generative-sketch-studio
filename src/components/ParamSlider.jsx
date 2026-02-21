export default function ParamSlider({ label, value, min, max, step, onChange, defaultValue }) {
  const display = step < 1 ? value.toFixed(2) : value;
  const showReset = defaultValue !== undefined && value !== defaultValue;

  return (
    <div className="param-slider">
      <div className="param-slider-header">
        <span className="param-slider-label">{label}</span>
        <span className="param-slider-value">{display}</span>
      </div>
      <div className="param-slider-track-row">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
        />
        {showReset && (
          <button
            className="param-slider-reset"
            onClick={() => onChange(defaultValue)}
            title="Reset"
          >
            {'\u21BA'}
          </button>
        )}
      </div>
    </div>
  );
}
