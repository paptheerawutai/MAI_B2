import React from 'react';

function StatusCard({ status, label, onClick }) {
  return (
    <div className={`status-card ${status.toLowerCase()}`} onClick={onClick}>
      <div className={`status-label ${status.toLowerCase()}`}>{status.charAt(0)}</div>
      <div className="status-content">{label}</div>
    </div>
  );
}

export default StatusCard;
