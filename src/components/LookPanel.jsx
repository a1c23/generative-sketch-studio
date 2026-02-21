import { useState } from 'react';
import AccordionSection from './AccordionSection.jsx';
import ParamSelect from './ParamSelect.jsx';
import ParamSlider from './ParamSlider.jsx';
import ParamColorSwatch from './ParamColorSwatch.jsx';
import ParamToggle from './ParamToggle.jsx';
import PaletteEditor from './PaletteEditor.jsx';
import TexturePicker from './TexturePicker.jsx';

const BG_TYPE_OPTIONS = [
  { value: 'solid', label: 'Solid' },
  { value: 'gradient', label: 'Gradient' },
];

const MATERIAL_MODE_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'specular', label: 'Specular' },
  { value: 'emissive', label: 'Emissive' },
  { value: 'normal', label: 'Normal' },
];

const BLEND_MODE_OPTIONS = [
  { value: 'BLEND', label: 'Normal' },
  { value: 'ADD', label: 'Add' },
  { value: 'MULTIPLY', label: 'Multiply' },
  { value: 'SCREEN', label: 'Screen' },
  { value: 'LIGHTEST', label: 'Lightest' },
  { value: 'DARKEST', label: 'Darkest' },
];

export default function LookPanel({ look, setLookPath }) {
  const [openSection, setOpenSection] = useState('background');
  const toggle = (key) => setOpenSection((prev) => (prev === key ? null : key));

  const bg = look.canvas.background;
  const material = look.canvas.material;
  const stroke = look.canvas.stroke ?? { enabled: false, weight: 1, color: '#000000' };

  return (
    <>
      <AccordionSection
        label="Background"
        icon={'\u{1F308}'}
        isOpen={openSection === 'background'}
        onToggle={() => toggle('background')}
      >
        <ParamSelect
          label="Type"
          value={bg.type}
          options={BG_TYPE_OPTIONS}
          onChange={(val) => setLookPath('canvas.background.type', val)}
        />
        <ParamColorSwatch
          label="Color A"
          value={bg.colorA ?? '#F5F3F0'}
          onChange={(val) => setLookPath('canvas.background.colorA', val)}
        />
        {bg.type === 'gradient' && (
          <ParamColorSwatch
            label="Color B"
            value={bg.colorB ?? '#EDEAE6'}
            onChange={(val) => setLookPath('canvas.background.colorB', val)}
          />
        )}
      </AccordionSection>

      <AccordionSection
        label="Palette"
        icon={'\u{1F3A8}'}
        isOpen={openSection === 'palette'}
        onToggle={() => toggle('palette')}
      >
        <PaletteEditor palette={look.palette} setLookPath={setLookPath} />
      </AccordionSection>

      <AccordionSection
        label="Material"
        icon={'\u{1F48E}'}
        isOpen={openSection === 'material'}
        onToggle={() => toggle('material')}
      >
        <ParamSelect
          label="Mode"
          value={material.mode ?? 'default'}
          options={MATERIAL_MODE_OPTIONS}
          onChange={(val) => setLookPath('canvas.material.mode', val)}
        />
        <ParamColorSwatch
          label="Base Color"
          value={material.baseColor ?? '#8888CC'}
          onChange={(val) => setLookPath('canvas.material.baseColor', val)}
        />
        <ParamSlider
          label="Shininess"
          value={material.shininess ?? 40}
          min={1}
          max={200}
          step={1}
          defaultValue={40}
          onChange={(val) => setLookPath('canvas.material.shininess', val)}
        />
        {material.mode === 'emissive' && (
          <ParamColorSwatch
            label="Emissive Color"
            value={material.emissiveColor ?? '#FF4444'}
            onChange={(val) => setLookPath('canvas.material.emissiveColor', val)}
          />
        )}
        <TexturePicker
          active={material.texture}
          onChange={(val) => setLookPath('canvas.material.texture', val)}
        />
      </AccordionSection>

      <AccordionSection
        label="Stroke"
        icon={'\u270F'}
        isOpen={openSection === 'stroke'}
        onToggle={() => toggle('stroke')}
      >
        <ParamToggle
          label="Enabled"
          value={stroke.enabled}
          onChange={(val) => setLookPath('canvas.stroke.enabled', val)}
        />
        {stroke.enabled && (
          <>
            <ParamSlider
              label="Weight"
              value={stroke.weight}
              min={0.5}
              max={4}
              step={0.5}
              defaultValue={1}
              onChange={(val) => setLookPath('canvas.stroke.weight', val)}
            />
            <ParamColorSwatch
              label="Color"
              value={stroke.color}
              onChange={(val) => setLookPath('canvas.stroke.color', val)}
            />
          </>
        )}
      </AccordionSection>

      <AccordionSection
        label="Blend Mode"
        icon={'\u2B24'}
        isOpen={openSection === 'blend'}
        onToggle={() => toggle('blend')}
      >
        <ParamSelect
          value={look.canvas.blendMode ?? 'BLEND'}
          options={BLEND_MODE_OPTIONS}
          onChange={(val) => setLookPath('canvas.blendMode', val)}
        />
      </AccordionSection>

      <AccordionSection
        label="Opacity"
        icon={'\u25D1'}
        isOpen={openSection === 'opacity'}
        onToggle={() => toggle('opacity')}
      >
        <ParamSlider
          label="Global Opacity"
          value={look.canvas.opacity ?? 255}
          min={10}
          max={255}
          step={1}
          defaultValue={255}
          onChange={(val) => setLookPath('canvas.opacity', val)}
        />
      </AccordionSection>
    </>
  );
}
