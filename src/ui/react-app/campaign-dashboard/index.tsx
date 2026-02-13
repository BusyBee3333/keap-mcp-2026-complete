import React, { useState } from 'react';
import { Mail, TrendingUp, Users, MousePointer } from 'lucide-react';

export default function CampaignDashboard() {
  const [stats] = useState({
    total_sent: 45230,
    open_rate: 34.5,
    click_rate: 12.3,
    active_campaigns: 8,
  });

  const [campaigns] = useState([
    { id: 1, name: 'Welcome Series', sent: 1234, opens: 456, clicks: 123, status: 'Active' },
    { id: 2, name: 'Product Launch', sent: 5678, opens: 2100, clicks: 890, status: 'Active' },
    { id: 3, name: 'Re-engagement', sent: 3456, opens: 987, clicks: 234, status: 'Active' },
  ]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-8">Campaign Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={<Mail />} label="Total Sent" value={stats.total_sent.toLocaleString()} color="blue" />
        <StatCard icon={<TrendingUp />} label="Open Rate" value={`${stats.open_rate}%`} color="green" />
        <StatCard icon={<MousePointer />} label="Click Rate" value={`${stats.click_rate}%`} color="purple" />
        <StatCard icon={<Users />} label="Active Campaigns" value={stats.active_campaigns} color="orange" />
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Active Campaigns</h2>
        <div className="space-y-3">
          {campaigns.map(campaign => {
            const openRate = ((campaign.opens / campaign.sent) * 100).toFixed(1);
            const clickRate = ((campaign.clicks / campaign.opens) * 100).toFixed(1);

            return (
              <div key={campaign.id} className="p-4 bg-gray-700 rounded">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{campaign.name}</h3>
                    <span className="text-sm px-2 py-1 bg-green-600 rounded">{campaign.status}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{campaign.sent.toLocaleString()}</div>
                    <div className="text-sm text-gray-400">sent</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400">Opens</div>
                    <div className="font-semibold">{campaign.opens} ({openRate}%)</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Clicks</div>
                    <div className="font-semibold">{campaign.clicks} ({clickRate}%)</div>
                  </div>
                  <div>
                    <button className="text-blue-400 hover:text-blue-300">View Details →</button>
                  </div>
                </div>
              </div>
            );
          })}
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
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-gray-400">{label}</div>
    </div>
  );
}
