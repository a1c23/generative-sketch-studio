const chapters = [
  { key: 'compose', label: 'Compose' },
  { key: 'look', label: 'Look' },
  { key: 'scene', label: 'Scene' },
  { key: 'export', label: 'Export' },
];

export default function ChapterNav({ active, onChange }) {
  return (
    <nav className="chapter-nav">
      {chapters.map((ch) => (
        <button
          key={ch.key}
          className={`chapter-tab${active === ch.key ? ' active' : ''}`}
          onClick={() => onChange(ch.key)}
        >
          {ch.label}
        </button>
      ))}
    </nav>
  );
}
