import React, { useState } from 'react';

const Settings = ({ settings, setSettings, currentUser, habits, activities, showNotification }) => {
  const [exportFormat, setExportFormat] = useState('json');

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const exportData = (format) => {
    const data = {
      user: currentUser,
      habits,
      activities,
      settings,
      exportDate: new Date().toISOString()
    };

    let content;
    let filename;
    let mimeType;

    if (format === 'json') {
      content = JSON.stringify(data, null, 2);
      filename = `habit-tracker-data-${currentUser.username}.json`;
      mimeType = 'application/json';
    } else if (format === 'csv') {
      // Convert habits to CSV
      const headers = ['Name', 'Category', 'Priority', 'Difficulty', 'Streak', 'XP Value', 'Created Date'];
      const csvContent = [
        headers.join(','),
        ...habits.map(habit => [
          `"${habit.name}"`,
          habit.category,
          habit.priority,
          habit.difficulty,
          habit.streak || 0,
          habit.xpValue || 10,
          habit.createdAt
        ].join(','))
      ].join('\n');

      content = csvContent;
      filename = `habit-tracker-habits-${currentUser.username}.csv`;
      mimeType = 'text/csv';
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showNotification(`Data exported as ${format.toUpperCase()}`, 'success');
  };

  const printData = () => {
    const printWindow = window.open('', '_blank');
    const content = `
      <html>
        <head>
          <title>Habit Tracker Data - ${currentUser.displayName}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #4361ee; }
            h2 { color: #3a0ca3; margin-top: 30px; }
            .habit { margin: 10px 0; padding: 10px; border: 1px solid #ddd; }
            .stat { display: flex; justify-content: space-between; margin: 5px 0; }
          </style>
        </head>
        <body>
          <h1>Habit Tracker Report</h1>
          <p><strong>User:</strong> ${currentUser.displayName}</p>
          <p><strong>Level:</strong> ${currentUser.level}</p>
          <p><strong>XP:</strong> ${currentUser.xp}</p>
          <p><strong>Generated:</strong> ${new Date().toLocaleString()}</p>

          <h2>Habits (${habits.length})</h2>
          ${habits.map(habit => `
            <div class="habit">
              <h3>${habit.name}</h3>
              <div class="stat"><span>Category:</span> <span>${habit.category}</span></div>
              <div class="stat"><span>Priority:</span> <span>${habit.priority}</span></div>
              <div class="stat"><span>Difficulty:</span> <span>${habit.difficulty}</span></div>
              <div class="stat"><span>Current Streak:</span> <span>${habit.streak || 0} days</span></div>
              <div class="stat"><span>XP Value:</span> <span>${habit.xpValue || 10}</span></div>
            </div>
          `).join('')}

          <h2>Recent Activity</h2>
          <ul>
            ${activities.slice(0, 10).map(activity => `
              <li>${new Date(activity.timestamp).toLocaleString()}: ${activity.message}</li>
            `).join('')}
          </ul>
        </body>
      </html>
    `;

    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.print();
  };

  const clearData = () => {
    if (window.confirm('Are you sure you want to clear all your data? This action cannot be undone.')) {
      // Clear localStorage
      localStorage.removeItem(`habit_tracker_${currentUser.username}`);
      localStorage.removeItem('currentUser');

      showNotification('All data cleared. Please refresh the page.', 'warning');

      // In a real app, you'd reload or reset state
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  return (
    <div className="settings-page">
      <div className="panel">
        <div className="panel-header">
          <h2 className="panel-title"><i className="fas fa-cog"></i> Settings</h2>
        </div>

        {/* Appearance Settings */}
        <div className="settings-section">
          <h3>Appearance</h3>
          <div className="setting-item">
            <label className="theme-toggle">
              <input
                type="checkbox"
                checked={settings.darkMode || false}
                onChange={(e) => handleSettingChange('darkMode', e.target.checked)}
              />
              <span className="slider"></span>
            </label>
            <div className="setting-info">
              <div className="setting-label">Dark Mode</div>
              <div className="setting-description">Toggle between light and dark themes</div>
            </div>
          </div>
        </div>

        {/* Notifications Settings */}
        <div className="settings-section">
          <h3>Notifications</h3>
          <div className="setting-item">
            <label className="theme-toggle">
              <input
                type="checkbox"
                checked={settings.notifications || false}
                onChange={(e) => handleSettingChange('notifications', e.target.checked)}
              />
              <span className="slider"></span>
            </label>
            <div className="setting-info">
              <div className="setting-label">Habit Reminders</div>
              <div className="setting-description">Get notified about your daily habits</div>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="settings-section">
          <h3>Data Management</h3>

          <div className="data-actions">
            <div className="action-group">
              <label htmlFor="exportFormat">Export Format:</label>
              <select
                id="exportFormat"
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value)}
              >
                <option value="json">JSON</option>
                <option value="csv">CSV</option>
              </select>
            </div>

            <button className="btn btn-secondary" onClick={() => exportData(exportFormat)}>
              <i className="fas fa-download"></i> Export Data
            </button>

            <button className="btn btn-secondary" onClick={printData}>
              <i className="fas fa-print"></i> Print Report
            </button>

            <button className="btn btn-danger" onClick={clearData}>
              <i className="fas fa-trash"></i> Clear All Data
            </button>
          </div>
        </div>

        {/* Account Information */}
        <div className="settings-section">
          <h3>Account Information</h3>
          <div className="account-info">
            <div className="info-item">
              <span className="info-label">Username:</span>
              <span className="info-value">{currentUser.username}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Display Name:</span>
              <span className="info-value">{currentUser.displayName}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Level:</span>
              <span className="info-value">{currentUser.level}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Total XP:</span>
              <span className="info-value">{currentUser.xp}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Member Since:</span>
              <span className="info-value">January 2024</span>
            </div>
          </div>
        </div>

        {/* App Information */}
        <div className="settings-section">
          <h3>About</h3>
          <div className="app-info">
            <p><strong>Ultimate Habit Tracker</strong></p>
            <p>Version 1.0.0</p>
            <p>Built with React</p>
            <p>Your data is stored locally in your browser.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;