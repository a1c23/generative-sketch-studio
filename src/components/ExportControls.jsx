import { useState } from 'react';
import { exportCanvas } from '../lib/exportUtils.js';
import './ExportControls.css';

const RESOLUTIONS = [
  { label: '1x (1080p)', scale: 1 },
  { label: '2x (2160p)', scale: 2 },
  { label: '4x (4320p)', scale: 4 },
];

export default function ExportControls({ canvasRef }) {
  const [resolution, setResolution] = useState(1);

  const handleExport = () => {
    if (!canvasRef) return;
    exportCanvas(canvasRef, resolution);
  };

  return (
    <div className="export-controls">
      <label className="export-label">Export</label>
      <div className="export-row">
        <select
          className="export-select"
          value={resolution}
          onChange={(e) => setResolution(Number(e.target.value))}
        >
          {RESOLUTIONS.map((r) => (
            <option key={r.scale} value={r.scale}>
              {r.label}
            </option>
          ))}
        </select>
        <button className="btn btn-accent" onClick={handleExport}>
          Export PNG
        </button>
      </div>
    </div>
  );
}
