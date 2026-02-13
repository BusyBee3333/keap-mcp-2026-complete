import React, { useState } from 'react';
import { DollarSign, TrendingUp, CreditCard, ShoppingCart } from 'lucide-react';

export default function RevenueDashboard() {
  const [stats] = useState({
    total_revenue: 487320,
    monthly_revenue: 142850,
    transactions: 1247,
    avg_order_value: 390.45,
  });

  const [monthlyData] = useState([
    { month: 'Jan', revenue: 125000 },
    { month: 'Feb', revenue: 142850 },
    { month: 'Mar', revenue: 0 },
  ]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-8">Revenue Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<DollarSign />}
          label="Total Revenue"
          value={`$${(stats.total_revenue / 1000).toFixed(1)}K`}
          color="blue"
        />
        <StatCard
          icon={<TrendingUp />}
          label="This Month"
          value={`$${(stats.monthly_revenue / 1000).toFixed(1)}K`}
          color="green"
        />
        <StatCard
          icon={<CreditCard />}
          label="Transactions"
          value={stats.transactions}
          color="purple"
        />
        <StatCard
          icon={<ShoppingCart />}
          label="Avg Order Value"
          value={`$${stats.avg_order_value.toFixed(2)}`}
          color="orange"
        />
      </div>

      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6">Monthly Revenue</h2>
        <div className="space-y-4">
          {monthlyData.map(item => (
            <div key={item.month}>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">{item.month}</span>
                <span className="font-semibold">${item.revenue.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all"
                  style={{ width: `${(item.revenue / 150000) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Top Products</h2>
          <div className="space-y-3">
            {[
              { name: 'Enterprise License', revenue: 125000 },
              { name: 'Premium Plan', revenue: 89000 },
              { name: 'Consulting Services', revenue: 67000 },
            ].map(product => (
              <div key={product.name} className="flex justify-between items-center p-3 bg-gray-700 rounded">
                <span>{product.name}</span>
                <span className="font-semibold text-green-400">${product.revenue.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Payment Methods</h2>
          <div className="space-y-3">
            {[
              { method: 'Credit Card', percentage: 65 },
              { method: 'ACH Transfer', percentage: 25 },
              { method: 'PayPal', percentage: 10 },
            ].map(method => (
              <div key={method.method}>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">{method.method}</span>
                  <span>{method.percentage}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${method.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
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
