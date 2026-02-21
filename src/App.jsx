import { useState, useCallback, useRef } from 'react';
import ChapterNav from './components/ChapterNav.jsx';
import ComposePanel from './components/ComposePanel.jsx';
import LookPanel from './components/LookPanel.jsx';
import ScenePanel from './components/ScenePanel.jsx';
import ExportPanel from './components/ExportPanel.jsx';
import SketchCanvas from './components/SketchCanvas.jsx';
import { exportCanvas } from './lib/exportUtils.js';
import { DEFAULT_LOOK } from './lib/lookSchema.js';
import { setIn, generateSeed, createNoun, createDecorativeInstance } from './lib/lookUtils.js';
import { registryList } from './decoratives/registry.js';
import presets from './looks/presets.js';
import './App.css';

export default function App() {
  const [chapter, setChapter] = useState('compose');
  const [look, setLook] = useState(() => ({
    ...DEFAULT_LOOK,
    seed: generateSeed(),
  }));
  const [canvasEl, setCanvasEl] = useState(null);

  // Mutable ref so draw loop reads latest look without re-creating p5
  const lookRef = useRef(look);
  lookRef.current = look;

  // Path-based updater: setLookPath('canvas.camera.tilt', -20)
  const setLookPath = useCallback((path, value) => {
    setLook((prev) => setIn(prev, path, value));
  }, []);

  // --- Seed ---
  const handleRefreshSeed = useCallback(() => {
    setLook((prev) => ({ ...prev, seed: generateSeed() }));
  }, []);

  const handleSeedChange = useCallback((newSeed) => {
    setLook((prev) => ({ ...prev, seed: newSeed }));
  }, []);

  // --- Look Presets ---
  const handleApplyPreset = useCallback((presetKey) => {
    const preset = presets.find((p) => p.key === presetKey);
    if (!preset) return;
    setLook((prev) => ({
      ...prev,
      canvas: {
        ...prev.canvas,
        background: { ...prev.canvas.background, ...preset.canvas.background },
        lighting: { ...prev.canvas.lighting, ...preset.canvas.lighting },
        material: {
          ...prev.canvas.material,
          ...(preset.canvas.material || {}),
        },
        stroke: {
          ...prev.canvas.stroke,
          ...(preset.canvas.stroke || {}),
        },
        blendMode: preset.canvas.blendMode ?? prev.canvas.blendMode,
        camera: {
          ...prev.canvas.camera,
          ...(preset.canvas.camera || {}),
        },
      },
      palette: { ...prev.palette, ...preset.palette },
    }));
  }, []);

  // --- Nouns ---
  const handleAddNoun = useCallback(() => {
    setLook((prev) => {
      if (prev.nouns.length >= 2) return prev;
      return { ...prev, nouns: [...prev.nouns, createNoun()] };
    });
  }, []);

  const handleRemoveNoun = useCallback((nounId) => {
    setLook((prev) => ({
      ...prev,
      nouns: prev.nouns.filter((n) => n.id !== nounId),
    }));
  }, []);

  const handleUpdateNoun = useCallback((nounIndex, path, value) => {
    setLookPath(`nouns.${nounIndex}.${path}`, value);
  }, [setLookPath]);

  // --- Decoratives ---
  const handleAddDecorative = useCallback((registryEntry) => {
    setLook((prev) => ({
      ...prev,
      decoratives: [...prev.decoratives, createDecorativeInstance(registryEntry)],
    }));
  }, []);

  const handleRemoveDecorative = useCallback((decId) => {
    setLook((prev) => ({
      ...prev,
      decoratives: prev.decoratives.filter((d) => d.id !== decId),
    }));
  }, []);

  const handleUpdateDecorative = useCallback((decIndex, paramKey, value) => {
    setLookPath(`decoratives.${decIndex}.params.${paramKey}`, value);
  }, [setLookPath]);

  // --- Export ---
  const handleExport = useCallback(() => {
    const scale = look.canvas.exportScale ?? 1;
    exportCanvas(canvasEl, scale);
  }, [canvasEl, look.canvas.exportScale]);

  return (
    <div className="app">
      {/* Canvas fills viewport */}
      <SketchCanvas
        seed={look.seed}
        lookRef={lookRef}
        onCanvasReady={setCanvasEl}
      />

      {/* Pill nav overlay */}
      <ChapterNav active={chapter} onChange={setChapter} />

      {/* Floating panel overlay */}
      <div className="floating-panel">
        {chapter === 'compose' && (
          <ComposePanel
            look={look}
            setLookPath={setLookPath}
            onSeedChange={handleSeedChange}
            onRefreshSeed={handleRefreshSeed}
            onApplyPreset={handleApplyPreset}
            onAddNoun={handleAddNoun}
            onRemoveNoun={handleRemoveNoun}
            onUpdateNoun={handleUpdateNoun}
            onAddDecorative={handleAddDecorative}
            onRemoveDecorative={handleRemoveDecorative}
            onUpdateDecorative={handleUpdateDecorative}
            registryList={registryList}
            presets={presets}
          />
        )}

        {chapter === 'look' && (
          <LookPanel
            look={look}
            setLookPath={setLookPath}
          />
        )}

        {chapter === 'scene' && (
          <ScenePanel
            look={look}
            setLookPath={setLookPath}
          />
        )}

        {chapter === 'export' && (
          <ExportPanel
            look={look}
            setLookPath={setLookPath}
            onExport={handleExport}
          />
        )}
      </div>
    </div>
  );
}
