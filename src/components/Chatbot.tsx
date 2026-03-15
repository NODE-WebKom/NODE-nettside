'use client';

import { useState, FormEvent, useEffect, useRef } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 100;
    if (isNearBottom) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;

    const userMessage: Message = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsStreaming(true);
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });

    try {
      const response = await fetch('/api/rag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok || !response.body) throw new Error('Request failed');

      setMessages((prev: Message[]) => [...prev, { role: 'assistant', content: '' }]);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        setMessages((prev: Message[]) => {
          const msgs = [...prev];
          msgs[msgs.length - 1] = {
            ...msgs[msgs.length - 1],
            content: msgs[msgs.length - 1].content + chunk,
          };
          return msgs;
        });
      }
    } catch {
      setMessages((prev: Message[]) => [
        ...prev,
        { role: 'assistant', content: 'Noe gikk galt. Prøv igjen.' },
      ]);
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-md h-[clamp(300px,calc(100vh-8rem),500px)] rounded-xl shadow-lg overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="px-4 py-3 bg-gray-900 text-white shrink-0">
        <p className="text-sm font-semibold">Nevrale Nils</p>
      </div>

      {/* Messages */}
      <div ref={containerRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.length === 0 && (
          <p className="text-center text-sm text-gray-400 mt-8">
            Spør meg om studieprogrammet!
          </p>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm ${
                msg.role === 'user'
                  ? 'bg-gray-900 text-white rounded-br-sm'
                  : 'bg-white text-gray-900 border border-gray-200 rounded-bl-sm'
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.content || '...'}</p>
            </div>
          </div>
        ))}
        {/* Typing indicator: shown when streaming but assistant message not yet added */}
        {isStreaming && messages[messages.length - 1]?.role === 'user' && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 px-3 py-2 rounded-2xl rounded-bl-sm text-sm text-gray-400">
              ...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={sendMessage}
        className="flex gap-2 p-3 border-t border-gray-200 bg-white shrink-0"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Skriv en melding..."
          disabled={isStreaming}
          className="flex-1 text-sm bg-gray-100 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300 text-gray-900 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isStreaming || !input.trim()}
          className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  );
}
