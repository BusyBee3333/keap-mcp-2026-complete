import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';

interface Deal {
  id: number;
  title: string;
  value: number;
  contact: string;
}

interface Stage {
  id: string;
  name: string;
  deals: Deal[];
}

export default function PipelineKanban() {
  const [stages] = useState<Stage[]>([
    {
      id: '1',
      name: 'Lead',
      deals: [
        { id: 1, title: 'New Prospect A', value: 15000, contact: 'John Doe' },
        { id: 2, title: 'New Prospect B', value: 22000, contact: 'Jane Smith' },
      ],
    },
    {
      id: '2',
      name: 'Qualified',
      deals: [
        { id: 3, title: 'Enterprise Deal', value: 50000, contact: 'Acme Corp' },
      ],
    },
    {
      id: '3',
      name: 'Proposal',
      deals: [
        { id: 4, title: 'SaaS License', value: 35000, contact: 'TechCo' },
        { id: 5, title: 'Consulting Project', value: 28000, contact: 'BigCorp' },
      ],
    },
    {
      id: '4',
      name: 'Negotiation',
      deals: [
        { id: 6, title: 'Major Contract', value: 75000, contact: 'MegaCorp' },
      ],
    },
    {
      id: '5',
      name: 'Closed Won',
      deals: [
        { id: 7, title: 'Small Business Package', value: 12000, contact: 'StartupX' },
      ],
    },
  ]);

  const getTotalValue = (deals: Deal[]) => {
    return deals.reduce((sum, deal) => sum + deal.value, 0);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-8">Sales Pipeline</h1>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {stages.map(stage => (
          <div key={stage.id} className="flex-shrink-0 w-80">
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">{stage.name}</h2>
                <span className="text-sm text-gray-400">
                  ${(getTotalValue(stage.deals) / 1000).toFixed(0)}K
                </span>
              </div>

              <div className="space-y-3">
                {stage.deals.map(deal => (
                  <div key={deal.id} className="bg-gray-700 rounded-lg p-4 cursor-move hover:bg-gray-600 transition">
                    <div className="font-medium mb-2">{deal.title}</div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">{deal.contact}</span>
                      <span className="flex items-center gap-1 text-green-400 font-medium">
                        <DollarSign size={16} />
                        {(deal.value / 1000).toFixed(0)}K
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-3 py-2 text-sm text-gray-400 hover:text-gray-200 transition">
                + Add Deal
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
