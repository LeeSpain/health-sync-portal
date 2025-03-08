import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { 
  Search, Plus, Send, Paperclip, Star, Clock, Video, Phone, 
  Users, UserPlus, X, Mic, MicOff, PlusCircle, FileText
} from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import FadeIn from '@/components/animations/FadeIn';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const conversations = [
  {
    id: 1,
    contact: {
      name: 'Emma Thompson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      online: true,
      role: 'Client'
    },
    lastMessage: "Thanks for the appointment reminder!",
    time: '10:45 AM',
    unread: true,
    participants: ['Emma Thompson', 'Michael Thompson (Husband)']
  },
  {
    id: 2,
    contact: {
      name: 'John Martinez',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      online: false,
      role: 'Client'
    },
    lastMessage: "I'll need to reschedule my appointment on Thursday.",
    time: 'Yesterday',
    unread: false,
    participants: ['John Martinez']
  },
  {
    id: 3,
    contact: {
      name: 'Lisa Chen',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      online: true,
      role: 'Care Team'
    },
    lastMessage: "Do I need to bring anything for my first appointment?",
    time: 'Yesterday',
    unread: true,
    participants: ['Lisa Chen', 'Emma Thompson', 'Dr. Sarah Johnson']
  },
  {
    id: 4,
    contact: {
      name: 'Robert Wilson',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      online: false,
      role: 'Client'
    },
    lastMessage: "Thank you for the care plan, it's very helpful.",
    time: 'Monday',
    unread: false,
    participants: ['Robert Wilson', 'Sophia Wilson (Wife)']
  },
  {
    id: 5,
    contact: {
      name: 'Care Team - Williams Case',
      avatar: '',
      online: false,
      role: 'Group'
    },
    lastMessage: "I've sent over my medical records.",
    time: 'Last week',
    unread: false,
    participants: ['Dr. Robert Williams', 'Lisa Chen', 'Sarah Johnson', 'Mark Davis']
  },
];

const contacts = [
  {
    id: 1,
    name: 'Emma Thompson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    role: 'Client',
    email: 'emma.thompson@example.com'
  },
  {
    id: 2,
    name: 'John Martinez',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    role: 'Client',
    email: 'john.martinez@example.com'
  },
  {
    id: 3,
    name: 'Lisa Chen',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    role: 'Care Team',
    email: 'lisa.chen@example.com'
  },
  {
    id: 4,
    name: 'Dr. Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    role: 'Doctor',
    email: 'sarah.johnson@example.com'
  },
  {
    id: 5,
    name: 'Michael Thompson',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    role: 'Family',
    email: 'michael.thompson@example.com'
  },
];

const messageThread = [
  {
    id: 1,
    sender: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      role: 'Nurse'
    },
    content: "Hi Emma, I'm sending over your appointment reminder for tomorrow at 10:00 AM. Please let me know if you need to reschedule.",
    time: '10:30 AM',
    date: 'Today'
  },
  {
    id: 2,
    sender: {
      name: 'Emma Thompson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      role: 'Client'
    },
    content: "Thanks for the appointment reminder! I'll be there on time.",
    time: '10:45 AM',
    date: 'Today'
  },
  {
    id: 3,
    sender: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      role: 'Nurse'
    },
    content: "Great! I've prepared your care plan update that we'll review tomorrow. Do you have any specific concerns you'd like to discuss?",
    time: '11:00 AM',
    date: 'Today'
  },
  {
    id: 4,
    sender: {
      name: 'Michael Thompson',
      avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      role: 'Family'
    },
    content: "Hello, Emma asked me to join the discussion. She's been experiencing some mild headaches in the evenings. Should we discuss that during the appointment?",
    time: '11:15 AM',
    date: 'Today'
  },
  {
    id: 5,
    sender: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      role: 'Nurse'
    },
    content: "Absolutely, Michael. I'll make a note of that and we can discuss it during the appointment. Thanks for letting me know!",
    time: '11:30 AM',
    date: 'Today'
  },
];

