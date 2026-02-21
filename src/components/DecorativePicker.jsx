export default function DecorativePicker({ registryList, onAdd }) {
  return (
    <div className="decorative-picker-grid">
      {registryList.map((entry) => (
        <button
          key={entry.name}
          className="decorative-picker-card"
          onClick={() => onAdd(entry)}
        >
          {entry.label}
        </button>
      ))}
    </div>
  );
}
