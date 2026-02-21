import CategoryPicker from './CategoryPicker.jsx';
import ParamSlider from './ParamSlider.jsx';

export default function NounEditor({ noun, nounIndex, onUpdate, onRemove, canRemove }) {
  const categoryKey = noun.source?.categoryKey ?? 'flow';

  return (
    <div className="noun-card">
      <div className="noun-card-header">
        <span className="noun-card-title">Noun {nounIndex + 1}</span>
        {canRemove && (
          <button
            className="btn-ghost noun-remove-btn"
            onClick={() => onRemove(noun.id)}
          >
            Remove
          </button>
        )}
      </div>

      <CategoryPicker
        active={categoryKey}
        onChange={(key) => onUpdate(nounIndex, 'source.categoryKey', key)}
      />

      <ParamSlider
        label="Scale"
        value={noun.scale ?? 1}
        min={0.2}
        max={3}
        step={0.05}
        onChange={(val) => onUpdate(nounIndex, 'scale', val)}
      />

      <ParamSlider
        label="Rotate X"
        value={noun.rotation?.x ?? 0}
        min={0}
        max={6.28}
        step={0.01}
        onChange={(val) => onUpdate(nounIndex, 'rotation.x', val)}
      />

      <ParamSlider
        label="Rotate Y"
        value={noun.rotation?.y ?? 0}
        min={0}
        max={6.28}
        step={0.01}
        onChange={(val) => onUpdate(nounIndex, 'rotation.y', val)}
      />

      <ParamSlider
        label="Position X"
        value={noun.position?.x ?? 0}
        min={-200}
        max={200}
        step={5}
        onChange={(val) => onUpdate(nounIndex, 'position.x', val)}
      />

      <ParamSlider
        label="Position Y"
        value={noun.position?.y ?? 0}
        min={-200}
        max={200}
        step={5}
        onChange={(val) => onUpdate(nounIndex, 'position.y', val)}
      />
    </div>
  );
}
