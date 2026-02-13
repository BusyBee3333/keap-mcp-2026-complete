import React from 'react';
import { BarChart3, Users, DollarSign, Mail, TrendingUp, Calendar } from 'lucide-react';

export default function ReportsOverview() {
  const reports = [
    {
      id: 1,
      name: 'Contact Growth',
      description: 'Track new contacts over time',
      icon: <Users />,
      color: 'blue',
      lastRun: '2025-02-14',
    },
    {
      id: 2,
      name: 'Revenue Report',
      description: 'Analyze revenue and transactions',
      icon: <DollarSign />,
      color: 'green',
      lastRun: '2025-02-14',
    },
    {
      id: 3,
      name: 'Campaign Performance',
      description: 'Email campaign metrics and ROI',
      icon: <Mail />,
      color: 'purple',
      lastRun: '2025-02-13',
    },
    {
      id: 4,
      name: 'Sales Pipeline',
      description: 'Deal stages and conversion rates',
      icon: <TrendingUp />,
      color: 'orange',
      lastRun: '2025-02-14',
    },
    {
      id: 5,
      name: 'Activity Report',
      description: 'Tasks, appointments, and engagement',
      icon: <Calendar />,
      color: 'cyan',
      lastRun: '2025-02-13',
    },
    {
      id: 6,
      name: 'Custom Analytics',
      description: 'Build your own reports',
      icon: <BarChart3 />,
      color: 'pink',
      lastRun: 'Never',
    },
  ];

  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    purple: 'bg-purple-600',
    orange: 'bg-orange-600',
    cyan: 'bg-cyan-600',
    pink: 'bg-pink-600',
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Reports Overview</h1>
          <button className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition">
            + Create Report
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map(report => (
            <div
              key={report.id}
              className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition cursor-pointer"
            >
              <div className={`inline-flex p-3 rounded-lg ${colorClasses[report.color]} mb-4`}>
                {report.icon}
              </div>

              <h3 className="text-xl font-semibold mb-2">{report.name}</h3>
              <p className="text-sm text-gray-400 mb-4">{report.description}</p>

              <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                <span className="text-xs text-gray-400">Last run: {report.lastRun}</span>
                <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                  Run Report →
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Reports</h2>
          <div className="space-y-3">
            {[
              { name: 'Monthly Revenue - January 2025', date: '2025-02-01', type: 'Revenue' },
              { name: 'Q4 2024 Campaign Performance', date: '2025-01-15', type: 'Campaign' },
              { name: 'Contact Growth - 2024', date: '2025-01-10', type: 'Contact' },
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-gray-700 rounded">
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-400">{item.type} Report</div>
                </div>
                <div className="text-sm text-gray-400">{item.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
