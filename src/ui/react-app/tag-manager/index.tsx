import React, { useState } from 'react';
import { Tag, Users, Plus } from 'lucide-react';

interface TagData {
  id: number;
  name: string;
  description: string;
  contact_count: number;
  color: string;
}

export default function TagManager() {
  const [tags] = useState<TagData[]>([
    { id: 1, name: 'Customer', description: 'Active customers', contact_count: 234, color: 'blue' },
    { id: 2, name: 'Lead', description: 'Potential customers', contact_count: 567, color: 'yellow' },
    { id: 3, name: 'VIP', description: 'High-value customers', contact_count: 45, color: 'purple' },
    { id: 4, name: 'Newsletter', description: 'Newsletter subscribers', contact_count: 1234, color: 'green' },
    { id: 5, name: 'Event Attendee', description: 'Attended events', contact_count: 89, color: 'orange' },
    { id: 6, name: 'Trial', description: 'Free trial users', contact_count: 156, color: 'cyan' },
  ]);

  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-600',
    yellow: 'bg-yellow-600',
    purple: 'bg-purple-600',
    green: 'bg-green-600',
    orange: 'bg-orange-600',
    cyan: 'bg-cyan-600',
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Tag Manager</h1>
          <button className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
            <Plus size={20} />
            Create Tag
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tags.map(tag => (
            <div key={tag.id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition">
              <div className="flex items-start gap-4">
                <div className={`p-3 ${colorClasses[tag.color]} rounded-lg`}>
                  <Tag size={24} />
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">{tag.name}</h3>
                  <p className="text-sm text-gray-400 mb-3">{tag.description}</p>

                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Users size={16} />
                    {tag.contact_count} contacts
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-700 flex gap-2">
                <button className="flex-1 py-2 bg-gray-700 rounded hover:bg-gray-600 transition text-sm">
                  View Contacts
                </button>
                <button className="flex-1 py-2 bg-gray-700 rounded hover:bg-gray-600 transition text-sm">
                  Edit Tag
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
