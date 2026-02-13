import React, { useState, useEffect } from 'react';
import { useCallTool } from '../../hooks/useCallTool';
import '../../styles/global.css';

export default function TaskManager() {
  const { callTool, loading } = useCallTool();
  const [tasks, setTasks] = useState<any[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('active');

  useEffect(() => {
    loadTasks();
  }, [filter]);

  const loadTasks = async () => {
    try {
      const result = await callTool('keap_list_tasks', {
        limit: 50,
        completed: filter === 'completed' ? true : filter === 'active' ? false : undefined,
      });
      setTasks(result?.tasks || []);
    } catch (err) {
      console.error('Failed to load tasks:', err);
    }
  };

  const completeTask = async (taskId: number) => {
    try {
      await callTool('keap_complete_task', { task_id: taskId });
      loadTasks();
    } catch (err) {
      console.error('Failed to complete task:', err);
    }
  };

  return (
    <div className="app-container">
      <h1>Task Manager</h1>

      <div className="card" style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className={`btn ${filter === 'all' ? '' : 'btn-secondary'}`}
            onClick={() => setFilter('all')}
          >
            All Tasks
          </button>
          <button
            className={`btn ${filter === 'active' ? '' : 'btn-secondary'}`}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button
            className={`btn ${filter === 'completed' ? '' : 'btn-secondary'}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading tasks...</div>
      ) : (
        <div className="grid">
          {tasks.map(task => (
            <div key={task.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ marginBottom: '8px' }}>{task.title}</h3>
                  {task.description && (
                    <p style={{ color: '#999', fontSize: '14px', marginBottom: '8px' }}>
                      {task.description}
                    </p>
                  )}
                  {task.due_date && (
                    <div style={{ fontSize: '12px', color: '#999' }}>
                      Due: {new Date(task.due_date).toLocaleDateString()}
                    </div>
                  )}
                </div>
                {!task.completed && (
                  <button
                    className="btn"
                    onClick={() => completeTask(task.id)}
                    style={{ marginLeft: '12px' }}
                  >
                    Complete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
