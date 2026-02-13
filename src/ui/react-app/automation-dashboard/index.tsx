import React, { useState } from 'react';
import { Zap, Play, Pause, Users, TrendingUp } from 'lucide-react';

export default function AutomationDashboard() {
  const [automations] = useState([
    { id: 1, name: 'Welcome Sequence', status: 'Active', contacts: 1234, completed: 987, success_rate: 79.9 },
    { id: 2, name: 'Lead Nurture', status: 'Active', contacts: 567, completed: 234, success_rate: 41.3 },
    { id: 3, name: 'Re-engagement', status: 'Active', contacts: 890, completed: 456, success_rate: 51.2 },
    { id: 4, name: 'Onboarding', status: 'Paused', contacts: 345, completed: 289, success_rate: 83.8 },
    { id: 5, name: 'Upsell Campaign', status: 'Active', contacts: 156, completed: 89, success_rate: 57.1 },
  ]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Automation Dashboard</h1>
          <button className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition">
            + Create Automation
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={<Zap />}
            label="Active Automations"
            value={automations.filter(a => a.status === 'Active').length}
            color="blue"
          />
          <StatCard
            icon={<Users />}
            label="Total Contacts"
            value={automations.reduce((sum, a) => sum + a.contacts, 0)}
            color="green"
          />
          <StatCard
            icon={<TrendingUp />}
            label="Avg Success Rate"
            value={`${(automations.reduce((sum, a) => sum + a.success_rate, 0) / automations.length).toFixed(1)}%`}
            color="purple"
          />
        </div>

        <div className="space-y-4">
          {automations.map(automation => (
            <div key={automation.id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${
                    automation.status === 'Active' ? 'bg-green-600' : 'bg-gray-600'
                  }`}>
                    <Zap size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{automation.name}</h3>
                    <span className={`text-sm px-3 py-1 rounded-full ${
                      automation.status === 'Active' ? 'bg-green-600' : 'bg-gray-600'
                    }`}>
                      {automation.status}
                    </span>
                  </div>
                </div>

                <button className={`p-2 rounded-lg ${
                  automation.status === 'Active' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-green-600 hover:bg-green-700'
                }`}>
                  {automation.status === 'Active' ? <Pause size={20} /> : <Play size={20} />}
                </button>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-gray-400 text-sm mb-1">Contacts</div>
                  <div className="text-2xl font-bold">{automation.contacts}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm mb-1">Completed</div>
                  <div className="text-2xl font-bold">{automation.completed}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm mb-1">Success Rate</div>
                  <div className="text-2xl font-bold text-green-400">{automation.success_rate}%</div>
                </div>
              </div>

              <div className="mt-4">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all"
                    style={{ width: `${(automation.completed / automation.contacts) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: any) {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className={`inline-flex p-3 rounded-lg ${colorClasses[color]} mb-4`}>
        {icon}
      </div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-gray-400">{label}</div>
    </div>
  );
}
