import React, { useState } from 'react';
import { CheckCircle, Circle, Calendar, User } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  due_date: string;
  priority: number;
  assigned_to: string;
}

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Follow up with John Doe', description: 'Discuss premium plan', completed: false, due_date: '2025-02-15', priority: 3, assigned_to: 'Sales Team' },
    { id: 2, title: 'Send proposal to Acme Corp', description: 'Enterprise package', completed: false, due_date: '2025-02-14', priority: 5, assigned_to: 'Account Manager' },
    { id: 3, title: 'Schedule demo with TechCo', description: 'Product walkthrough', completed: true, due_date: '2025-02-13', priority: 4, assigned_to: 'Support' },
    { id: 4, title: 'Update contact information', description: 'Verify email addresses', completed: false, due_date: '2025-02-16', priority: 2, assigned_to: 'Admin' },
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const getPriorityColor = (priority: number) => {
    if (priority >= 4) return 'text-red-400';
    if (priority === 3) return 'text-yellow-400';
    return 'text-gray-400';
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Task Manager</h1>

        <div className="mb-6">
          <button className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition">
            + New Task
          </button>
        </div>

        <div className="space-y-3">
          {tasks.map(task => (
            <div
              key={task.id}
              className={`bg-gray-800 rounded-lg p-4 ${task.completed ? 'opacity-60' : ''}`}
            >
              <div className="flex items-start gap-4">
                <button
                  onClick={() => toggleTask(task.id)}
                  className="mt-1 text-blue-500 hover:text-blue-400 transition"
                >
                  {task.completed ? <CheckCircle size={24} /> : <Circle size={24} />}
                </button>

                <div className="flex-1">
                  <h3 className={`font-semibold mb-1 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                    {task.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-3">{task.description}</p>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-gray-400">
                      <Calendar size={16} />
                      {task.due_date}
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <User size={16} />
                      {task.assigned_to}
                    </div>
                    <div className={`flex items-center gap-1 ${getPriorityColor(task.priority)}`}>
                      Priority: {task.priority}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
