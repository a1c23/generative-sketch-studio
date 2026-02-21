import categories from '../categories/categoryRegistry.js';

const entries = Object.values(categories);

export default function CategoryPicker({ active, onChange }) {
  return (
    <div className="category-grid">
      {entries.map((cat) => (
        <button
          key={cat.key}
          className={`category-card${active === cat.key ? ' active' : ''}`}
          onClick={() => onChange(cat.key)}
          title={cat.description}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
