import { useState } from 'react';

export default function AccordionSection({
  label,
  icon,
  isOpen,
  onToggle,
  defaultOpen = false,
  children,
}) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const controlled = isOpen !== undefined && onToggle !== undefined;
  const open = controlled ? isOpen : internalOpen;

  const handleToggle = () => {
    if (controlled) {
      onToggle();
    } else {
      setInternalOpen((prev) => !prev);
    }
  };

  return (
    <div className={`accordion-section${open ? ' open' : ''}`}>
      <button className="accordion-header" onClick={handleToggle}>
        {icon && <i className="accordion-icon">{icon}</i>}
        <span>{label}</span>
        <span className="accordion-chevron">{'\u25B6'}</span>
      </button>
      {open && <div className="accordion-body">{children}</div>}
    </div>
  );
}
