const chapters = [
  { key: 'compose', label: 'Build' },
  { key: 'refine', label: 'Refine' },
  { key: 'frameExport', label: 'Export' },
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
