import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = ({ habits, activities }) => {
  // Calculate completion rates over time
  const getCompletionData = () => {
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      last7Days.push(date.toDateString());
    }

    const completionRates = last7Days.map(date => {
      const completedCount = habits.filter(habit =>
        habit.completedDates && habit.completedDates.includes(date)
      ).length;
      return completedCount;
    });

    return {
      labels: last7Days.map(date => new Date(date).toLocaleDateString('en-US', { weekday: 'short' })),
      datasets: [{
        label: 'Habits Completed',
        data: completionRates,
        backgroundColor: 'rgba(67, 97, 238, 0.6)',
        borderColor: 'rgba(67, 97, 238, 1)',
        borderWidth: 1,
      }]
    };
  };

  // Category distribution
  const getCategoryData = () => {
    const categories = {};
    habits.forEach(habit => {
      categories[habit.category] = (categories[habit.category] || 0) + 1;
    });

    const colors = [
      '#4361ee', '#3a0ca3', '#f72585', '#4cc9f0', '#ff9e00',
      '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'
    ];

    return {
      labels: Object.keys(categories),
      datasets: [{
        data: Object.values(categories),
        backgroundColor: colors.slice(0, Object.keys(categories).length),
        borderWidth: 1,
      }]
    };
  };

  // Streak data
  const getStreakData = () => {
    return {
      labels: habits.map(habit => habit.name.length > 15 ? habit.name.substring(0, 15) + '...' : habit.name),
      datasets: [{
        label: 'Current Streak (days)',
        data: habits.map(habit => habit.streak || 0),
        backgroundColor: 'rgba(244, 114, 182, 0.6)',
        borderColor: 'rgba(244, 114, 182, 1)',
        borderWidth: 1,
      }]
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div className="analytics-page">
      <div className="panel">
        <div className="panel-header">
          <h2 className="panel-title"><i className="fas fa-chart-bar"></i> Analytics Dashboard</h2>
        </div>

        <div className="analytics-grid">
          {/* Completion Trend */}
          <div className="chart-container">
            <h3>7-Day Completion Trend</h3>
            <Bar data={getCompletionData()} options={chartOptions} />
          </div>

          {/* Category Distribution */}
          <div className="chart-container">
            <h3>Habits by Category</h3>
            <Doughnut data={getCategoryData()} options={chartOptions} />
          </div>

          {/* Current Streaks */}
          <div className="chart-container">
            <h3>Current Streaks</h3>
            <Bar data={getStreakData()} options={chartOptions} />
          </div>

          {/* Summary Stats */}
          <div className="stats-summary">
            <h3>Summary Statistics</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-value">{habits.length}</div>
                <div className="stat-label">Total Habits</div>
              </div>

              <div className="stat-card">
                <div className="stat-value">
                  {habits.reduce((sum, habit) => sum + (habit.streak || 0), 0)}
                </div>
                <div className="stat-label">Total Streaks</div>
              </div>

              <div className="stat-card">
                <div className="stat-value">
                  {Math.max(...habits.map(habit => habit.streak || 0), 0)}
                </div>
                <div className="stat-label">Best Streak</div>
              </div>

              <div className="stat-card">
                <div className="stat-value">
                  {habits.reduce((sum, habit) => sum + (habit.xpValue || 10), 0)}
                </div>
                <div className="stat-label">Total XP Earned</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;