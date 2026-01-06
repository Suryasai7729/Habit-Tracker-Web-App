import React, { useState } from 'react';

const Social = ({ friends, setFriends, currentUser, showNotification }) => {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friendUsername, setFriendUsername] = useState('');

  const addFriend = () => {
    if (!friendUsername.trim()) {
      showNotification('Please enter a username', 'error');
      return;
    }

    // In a real app, this would check if the user exists
    const newFriend = {
      id: Date.now(),
      username: friendUsername,
      displayName: friendUsername,
      level: Math.floor(Math.random() * 10) + 1,
      xp: Math.floor(Math.random() * 1000) + 100,
      habitsCompleted: Math.floor(Math.random() * 50) + 10,
      joinedAt: new Date().toISOString()
    };

    setFriends(prev => [...prev, newFriend]);
    setFriendUsername('');
    setShowAddFriend(false);
    showNotification(`Added ${friendUsername} as a friend!`, 'success');
  };

  const removeFriend = (friendId) => {
    const friend = friends.find(f => f.id === friendId);
    setFriends(prev => prev.filter(f => f.id !== friendId));
    showNotification(`Removed ${friend.username} from friends`, 'info');
  };

  return (
    <div className="social-page">
      <div className="panel">
        <div className="panel-header">
          <h2 className="panel-title"><i className="fas fa-users"></i> Social Hub</h2>
          <button className="btn btn-primary" onClick={() => setShowAddFriend(true)}>
            <i className="fas fa-plus"></i> Add Friend
          </button>
        </div>

        {/* Friends List */}
        <div className="friends-list">
          {friends.map(friend => (
            <div key={friend.id} className="friend-item">
              <div className="friend-avatar">
                <i className="fas fa-user"></i>
              </div>
              <div className="friend-info">
                <div className="friend-name">{friend.displayName}</div>
                <div className="friend-stats">
                  Level {friend.level} • {friend.xp} XP • {friend.habitsCompleted} habits completed
                </div>
                <div className="friend-joined">
                  Friends since {new Date(friend.joinedAt).toLocaleDateString()}
                </div>
              </div>
              <div className="friend-actions">
                <button className="btn btn-secondary btn-icon" title="View Profile">
                  <i className="fas fa-eye"></i>
                </button>
                <button
                  className="btn btn-secondary btn-icon"
                  onClick={() => removeFriend(friend.id)}
                  title="Remove Friend"
                >
                  <i className="fas fa-user-minus"></i>
                </button>
              </div>
            </div>
          ))}

          {friends.length === 0 && (
            <div className="empty-state">
              <i className="fas fa-users"></i>
              <p>No friends yet. Add some friends to stay motivated together!</p>
            </div>
          )}
        </div>
      </div>

      {/* Leaderboard */}
      <div className="panel">
        <div className="panel-header">
          <h2 className="panel-title"><i className="fas fa-trophy"></i> Leaderboard</h2>
        </div>

        <div className="leaderboard">
          {/* Current User */}
          <div className="leaderboard-item current-user">
            <div className="rank">#1</div>
            <div className="user-avatar">
              <i className="fas fa-user"></i>
            </div>
            <div className="user-info">
              <div className="user-name">{currentUser.displayName} (You)</div>
              <div className="user-stats">Level {currentUser.level} • {currentUser.xp} XP</div>
            </div>
          </div>

          {/* Friends */}
          {friends.map((friend, index) => (
            <div key={friend.id} className="leaderboard-item">
              <div className="rank">#{index + 2}</div>
              <div className="user-avatar">
                <i className="fas fa-user"></i>
              </div>
              <div className="user-info">
                <div className="user-name">{friend.displayName}</div>
                <div className="user-stats">Level {friend.level} • {friend.xp} XP</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Friend Modal */}
      {showAddFriend && (
        <div className="modal-overlay" onClick={() => setShowAddFriend(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add Friend</h3>
              <button className="modal-close" onClick={() => setShowAddFriend(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="friendUsername">Friend's Username</label>
                <input
                  type="text"
                  id="friendUsername"
                  value={friendUsername}
                  onChange={(e) => setFriendUsername(e.target.value)}
                  placeholder="Enter username"
                />
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddFriend(false)}>
                  Cancel
                </button>
                <button type="button" className="btn btn-primary" onClick={addFriend}>
                  Add Friend
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Social;