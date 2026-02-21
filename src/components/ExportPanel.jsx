import { useState } from 'react';
import AccordionSection from './AccordionSection.jsx';
import ParamSlider from './ParamSlider.jsx';

export default function ExportPanel({ look, setLookPath, onExport }) {
  const [openSection, setOpenSection] = useState('postProcessing');
  const toggle = (key) => setOpenSection((prev) => (prev === key ? null : key));

  const pp = look.canvas.postProcessing;

  return (
    <>
      <AccordionSection
        label="Post Processing"
        icon={'\u2728'}
        isOpen={openSection === 'postProcessing'}
        onToggle={() => toggle('postProcessing')}
      >
        <ParamSlider
          label="Vignette"
          value={pp.vignetteStrength ?? 0}
          min={0}
          max={100}
          step={1}
          defaultValue={0}
          onChange={(val) => setLookPath('canvas.postProcessing.vignetteStrength', val)}
        />
        <ParamSlider
          label="Bloom"
          value={pp.bloomStrength ?? 0}
          min={0}
          max={100}
          step={1}
          defaultValue={0}
          onChange={(val) => setLookPath('canvas.postProcessing.bloomStrength', val)}
        />
      </AccordionSection>

      <AccordionSection
        label="Output"
        icon={'\u{1F4BE}'}
        isOpen={openSection === 'output'}
        onToggle={() => toggle('output')}
      >
        <ParamSlider
          label="Resolution Scale"
          value={look.canvas.exportScale ?? 1}
          min={1}
          max={4}
          step={1}
          defaultValue={1}
          onChange={(val) => setLookPath('canvas.exportScale', val)}
        />
        <div className="export-row">
          <button className="btn-ghost btn-ghost-full" onClick={onExport}>
            Export PNG
          </button>
        </div>
      </AccordionSection>
    </>
  );
}
