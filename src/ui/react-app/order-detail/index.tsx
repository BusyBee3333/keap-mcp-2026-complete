import React, { useState } from 'react';
import { ShoppingCart, User, Calendar, DollarSign, Package } from 'lucide-react';

export default function OrderDetail() {
  const [order] = useState({
    id: 1,
    title: 'Enterprise License - Acme Corp',
    contact: 'John Doe',
    date: '2025-02-14',
    status: 'Paid',
    total: 50000,
    items: [
      { id: 1, description: 'Enterprise License (Annual)', quantity: 1, price: 45000 },
      { id: 2, description: 'Priority Support', quantity: 1, price: 5000 },
    ],
    transactions: [
      { id: 1, amount: 50000, date: '2025-02-14', method: 'Credit Card', status: 'Completed' },
    ],
  });

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{order.title}</h1>
          <div className="flex items-center gap-4">
            <span className={`px-3 py-1 rounded-full text-sm ${
              order.status === 'Paid' ? 'bg-green-600' : 'bg-yellow-600'
            }`}>
              {order.status}
            </span>
            <span className="text-gray-400">Order #{order.id}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <InfoCard icon={<User />} label="Customer" value={order.contact} />
          <InfoCard icon={<Calendar />} label="Order Date" value={order.date} />
          <InfoCard icon={<DollarSign />} label="Total" value={`$${order.total.toLocaleString()}`} />
        </div>

        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Package className="text-blue-400" />
            <h2 className="text-xl font-semibold">Order Items</h2>
          </div>
          <div className="space-y-3">
            {order.items.map(item => (
              <div key={item.id} className="flex justify-between items-center p-4 bg-gray-700 rounded">
                <div>
                  <div className="font-medium">{item.description}</div>
                  <div className="text-sm text-gray-400">Quantity: {item.quantity}</div>
                </div>
                <div className="text-lg font-bold">${item.price.toLocaleString()}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-700 flex justify-between items-center">
            <span className="text-xl font-semibold">Total</span>
            <span className="text-2xl font-bold text-green-400">${order.total.toLocaleString()}</span>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Transactions</h2>
          <div className="space-y-3">
            {order.transactions.map(transaction => (
              <div key={transaction.id} className="p-4 bg-gray-700 rounded">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <div className="font-medium">{transaction.method}</div>
                    <div className="text-sm text-gray-400">{transaction.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-400">${transaction.amount.toLocaleString()}</div>
                    <div className="text-sm text-green-400">{transaction.status}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, label, value }: any) {
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="text-blue-400">{icon}</div>
        <div className="text-sm text-gray-400">{label}</div>
      </div>
      <div className="text-lg font-medium">{value}</div>
    </div>
  );
}