const Messages = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [activeConversation, setActiveConversation] = useState(conversations[0]);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [isAddParticipantOpen, setIsAddParticipantOpen] = useState(false);
  const [isNewMessageOpen, setIsNewMessageOpen] = useState(false);
  const [newMessageRecipients, setNewMessageRecipients] = useState<string[]>([]);
  const [newMessageText, setNewMessageText] = useState('');

  const handleSendMessage = () => {
    if (messageText.trim()) {
      toast({
        description: "Message sent successfully",
      });
      setMessageText('');
    }
  };

  const startVideoCall = () => {
    setIsVideoCallActive(true);
    toast({
      title: `Video call started with ${activeConversation.contact.name}`,
      description: "Connected successfully",
    });
  };

  const endVideoCall = () => {
    setIsVideoCallActive(false);
    setIsAudioMuted(false);
    setIsVideoMuted(false);
    toast({
      description: "Video call ended",
    });
  };

  const toggleAudio = () => {
    setIsAudioMuted(!isAudioMuted);
    toast({
      description: isAudioMuted ? "Microphone unmuted" : "Microphone muted",
    });
  };

  const toggleVideo = () => {
    setIsVideoMuted(!isVideoMuted);
    toast({
      description: isVideoMuted ? "Camera turned on" : "Camera turned off",
    });
  };

  const handleCreateNewMessage = () => {
    if (newMessageRecipients.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one recipient",
        variant: "destructive"
      });
      return;
    }

    if (!newMessageText.trim()) {
      toast({
        title: "Error",
        description: "Please enter a message",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Success",
      description: "New message conversation created",
    });
    
    setIsNewMessageOpen(false);
    setNewMessageRecipients([]);
    setNewMessageText('');
  };

  const filteredConversations = conversations.filter(conversation => 
    conversation.contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const clientId = params.get('clientId');
    
    if (clientId) {
      const conversation = conversations.find(c => c.id.toString() === clientId);
      if (conversation) {
        setActiveConversation(conversation);
      }
    }
  }, [location.search]);

  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Messages</h1>
              <p className="text-gray-600 dark:text-gray-300">Communicate with your clients and care team</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <Button 
                variant="outline" 
                onClick={() => setIsAddParticipantOpen(true)}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Add to Chat
              </Button>
              <Button 
                className="bg-nurse-600 hover:bg-nurse-700 text-white"
                onClick={() => setIsNewMessageOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                New Message
              </Button>
            </div>
          </div>
        </FadeIn>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <FadeIn delay={100} className="lg:col-span-4">
            <GlassCard className="h-[calc(100vh-240px)] flex flex-col">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Search messages..." 
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                {filteredConversations.map((conversation) => (
                  <div 
                    key={conversation.id}
                    className={`p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors ${
                      activeConversation.id === conversation.id ? 'bg-gray-50 dark:bg-gray-800' : ''
                    }`}
                    onClick={() => setActiveConversation(conversation)}
                  >
                    <div className="flex items-center">
                      <div className="relative mr-3">
                        {conversation.contact.avatar ? (
                          <img 
                            src={conversation.contact.avatar} 
                            alt={conversation.contact.name} 
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-nurse-200 dark:bg-nurse-800 flex items-center justify-center">
                            <Users className="h-5 w-5 text-nurse-600 dark:text-nurse-300" />
                          </div>
                        )}
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
                        <div className="flex items-center">
                          <Badge variant="outline" className="mr-2 px-1 py-0 text-xs">
                            {conversation.contact.role}
                          </Badge>
                          <p className={`text-xs truncate ${
                            conversation.unread 
                              ? 'font-medium text-gray-900 dark:text-white' 
                              : 'text-gray-500 dark:text-gray-400'
                          }`}>
                            {conversation.lastMessage}
                          </p>
                        </div>
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
          
          <FadeIn delay={150} className="lg:col-span-8">
            <GlassCard className="h-[calc(100vh-240px)] flex flex-col">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="relative mr-3">
                    {activeConversation.contact.avatar ? (
                      <img 
                        src={activeConversation.contact.avatar} 
                        alt={activeConversation.contact.name} 
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-nurse-200 dark:bg-nurse-800 flex items-center justify-center">
                        <Users className="h-5 w-5 text-nurse-600 dark:text-nurse-300" />
                      </div>
                    )}
                    {activeConversation.contact.online && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"></span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
                      {activeConversation.contact.name}
                      <Badge variant="outline" className="ml-2 px-1 py-0 text-xs">
                        {activeConversation.contact.role}
                      </Badge>
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {activeConversation.contact.online ? 'Online' : 'Offline'} • {activeConversation.participants.length} participants
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Users className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm mb-2">Participants</h4>
                        {activeConversation.participants.map((participant, idx) => (
                          <div key={idx} className="flex items-center justify-between">
                            <span className="text-sm">{participant}</span>
                          </div>
                        ))}
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full mt-2"
                          onClick={() => setIsAddParticipantOpen(true)}
                        >
                          <UserPlus className="h-4 w-4 mr-2" />
                          Add Participant
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                  <Button variant="ghost" size="icon" onClick={startVideoCall}>
                    <Video className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Phone className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  </Button>
                </div>
              </div>
              
              <Dialog open={isVideoCallActive} onOpenChange={setIsVideoCallActive}>
                <DialogContent className="sm:max-w-[800px]">
                  <DialogHeader>
                    <DialogTitle>Video Call with {activeConversation.contact.name}</DialogTitle>
                  </DialogHeader>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                      {isVideoMuted ? (
                        <div className="text-white text-center">
                          <Avatar className="h-20 w-20 mx-auto mb-2">
                            <AvatarImage src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80" />
                            <AvatarFallback>SJ</AvatarFallback>
                          </Avatar>
                          <p>Your camera is off</p>
                        </div>
                      ) : (
                        <div className="h-full w-full bg-gray-800 rounded-lg relative">
                          <div className="absolute bottom-2 left-2 text-white text-xs">You</div>
                        </div>
                      )}
                    </div>
                    
                    <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                      <div className="text-white text-center">
                        <Avatar className="h-20 w-20 mx-auto mb-2">
                          <AvatarImage src={activeConversation.contact.avatar} />
                          <AvatarFallback>
                            {activeConversation.contact.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <p>{activeConversation.contact.name}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center space-x-4 mt-4">
                    <Button 
                      variant={isAudioMuted ? "destructive" : "outline"} 
                      size="icon"
                      onClick={toggleAudio}
                    >
                      {isAudioMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                    </Button>
                    <Button 
                      variant={isVideoMuted ? "destructive" : "outline"} 
                      size="icon"
                      onClick={toggleVideo}
                    >
                      {isVideoMuted ? <Video className="h-5 w-5" /> : <Video className="h-5 w-5" />}
                    </Button>
                    <Button variant="destructive" onClick={endVideoCall}>
                      End Call
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Dialog open={isAddParticipantOpen} onOpenChange={setIsAddParticipantOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Participants</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <Input placeholder="Search contacts..." />
                    <div className="space-y-2 max-h-[300px] overflow-y-auto">
                      {contacts.map((contact) => (
                        <div 
                          key={contact.id} 
                          className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                        >
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src={contact.avatar} />
                              <AvatarFallback>
                                {contact.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{contact.name}</p>
                              <p className="text-xs text-gray-500">{contact.role}</p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">Add</Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddParticipantOpen(false)}>Cancel</Button>
                    <Button>Add Selected</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <Dialog open={isNewMessageOpen} onOpenChange={setIsNewMessageOpen}>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>New Message</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div>
                      <Label htmlFor="recipients">Recipients</Label>
                      <div className="flex flex-wrap gap-2 p-2 border rounded-md">
                        {newMessageRecipients.map((recipient, idx) => (
                          <Badge key={idx} variant="secondary" className="flex items-center gap-1">
                            {recipient}
                            <X 
                              className="h-3 w-3 cursor-pointer" 
                              onClick={() => setNewMessageRecipients(prev => prev.filter(r => r !== recipient))}
                            />
                          </Badge>
                        ))}
                        <Input 
                          id="recipients"
                          placeholder="Type a name..." 
                          className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-7"
                        />
                      </div>
                    </div>
                    
                    <div className="max-h-[200px] overflow-y-auto border rounded-md p-2">
                      {contacts.map((contact) => (
                        <div 
                          key={contact.id} 
                          className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md cursor-pointer"
                          onClick={() => {
                            if (!newMessageRecipients.includes(contact.name)) {
                              setNewMessageRecipients(prev => [...prev, contact.name]);
                            }
                          }}
                        >
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src={contact.avatar} />
                              <AvatarFallback>
                                {contact.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{contact.name}</p>
                              <p className="text-xs text-gray-500">{contact.role}</p>
                            </div>
                          </div>
                          <Button 
                            size="sm" 
                            variant={newMessageRecipients.includes(contact.name) ? "default" : "outline"}
                          >
                            {newMessageRecipients.includes(contact.name) ? "Added" : "Add"}
                          </Button>
                        </div>
                      ))}
                    </div>
                    
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea 
                        id="message"
                        placeholder="Type your message..."
                        rows={4}
                        value={newMessageText}
                        onChange={(e) => setNewMessageText(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsNewMessageOpen(false)}>Cancel</Button>
                    <Button onClick={handleCreateNewMessage}>Send Message</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <Tabs defaultValue="chat" className="flex-1 flex flex-col">
                <TabsList className="mx-4 my-2 justify-start">
                  <TabsTrigger value="chat">Chat</TabsTrigger>
                  <TabsTrigger value="care-plan">Care Plan</TabsTrigger>
                  <TabsTrigger value="files">Files</TabsTrigger>
                </TabsList>
                
                <TabsContent value="chat" className="flex-1 flex flex-col px-4 overflow-hidden">
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messageThread.map((message) => (
                      <div 
                        key={message.id} 
                        className={`flex ${message.sender.name === 'Sarah Johnson' ? 'justify-end' : 'justify-start'}`}
                      >
                        {message.sender.name !== 'Sarah Johnson' && (
                          <Avatar className="h-8 w-8 mr-2 mt-1">
                            <AvatarImage src={message.sender.avatar} />
                            <AvatarFallback>
                              {message.sender.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        
                        <div 
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.sender.name === 'Sarah Johnson' 
                              ? 'bg-nurse-100 text-gray-900 dark:bg-nurse-900 dark:text-white' 
                              : 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
                          }`}
                        >
                          <div className="flex justify-between items-start mb-1">
                            <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                              {message.sender.name}
                              <Badge variant="outline" className="ml-2 px-1 py-0 text-[10px]">
                                {message.sender.role}
                              </Badge>
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                              {message.time}
                            </p>
                          </div>
                          <p className="text-sm">{message.content}</p>
                        </div>
                        
                        {message.sender.name === 'Sarah Johnson' && (
                          <Avatar className="h-8 w-8 ml-2 mt-1">
                            <AvatarImage src={message.sender.avatar} />
                            <AvatarFallback>SJ</AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))}
                  </div>
                  
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
                </TabsContent>
                
                <TabsContent value="care-plan" className="flex-1 overflow-y-auto p-4">
                  <GlassCard className="p-4">
                    <h3 className="text-lg font-medium mb-4">Care Plan for Emma Thompson</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Goals</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Maintain blood pressure below 130/80</li>
                          <li>Increase daily physical activity to 30 minutes</li>
                          <li>Improve medication adherence</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Current Interventions</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Daily blood pressure monitoring</li>
                          <li>Weekly check-in calls</li>
                          <li>Monthly in-person appointments</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Team Notes</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          Patient has been responding well to the current medication regimen. 
                          Consider discussing nutrition plan during next appointment.
                        </p>
                      </div>
                      
                      <Button variant="outline" size="sm" className="w-full mt-2">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add Note
                      </Button>
                    </div>
                  </GlassCard>
                </TabsContent>
                
                <TabsContent value="files" className="flex-1 overflow-y-auto p-4">
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No files shared yet</h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">Share files and documents with this conversation</p>
                    <Button className="bg-nurse-600 hover:bg-nurse-700 text-white">
                      Upload File
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </GlassCard>
          </FadeIn>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Messages;

