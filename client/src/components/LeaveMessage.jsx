import { useState } from 'react';

export default function LeaveMessage({ onMessageSent }) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/messages', {
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
        onChange={e => setName(e.target.value)}
      />
      <textarea
        placeholder="Your message"
        className="w-full p-2 mb-2 bg-gray-700 text-white placeholder-gray-200 rounded"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded transition"
        onClick={handleSubmit}
      >
        Leave Message
      </button>
      <div className="mt-2 text-sm text-green-400">{status}</div>
    </div>
  );
}
