import ParamColorSwatch from './ParamColorSwatch.jsx';

const paletteKeys = [
  { key: 'noun0', label: 'Noun 1' },
  { key: 'noun1', label: 'Noun 2' },
  { key: 'decorative0', label: 'Decorative 1' },
  { key: 'decorative1', label: 'Decorative 2' },
  { key: 'accent', label: 'Accent' },
];

export default function PaletteEditor({ palette, setLookPath }) {
  return (
    <div className="palette-editor">
      {paletteKeys.map(({ key, label }) => (
        <ParamColorSwatch
          key={key}
          label={label}
          value={palette[key] ?? '#888888'}
          onChange={(val) => setLookPath(`palette.${key}`, val)}
        />
      ))}
    </div>
  );
}
