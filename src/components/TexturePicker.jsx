import textures from '../lib/textureRegistry.js';

export default function TexturePicker({ active, onChange }) {
  return (
    <div className="texture-grid">
      {textures.map((t) => (
        <button
          key={t.key}
          className={`texture-card${active === t.key ? ' active' : ''}`}
          onClick={() => onChange(t.key)}
          title={t.name}
        >
          {t.path ? (
            <img src={t.path} alt={t.name} className="texture-thumb" />
          ) : (
            <span className="texture-none" />
          )}
          <span className="texture-name">{t.name}</span>
        </button>
      ))}
    </div>
  );
}
