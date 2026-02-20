import './ControlPanel.css';

export default function ControlPanel({ params = [], values = {}, onChange }) {
  if (!params.length) return null;

  return (
    <div className="control-panel">
      <label className="control-panel-label">Parameters</label>
      {params.map((param) => {
        if (param.type === 'separator') {
          return (
            <div key={param.label} className="control-separator">
              {param.label}
            </div>
          );
        }

        if (param.type === 'button') {
          return (
            <div key={param.key} className="control-row">
              <button
                className="btn btn-secondary btn-full"
                onClick={() => onChange(param.key, Date.now())}
              >
                {param.label}
              </button>
            </div>
          );
        }

        const val = values[param.key] ?? param.default;

        // For toggle type
        if (param.type === 'toggle') {
          return (
            <div key={param.key} className="control-row">
              <div className="control-header">
                <span className="control-name">{param.label}</span>
                <button
                  className={`toggle-btn ${val ? 'toggle-on' : ''}`}
                  onClick={() => onChange(param.key, !val)}
                >
                  {val ? 'On' : 'Off'}
                </button>
              </div>
            </div>
          );
        }

        // Hide params that depend on a toggle being in a specific state
        if (param.showWhen) {
          const depVal = values[param.showWhen.key] ?? param.showWhen.defaultRef;
          if (depVal !== param.showWhen.value) return null;
        }

        return (
          <div key={param.key} className="control-row">
            <div className="control-header">
              <span className="control-name">{param.label}</span>
              {param.type === 'range' && (
                <span className="control-value">{val}</span>
              )}
            </div>
            {param.type === 'range' && (
              <input
                type="range"
                className="control-slider"
                min={param.min}
                max={param.max}
                step={param.step ?? 1}
                value={val}
                onChange={(e) => onChange(param.key, parseFloat(e.target.value))}
              />
            )}
            {param.type === 'color' && (
              <input
                type="color"
                className="control-color"
                value={val}
                onChange={(e) => onChange(param.key, e.target.value)}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
