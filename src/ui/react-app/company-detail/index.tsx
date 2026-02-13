import React, { useState } from 'react';
import { Building, Mail, Phone, Globe, MapPin, Users } from 'lucide-react';

export default function CompanyDetail() {
  const [company] = useState({
    id: 1,
    name: 'Acme Corporation',
    email: 'contact@acme.com',
    phone: '+1 (555) 987-6543',
    website: 'https://acme.com',
    address: '123 Business Ave, Suite 100, San Francisco, CA 94105',
    total_contacts: 28,
    total_deals: 5,
    total_revenue: 125000,
  });

  const contacts = [
    { id: 1, name: 'John Doe', title: 'CEO', email: 'john@acme.com' },
    { id: 2, name: 'Jane Smith', title: 'CTO', email: 'jane@acme.com' },
    { id: 3, name: 'Bob Johnson', title: 'VP Sales', email: 'bob@acme.com' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">{company.name}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <InfoCard icon={<Mail />} label="Email" value={company.email} />
          <InfoCard icon={<Phone />} label="Phone" value={company.phone} />
          <InfoCard icon={<Globe />} label="Website" value={company.website} />
          <InfoCard icon={<MapPin />} label="Address" value={company.address} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard label="Contacts" value={company.total_contacts} />
          <StatCard label="Active Deals" value={company.total_deals} />
          <StatCard label="Total Revenue" value={`$${(company.total_revenue / 1000).toFixed(0)}K`} />
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="text-blue-400" />
            <h2 className="text-xl font-semibold">Key Contacts</h2>
          </div>
          <div className="space-y-3">
            {contacts.map(contact => (
              <div key={contact.id} className="p-4 bg-gray-700 rounded">
                <div className="font-medium">{contact.name}</div>
                <div className="text-sm text-gray-400">{contact.title}</div>
                <div className="text-sm text-blue-400 mt-1">{contact.email}</div>
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

function StatCard({ label, value }: any) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 text-center">
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-gray-400">{label}</div>
    </div>
  );
}
