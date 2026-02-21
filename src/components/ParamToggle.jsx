export default function ParamToggle({ label, value, onChange }) {
  return (
    <div className="param-toggle">
      <span className="param-toggle-label">{label}</span>
      <label className="toggle-switch">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="toggle-track" />
      </label>
    </div>
  );
}
