import { useEffect, useState } from 'react';
import LeaveMessage from './LeaveMessage';
import Reveal from './Reveal';

export default function MessageSection() {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const API = import.meta.env.VITE_API_URL || 'http://localhost:3001';  
      const res = await fetch(`${API}/api/messages`); 
      if (!res.ok) throw new Error('Failed to fetch messages');
      const data = await res.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch messages:', err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <section id="messages" className="mt-24 scroll-mt-28 md:scroll-mt-8">
  <Reveal>
  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">Let’s connect</p>
  <h2 className="mb-2 mt-2 text-3xl font-semibold tracking-tight">Say Hello</h2>
  <p className="mb-8 text-gray-400">Have a question or want to build something together? Leave a public note below.</p>
  </Reveal>
  <ul className="space-y-4 mb-10">
  {messages.map((msg) => (
  <li key={msg.id} className="rounded-lg border border-gray-800 bg-gray-800/30 p-4">
    <div className="font-semibold">{msg.name}</div>
    <div>{msg.message}</div>
    <div className="text-xs text-gray-400">
    {new Date(msg.created_at.replace(' ', 'T').split('.')[0] + 'Z').toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })}

    </div>
  </li>
))}

</ul>


  <LeaveMessage onMessageSent={fetchMessages} />
</section>

  );
}
