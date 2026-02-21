import { useState } from 'react';
import AccordionSection from './AccordionSection.jsx';
import ParamSlider from './ParamSlider.jsx';
import ParamToggle from './ParamToggle.jsx';

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
        {/* --- Grain --- */}
        <ParamToggle
          label="Grain"
          value={pp.grain?.enabled ?? false}
          onChange={(val) => setLookPath('canvas.postProcessing.grain.enabled', val)}
        />
        {pp.grain?.enabled && (
          <>
            <ParamSlider
              label="Intensity"
              value={pp.grain?.intensity ?? 0.08}
              min={0}
              max={0.3}
              step={0.01}
              defaultValue={0.08}
              onChange={(val) => setLookPath('canvas.postProcessing.grain.intensity', val)}
            />
            <ParamSlider
              label="Speed"
              value={pp.grain?.speed ?? 1.0}
              min={0.5}
              max={3}
              step={0.1}
              defaultValue={1.0}
              onChange={(val) => setLookPath('canvas.postProcessing.grain.speed', val)}
            />
          </>
        )}

        {/* --- Bloom --- */}
        <ParamToggle
          label="Bloom"
          value={pp.bloom?.enabled ?? false}
          onChange={(val) => setLookPath('canvas.postProcessing.bloom.enabled', val)}
        />
        {pp.bloom?.enabled && (
          <>
            <ParamSlider
              label="Threshold"
              value={pp.bloom?.threshold ?? 0.6}
              min={0}
              max={1}
              step={0.05}
              defaultValue={0.6}
              onChange={(val) => setLookPath('canvas.postProcessing.bloom.threshold', val)}
            />
            <ParamSlider
              label="Strength"
              value={pp.bloom?.strength ?? 1.5}
              min={0}
              max={3}
              step={0.1}
              defaultValue={1.5}
              onChange={(val) => setLookPath('canvas.postProcessing.bloom.strength', val)}
            />
            <ParamSlider
              label="Blur Amount"
              value={pp.bloom?.blurAmount ?? 15}
              min={1}
              max={30}
              step={1}
              defaultValue={15}
              onChange={(val) => setLookPath('canvas.postProcessing.bloom.blurAmount', val)}
            />
          </>
        )}

        {/* --- Vignette --- */}
        <ParamToggle
          label="Vignette"
          value={pp.vignette?.enabled ?? false}
          onChange={(val) => setLookPath('canvas.postProcessing.vignette.enabled', val)}
        />
        {pp.vignette?.enabled && (
          <>
            <ParamSlider
              label="Strength"
              value={pp.vignette?.strength ?? 0.3}
              min={0}
              max={1}
              step={0.05}
              defaultValue={0.3}
              onChange={(val) => setLookPath('canvas.postProcessing.vignette.strength', val)}
            />
            <ParamSlider
              label="Radius"
              value={pp.vignette?.radius ?? 0.8}
              min={0.3}
              max={1}
              step={0.05}
              defaultValue={0.8}
              onChange={(val) => setLookPath('canvas.postProcessing.vignette.radius', val)}
            />
          </>
        )}

        {/* --- Chromatic Aberration --- */}
        <ParamToggle
          label="Chromatic Aberration"
          value={pp.chromaticAberration?.enabled ?? false}
          onChange={(val) => setLookPath('canvas.postProcessing.chromaticAberration.enabled', val)}
        />
        {pp.chromaticAberration?.enabled && (
          <ParamSlider
            label="Offset"
            value={pp.chromaticAberration?.offset ?? 0.003}
            min={0}
            max={0.01}
            step={0.001}
            defaultValue={0.003}
            onChange={(val) => setLookPath('canvas.postProcessing.chromaticAberration.offset', val)}
          />
        )}
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
