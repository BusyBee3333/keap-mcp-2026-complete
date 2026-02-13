import React, { useState } from 'react';
import { Mail, TrendingUp, MousePointer, XCircle, UserPlus } from 'lucide-react';

export default function CampaignDetail() {
  const [campaign] = useState({
    id: 1,
    name: 'Product Launch Campaign',
    status: 'Active',
    created: '2025-01-20',
    total_sent: 5678,
    opens: 2100,
    clicks: 890,
    bounces: 45,
    unsubscribes: 23,
    contacts: 5750,
  });

  const openRate = ((campaign.opens / campaign.total_sent) * 100).toFixed(1);
  const clickRate = ((campaign.clicks / campaign.opens) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{campaign.name}</h1>
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-green-600 rounded-full text-sm">{campaign.status}</span>
            <span className="text-gray-400">Created: {campaign.created}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard icon={<UserPlus />} label="Total Contacts" value={campaign.contacts} />
          <StatCard icon={<Mail />} label="Emails Sent" value={campaign.total_sent} />
          <StatCard icon={<TrendingUp />} label="Open Rate" value={`${openRate}%`} />
        </div>

        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-6">Performance Metrics</h2>

          <div className="space-y-6">
            <MetricBar label="Opens" value={campaign.opens} total={campaign.total_sent} color="blue" />
            <MetricBar label="Clicks" value={campaign.clicks} total={campaign.opens} color="purple" />
            <MetricBar label="Bounces" value={campaign.bounces} total={campaign.total_sent} color="red" />
            <MetricBar label="Unsubscribes" value={campaign.unsubscribes} total={campaign.total_sent} color="yellow" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="font-semibold mb-4">Top Links Clicked</h3>
            <div className="space-y-2">
              <LinkItem url="Product Page" clicks={456} />
              <LinkItem url="Pricing" clicks={234} />
              <LinkItem url="Demo Request" clicks={200} />
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="font-semibold mb-4">Engagement Timeline</h3>
            <div className="space-y-3">
              <TimelineItem date="Feb 14" opens={234} clicks={89} />
              <TimelineItem date="Feb 13" opens={456} clicks={123} />
              <TimelineItem date="Feb 12" opens={389} clicks={145} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: any) {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="text-blue-400 mb-3">{icon}</div>
      <div className="text-3xl font-bold mb-1">{value.toLocaleString()}</div>
      <div className="text-gray-400">{label}</div>
    </div>
  );
}

function MetricBar({ label, value, total, color }: any) {
  const percentage = ((value / total) * 100).toFixed(1);
  const colorClasses = {
    blue: 'bg-blue-600',
    purple: 'bg-purple-600',
    red: 'bg-red-600',
    yellow: 'bg-yellow-600',
  };

  return (
    <div>
      <div className="flex justify-between mb-2">
        <span>{label}</span>
        <span className="font-semibold">{value} ({percentage}%)</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-3">
        <div
          className={`${colorClasses[color]} h-3 rounded-full transition-all`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function LinkItem({ url, clicks }: any) {
  return (
    <div className="flex justify-between items-center p-2 bg-gray-700 rounded">
      <span className="text-sm">{url}</span>
      <span className="text-blue-400 font-semibold">{clicks}</span>
    </div>
  );
}

function TimelineItem({ date, opens, clicks }: any) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-gray-400">{date}</span>
      <div className="flex gap-4">
        <span>{opens} opens</span>
        <span className="text-blue-400">{clicks} clicks</span>
      </div>
    </div>
  );
}
