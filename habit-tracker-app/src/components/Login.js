import React, { useState } from 'react';

const Login = ({ onLogin, showNotification }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple authentication (demo accounts)
    const demoAccounts = {
      'demo': 'demo123',
      'test': 'test123'
    };

    if (demoAccounts[username] && demoAccounts[username] === password) {
      const user = {
        username: username,
        displayName: username === 'demo' ? 'Demo User' : 'Test User',
        level: 5,
        xp: 850
      };

      onLogin(user);
    } else {
      showNotification('Invalid username or password. Use demo/test accounts.', 'error');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    showNotification('Registration feature coming soon! For now, use demo accounts.', 'info');
  };

  return (
    <div className="login-container">
      <div className="login-box fade-in">
        <div className="login-header">
          <h1><i className="fas fa-chart-line"></i> Ultimate Habit Tracker</h1>
          <p>Track your habits, achieve your goals, and transform your life</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            <i className="fas fa-sign-in-alt"></i> Login
          </button>
        </form>

        <div className="demo-accounts">
          <h3 style={{fontSize: '1rem', marginBottom: '10px'}}>Demo Accounts:</h3>
          <p><strong>User 1:</strong> demo / demo123</p>
          <p><strong>User 2:</strong> test / test123</p>
        </div>

        <div className="login-footer">
          <p>Don't have an account? <button onClick={handleRegister} style={{background: 'none', border: 'none', color: 'var(--primary)', textDecoration: 'underline', cursor: 'pointer'}}>Register here</button></p>
          <p style={{marginTop: '10px', fontSize: '0.9rem'}}>
            <i className="fas fa-lightbulb"></i> Tip: Your data is saved locally in your browser
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;