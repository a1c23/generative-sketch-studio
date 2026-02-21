import NounEditor from './NounEditor.jsx';

export default function NounList({
  nouns,
  onUpdateNoun,
  onRemoveNoun,
  onAddNoun,
}) {
  return (
    <div className="noun-list">
      {nouns.map((noun, idx) => (
        <NounEditor
          key={noun.id}
          noun={noun}
          nounIndex={idx}
          onUpdate={onUpdateNoun}
          onRemove={onRemoveNoun}
          canRemove={nouns.length > 1}
        />
      ))}
      {nouns.length < 2 && (
        <button className="btn-ghost btn-ghost-full" onClick={onAddNoun}>
          + Add Noun
        </button>
      )}
    </div>
  );
}
