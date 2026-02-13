import React, { useState, useEffect } from 'react';
import { Users, TrendingUp, Tag, Mail } from 'lucide-react';

interface Stats {
  total: number;
  new_today: number;
  tagged: number;
  emailed: number;
}

export default function ContactDashboard() {
  const [stats, setStats] = useState<Stats>({ total: 0, new_today: 0, tagged: 0, emailed: 0 });
  const [recentContacts, setRecentContacts] = useState<any[]>([]);

  useEffect(() => {
    // Simulated data - in real use, fetch from MCP tools
    setStats({ total: 1247, new_today: 23, tagged: 856, emailed: 432 });
    setRecentContacts([
      { id: 1, name: 'John Doe', email: 'john@example.com', created: '2025-02-14' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', created: '2025-02-14' },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com', created: '2025-02-13' },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-8">Contact Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={<Users />} label="Total Contacts" value={stats.total} color="blue" />
        <StatCard icon={<TrendingUp />} label="New Today" value={stats.new_today} color="green" />
        <StatCard icon={<Tag />} label="Tagged" value={stats.tagged} color="purple" />
        <StatCard icon={<Mail />} label="Emailed" value={stats.emailed} color="orange" />
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Contacts</h2>
        <div className="space-y-3">
          {recentContacts.map(contact => (
            <div key={contact.id} className="flex justify-between items-center p-3 bg-gray-700 rounded">
              <div>
                <div className="font-medium">{contact.name}</div>
                <div className="text-sm text-gray-400">{contact.email}</div>
              </div>
              <div className="text-sm text-gray-400">{contact.created}</div>
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
    orange: 'bg-orange-500',
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className={`inline-flex p-3 rounded-lg ${colorClasses[color]} mb-4`}>
        {icon}
      </div>
      <div className="text-3xl font-bold mb-1">{value.toLocaleString()}</div>
      <div className="text-gray-400">{label}</div>
    </div>
  );
}
