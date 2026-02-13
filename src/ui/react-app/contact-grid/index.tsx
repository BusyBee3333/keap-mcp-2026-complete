import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';

interface Contact {
  id: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  tags: number;
}

export default function ContactGrid() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setContacts([
      { id: 1, name: 'John Doe', email: 'john@example.com', phone: '555-1234', company: 'Acme', tags: 3 },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '555-5678', company: 'TechCo', tags: 2 },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '555-9012', company: 'StartupX', tags: 5 },
      { id: 4, name: 'Alice Williams', email: 'alice@example.com', phone: '555-3456', company: 'BigCorp', tags: 1 },
    ]);
  }, []);

  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-8">Contacts</h1>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search contacts..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="px-4 py-2 bg-gray-800 rounded-lg flex items-center gap-2 hover:bg-gray-700">
          <Filter size={20} />
          Filter
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Phone</th>
              <th className="px-6 py-3 text-left">Company</th>
              <th className="px-6 py-3 text-center">Tags</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((contact, i) => (
              <tr key={contact.id} className={i % 2 === 0 ? 'bg-gray-800' : 'bg-gray-750'}>
                <td className="px-6 py-4 font-medium">{contact.name}</td>
                <td className="px-6 py-4 text-gray-400">{contact.email}</td>
                <td className="px-6 py-4 text-gray-400">{contact.phone}</td>
                <td className="px-6 py-4 text-gray-400">{contact.company}</td>
                <td className="px-6 py-4 text-center">
                  <span className="px-2 py-1 bg-blue-600 rounded text-sm">{contact.tags}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
