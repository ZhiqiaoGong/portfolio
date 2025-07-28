import { useEffect, useState } from 'react';
import LeaveMessage from './LeaveMessage';

export default function MessageSection() {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/messages');
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error('Failed to fetch messages:', err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <section id="messages" className="mt-20">
  <h2 className="text-2xl font-semibold mb-6">Messages</h2>
  <ul className="space-y-4 mb-10">
  {messages.map((msg) => (
  <div key={msg.id} className="mb-4">
    <div className="font-semibold">{msg.name}</div>
    <div>{msg.message}</div>
    <div className="text-xs text-gray-400">
    {new Date(msg.created_at + 'Z').toLocaleString('en-US', {
    timeZone: 'America/Los_Angeles',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })}
    </div>
  </div>
))}

</ul>


  <LeaveMessage onMessageSent={fetchMessages} />
</section>

  );
}
