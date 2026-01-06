import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = ({ habits, activities, currentUser, showNotification }) => {
  const [stats, setStats] = useState({
    totalHabits: 0,
    completedToday: 0,
    currentStreak: 0,
    totalXP: 0
  });

  useEffect(() => {
    updateStats();
  }, [habits]);

  const updateStats = () => {
    const today = new Date().toDateString();
    const completedToday = habits.filter(habit =>
      habit.completedDates && habit.completedDates.includes(today)
    ).length;

    const totalXP = habits.reduce((sum, habit) => sum + (habit.xpValue || 10), 0);

    // Calculate current streak (simplified)
    const currentStreak = Math.max(...habits.map(habit => habit.streak || 0));

    setStats({
      totalHabits: habits.length,
      completedToday,
      currentStreak,
      totalXP
    });
  };

  const recentActivities = activities.slice(0, 5);

  return (
    <div className="dashboard">
      {/* Left Column */}
      <div>
        {/* Quick Stats */}
        <div className="panel">
          <div className="panel-header">
            <h2 className="panel-title"><i className="fas fa-tachometer-alt"></i> Today's Overview</h2>
            <Link to="/habits" className="btn btn-primary btn-icon">
              <i className="fas fa-plus"></i>
            </Link>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value stat-primary">{stats.totalHabits}</div>
              <div className="stat-label">Total Habits</div>
            </div>

            <div className="stat-card">
              <div className="stat-value stat-success">{stats.completedToday}</div>
              <div className="stat-label">Completed Today</div>
            </div>

            <div className="stat-card">
              <div className="stat-value stat-warning">{stats.currentStreak}</div>
              <div className="stat-label">Current Streak</div>
            </div>

            <div className="stat-card">
              <div className="stat-value stat-danger">{stats.totalXP}</div>
              <div className="stat-label">Total XP</div>
            </div>
          </div>
        </div>

        {/* Recent Habits */}
        <div className="panel">
          <div className="panel-header">
            <h2 className="panel-title"><i className="fas fa-tasks"></i> Recent Habits</h2>
          </div>

          <div className="habits-list">
            {habits.slice(0, 5).map(habit => (
              <div key={habit.id} className="habit-item">
                <div className="habit-info">
                  <div className="habit-header">
                    <div className="habit-name">{habit.name}</div>
                    <span className="habit-category">{habit.category}</span>
                  </div>
                  <div className="habit-meta">
                    <span>Streak: {habit.streak || 0} days</span>
                    <span>Priority: {habit.priority}</span>
                  </div>
                </div>
              </div>
            ))}

            {habits.length === 0 && (
              <div className="empty-state">
                <i className="fas fa-plus-circle"></i>
                <p>No habits yet. <Link to="/habits">Create your first habit!</Link></p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div>
        {/* Recent Activity */}
        <div className="panel">
          <div className="panel-header">
            <h2 className="panel-title"><i className="fas fa-history"></i> Recent Activity</h2>
          </div>

          <div className="activities-list">
            {recentActivities.map((activity, index) => (
              <div key={index} className="activity-item">
                <div className="activity-icon">
                  <i className={`fas fa-${activity.type === 'complete' ? 'check-circle' : 'plus-circle'}`}></i>
                </div>
                <div className="activity-content">
                  <div className="activity-message">{activity.message}</div>
                  <div className="activity-time">
                    {new Date(activity.timestamp).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}

            {recentActivities.length === 0 && (
              <div className="empty-state">
                <i className="fas fa-history"></i>
                <p>No recent activity</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="panel">
          <div className="panel-header">
            <h2 className="panel-title"><i className="fas fa-bolt"></i> Quick Actions</h2>
          </div>

          <div className="quick-actions">
            <Link to="/habits" className="btn btn-primary">
              <i className="fas fa-plus"></i> Add New Habit
            </Link>
            <Link to="/analytics" className="btn btn-secondary">
              <i className="fas fa-chart-bar"></i> View Analytics
            </Link>
            <Link to="/achievements" className="btn btn-accent">
              <i className="fas fa-trophy"></i> Check Achievements
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;