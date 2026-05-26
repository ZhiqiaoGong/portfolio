import { useState } from 'react';

export default function LeaveMessage({ onMessageSent }) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);  

  const handleSubmit = async () => {
    setLoading(true);  
    try {
      const API = import.meta.env.VITE_API_URL || 'http://localhost:3001';  
      const res = await fetch(`${API}/api/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message }),
      });
  
      if (res.ok) {
        setStatus('Message sent!');
        setName('');
        setMessage('');
        onMessageSent?.();
      } else {
        const error = await res.json();
        console.error('Server error:', error);
        setStatus('Error sending message.');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setStatus('Error sending message.');
    } finally {
      setLoading(false);  
    }
  };

  return (
    <div className="p-6 bg-gray-800 border border-gray-700 rounded-lg">
      <h3 className="text-1xl font-semibold mb-4">Leave a Message</h3>
      <input
        type="text"
        placeholder="Your name"
        className="w-full p-2 mb-2 bg-gray-700 text-white placeholder-gray-200 rounded"
        value={name}
        maxLength={50}  
        onChange={e => setName(e.target.value)}
      />
      <textarea
        placeholder="Your message"
        className="w-full p-2 mb-2 bg-gray-700 text-white placeholder-gray-200 rounded"
        value={message}
        maxLength={500}  
        onChange={e => setMessage(e.target.value)}
      />
      <button
        className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white px-5 py-2 rounded transition"
        onClick={handleSubmit}
        disabled={loading}  
      >
        {loading ? 'Sending...' : 'Leave Message'}  
      </button>
      <div className="mt-2 text-sm text-green-400">{status}</div>
    </div>
  );
}