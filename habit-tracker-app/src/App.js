import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Habits from './components/Habits';
import Analytics from './components/Analytics';
import Social from './components/Social';
import Achievements from './components/Achievements';
import Settings from './components/Settings';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Notification from './components/Notification';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [habits, setHabits] = useState([]);
  const [activities, setActivities] = useState([]);
  const [friends, setFriends] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [settings, setSettings] = useState({ darkMode: false });
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [notification, setNotification] = useState(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      loadUserData(user.username);
    }
  }, []);

  // Save data to localStorage when state changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      saveUserData();
    }
  }, [currentUser, habits, activities, friends, achievements, settings]);

  const loadUserData = (username) => {
    const savedData = localStorage.getItem(`habit_tracker_${username}`);
    if (savedData) {
      const data = JSON.parse(savedData);
      setHabits(data.habits || []);
      setActivities(data.activities || []);
      setFriends(data.friends || []);
      setAchievements(data.achievements || []);
      setSettings(data.settings || { darkMode: false });
    }
  };

  const saveUserData = () => {
    if (!currentUser) return;

    const data = {
      user: currentUser,
      habits,
      activities,
      friends,
      achievements,
      settings
    };

    localStorage.setItem(`habit_tracker_${currentUser.username}`, JSON.stringify(data));
  };

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
    loadUserData(user.username);
    showNotification(`Welcome back, ${user.displayName}!`, 'success');
  };

  const handleLogout = () => {
    saveUserData();
    setCurrentUser(null);
    setHabits([]);
    setActivities([]);
    setFriends([]);
    setAchievements([]);
    setSettings({ darkMode: false });
    showNotification('Logged out successfully', 'info');
  };

  const toggleTheme = (darkMode) => {
    setSettings(prev => ({ ...prev, darkMode }));
  };

  if (!currentUser) {
    return (
      <div className={`App ${settings.darkMode ? 'dark-mode' : ''}`}>
        <Login onLogin={handleLogin} showNotification={showNotification} />
        {notification && <Notification {...notification} />}
      </div>
    );
  }

  return (
    <Router>
      <div className={`App ${settings.darkMode ? 'dark-mode' : ''}`}>
        <Header
          currentUser={currentUser}
          onLogout={handleLogout}
          darkMode={settings.darkMode}
          onToggleTheme={toggleTheme}
        />
        <Navigation currentTab={currentTab} onTabChange={setCurrentTab} />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={
              <Dashboard
                habits={habits}
                activities={activities}
                currentUser={currentUser}
                showNotification={showNotification}
              />
            } />
            <Route path="/habits" element={
              <Habits
                habits={habits}
                setHabits={setHabits}
                activities={activities}
                setActivities={setActivities}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                showNotification={showNotification}
              />
            } />
            <Route path="/analytics" element={
              <Analytics habits={habits} activities={activities} />
            } />
            <Route path="/social" element={
              <Social
                friends={friends}
                setFriends={setFriends}
                currentUser={currentUser}
                showNotification={showNotification}
              />
            } />
            <Route path="/achievements" element={
              <Achievements
                achievements={achievements}
                setAchievements={setAchievements}
                currentUser={currentUser}
              />
            } />
            <Route path="/settings" element={
              <Settings
                settings={settings}
                setSettings={setSettings}
                currentUser={currentUser}
                habits={habits}
                activities={activities}
                showNotification={showNotification}
              />
            } />
          </Routes>
        </main>

        {notification && <Notification {...notification} />}
      </div>
    </Router>
  );
}

export default App;
