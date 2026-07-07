import { useState } from 'react';

export default function LeaveMessage({ onMessageSent }) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState({ message: '', type: 'success' });
  const [loading, setLoading] = useState(false);  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const cleanName = name.trim();
    const cleanMessage = message.trim();
    if (!cleanName || !cleanMessage) return;

    setLoading(true);  
    try {
      const API = import.meta.env.PROD ? '' : (import.meta.env.VITE_API_URL || '');
      const res = await fetch(`${API}/api/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: cleanName, message: cleanMessage }),
      });
  
      if (res.ok) {
        setStatus({ message: 'Message sent!', type: 'success' });
        setName('');
        setMessage('');
        onMessageSent?.();
      } else {
        const error = await res.json();
        console.error('Server error:', error);
        setStatus({ message: 'Could not send your message. Please try again.', type: 'error' });
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setStatus({ message: 'Could not send your message. Please try again.', type: 'error' });
    } finally {
      setLoading(false);  
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-gray-700 bg-gray-800 p-6">
      <h3 className="text-1xl font-semibold mb-4">Leave a Message</h3>
      <label htmlFor="guest-name" className="mb-1.5 block text-sm font-medium text-gray-200">Name</label>
      <input
        id="guest-name"
        type="text"
        placeholder="Your name"
        className="w-full p-2 mb-2 bg-gray-700 text-white placeholder-gray-200 rounded"
        value={name}
        maxLength={50}  
        required
        onChange={e => setName(e.target.value)}
      />
      <label htmlFor="guest-message" className="mb-1.5 mt-3 block text-sm font-medium text-gray-200">Message</label>
      <textarea
        id="guest-message"
        placeholder="Your message"
        className="w-full p-2 mb-2 bg-gray-700 text-white placeholder-gray-200 rounded"
        value={message}
        maxLength={500}  
        required
        rows={5}
        onChange={e => setMessage(e.target.value)}
      />
      <button
        className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white px-5 py-2 rounded transition"
        type="submit"
        disabled={loading || !name.trim() || !message.trim()}
      >
        {loading ? 'Sending...' : 'Leave Message'}  
      </button>
      <div
        aria-live="polite"
        className={`mt-3 min-h-5 text-sm ${status.type === 'error' ? 'text-red-400' : 'text-green-400'}`}
      >
        {status.message}
      </div>
    </form>
  );
}
