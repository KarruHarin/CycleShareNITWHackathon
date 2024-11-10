import React from 'react';


export const Notification = ({ title, message, type, onClose, actions }) => (
  <div className={`notification ${type}`}>
    <div className="notification-header">
      <h3>{title}</h3>
      <button onClick={onClose} className="close-button">&times;</button>
    </div>
    <div className="notification-body">
      <p>{message}</p>
      {actions && <div className="notification-actions">{actions}</div>}
    </div>
  </div>
);
