import { useRef, useEffect } from 'react';
import { createSketch } from '../lib/sketchOrchestrator.js';

export default function SketchCanvas({ seed, lookRef, onCanvasReady }) {
  const containerRef = useRef(null);
  const sketchRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Destroy previous instance
    if (sketchRef.current) {
      sketchRef.current.destroy();
      sketchRef.current = null;
    }

    // Create new sketch — getLook reads from lookRef each frame
    const sketch = createSketch(() => lookRef.current, container);
    sketchRef.current = sketch;

    // Expose canvas element for export
    setTimeout(() => {
      const canvas = container.querySelector('canvas');
      if (canvas && onCanvasReady) onCanvasReady(canvas);
    }, 100);

    return () => {
      if (sketchRef.current) {
        sketchRef.current.destroy();
        sketchRef.current = null;
      }
    };
  }, [seed]); // Only recreate p5 on seed change

  return <div ref={containerRef} className="sketch-container" />;
}
