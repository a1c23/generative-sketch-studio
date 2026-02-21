export default function ParamSlider({ label, value, min, max, step, onChange }) {
  const display = step < 1 ? value.toFixed(2) : value;

  return (
    <div className="param-slider">
      <div className="param-slider-header">
        <span className="param-slider-label">{label}</span>
        <span className="param-slider-value">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
    </div>
  );
}
