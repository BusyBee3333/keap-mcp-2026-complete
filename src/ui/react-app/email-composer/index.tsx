import React, { useState } from 'react';
import { Send, Paperclip, Image } from 'lucide-react';

export default function EmailComposer() {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleSend = () => {
    console.log('Sending email:', { to, subject, body });
    // In real app, call MCP keap_send_email tool
    alert('Email sent!');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Compose Email</h1>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">To</label>
              <input
                type="email"
                value={to}
                onChange={e => setTo(e.target.value)}
                placeholder="recipient@example.com"
                className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                placeholder="Email subject"
                className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                value={body}
                onChange={e => setBody(e.target.value)}
                placeholder="Compose your email..."
                rows={12}
                className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-700">
              <div className="flex gap-2">
                <button className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition">
                  <Paperclip size={20} />
                </button>
                <button className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition">
                  <Image size={20} />
                </button>
              </div>

              <button
                onClick={handleSend}
                className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
              >
                <Send size={20} />
                Send Email
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-gray-800 rounded-lg p-4">
          <h2 className="font-semibold mb-3">Email Templates</h2>
          <div className="space-y-2">
            <button className="block w-full text-left px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition">
              Welcome Email
            </button>
            <button className="block w-full text-left px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition">
              Follow-up Template
            </button>
            <button className="block w-full text-left px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition">
              Thank You Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
