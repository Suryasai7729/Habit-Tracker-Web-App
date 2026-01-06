import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = ({ currentTab, onTabChange }) => {
  const location = useLocation();
  const currentPath = location.pathname.slice(1) || 'dashboard';

  const navItems = [
    { id: 'dashboard', icon: 'fas fa-home', label: 'Dashboard' },
    { id: 'habits', icon: 'fas fa-tasks', label: 'My Habits' },
    { id: 'analytics', icon: 'fas fa-chart-bar', label: 'Analytics' },
    { id: 'social', icon: 'fas fa-users', label: 'Social' },
    { id: 'achievements', icon: 'fas fa-trophy', label: 'Achievements' },
    { id: 'settings', icon: 'fas fa-cog', label: 'Settings' }
  ];

  return (
    <nav className="app-nav">
      {navItems.map(item => (
        <Link
          key={item.id}
          to={`/${item.id}`}
          className={`nav-item ${currentPath === item.id ? 'active' : ''}`}
          onClick={() => onTabChange(item.id)}
        >
          <i className={item.icon}></i> {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;