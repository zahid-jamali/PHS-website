import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ChatMessage from './ChatMessage';

// Message type enum matching the server
enum MessageType {
  USER_MESSAGE = 'user_message',
  ADMIN_MESSAGE = 'admin_message',
  BOT_MESSAGE = 'bot_message',
  SYSTEM_MESSAGE = 'system_message',
  JOIN = 'join',
  LEAVE = 'leave',
}

// Message interface matching the server
interface ChatMessage {
  id: string;
  type: MessageType;
  sender: string;
  text: string;
  timestamp: number;
}

export default function ChatInterface() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [username, setUsername] = useState(`Guest-${Math.floor(Math.random() * 1000)}`);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Connect to WebSocket server
  useEffect(() => {
    if (isOpen && !socket) {
      // Get the current protocol and host
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/ws/chat`;
      
      // Create WebSocket connection
      const ws = new WebSocket(wsUrl);
      
      // Connection opened
      ws.addEventListener('open', () => {
        console.log('Connected to chat server');
        setIsConnected(true);
        
        // Send identification message
        ws.send(JSON.stringify({
          action: 'identify',
          username: username,
          isAdmin: false
        }));
      });
      
      // Listen for messages
      ws.addEventListener('message', (event) => {
        try {
          const message = JSON.parse(event.data);
          setMessages((prevMessages) => [...prevMessages, message]);
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      });
      
      // Connection closed
      ws.addEventListener('close', () => {
        console.log('Disconnected from chat server');
        setIsConnected(false);
        setSocket(null);
      });
      
      // Set socket
      setSocket(ws);
      
      // Cleanup on unmount
      return () => {
        ws.close();
      };
    }
  }, [isOpen, username]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Close the chat when the sheet is closed
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open && socket) {
      socket.close();
      setSocket(null);
    }
  };

  // Send message to server
  const sendMessage = () => {
    if (!socket || !isConnected || !message.trim()) return;
    
    socket.send(JSON.stringify({
      action: 'message',
      text: message
    }));
    
    setMessage('');
  };

  // Handle enter key
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button 
          className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg bg-accent hover:bg-accent/90 text-white"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:w-[400px] p-0 flex flex-col h-full">
        <SheetHeader className="px-4 py-3 border-b">
          <div className="flex justify-between items-center">
            <SheetTitle>
              {t('Live Chat Support')}
            </SheetTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <p>{t('Ask us anything about our Pink Himalayan Salt products!')}</p>
            </div>
          ) : (
            messages.map((msg) => (
              <ChatMessage 
                key={msg.id} 
                message={msg} 
                isMine={msg.type === MessageType.USER_MESSAGE && msg.sender === username}
              />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <SheetFooter className="p-4 border-t">
          <div className="flex w-full gap-2">
            <Input
              className="flex-1"
              placeholder={isConnected ? t('Type your message...') : t('Connecting...')}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={!isConnected}
            />
            <Button 
              size="icon"
              onClick={sendMessage}
              disabled={!isConnected || !message.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}