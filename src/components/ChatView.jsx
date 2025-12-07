import { useState, useRef, useEffect } from 'react';
import Markdown from 'react-markdown';
import * as api from '../api';

export default function ChatView({ onItemsChange }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Focus input on mount
    inputRef.current?.focus();
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await api.sendChatMessage(newMessages);
      setMessages([...newMessages, { role: 'assistant', content: response.message }]);
      // Notify parent that items might have changed
      if (onItemsChange) {
        onItemsChange();
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages([
        ...newMessages,
        { role: 'assistant', content: `Sorry, I encountered an error: ${error.message}. Please try again.` }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    return 'evening';
  };

  const getGreeting = () => {
    const timeOfDay = getTimeOfDay();
    if (timeOfDay === 'morning') {
      return "Good morning. What would you like to bring into reality today?";
    } else if (timeOfDay === 'afternoon') {
      return "Good afternoon. How is your day unfolding? What are you working on?";
    } else {
      return "Good evening. Ready to reflect on what you brought into reality today?";
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col relative">
      {/* Dot grid background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #d6d3d1 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Skull watermark - emerging through dots */}
      <div className="fixed inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <div
          className="relative"
          style={{
            width: '60vmin',
            height: '60vmin',
            maxWidth: '400px',
            maxHeight: '400px',
          }}
        >
          {/* Shadow layer for depth */}
          <img
            src="/favicon.svg"
            alt=""
            className="absolute inset-0 w-full h-full"
            style={{
              opacity: 0.03,
              filter: 'blur(8px)',
              transform: 'translate(4px, 4px) scale(1.02)',
            }}
          />
          {/* Main skull with mask effect */}
          <img
            src="/favicon.svg"
            alt=""
            className="absolute inset-0 w-full h-full"
            style={{
              opacity: 0.06,
              filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.05))',
            }}
          />
          {/* Highlight layer for 3D emergence */}
          <img
            src="/favicon.svg"
            alt=""
            className="absolute inset-0 w-full h-full"
            style={{
              opacity: 0.02,
              filter: 'blur(1px)',
              transform: 'translate(-2px, -2px)',
              mixBlendMode: 'overlay',
            }}
          />
        </div>
      </div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-stone-200 p-4 sm:p-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif font-normal tracking-tight text-stone-800">
                Useful Work
              </h1>
              <p className="text-stone-500 italic text-sm">
                Conversational Mode
              </p>
            </div>
            {messages.length > 0 && (
              <button
                onClick={clearChat}
                className="text-sm text-stone-400 hover:text-stone-600 transition-colors"
              >
                Clear chat
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 relative z-10">
        <div className="max-w-2xl mx-auto space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-stone-100 mb-4">
                <svg className="w-8 h-8 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h2 className="text-xl font-serif text-stone-700 mb-2">
                {getGreeting()}
              </h2>
              <p className="text-stone-500 text-sm max-w-md mx-auto">
                I can help you plan your day, reflect on your work, and track your progress across the four axes of useful work.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {[
                  "Help me plan my day",
                  "What's on my list?",
                  "Let's reflect on today",
                  "Explain the four axes"
                ].map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInput(suggestion)}
                    className="px-3 py-1.5 text-sm bg-white border border-stone-200 rounded-full text-stone-600 hover:bg-stone-50 hover:border-stone-300 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 ${
                    msg.role === 'user'
                      ? 'bg-stone-800 text-white rounded-br-md'
                      : 'bg-white border border-stone-200 text-stone-700 rounded-bl-md shadow-sm'
                  }`}
                >
                  {msg.role === 'user' ? (
                    <div className="text-sm sm:text-base whitespace-pre-wrap leading-relaxed">
                      {msg.content}
                    </div>
                  ) : (
                    <div className="text-sm sm:text-base leading-relaxed prose prose-stone prose-sm max-w-none prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0.5 prose-strong:text-stone-800 prose-headings:text-stone-800 prose-headings:font-semibold prose-h1:text-base prose-h2:text-base prose-h3:text-sm">
                      <Markdown>{msg.content}</Markdown>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-stone-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                  <span className="text-stone-400 text-sm">Thinking...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white/80 backdrop-blur-sm border-t border-stone-200 p-4 sm:p-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="What would you like to bring into reality?"
                rows={1}
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 placeholder-stone-400 focus:outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-100 transition-all resize-none text-sm sm:text-base"
                style={{ minHeight: '48px', maxHeight: '120px' }}
                onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
                }}
              />
            </div>
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className={`px-4 sm:px-5 py-3 rounded-xl font-medium text-sm transition-all flex items-center gap-2 ${
                input.trim() && !isLoading
                  ? 'bg-stone-800 text-white hover:bg-stone-700'
                  : 'bg-stone-100 text-stone-400 cursor-not-allowed'
              }`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span className="hidden sm:inline">Send</span>
            </button>
          </div>
          <p className="text-xs text-stone-400 mt-2 text-center">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}
