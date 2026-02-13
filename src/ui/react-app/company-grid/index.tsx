import React, { useState } from 'react';
import { Search, Building } from 'lucide-react';

interface Company {
  id: number;
  name: string;
  email: string;
  phone: string;
  contacts: number;
  revenue: number;
}

export default function CompanyGrid() {
  const [companies] = useState<Company[]>([
    { id: 1, name: 'Acme Corporation', email: 'contact@acme.com', phone: '555-1234', contacts: 28, revenue: 125000 },
    { id: 2, name: 'TechCo Industries', email: 'info@techco.com', phone: '555-5678', contacts: 15, revenue: 89000 },
    { id: 3, name: 'BigCorp LLC', email: 'hello@bigcorp.com', phone: '555-9012', contacts: 42, revenue: 234000 },
    { id: 4, name: 'StartupX', email: 'team@startupx.com', phone: '555-3456', contacts: 8, revenue: 12000 },
  ]);

  const [search, setSearch] = useState('');

  const filtered = companies.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-8">Companies</h1>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search companies..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition">
          + Add Company
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(company => (
          <div key={company.id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-blue-600 rounded-lg">
                <Building size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">{company.name}</h3>
                <div className="text-sm text-gray-400">{company.email}</div>
                <div className="text-sm text-gray-400">{company.phone}</div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-700 grid grid-cols-2 gap-4">
              <div>
                <div className="text-2xl font-bold">{company.contacts}</div>
                <div className="text-sm text-gray-400">Contacts</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">${(company.revenue / 1000).toFixed(0)}K</div>
                <div className="text-sm text-gray-400">Revenue</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
