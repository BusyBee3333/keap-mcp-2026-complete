import React, { useState } from 'react';
import { ShoppingCart, DollarSign, Package, TrendingUp } from 'lucide-react';

export default function OrderDashboard() {
  const [stats] = useState({
    total_orders: 347,
    total_revenue: 142850,
    avg_order_value: 411.82,
    pending_orders: 23,
  });

  const [recentOrders] = useState([
    { id: 1, title: 'Enterprise License - Acme Corp', amount: 50000, status: 'Paid', date: '2025-02-14' },
    { id: 2, title: 'Premium Plan - TechCo', amount: 2400, status: 'Paid', date: '2025-02-14' },
    { id: 3, title: 'Consulting Package', amount: 5000, status: 'Pending', date: '2025-02-13' },
    { id: 4, title: 'Starter Plan - StartupX', amount: 348, status: 'Paid', date: '2025-02-13' },
  ]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-8">Order Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={<ShoppingCart />} label="Total Orders" value={stats.total_orders} color="blue" />
        <StatCard icon={<DollarSign />} label="Total Revenue" value={`$${(stats.total_revenue / 1000).toFixed(1)}K`} color="green" />
        <StatCard icon={<TrendingUp />} label="Avg Order Value" value={`$${stats.avg_order_value.toFixed(0)}`} color="purple" />
        <StatCard icon={<Package />} label="Pending" value={stats.pending_orders} color="orange" />
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <div className="space-y-3">
          {recentOrders.map(order => (
            <div key={order.id} className="p-4 bg-gray-700 rounded">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold">{order.title}</h3>
                  <div className="text-sm text-gray-400">{order.date}</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-400">${order.amount.toLocaleString()}</div>
                  <span className={`text-sm px-2 py-1 rounded ${
                    order.status === 'Paid' ? 'bg-green-600' : 'bg-yellow-600'
                  }`}>
                    {order.status}
                  </span>
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
