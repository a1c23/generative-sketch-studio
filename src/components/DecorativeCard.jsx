import { useState } from 'react';
import ParamSlider from './ParamSlider.jsx';
import ParamToggle from './ParamToggle.jsx';

export default function DecorativeCard({ decorative, decIndex, onUpdate, onRemove }) {
  const [collapsed, setCollapsed] = useState(false);

  // Auto-generate controls from the decorative's params
  const paramEntries = Object.entries(decorative.params || {});

  return (
    <div className="decorative-card">
      <div className="decorative-card-header">
        <button
          className="decorative-card-toggle"
          onClick={() => setCollapsed(!collapsed)}
        >
          <span className="decorative-card-chevron">{collapsed ? '+' : '-'}</span>
          <span className="decorative-card-name">{decorative.type}</span>
        </button>
        <button
          className="btn-ghost decorative-remove-btn"
          onClick={() => onRemove(decorative.id)}
        >
          Remove
        </button>
      </div>

      {!collapsed && (
        <div className="decorative-card-body">
          {paramEntries.map(([key, value]) => {
            if (typeof value === 'boolean') {
              return (
                <ParamToggle
                  key={key}
                  label={key}
                  value={value}
                  onChange={(val) => onUpdate(decIndex, key, val)}
                />
              );
            }
            if (typeof value === 'number') {
              return (
                <ParamSlider
                  key={key}
                  label={key}
                  value={value}
                  min={0}
                  max={value > 10 ? value * 3 : 10}
                  step={value >= 1 ? 1 : 0.1}
                  onChange={(val) => onUpdate(decIndex, key, val)}
                />
              );
            }
            // String params shown as text for now
            if (typeof value === 'string') {
              return (
                <div key={key} className="param-slider">
                  <div className="param-slider-header">
                    <span className="param-slider-label">{key}</span>
                    <span className="param-slider-value">{value}</span>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
}
