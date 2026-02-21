export default function ParamSelect({ label, value, options, onChange }) {
  return (
    <div className="param-select">
      {label && <span className="param-select-label">{label}</span>}
      <div className="param-select-row">
        {options.map((opt) => (
          <button
            key={opt.value}
            className={`param-select-btn${value === opt.value ? ' active' : ''}`}
            onClick={() => onChange(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
