import React, { useState, useEffect } from 'react';
import { useCallTool } from '../../hooks/useCallTool';
import '../../styles/global.css';

export default function ContactDashboard() {
  const { callTool, loading, error } = useCallTool();
  const [contacts, setContacts] = useState<any[]>([]);
  const [stats, setStats] = useState({ total: 0, recent: 0 });

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const result = await callTool('keap_list_contacts', { limit: 10 });
      if (result?.contacts) {
        setContacts(result.contacts);
        setStats({ total: result.count || 0, recent: result.contacts.length });
      }
    } catch (err) {
      console.error('Failed to load contacts:', err);
    }
  };

  return (
    <div className="app-container">
      <h1>Contact Dashboard</h1>
      
      <div className="grid grid-3" style={{ marginBottom: '24px' }}>
        <div className="card">
          <h3>Total Contacts</h3>
          <div style={{ fontSize: '32px', fontWeight: 'bold', marginTop: '8px' }}>
            {stats.total}
          </div>
        </div>
        <div className="card">
          <h3>Recent Contacts</h3>
          <div style={{ fontSize: '32px', fontWeight: 'bold', marginTop: '8px' }}>
            {stats.recent}
          </div>
        </div>
        <div className="card">
          <h3>Quick Actions</h3>
          <button className="btn" style={{ marginTop: '8px' }} onClick={loadContacts}>
            Refresh
          </button>
        </div>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="card">
        <h2>Recent Contacts</h2>
        {loading ? (
          <div className="loading">Loading contacts...</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Company</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.id}>
                  <td>{contact.given_name} {contact.family_name}</td>
                  <td>{contact.email_addresses?.[0]?.email || '-'}</td>
                  <td>{contact.phone_numbers?.[0]?.number || '-'}</td>
                  <td>{contact.company?.company_name || '-'}</td>
                  <td>{contact.date_created ? new Date(contact.date_created).toLocaleDateString() : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
