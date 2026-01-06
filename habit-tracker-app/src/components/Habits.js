import React, { useState, useEffect } from 'react';

const Habits = ({ habits, setHabits, activities, setActivities, currentUser, setCurrentUser, showNotification }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [filter, setFilter] = useState('all');
  const [editingHabit, setEditingHabit] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'health',
    frequency: 1,
    priority: 'medium',
    difficulty: 'medium',
    timeOfDay: 'anytime',
    notes: ''
  });

  const categories = ['health', 'learning', 'productivity', 'social', 'finance', 'creativity', 'other'];
  const priorities = ['low', 'medium', 'high'];
  const difficulties = ['easy', 'medium', 'hard'];
  const timeOptions = ['morning', 'afternoon', 'evening', 'anytime'];

  useEffect(() => {
    // Load demo data if no habits exist
    if (habits.length === 0) {
      loadDemoData();
    }
  }, []);

  const loadDemoData = () => {
    const demoHabits = [
      {
        id: 1,
        name: 'Morning Meditation',
        category: 'health',
        frequency: 7,
        priority: 'high',
        difficulty: 'medium',
        timeOfDay: 'morning',
        notes: '10 minutes of mindfulness',
        completedDates: getRecentDates(5),
        streak: 5,
        createdAt: '2023-10-01T08:00:00.000Z',
        xpValue: 10
      },
      {
        id: 2,
        name: 'Evening Exercise',
        category: 'health',
        frequency: 5,
        priority: 'high',
        difficulty: 'hard',
        timeOfDay: 'evening',
        notes: '30 minutes cardio or strength training',
        completedDates: getRecentDates(3),
        streak: 3,
        createdAt: '2023-10-05T18:00:00.000Z',
        xpValue: 15
      },
      {
        id: 3,
        name: 'Read 30 Pages',
        category: 'learning',
        frequency: 7,
        priority: 'medium',
        difficulty: 'medium',
        timeOfDay: 'evening',
        notes: 'Personal development or fiction',
        completedDates: getRecentDates(6),
        streak: 6,
        createdAt: '2023-10-10T20:00:00.000Z',
        xpValue: 10
      }
    ];

    setHabits(demoHabits);

    const demoActivities = [
      { message: 'Added new habit: "Morning Meditation"', type: 'add', timestamp: '2023-10-01T08:00:00.000Z' },
      { message: 'Completed habit: "Morning Meditation"', type: 'complete', timestamp: new Date(Date.now() - 3600000).toISOString() },
      { message: 'Added new habit: "Evening Exercise"', type: 'add', timestamp: '2023-10-05T18:00:00.000Z' },
      { message: 'Completed habit: "Read 30 Pages"', type: 'complete', timestamp: new Date(Date.now() - 7200000).toISOString() }
    ];

    setActivities(demoActivities);
  };

  const getRecentDates = (count) => {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < count; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      dates.push(date.toDateString());
    }

    return dates;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingHabit) {
      // Update existing habit
      setHabits(prev => prev.map(habit =>
        habit.id === editingHabit.id
          ? { ...habit, ...formData }
          : habit
      ));

      setActivities(prev => [{
        message: `Updated habit: "${formData.name}"`,
        type: 'update',
        timestamp: new Date().toISOString()
      }, ...prev]);

      showNotification(`Habit "${formData.name}" updated successfully!`, 'success');
    } else {
      // Add new habit
      const newHabit = {
        id: Date.now(),
        ...formData,
        completedDates: [],
        streak: 0,
        createdAt: new Date().toISOString(),
        xpValue: formData.difficulty === 'easy' ? 5 : formData.difficulty === 'medium' ? 10 : 15
      };

      setHabits(prev => [...prev, newHabit]);

      setActivities(prev => [{
        message: `Added new habit: "${formData.name}"`,
        type: 'add',
        timestamp: new Date().toISOString()
      }, ...prev]);

      showNotification(`Habit "${formData.name}" added successfully!`, 'success');
    }

    setShowAddModal(false);
    setEditingHabit(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'health',
      frequency: 1,
      priority: 'medium',
      difficulty: 'medium',
      timeOfDay: 'anytime',
      notes: ''
    });
  };

  const toggleHabitCompletion = (habitId) => {
    const today = new Date().toDateString();

    setHabits(prev => prev.map(habit => {
      if (habit.id === habitId) {
        const isCompletedToday = habit.completedDates.includes(today);
        let newCompletedDates;
        let newStreak = habit.streak;

        if (isCompletedToday) {
          // Uncomplete
          newCompletedDates = habit.completedDates.filter(date => date !== today);
          newStreak = Math.max(0, newStreak - 1);
        } else {
          // Complete
          newCompletedDates = [...habit.completedDates, today];
          newStreak += 1;

          // Award XP
          setCurrentUser(prev => ({
            ...prev,
            xp: prev.xp + habit.xpValue
          }));
        }

        return {
          ...habit,
          completedDates: newCompletedDates,
          streak: newStreak
        };
      }
      return habit;
    }));

    const habit = habits.find(h => h.id === habitId);
    const action = habit.completedDates.includes(today) ? 'uncompleted' : 'completed';

    setActivities(prev => [{
      message: `${action === 'completed' ? 'Completed' : 'Uncompleted'} habit: "${habit.name}"`,
      type: action,
      timestamp: new Date().toISOString()
    }, ...prev]);

    showNotification(`Habit "${habit.name}" ${action}!`, 'success');
  };

  const deleteHabit = (habitId) => {
    const habit = habits.find(h => h.id === habitId);
    setHabits(prev => prev.filter(h => h.id !== habitId));

    setActivities(prev => [{
      message: `Deleted habit: "${habit.name}"`,
      type: 'delete',
      timestamp: new Date().toISOString()
    }, ...prev]);

    showNotification(`Habit "${habit.name}" deleted!`, 'info');
  };

  const editHabit = (habit) => {
    setEditingHabit(habit);
    setFormData({
      name: habit.name,
      category: habit.category,
      frequency: habit.frequency,
      priority: habit.priority,
      difficulty: habit.difficulty,
      timeOfDay: habit.timeOfDay,
      notes: habit.notes || ''
    });
    setShowAddModal(true);
  };

  const filteredHabits = habits.filter(habit => {
    const today = new Date().toDateString();

    switch (filter) {
      case 'active':
        return !habit.completedDates.includes(today);
      case 'completed':
        return habit.completedDates.includes(today);
      case 'high':
        return habit.priority === 'high';
      default:
        return true;
    }
  });

  return (
    <div className="habits-page">
      <div className="panel">
        <div className="panel-header">
          <h2 className="panel-title"><i className="fas fa-tasks"></i> My Habits</h2>
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
            <i className="fas fa-plus"></i> Add New Habit
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="tabs">
          {[
            { id: 'all', label: 'All Habits' },
            { id: 'active', label: 'Active Today' },
            { id: 'completed', label: 'Completed Today' },
            { id: 'high', label: 'High Priority' }
          ].map(tab => (
            <div
              key={tab.id}
              className={`tab ${filter === tab.id ? 'active' : ''}`}
              onClick={() => setFilter(tab.id)}
            >
              {tab.label}
            </div>
          ))}
        </div>

        {/* Habits List */}
        <div className="habits-list">
          {filteredHabits.map(habit => {
            const today = new Date().toDateString();
            const isCompletedToday = habit.completedDates.includes(today);

            return (
              <div key={habit.id} className="habit-item">
                <div className="habit-info">
                  <div className="habit-header">
                    <div className="habit-name">{habit.name}</div>
                    <span className="habit-category">{habit.category}</span>
                  </div>
                  <div className="habit-meta">
                    <span>Streak: {habit.streak} days</span>
                    <span>Priority: {habit.priority}</span>
                    <span>Difficulty: {habit.difficulty}</span>
                    <span>Time: {habit.timeOfDay}</span>
                  </div>
                  {habit.notes && (
                    <div className="habit-notes">{habit.notes}</div>
                  )}
                </div>

                <div className="habit-actions">
                  <button
                    className={`btn btn-icon ${isCompletedToday ? 'btn-accent' : 'btn-secondary'}`}
                    onClick={() => toggleHabitCompletion(habit.id)}
                    title={isCompletedToday ? 'Mark as incomplete' : 'Mark as complete'}
                  >
                    <i className={`fas fa-${isCompletedToday ? 'check-circle' : 'circle'}`}></i>
                  </button>

                  <button
                    className="btn btn-icon btn-secondary"
                    onClick={() => editHabit(habit)}
                    title="Edit habit"
                  >
                    <i className="fas fa-edit"></i>
                  </button>

                  <button
                    className="btn btn-icon btn-secondary"
                    onClick={() => deleteHabit(habit.id)}
                    title="Delete habit"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            );
          })}

          {filteredHabits.length === 0 && (
            <div className="empty-state">
              <i className="fas fa-tasks"></i>
              <p>No habits found for the selected filter.</p>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Habit Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingHabit ? 'Edit Habit' : 'Add New Habit'}</h3>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-body">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="habitName">Habit Name *</label>
                  <input
                    type="text"
                    id="habitName"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Morning Meditation"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="habitCategory">Category</label>
                  <select
                    id="habitCategory"
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="habitFrequency">Frequency (days/week)</label>
                  <input
                    type="number"
                    id="habitFrequency"
                    min="1"
                    max="7"
                    value={formData.frequency}
                    onChange={(e) => setFormData(prev => ({ ...prev, frequency: parseInt(e.target.value) }))}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="habitPriority">Priority</label>
                  <select
                    id="habitPriority"
                    value={formData.priority}
                    onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
                  >
                    {priorities.map(pri => (
                      <option key={pri} value={pri}>{pri.charAt(0).toUpperCase() + pri.slice(1)}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="habitDifficulty">Difficulty</label>
                  <select
                    id="habitDifficulty"
                    value={formData.difficulty}
                    onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value }))}
                  >
                    {difficulties.map(diff => (
                      <option key={diff} value={diff}>{diff.charAt(0).toUpperCase() + diff.slice(1)}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="habitTimeOfDay">Time of Day</label>
                  <select
                    id="habitTimeOfDay"
                    value={formData.timeOfDay}
                    onChange={(e) => setFormData(prev => ({ ...prev, timeOfDay: e.target.value }))}
                  >
                    {timeOptions.map(time => (
                      <option key={time} value={time}>{time.charAt(0).toUpperCase() + time.slice(1)}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="habitNotes">Notes (optional)</label>
                <textarea
                  id="habitNotes"
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Additional details about your habit..."
                  rows="3"
                />
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingHabit ? 'Update Habit' : 'Add Habit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Habits;