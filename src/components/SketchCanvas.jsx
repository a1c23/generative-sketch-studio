import { useRef, useEffect } from 'react';
import p5 from 'p5';
import { sketches } from '../sketches/sketchRegistry.js';
import './SketchCanvas.css';

export default function SketchCanvas({ sketchKey, seed, params, onCanvasReady }) {
  const containerRef = useRef(null);
  const p5Ref = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Tear down previous instance
    if (p5Ref.current) {
      p5Ref.current.remove();
      p5Ref.current = null;
    }

    const sketchConfig = sketches[sketchKey];
    if (!sketchConfig || !sketchConfig.sketch) return;

    const instance = new p5((p) => {
      sketchConfig.sketch(p, { seed, params });
    }, container);

    p5Ref.current = instance;

    // Expose canvas element for export
    const canvas = container.querySelector('canvas');
    if (canvas && onCanvasReady) {
      onCanvasReady(canvas);
    }

    return () => {
      if (p5Ref.current) {
        p5Ref.current.remove();
        p5Ref.current = null;
      }
    };
  }, [sketchKey, seed, params, onCanvasReady]);

  return <div ref={containerRef} className="sketch-container" />;
}
