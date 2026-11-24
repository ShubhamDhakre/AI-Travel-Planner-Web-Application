import React, { useState, useRef, useEffect } from 'react';
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Compass,
  CornerDownLeft,
  ChevronDown,
} from 'lucide-react';
import { useTrip } from '../../hooks/useTrip';
import aiService from '../../services/aiService';

const promptChips = [
  "What should I pack for this trip?",
  "Can I reduce this trip's budget?",
  "What should I visit on Day 2?",
  "What are the best local foods?",
  "Is this itinerary realistic?",
  "Suggest hidden gems",
];

export const FloatingChatWidget = () => {
  const { currentTrip } = useTrip();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hello! I am your AI Travel Concierge. ${
        currentTrip
          ? `I'm tracking your upcoming trip to **${currentTrip.destination}**. How can I help fine-tune your journey today?`
          : 'Ask me anything about dream destinations, packing advice, hidden gems, or budgeting tips!'
      }`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend) => {
    const text = textToSend || input;
    if (!text.trim() || loading) return;

    const userMsg = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await aiService.chatWithAssistant(
        [...messages, userMsg],
        currentTrip
      );

      const botMsg = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.data?.reply || 'I am ready to help you plan your ideal adventure.',
        source: response.data?.source,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const errorMsg = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I had a momentary hiccup connecting to the travel intelligence network. Please ask again!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 no-print">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-gradient-to-r from-navy-950 via-navy-900 to-turquoise-700 text-white shadow-2xl hover:shadow-glow transition-all duration-300 transform hover:scale-105 border border-white/20"
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 text-turquoise-300 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-coral-500 rounded-full border-2 border-navy-950"></span>
          </div>
          <span className="text-xs font-bold font-sans tracking-wide">
            Ask AI Assistant
          </span>
          {currentTrip && (
            <span className="hidden sm:inline-block max-w-[90px] truncate text-[10px] bg-white/20 px-2 py-0.5 rounded-full text-slate-200">
              {currentTrip.destination?.split(',')[0]}
            </span>
          )}
        </button>
      )}

      {/* Chat Drawer Window */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[400px] h-[550px] bg-white rounded-3xl shadow-2xl border border-slate-200/80 flex flex-col overflow-hidden animate-scale-in">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-navy-950 to-navy-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-turquoise-500 to-coral-500 flex items-center justify-center text-white shadow-md">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-bold flex items-center gap-1.5 font-sans">
                  TripAI Travel Concierge
                  <Sparkles className="w-3.5 h-3.5 text-turquoise-400" />
                </h4>
                <p className="text-[10px] text-slate-300">
                  {currentTrip ? `Context: ${currentTrip.destination}` : 'Online • Ready to assist'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Context Prompt Chips */}
          <div className="p-2.5 bg-slate-50 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {promptChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(chip)}
                className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-600 hover:border-coral-400 hover:text-coral-600 hover:bg-coral-50/40 whitespace-nowrap transition-all shadow-2xs"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Message History */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50">
            {messages.map((msg) => {
              const isAssistant = msg.role === 'assistant';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${isAssistant ? 'justify-start' : 'justify-end'}`}
                >
                  {isAssistant && (
                    <div className="w-7 h-7 rounded-xl bg-navy-950 text-white flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                      <Bot className="w-4 h-4 text-turquoise-400" />
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-xs ${
                      isAssistant
                        ? 'bg-white text-slate-800 border border-slate-200/70'
                        : 'bg-navy-950 text-white'
                    }`}
                  >
                    <div className="whitespace-pre-line">{msg.content}</div>
                    <div
                      className={`text-[9px] mt-1 flex items-center justify-end gap-1 ${
                        isAssistant ? 'text-slate-400' : 'text-slate-400'
                      }`}
                    >
                      <span>{msg.timestamp}</span>
                      {msg.source && <span>• {msg.source}</span>}
                    </div>
                  </div>

                  {!isAssistant && (
                    <div className="w-7 h-7 rounded-xl bg-coral-500 text-white flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {loading && (
              <div className="flex items-center gap-2 text-slate-400 text-xs py-1">
                <div className="w-7 h-7 rounded-xl bg-navy-950 text-white flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-turquoise-400 animate-spin" />
                </div>
                <div className="bg-white px-3 py-2 rounded-2xl border border-slate-200 text-slate-500 flex items-center gap-1.5 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-coral-500 animate-bounce"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-turquoise-500 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-navy-800 animate-bounce [animation-delay:0.4s]"></span>
                  <span className="text-[11px] ml-1">TripAI is typing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about your trip..."
              className="flex-1 px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-coral-500 focus:bg-white transition-all"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!input.trim() || loading}
              className="w-9 h-9 rounded-xl bg-coral-500 hover:bg-coral-600 disabled:opacity-40 text-white flex items-center justify-center shadow-sm transition-all flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingChatWidget;
