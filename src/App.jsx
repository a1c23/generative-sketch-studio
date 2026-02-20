import { useState, useCallback } from 'react';
import SketchCanvas from './components/SketchCanvas.jsx';
import ControlPanel from './components/ControlPanel.jsx';
import ExportControls from './components/ExportControls.jsx';
import { sketches } from './sketches/sketchRegistry.js';
import './App.css';

function generateSeed() {
  return Math.floor(Math.random() * 999999).toString().padStart(6, '0');
}

export default function App() {
  const [seed, setSeed] = useState(generateSeed);
  const [activeSketch, setActiveSketch] = useState(Object.keys(sketches)[0]);
  const [params, setParams] = useState({});
  const [canvasRef, setCanvasRef] = useState(null);

  // Refresh shapes = new seed, keep all params
  const handleRefresh = useCallback(() => {
    setSeed(generateSeed());
  }, []);

  // Reset = new seed + clear all params back to defaults
  const handleReset = useCallback(() => {
    setSeed(generateSeed());
    setParams({});
  }, []);

  const handleSeedChange = useCallback((e) => {
    setSeed(e.target.value);
  }, []);

  const handleParamChange = useCallback((key, value) => {
    setParams((prev) => ({ ...prev, [key]: value }));
  }, []);

  const sketchConfig = sketches[activeSketch];

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1 className="app-title">Sketch Studio</h1>
        </div>

        <div className="seed-section">
          <label className="seed-label">Seed</label>
          <div className="seed-row">
            <input
              className="seed-input"
              type="text"
              value={seed}
              onChange={handleSeedChange}
              spellCheck={false}
            />
          </div>
          <div className="seed-buttons">
            <button className="btn btn-accent" onClick={handleRefresh}>
              Refresh
            </button>
            <button className="btn btn-secondary" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>

        <div className="sketch-select-section">
          <label className="section-label">Sketch</label>
          <select
            className="sketch-select"
            value={activeSketch}
            onChange={(e) => {
              setActiveSketch(e.target.value);
              setParams({});
            }}
          >
            {Object.entries(sketches).map(([key, s]) => (
              <option key={key} value={key}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {sketchConfig && (
          <ControlPanel
            params={sketchConfig.params}
            values={params}
            onChange={handleParamChange}
          />
        )}

        <div className="sidebar-footer">
          <ExportControls canvasRef={canvasRef} />
        </div>
      </aside>

      <main className="canvas-area">
        <SketchCanvas
          sketchKey={activeSketch}
          seed={seed}
          params={params}
          onCanvasReady={setCanvasRef}
        />
      </main>
    </div>
  );
}
