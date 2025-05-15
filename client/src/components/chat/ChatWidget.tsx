import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

// Message types
enum MessageType {
  USER_MESSAGE = 'user_message',
  ADMIN_MESSAGE = 'admin_message',
  BOT_MESSAGE = 'bot_message',
  SYSTEM_MESSAGE = 'system_message',
  JOIN = 'join',
  LEAVE = 'leave',
}

interface ChatMessage {
  id: string;
  type: MessageType;
  sender: string;
  text: string;
  timestamp: number;
}

export default function ChatWidget() {
  const { t } = useTranslation();
  const { user, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [username, setUsername] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Handle WebSocket connection
  useEffect(() => {
    // Auto-generated username based on auth status
    if (isAuthenticated && user) {
      setUsername(`${user.firstName} ${user.lastName}`);
    } else {
      setUsername(`Guest_${Math.floor(Math.random() * 10000)}`);
    }
    
    // Don't connect until widget is opened
    if (!isOpen) return;
    
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    
    const newSocket = new WebSocket(wsUrl);
    
    newSocket.onopen = () => {
      setIsConnected(true);
      // Send join message once connected
      if (username) {
        newSocket.send(JSON.stringify({
          type: 'join',
          username: username,
        }));
      }
    };
    
    newSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages(prev => [...prev, data]);
    };
    
    newSocket.onclose = () => {
      setIsConnected(false);
    };
    
    setSocket(newSocket);
    
    // Clean up on unmount
    return () => {
      if (newSocket) {
        newSocket.close();
      }
    };
  }, [isOpen, isAuthenticated, user]);
  
  // Auto scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // Add welcome message when first opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          type: MessageType.BOT_MESSAGE,
          sender: 'Bot',
          text: t('chat.welcome_message', 'Welcome to Dr. Abdul PHS! How can we help you today?'),
          timestamp: Date.now()
        }
      ]);
    }
  }, [isOpen, messages.length, t]);
  
  const handleSendMessage = () => {
    if (message.trim() === '' || !socket || socket.readyState !== WebSocket.OPEN) return;
    
    // Send message to server
    socket.send(JSON.stringify({
      type: 'message',
      username: username,
      text: message,
    }));
    
    setMessage('');
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  // Toggle chat window
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  
  // Render message based on type
  const renderMessage = (msg: ChatMessage) => {
    switch (msg.type) {
      case MessageType.USER_MESSAGE:
        return (
          <div key={msg.id} className="flex justify-end mb-4">
            <div className="bg-primary rounded-lg rounded-tr-none p-3 max-w-[80%]">
              <p className="text-primary-foreground">{msg.text}</p>
              <p className="text-right text-xs mt-1 text-primary-foreground/70">
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        );
      
      case MessageType.ADMIN_MESSAGE:
      case MessageType.BOT_MESSAGE:
        return (
          <div key={msg.id} className="flex mb-4">
            <Avatar className="mr-2 mt-1">
              {msg.type === MessageType.BOT_MESSAGE ? (
                <Bot className="h-10 w-10 p-2 bg-secondary text-white rounded-full" />
              ) : (
                <AvatarImage src="/assets/logo.png" alt="Admin" />
              )}
              <AvatarFallback>{msg.sender[0]}</AvatarFallback>
            </Avatar>
            <div className="bg-muted rounded-lg rounded-tl-none p-3 max-w-[80%]">
              <p className="font-semibold text-xs mb-1">{msg.sender}</p>
              <p>{msg.text}</p>
              <p className="text-right text-xs mt-1 text-muted-foreground">
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        );
      
      case MessageType.SYSTEM_MESSAGE:
      case MessageType.JOIN:
      case MessageType.LEAVE:
        return (
          <div key={msg.id} className="text-center my-2">
            <span className="text-xs bg-muted px-2 py-1 rounded-full">
              {msg.text}
            </span>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <>
      {/* Chat Toggle Button */}
      <Button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 rounded-full h-14 w-14 shadow-lg z-50"
        size="icon"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>
      
      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-80 sm:w-96 z-50 shadow-xl">
          <CardHeader className="bg-primary text-primary-foreground py-3">
            <CardTitle className="text-lg flex items-center">
              <MessageCircle className="mr-2 h-5 w-5" />
              {t('chat.title', 'Live Chat')}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-3 h-96 overflow-y-auto">
            <div className="flex flex-col space-y-2">
              {messages.map(renderMessage)}
              <div ref={messagesEndRef} />
            </div>
            
            {!isConnected && (
              <div className="text-center mt-4">
                <p className="text-sm text-muted-foreground">
                  {t('chat.connecting', 'Connecting to chat service...')}
                </p>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="border-t p-3">
            <div className="flex w-full items-center space-x-2">
              <Input
                type="text"
                placeholder={t('chat.type_message', 'Type your message...')}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={!isConnected}
              />
              <Button 
                size="icon" 
                onClick={handleSendMessage}
                disabled={!isConnected || message.trim() === ''}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </>
  );
}