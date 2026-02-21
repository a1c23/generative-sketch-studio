import { useState } from 'react';
import AccordionSection from './AccordionSection.jsx';
import ParamSelect from './ParamSelect.jsx';
import ParamSlider from './ParamSlider.jsx';
import ParamColorSwatch from './ParamColorSwatch.jsx';
import ParamToggle from './ParamToggle.jsx';

const PROJECTION_OPTIONS = [
  { value: 'perspective', label: 'Perspective' },
  { value: 'ortho', label: 'Ortho' },
];

export default function ScenePanel({ look, setLookPath }) {
  const [openSection, setOpenSection] = useState('lighting');
  const toggle = (key) => setOpenSection((prev) => (prev === key ? null : key));

  const lighting = look.canvas.lighting;
  const camera = look.canvas.camera;

  return (
    <>
      <AccordionSection
        label="Lighting"
        icon={'\u2600'}
        isOpen={openSection === 'lighting'}
        onToggle={() => toggle('lighting')}
      >
        <ParamSlider
          label="Ambient Intensity"
          value={lighting.ambientIntensity ?? 80}
          min={0}
          max={255}
          step={1}
          defaultValue={80}
          onChange={(val) => setLookPath('canvas.lighting.ambientIntensity', val)}
        />
        <ParamColorSwatch
          label="Ambient Color"
          value={lighting.ambientColor ?? '#FFFFFF'}
          onChange={(val) => setLookPath('canvas.lighting.ambientColor', val)}
        />

        <ParamColorSwatch
          label="Key Light"
          value={lighting.keyLightColor ?? '#FFFFFF'}
          onChange={(val) => setLookPath('canvas.lighting.keyLightColor', val)}
        />
        <ParamSlider
          label="Key X"
          value={lighting.keyLightPos?.[0] ?? 200}
          min={-500}
          max={500}
          step={10}
          defaultValue={200}
          onChange={(val) => setLookPath('canvas.lighting.keyLightPos.0', val)}
        />
        <ParamSlider
          label="Key Y"
          value={lighting.keyLightPos?.[1] ?? -200}
          min={-500}
          max={500}
          step={10}
          defaultValue={-200}
          onChange={(val) => setLookPath('canvas.lighting.keyLightPos.1', val)}
        />
        <ParamSlider
          label="Key Z"
          value={lighting.keyLightPos?.[2] ?? 300}
          min={-500}
          max={500}
          step={10}
          defaultValue={300}
          onChange={(val) => setLookPath('canvas.lighting.keyLightPos.2', val)}
        />

        <ParamColorSwatch
          label="Fill Light"
          value={lighting.fillLightColor ?? '#8888CC'}
          onChange={(val) => setLookPath('canvas.lighting.fillLightColor', val)}
        />
        <ParamSlider
          label="Fill X"
          value={lighting.fillLightPos?.[0] ?? -200}
          min={-500}
          max={500}
          step={10}
          defaultValue={-200}
          onChange={(val) => setLookPath('canvas.lighting.fillLightPos.0', val)}
        />
        <ParamSlider
          label="Fill Y"
          value={lighting.fillLightPos?.[1] ?? 200}
          min={-500}
          max={500}
          step={10}
          defaultValue={200}
          onChange={(val) => setLookPath('canvas.lighting.fillLightPos.1', val)}
        />
        <ParamSlider
          label="Fill Z"
          value={lighting.fillLightPos?.[2] ?? -200}
          min={-500}
          max={500}
          step={10}
          defaultValue={-200}
          onChange={(val) => setLookPath('canvas.lighting.fillLightPos.2', val)}
        />
      </AccordionSection>

      <AccordionSection
        label="Camera"
        icon={'\u{1F3A5}'}
        isOpen={openSection === 'camera'}
        onToggle={() => toggle('camera')}
      >
        <ParamSlider
          label="Focal Length"
          value={camera.focalLength ?? 50}
          min={20}
          max={120}
          step={1}
          defaultValue={50}
          onChange={(val) => setLookPath('canvas.camera.focalLength', val)}
        />
        <ParamSlider
          label="Tilt"
          value={camera.tilt ?? -15}
          min={-90}
          max={90}
          step={1}
          defaultValue={-15}
          onChange={(val) => setLookPath('canvas.camera.tilt', val)}
        />
        <ParamSlider
          label="Pan"
          value={camera.pan ?? 0}
          min={-180}
          max={180}
          step={1}
          defaultValue={0}
          onChange={(val) => setLookPath('canvas.camera.pan', val)}
        />
        <ParamSlider
          label="Distance"
          value={camera.distance ?? 600}
          min={200}
          max={1200}
          step={10}
          defaultValue={600}
          onChange={(val) => setLookPath('canvas.camera.distance', val)}
        />
        <ParamToggle
          label="Auto Rotate"
          value={camera.autoRotate ?? false}
          onChange={(val) => setLookPath('canvas.camera.autoRotate', val)}
        />
        {camera.autoRotate && (
          <ParamSlider
            label="Rotate Speed"
            value={camera.rotateSpeed ?? 0.5}
            min={0.1}
            max={3}
            step={0.1}
            defaultValue={0.5}
            onChange={(val) => setLookPath('canvas.camera.rotateSpeed', val)}
          />
        )}
        <ParamSelect
          label="Projection"
          value={camera.projection ?? 'perspective'}
          options={PROJECTION_OPTIONS}
          onChange={(val) => setLookPath('canvas.camera.projection', val)}
        />
      </AccordionSection>
    </>
  );
}
