import React, { useState, useEffect } from 'react';

const Achievements = ({ achievements, setAchievements, currentUser }) => {
  const [allAchievements] = useState([
    {
      id: 1,
      title: 'First Steps',
      description: 'Complete your first habit',
      icon: 'fas fa-walking',
      requirement: 1,
      type: 'habits_completed',
      unlocked: false,
      rarity: 'common'
    },
    {
      id: 2,
      title: 'Habit Builder',
      description: 'Complete 10 habits',
      icon: 'fas fa-tools',
      requirement: 10,
      type: 'habits_completed',
      unlocked: false,
      rarity: 'common'
    },
    {
      id: 3,
      title: 'Consistency King',
      description: 'Maintain a 7-day streak',
      icon: 'fas fa-crown',
      requirement: 7,
      type: 'max_streak',
      unlocked: false,
      rarity: 'rare'
    },
    {
      id: 4,
      title: 'Century Club',
      description: 'Complete 100 habits',
      icon: 'fas fa-century',
      requirement: 100,
      type: 'habits_completed',
      unlocked: false,
      rarity: 'epic'
    },
    {
      id: 5,
      title: 'Early Bird',
      description: 'Complete 5 morning habits',
      icon: 'fas fa-sun',
      requirement: 5,
      type: 'morning_habits',
      unlocked: false,
      rarity: 'uncommon'
    },
    {
      id: 6,
      title: 'Night Owl',
      description: 'Complete 5 evening habits',
      icon: 'fas fa-moon',
      requirement: 5,
      type: 'evening_habits',
      unlocked: false,
      rarity: 'uncommon'
    },
    {
      id: 7,
      title: 'Health Guru',
      description: 'Complete 20 health-related habits',
      icon: 'fas fa-heartbeat',
      requirement: 20,
      type: 'health_habits',
      unlocked: false,
      rarity: 'rare'
    },
    {
      id: 8,
      title: 'Knowledge Seeker',
      description: 'Complete 15 learning habits',
      icon: 'fas fa-book',
      requirement: 15,
      type: 'learning_habits',
      unlocked: false,
      rarity: 'rare'
    }
  ]);

  useEffect(() => {
    // Check for unlocked achievements based on user stats
    // This is a simplified version - in a real app, you'd track this more comprehensively
    const updatedAchievements = allAchievements.map(achievement => {
      let unlocked = false;

      switch (achievement.type) {
        case 'habits_completed':
          // This would need to be tracked separately
          unlocked = Math.random() > 0.7; // Placeholder
          break;
        case 'max_streak':
          unlocked = currentUser.xp > 500; // Placeholder
          break;
        default:
          unlocked = Math.random() > 0.8; // Placeholder
      }

      return { ...achievement, unlocked };
    });

    setAchievements(updatedAchievements.filter(a => a.unlocked));
  }, [currentUser, setAchievements]);

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return '#6c757d';
      case 'uncommon': return '#28a745';
      case 'rare': return '#007bff';
      case 'epic': return '#6f42c1';
      case 'legendary': return '#fd7e14';
      default: return '#6c757d';
    }
  };

  const unlockedCount = achievements.length;
  const totalCount = allAchievements.length;
  const completionPercentage = Math.round((unlockedCount / totalCount) * 100);

  return (
    <div className="achievements-page">
      <div className="panel">
        <div className="panel-header">
          <h2 className="panel-title"><i className="fas fa-trophy"></i> Achievements</h2>
        </div>

        {/* Progress Overview */}
        <div className="achievement-overview">
          <div className="progress-card">
            <div className="progress-header">
              <h3>Achievement Progress</h3>
              <span className="progress-text">{unlockedCount} / {totalCount} unlocked</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <div className="progress-percentage">{completionPercentage}% complete</div>
          </div>
        </div>

        {/* Achievement Categories */}
        <div className="tabs">
          <div className="tab active">All Achievements</div>
          <div className="tab">Unlocked</div>
          <div className="tab">Locked</div>
        </div>

        {/* Achievements Grid */}
        <div className="badges-container">
          {allAchievements.map(achievement => (
            <div
              key={achievement.id}
              className={`badge ${achievement.unlocked ? 'unlocked' : ''}`}
            >
              <div
                className="badge-icon"
                style={{ color: achievement.unlocked ? getRarityColor(achievement.rarity) : '#6c757d' }}
              >
                <i className={achievement.icon}></i>
              </div>
              <div className="badge-title">{achievement.title}</div>
              <div className="badge-description">{achievement.description}</div>
              <div className="badge-requirement">
                {achievement.unlocked ? (
                  <span style={{ color: '#28a745' }}>
                    <i className="fas fa-check"></i> Unlocked
                  </span>
                ) : (
                  <span>Requirement: {achievement.requirement}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {achievements.length === 0 && (
          <div className="empty-state">
            <i className="fas fa-trophy"></i>
            <p>No achievements unlocked yet. Keep completing habits to earn badges!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Achievements;