import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, Award, Target } from 'lucide-react';

interface DealStats {
  total_value: number;
  won_value: number;
  active_deals: number;
  close_rate: number;
}

export default function DealDashboard() {
  const [stats, setStats] = useState<DealStats>({
    total_value: 0,
    won_value: 0,
    active_deals: 0,
    close_rate: 0,
  });

  const [topDeals, setTopDeals] = useState<any[]>([]);

  useEffect(() => {
    setStats({
      total_value: 487500,
      won_value: 142300,
      active_deals: 28,
      close_rate: 34.5,
    });

    setTopDeals([
      { id: 1, title: 'Enterprise Deal - Acme Corp', value: 50000, stage: 'Negotiation', probability: 75 },
      { id: 2, title: 'SaaS License - TechCo', value: 35000, stage: 'Proposal', probability: 50 },
      { id: 3, title: 'Consulting - BigCorp', value: 28000, stage: 'Qualification', probability: 30 },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-8">Deal Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<DollarSign />}
          label="Total Pipeline"
          value={`$${(stats.total_value / 1000).toFixed(0)}K`}
          color="blue"
        />
        <StatCard
          icon={<Award />}
          label="Won This Month"
          value={`$${(stats.won_value / 1000).toFixed(0)}K`}
          color="green"
        />
        <StatCard
          icon={<Target />}
          label="Active Deals"
          value={stats.active_deals}
          color="purple"
        />
        <StatCard
          icon={<TrendingUp />}
          label="Close Rate"
          value={`${stats.close_rate}%`}
          color="orange"
        />
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Top Deals</h2>
        <div className="space-y-3">
          {topDeals.map(deal => (
            <div key={deal.id} className="p-4 bg-gray-700 rounded">
              <div className="flex justify-between items-start mb-2">
                <div className="font-medium">{deal.title}</div>
                <div className="text-green-400 font-bold">${deal.value.toLocaleString()}</div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">{deal.stage}</span>
                <span className="text-sm px-2 py-1 bg-blue-600 rounded">{deal.probability}% probability</span>
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
