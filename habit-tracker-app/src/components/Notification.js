import React from 'react';

const Notification = ({ message, type }) => {
  const getIcon = () => {
    switch (type) {
      case 'success': return 'fas fa-check-circle';
      case 'error': return 'fas fa-exclamation-circle';
      case 'warning': return 'fas fa-exclamation-triangle';
      default: return 'fas fa-info-circle';
    }
  };

  return (
    <div className={`notification notification-${type}`}>
      <i className={getIcon()}></i>
      <span>{message}</span>
    </div>
  );
};

export default Notification;