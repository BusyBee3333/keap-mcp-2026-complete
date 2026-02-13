import React, { useState } from 'react';
import { Mail, Phone, Calendar, FileText, Tag, DollarSign } from 'lucide-react';

export default function ContactTimeline() {
  const [contact] = useState({
    name: 'John Doe',
    email: 'john@example.com',
  });

  const [events] = useState([
    { id: 1, type: 'email', title: 'Sent Welcome Email', date: '2025-02-14 10:30 AM', details: 'Opened: Yes, Clicked: Yes' },
    { id: 2, type: 'note', title: 'Sales Call Notes', date: '2025-02-13 2:00 PM', details: 'Discussed enterprise plan, very interested' },
    { id: 3, type: 'tag', title: 'Added Tag: VIP', date: '2025-02-13 2:05 PM', details: 'High-value prospect' },
    { id: 4, type: 'deal', title: 'Created Deal', date: '2025-02-12 11:00 AM', details: 'Enterprise Package - $50,000' },
    { id: 5, type: 'appointment', title: 'Demo Scheduled', date: '2025-02-10 9:00 AM', details: 'Product walkthrough' },
    { id: 6, type: 'phone', title: 'Phone Call', date: '2025-02-08 3:30 PM', details: 'Initial outreach, left voicemail' },
    { id: 7, type: 'email', title: 'Received Email', date: '2025-02-05 1:15 PM', details: 'Inquiry about pricing' },
  ]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail size={20} />;
      case 'phone': return <Phone size={20} />;
      case 'appointment': return <Calendar size={20} />;
      case 'note': return <FileText size={20} />;
      case 'tag': return <Tag size={20} />;
      case 'deal': return <DollarSign size={20} />;
      default: return <FileText size={20} />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'email': return 'blue';
      case 'phone': return 'green';
      case 'appointment': return 'purple';
      case 'note': return 'gray';
      case 'tag': return 'yellow';
      case 'deal': return 'orange';
      default: return 'gray';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{contact.name}</h1>
          <div className="text-gray-400">{contact.email}</div>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-700" />

          <div className="space-y-6">
            {events.map(event => {
              const color = getColor(event.type);
              const colorClasses: Record<string, string> = {
                blue: 'bg-blue-600',
                green: 'bg-green-600',
                purple: 'bg-purple-600',
                gray: 'bg-gray-600',
                yellow: 'bg-yellow-600',
                orange: 'bg-orange-600',
              };

              return (
                <div key={event.id} className="relative pl-16">
                  {/* Icon circle */}
                  <div className={`absolute left-0 ${colorClasses[color]} p-3 rounded-full`}>
                    {getIcon(event.type)}
                  </div>

                  {/* Event card */}
                  <div className="bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{event.title}</h3>
                      <span className="text-sm text-gray-400">{event.date}</span>
                    </div>
                    <p className="text-gray-400">{event.details}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
