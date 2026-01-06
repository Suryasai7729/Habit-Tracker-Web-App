import React from 'react';

const Header = ({ currentUser, onLogout, darkMode, onToggleTheme }) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className="app-header">
      <div className="header-left">
        <h1><i className="fas fa-chart-line"></i> Ultimate Habit Tracker</h1>
        <p>Welcome back, <span id="currentUser">{currentUser.displayName}</span>! Today is <span id="currentDate">{currentDate}</span></p>
      </div>

      <div className="header-right">
        <div className="user-info">
          <div className="user-avatar">
            <i className="fas fa-user"></i>
          </div>
          <div>
            <div id="userDisplayName">{currentUser.displayName}</div>
            <div style={{fontSize: '0.8rem', opacity: '0.8'}}>Level {currentUser.level} • {currentUser.xp} XP</div>
          </div>
        </div>

        <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
          <label className="theme-toggle">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={(e) => onToggleTheme(e.target.checked)}
            />
            <span className="slider"></span>
          </label>
          <button className="btn btn-icon btn-secondary" onClick={onLogout} title="Logout">
            <i className="fas fa-sign-out-alt"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;