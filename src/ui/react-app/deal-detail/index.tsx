import React, { useState } from 'react';
import { DollarSign, User, Calendar, TrendingUp, FileText } from 'lucide-react';

export default function DealDetail() {
  const [deal] = useState({
    id: 1,
    title: 'Enterprise Deal - Acme Corp',
    value: 50000,
    stage: 'Negotiation',
    probability: 75,
    contact: 'John Doe',
    owner: 'Sarah Smith',
    created: '2025-01-15',
    estimated_close: '2025-03-01',
    next_action: 'Send final proposal',
    next_action_date: '2025-02-16',
    notes: [
      { id: 1, text: 'Budget approved by CFO', date: '2025-02-10' },
      { id: 2, text: 'Product demo went well', date: '2025-02-05' },
    ],
  });

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{deal.title}</h1>
          <div className="flex items-center gap-4 text-gray-400">
            <span className="px-3 py-1 bg-blue-600 rounded-full text-sm">{deal.stage}</span>
            <span>{deal.probability}% probability</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <InfoCard icon={<DollarSign />} label="Deal Value" value={`$${deal.value.toLocaleString()}`} />
          <InfoCard icon={<User />} label="Contact" value={deal.contact} />
          <InfoCard icon={<User />} label="Owner" value={deal.owner} />
          <InfoCard icon={<Calendar />} label="Est. Close Date" value={deal.estimated_close} />
        </div>

        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="text-blue-400" />
            <h2 className="text-xl font-semibold">Next Action</h2>
          </div>
          <div className="p-4 bg-gray-700 rounded">
            <div className="font-medium mb-1">{deal.next_action}</div>
            <div className="text-sm text-gray-400">Due: {deal.next_action_date}</div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="text-blue-400" />
            <h2 className="text-xl font-semibold">Activity</h2>
          </div>
          <div className="space-y-3">
            {deal.notes.map(note => (
              <div key={note.id} className="p-4 bg-gray-700 rounded">
                <div className="text-gray-300 mb-1">{note.text}</div>
                <div className="text-sm text-gray-400">{note.date}</div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition">
            + Add Note
          </button>
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
