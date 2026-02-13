import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User } from 'lucide-react';

interface Appointment {
  id: number;
  title: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  contact: string;
}

export default function AppointmentCalendar() {
  const [appointments] = useState<Appointment[]>([
    { id: 1, title: 'Sales Call - Acme Corp', date: '2025-02-14', time: '10:00 AM', duration: '1 hour', location: 'Zoom', contact: 'John Doe' },
    { id: 2, title: 'Product Demo', date: '2025-02-14', time: '2:00 PM', duration: '45 min', location: 'Office', contact: 'Jane Smith' },
    { id: 3, title: 'Follow-up Meeting', date: '2025-02-15', time: '11:00 AM', duration: '30 min', location: 'Phone', contact: 'Bob Johnson' },
    { id: 4, title: 'Contract Review', date: '2025-02-16', time: '3:00 PM', duration: '2 hours', location: 'Conference Room', contact: 'Alice Williams' },
  ]);

  const groupByDate = () => {
    const grouped: Record<string, Appointment[]> = {};
    appointments.forEach(apt => {
      if (!grouped[apt.date]) grouped[apt.date] = [];
      grouped[apt.date].push(apt);
    });
    return grouped;
  };

  const grouped = groupByDate();

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Appointments</h1>

        <div className="mb-6">
          <button className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition">
            + New Appointment
          </button>
        </div>

        <div className="space-y-6">
          {Object.entries(grouped).map(([date, apts]) => (
            <div key={date}>
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="text-blue-400" size={20} />
                <h2 className="text-xl font-semibold">{new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</h2>
              </div>

              <div className="space-y-3">
                {apts.map(apt => (
                  <div key={apt.id} className="bg-gray-800 rounded-lg p-4 border-l-4 border-blue-500">
                    <h3 className="font-semibold text-lg mb-3">{apt.title}</h3>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Clock size={16} />
                        {apt.time} ({apt.duration})
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <MapPin size={16} />
                        {apt.location}
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <User size={16} />
                        {apt.contact}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
