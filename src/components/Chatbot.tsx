'use client';

import { useState, FormEvent, ChangeEvent, useEffect, useRef } from 'react';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Referanse til selve rulle-containeren
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (force: boolean = false) => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      
      // Definerer om brukeren er "nær bunnen" (innenfor 100 piksler)
      const isAtBottom = scrollHeight - scrollTop <= clientHeight + 100;

      // Rull ned hvis vi tvinger det (f.eks. ved ny egen melding) 
      // eller hvis brukeren allerede er i bunnen når svar kommer
      if (force || isAtBottom) {
        scrollContainerRef.current.scrollTo({
          top: scrollHeight,
          behavior: 'smooth',
        });
      }
    }
  };

  // Kjør rulling når meldinger endres eller loading starter/slutter
  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    
    // Tving rulling til bunns når brukeren selv sender melding
    setTimeout(() => scrollToBottom(true), 50);

    try {
      const response = await fetch('/api/rag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error getting response' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-1/2 w-md shadow-2xl">
      {/* Chat header */}
      <div className="bg-gray-900 text-white p-4 rounded-t-lg">
        <h1 className="text-xl font-bold text-center">Chat med Nevrale Nils</h1>
      </div>
      
      {/* Messages container - Det er denne som har scrollen */}
      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto bg-gray-100 p-4 space-y-4"
      >
        {messages.filter(msg => msg.role !== 'system').map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg ${
                msg.role === 'user'
                  ? 'bg-gray-900 text-white rounded-br-none'
                  : 'bg-white text-gray-900 shadow rounded-bl-none'
              }`}
            >
              <p className="text-sm font-semibold mb-1">
                {msg.role === 'user' ? 'You' : 'Nevrale Nils'}
              </p>
              <p className="whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 shadow px-4 py-2 rounded-lg rounded-bl-none">
              <p className="text-sm font-semibold mb-1">Nevrale Nils</p>
              <p className="text-gray-900 italic">Skriver...</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Input form */}
      <form onSubmit={sendMessage} className="bg-gray-900 p-4 flex gap-2 rounded-b-lg">
        <input
          value={input}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
          placeholder="Skriv en melding..."
          className="flex-1 bg-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-900 text-gray-900"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="bg-cyan-800 text-gray-100 px-6 py-2 rounded-lg hover:bg-cyan-700 disabled:bg-cyan-900 disabled:cursor-not-allowed transition"
        >
          Send
        </button>
      </form>
    </div>
  );
}