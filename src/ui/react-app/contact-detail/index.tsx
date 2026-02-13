import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Building, Calendar, Tag as TagIcon } from 'lucide-react';

interface Contact {
  id: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  created: string;
  tags: string[];
  notes: Array<{ id: number; body: string; date: string }>;
}

export default function ContactDetail() {
  const [contact, setContact] = useState<Contact | null>(null);

  useEffect(() => {
    // Simulated data
    setContact({
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      company: 'Acme Corp',
      created: '2025-01-15',
      tags: ['Customer', 'VIP', 'Newsletter'],
      notes: [
        { id: 1, body: 'Interested in premium plan', date: '2025-02-10' },
        { id: 2, body: 'Follow up next week', date: '2025-02-12' },
      ],
    });
  }, []);

  if (!contact) return <div className="min-h-screen bg-gray-900 text-gray-100 p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">{contact.name}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <InfoCard icon={<Mail />} label="Email" value={contact.email} />
          <InfoCard icon={<Phone />} label="Phone" value={contact.phone || 'N/A'} />
          <InfoCard icon={<Building />} label="Company" value={contact.company || 'N/A'} />
          <InfoCard icon={<Calendar />} label="Created" value={contact.created} />
        </div>

        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <TagIcon size={20} />
            <h2 className="text-xl font-semibold">Tags</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {contact.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-blue-600 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Notes</h2>
          <div className="space-y-3">
            {contact.notes.map(note => (
              <div key={note.id} className="p-4 bg-gray-700 rounded">
                <div className="text-gray-300 mb-2">{note.body}</div>
                <div className="text-sm text-gray-400">{note.date}</div>
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
