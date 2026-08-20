import React, { useState } from 'react';
import { 
  Headphones, 
  Send, 
  X, 
  User, 
  Bot, 
  CheckCircle2, 
  ShieldAlert, 
  Sparkles, 
  PhoneCall, 
  RotateCcw
} from 'lucide-react';
import { Order, SupportChatMessage } from '../types';

interface HumanSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  activeOrder?: Order;
}

export const HumanSupportModal: React.FC<HumanSupportModalProps> = ({
  isOpen,
  onClose,
  orders,
  activeOrder,
}) => {
  const [isHumanAgentMode, setIsHumanAgentMode] = useState<boolean>(false);
  const [messages, setMessages] = useState<SupportChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'bot',
      text: 'Hi Pankti! Welcome to Swiggy 24/7 Priority Support. How can we help you right now?',
      timestamp: 'Just now',
      quickReplies: [
        'Connect to Live Human Agent',
        'Check Live Order Status',
        '120s Cancellation & Refund Policy',
        'Report Missing or Damaged Item'
      ]
    }
  ]);
  const [inputText, setInputText] = useState('');

  if (!isOpen) return null;

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: SupportChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Handle Quick actions / bot reply / human response
    setTimeout(() => {
      let replyText = '';
      let sender: 'bot' | 'agent' = isHumanAgentMode ? 'agent' : 'bot';

      if (query.includes('Human') || query.includes('agent') || query.includes('person') || query.includes('Connect to Live Human Agent')) {
        setIsHumanAgentMode(true);
        sender = 'agent';
        replyText = "Connected! You are now speaking directly with Priya Sharma (Senior Customer Support Lead). I have pulled up your account and active orders. How can I assist you today?";
      } else if (query.includes('Cancel') || query.includes('120s') || query.includes('Refund')) {
        replyText = "All Swiggy orders include our 120-second instant grace period! If cancelled within 120s of placement, 100% of your payment is credited back to your account immediately with zero cancellation fees.";
      } else if (query.includes('Status') || query.includes('Where')) {
        if (activeOrder) {
          replyText = `Your order #${activeOrder.id.slice(-6)} is currently ${activeOrder.status.replace('_', ' ')}. Delivery Partner ${activeOrder.rider.name} will arrive in approximately ${activeOrder.deliveryEtaMinutes} minutes.`;
        } else {
          replyText = "You don't have any pending active orders right now. Your previous orders were successfully delivered!";
        }
      } else {
        replyText = isHumanAgentMode
          ? `I understand your concern: "${query}". I am taking personal ownership of this right now. Would you like me to issue a direct call or process a credit to your Swiggy Money wallet?`
          : `Thanks for your message regarding "${query}". You can tap below to connect with a live human specialist anytime!`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now() + 1}`,
          sender,
          text: replyText,
          timestamp: 'Just now',
          quickReplies: isHumanAgentMode 
            ? ['Issue ₹100 Swiggy Money Voucher', 'Request Call Back from Lead', 'Issue Resolved, Thank You']
            : ['Connect to Live Human Agent', 'Where is my order?']
        }
      ]);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between border-l border-gray-200">
        
        {/* Header */}
        <div className="p-4 bg-[#1A1A1A] text-white flex items-center justify-between border-b border-[#1A1A1A]">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-black border border-white/20">
                {isHumanAgentMode ? <User className="w-5 h-5 text-[#E0FF4F]" /> : <Bot className="w-5 h-5 text-[#E0FF4F]" />}
              </div>
              <span className="w-3 h-3 rounded-full bg-[#E0FF4F] border-2 border-[#1A1A1A] absolute bottom-0 right-0" />
            </div>

            <div>
              <h3 className="font-black text-sm uppercase tracking-tight flex items-center gap-1.5">
                <span>{isHumanAgentMode ? 'Priya S. (Senior Support)' : 'Swiggy Quick Help'}</span>
                {isHumanAgentMode && (
                  <span className="bg-[#E0FF4F] text-[#1A1A1A] text-[9px] px-2 py-0.5 rounded-full font-black uppercase">HUMAN LEAD</span>
                )}
              </h3>
              <p className="text-[11px] text-gray-400 font-medium">
                {isHumanAgentMode ? 'Active • Responding in real-time' : 'Instant AI assistant with 1-tap Human Escalation'}
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-white rounded-full transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Priority Human Switcher Toggle (Direct UX Solution) */}
        <div className="bg-[#F3F4F1] border-b border-[#1A1A1A]/10 px-4 py-2.5 flex items-center justify-between text-xs">
          <span className="font-bold text-[#1A1A1A] uppercase text-[11px] tracking-tight flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#FC8019]" />
            <span>Prefer a real human?</span>
          </span>
          <button
            onClick={() => {
              setIsHumanAgentMode(true);
              handleSendMessage('Connect me to a live human support executive');
            }}
            className="px-3 py-1 bg-[#1A1A1A] hover:bg-[#FC8019] text-white font-black rounded-full text-[10px] uppercase tracking-wider transition-colors cursor-pointer border border-[#1A1A1A]"
          >
            {isHumanAgentMode ? '✓ Connected to Human' : 'Switch to Human Agent'}
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#F3F4F1]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-end gap-1.5 max-w-[85%]">
                {msg.sender !== 'user' && (
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-white shrink-0 ${msg.sender === 'agent' ? 'bg-[#1A1A1A] text-[#E0FF4F] border border-[#1A1A1A]' : 'bg-[#1A1A1A]'}`}>
                    {msg.sender === 'agent' ? 'P' : '🤖'}
                  </div>
                )}
                <div
                  className={`p-3.5 rounded-3xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#1A1A1A] text-[#E0FF4F] font-bold rounded-br-xs border border-[#1A1A1A]'
                      : msg.sender === 'agent'
                      ? 'bg-white border border-[#1A1A1A] text-[#1A1A1A] rounded-bl-xs font-semibold shadow-xs'
                      : 'bg-white border border-[#1A1A1A]/20 text-[#1A1A1A] rounded-bl-xs font-medium shadow-xs'
                  }`}
                >
                  {msg.text}
                </div>
              </div>

              {/* Quick replies */}
              {msg.quickReplies && (
                <div className="flex flex-wrap gap-1.5 mt-2 pl-7">
                  {msg.quickReplies.map((reply) => (
                    <button
                      key={reply}
                      onClick={() => handleSendMessage(reply)}
                      className="text-[10px] font-black uppercase tracking-wider bg-white hover:bg-[#1A1A1A] text-[#1A1A1A] hover:text-[#E0FF4F] border border-[#1A1A1A]/20 hover:border-[#1A1A1A] px-3 py-1.5 rounded-full shadow-2xs transition-colors cursor-pointer"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3.5 bg-white border-t border-[#1A1A1A]/10 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={isHumanAgentMode ? "Type message to Priya..." : "Describe your issue or question..."}
            className="flex-1 px-4 py-2.5 text-xs bg-[#F3F4F1] border border-[#1A1A1A]/20 rounded-full font-medium focus:bg-white focus:outline-hidden focus:border-[#1A1A1A]"
          />
          <button
            onClick={() => handleSendMessage()}
            className="p-2.5 bg-[#1A1A1A] hover:bg-black text-[#E0FF4F] rounded-full cursor-pointer transition-colors border border-[#1A1A1A]"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
