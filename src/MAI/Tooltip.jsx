import React from 'react';

function Tooltip({ sensor, onClose }) {
  return (
    <div className="tooltip-window fixed-center">
      <button className="close-btn" onClick={onClose}>×</button> {/* ปุ่มปิดแบบวงกลม */}
      <p><strong>{sensor.name}</strong></p>
      <p>{sensor.details}</p>
    </div>
  );
}

export default Tooltip;
