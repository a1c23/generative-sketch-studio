export default function ParamColorSwatch({ label, value, onChange }) {
  return (
    <div className="param-color">
      <span className="param-color-label">{label}</span>
      <div className="color-swatch" style={{ background: value }}>
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}
