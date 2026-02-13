import React, { useState } from 'react';

export default function PipelineFunnel() {
  const [stages] = useState([
    { name: 'Lead', count: 150, value: 450000, conversion: 100 },
    { name: 'Qualified', count: 85, value: 380000, conversion: 57 },
    { name: 'Proposal', count: 45, value: 290000, conversion: 30 },
    { name: 'Negotiation', count: 28, value: 225000, conversion: 19 },
    { name: 'Closed Won', count: 15, value: 142000, conversion: 10 },
  ]);

  const maxWidth = 100;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Pipeline Funnel</h1>

        <div className="bg-gray-800 rounded-lg p-8">
          <div className="space-y-6">
            {stages.map((stage, index) => {
              const widthPercent = (stage.conversion / stages[0].conversion) * maxWidth;
              
              return (
                <div key={stage.name} className="relative">
                  <div
                    className="mx-auto bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg p-6 transition-all hover:scale-105"
                    style={{ width: `${widthPercent}%` }}
                  >
                    <div className="text-center">
                      <h3 className="text-xl font-bold mb-2">{stage.name}</h3>
                      <div className="text-2xl font-bold mb-1">{stage.count} deals</div>
                      <div className="text-lg">${(stage.value / 1000).toFixed(0)}K</div>
                    </div>
                  </div>
                  
                  <div className="text-center mt-2 text-gray-400 text-sm">
                    {stage.conversion}% conversion
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-8 border-t border-gray-700">
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-400">{stages[0].count}</div>
                <div className="text-sm text-gray-400">Total Leads</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">
                  {((stages[4].count / stages[0].count) * 100).toFixed(1)}%
                </div>
                <div className="text-sm text-gray-400">Overall Conversion</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400">
                  ${(stages[4].value / 1000).toFixed(0)}K
                </div>
                <div className="text-sm text-gray-400">Revenue Closed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
