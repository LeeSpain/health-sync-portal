
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Search, Plus, Send, Paperclip, Star, Clock } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import FadeIn from '@/components/animations/FadeIn';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

// Mock data for messages
const conversations = [
  {
    id: 1,
    contact: {
      name: 'Emma Thompson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      online: true
    },
    lastMessage: "Thanks for the appointment reminder!",
    time: '10:45 AM',
    unread: true,
  },
  {
    id: 2,
    contact: {
      name: 'John Martinez',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      online: false
    },
    lastMessage: "I'll need to reschedule my appointment on Thursday.",
    time: 'Yesterday',
    unread: false,
  },
  {
    id: 3,
    contact: {
      name: 'Lisa Chen',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      online: true
    },
    lastMessage: "Do I need to bring anything for my first appointment?",
    time: 'Yesterday',
    unread: true,
  },
  {
    id: 4,
    contact: {
      name: 'Robert Wilson',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      online: false
    },
    lastMessage: "Thank you for the care plan, it's very helpful.",
    time: 'Monday',
    unread: false,
  },
  {
    id: 5,
    contact: {
      name: 'Sophia Garcia',
      avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      online: false
    },
    lastMessage: "I've sent over my medical records.",
    time: 'Last week',
    unread: false,
  },
];

// Mock data for the active conversation
const messageThread = [
  {
    id: 1,
    sender: 'user',
    content: "Hi Emma, I'm sending over your appointment reminder for tomorrow at 10:00 AM. Please let me know if you need to reschedule.",
    time: '10:30 AM'
  },
  {
    id: 2,
    sender: 'contact',
    content: "Thanks for the appointment reminder! I'll be there on time.",
    time: '10:45 AM'
  },
  {
    id: 3,
    sender: 'user',
    content: "Great! I've prepared your care plan update that we'll review tomorrow. Do you have any specific concerns you'd like to discuss?",
    time: '11:00 AM'
  },
];

const Messages = () => {
  const [activeConversation, setActiveConversation] = useState(conversations[0]);
  const [messageText, setMessageText] = useState('');

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // In a real app, you would send the message to the backend here
      setMessageText('');
    }
  };

  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Messages</h1>
              <p className="text-gray-600 dark:text-gray-300">Communicate with your clients</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button className="bg-nurse-600 hover:bg-nurse-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                New Message
              </Button>
            </div>
          </div>
        </FadeIn>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Conversations List */}
          <FadeIn delay={100} className="lg:col-span-4">
            <GlassCard className="h-[calc(100vh-240px)] flex flex-col">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Search messages..." 
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                {conversations.map((conversation) => (
                  <div 
                    key={conversation.id}
                    className={`p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors ${
                      activeConversation.id === conversation.id ? 'bg-gray-50 dark:bg-gray-800' : ''
                    }`}
                    onClick={() => setActiveConversation(conversation)}
                  >
                    <div className="flex items-center">
                      <div className="relative mr-3">
                        <img 
                          src={conversation.contact.avatar} 
                          alt={conversation.contact.name} 
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        {conversation.contact.online && (
                          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"></span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {conversation.contact.name}
                          </h3>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {conversation.time}
                          </span>
                        </div>
                        <p className={`text-xs truncate ${
                          conversation.unread 
                            ? 'font-medium text-gray-900 dark:text-white' 
                            : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {conversation.lastMessage}
                        </p>
                      </div>
                      {conversation.unread && (
                        <span className="ml-2 h-2 w-2 rounded-full bg-nurse-600"></span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </FadeIn>
          
          {/* Conversation View */}
          <FadeIn delay={150} className="lg:col-span-8">
            <GlassCard className="h-[calc(100vh-240px)] flex flex-col">
              {/* Header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="relative mr-3">
                    <img 
                      src={activeConversation.contact.avatar} 
                      alt={activeConversation.contact.name} 
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    {activeConversation.contact.online && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"></span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      {activeConversation.contact.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {activeConversation.contact.online ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon">
                    <Star className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Clock className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  </Button>
                </div>
              </div>
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messageThread.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === 'user' 
                          ? 'bg-nurse-100 text-gray-900 dark:bg-nurse-900 dark:text-white' 
                          : 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 text-right mt-1">
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Message Input */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-end space-x-2">
                  <Textarea
                    placeholder="Type your message..."
                    className="flex-1 min-h-[80px]"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                  />
                  <div className="flex flex-col space-y-2">
                    <Button variant="ghost" size="icon">
                      <Paperclip className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    </Button>
                    <Button 
                      className="bg-nurse-600 hover:bg-nurse-700 text-white"
                      onClick={handleSendMessage}
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </GlassCard>
          </FadeIn>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Messages;
