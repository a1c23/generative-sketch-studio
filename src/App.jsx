import { useState, useCallback, useRef } from 'react';
import ChapterNav from './components/ChapterNav.jsx';
import ComposePanel from './components/ComposePanel.jsx';
import RefinePanel from './components/RefinePanel.jsx';
import FrameExportPanel from './components/FrameExportPanel.jsx';
import SketchCanvas from './components/SketchCanvas.jsx';
import { exportCanvas } from './lib/exportUtils.js';
import './App.css';

function generateSeed() {
  return Math.floor(Math.random() * 999999).toString().padStart(6, '0');
}

const defaultCompose = {
  shapeScale: 1,
  shapeCount: 1,
  rotationX: 0,
  rotationY: 0,
  wireframe: false,
  particlesOn: false,
  connectorsOn: false,
  fracturesOn: false,
  gridOn: false,
};

const defaultRefine = {
  texture: 'none',
  baseColor: '#8888CC',
  shininess: 40,
  ambientIntensity: 80,
  keyLightColor: '#FFFFFF',
  fillLightColor: '#8888CC',
  lightRig: 'default',
};

const defaultFrame = {
  cameraAngle: 0,
  cameraDistance: 500,
  exportWidth: 2048,
  exportHeight: 2048,
};

export default function App() {
  const [chapter, setChapter] = useState('compose');
  const [category, setCategory] = useState('flow');
  const [seed, setSeed] = useState(generateSeed);
  const [composeParams, setComposeParams] = useState(defaultCompose);
  const [refineParams, setRefineParams] = useState(defaultRefine);
  const [frameParams, setFrameParams] = useState(defaultFrame);
  const [canvasEl, setCanvasEl] = useState(null);

  // Mutable ref so draw loop reads latest params without re-creating p5
  const paramsRef = useRef({ composeParams, refineParams, frameParams });
  paramsRef.current = { composeParams, refineParams, frameParams };

  const handleComposeChange = useCallback((key, val) => {
    setComposeParams((prev) => ({ ...prev, [key]: val }));
  }, []);

  const handleRefineChange = useCallback((key, val) => {
    setRefineParams((prev) => ({ ...prev, [key]: val }));
  }, []);

  const handleFrameChange = useCallback((key, val) => {
    setFrameParams((prev) => ({ ...prev, [key]: val }));
  }, []);

  const handleRefreshSeed = useCallback(() => {
    setSeed(generateSeed());
  }, []);

  const handleExport = useCallback(() => {
    exportCanvas(canvasEl);
  }, [canvasEl]);

  return (
    <div className="app">
      <ChapterNav active={chapter} onChange={setChapter} />

      <div className="app-body">
        <aside className="sidebar">
          {chapter === 'compose' && (
            <ComposePanel
              category={category}
              onCategoryChange={setCategory}
              seed={seed}
              onSeedChange={setSeed}
              onRefreshSeed={handleRefreshSeed}
              composeParams={composeParams}
              onComposeChange={handleComposeChange}
            />
          )}

          {chapter === 'refine' && (
            <RefinePanel
              refineParams={refineParams}
              onRefineChange={handleRefineChange}
            />
          )}

          {chapter === 'frameExport' && (
            <FrameExportPanel
              frameParams={frameParams}
              onFrameChange={handleFrameChange}
              onExport={handleExport}
            />
          )}
        </aside>

        <main className="canvas-area">
          <div className="canvas-border">
            <SketchCanvas
              category={category}
              seed={seed}
              paramsRef={paramsRef}
              onCanvasReady={setCanvasEl}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
