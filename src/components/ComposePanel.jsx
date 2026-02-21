import { useState } from 'react';
import AccordionSection from './AccordionSection.jsx';
import LookPicker from './LookPicker.jsx';
import NounList from './NounList.jsx';
import DecorativePicker from './DecorativePicker.jsx';
import DecorativeCard from './DecorativeCard.jsx';
import PaletteEditor from './PaletteEditor.jsx';

export default function ComposePanel({
  look,
  setLookPath,
  onSeedChange,
  onRefreshSeed,
  onApplyPreset,
  onAddNoun,
  onRemoveNoun,
  onUpdateNoun,
  onAddDecorative,
  onRemoveDecorative,
  onUpdateDecorative,
  registryList,
  presets,
}) {
  const [openSection, setOpenSection] = useState('presets');

  const toggle = (key) => setOpenSection((prev) => (prev === key ? null : key));

  return (
    <>
      <AccordionSection
        label="Presets"
        icon={'\u2728'}
        isOpen={openSection === 'presets'}
        onToggle={() => toggle('presets')}
      >
        <LookPicker presets={presets} onApplyPreset={onApplyPreset} />
      </AccordionSection>

      <AccordionSection
        label="Seed"
        icon={'\u{1F3B2}'}
        isOpen={openSection === 'seed'}
        onToggle={() => toggle('seed')}
      >
        <div className="seed-row">
          <input
            className="seed-input"
            type="text"
            value={look.seed}
            onChange={(e) => onSeedChange(e.target.value)}
            spellCheck={false}
          />
          <button className="btn-ghost" onClick={onRefreshSeed}>
            Refresh
          </button>
        </div>
      </AccordionSection>

      <AccordionSection
        label="Nouns"
        icon={'\u25C6'}
        isOpen={openSection === 'nouns'}
        onToggle={() => toggle('nouns')}
      >
        <NounList
          nouns={look.nouns}
          onUpdateNoun={onUpdateNoun}
          onRemoveNoun={onRemoveNoun}
          onAddNoun={onAddNoun}
        />
      </AccordionSection>

      <AccordionSection
        label="Decoratives"
        icon={'\u2726'}
        isOpen={openSection === 'decoratives'}
        onToggle={() => toggle('decoratives')}
      >
        {look.decoratives.map((dec, idx) => (
          <DecorativeCard
            key={dec.id}
            decorative={dec}
            decIndex={idx}
            onUpdate={onUpdateDecorative}
            onRemove={onRemoveDecorative}
          />
        ))}
        <DecorativePicker registryList={registryList} onAdd={onAddDecorative} />
      </AccordionSection>
    </>
  );
}
