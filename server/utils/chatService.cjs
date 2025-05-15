const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');

// Message types
const MessageType = {
  USER_MESSAGE: 'user_message',
  ADMIN_MESSAGE: 'admin_message',
  BOT_MESSAGE: 'bot_message',
  SYSTEM_MESSAGE: 'system_message',
  JOIN: 'join',
  LEAVE: 'leave',
};

// Message interface
class ChatMessage {
  constructor(type, sender, text) {
    this.id = uuidv4();
    this.type = type;
    this.sender = sender;
    this.text = text;
    this.timestamp = Date.now();
  }
}

// Client interface
class Client {
  constructor(id, socket, username = null, isAdmin = false) {
    this.id = id;
    this.username = username;
    this.socket = socket;
    this.isAdmin = isAdmin;
  }
}

/**
 * Chat service to handle WebSocket communications
 */
class ChatService {
  constructor(server) {
    this.wss = new WebSocket.Server({ server, path: '/ws' });
    this.clients = new Map();
    this.messageHistory = [];
    this.maxHistoryLength = 100;
    
    this.initialize();
    console.log('Chat service initialized');
  }

  initialize() {
    this.wss.on('connection', (socket) => {
      const clientId = uuidv4();
      
      // Add client to clients map
      this.clients.set(clientId, new Client(clientId, socket));

      // Handle messages
      socket.on('message', (message) => {
        try {
          const data = JSON.parse(message);
          
          // Handle different types of messages
          switch (data.action) {
            case 'join':
              const username = data.username || 'Guest';
              const isAdmin = data.isAdmin || false;
              
              // Update client info
              this.clients.set(clientId, new Client(clientId, socket, username, isAdmin));
              
              // Send join message to all clients
              const joinMessage = new ChatMessage(
                MessageType.JOIN,
                username,
                `${username} has joined the chat`
              );
              this.broadcastMessage(joinMessage);
              
              // Send message history to new client
              this.messageHistory.forEach(msg => {
                this.sendToClient(clientId, msg);
              });
              
              break;
                
            case 'message':
              if (!data.text) break;
              
              const client = this.clients.get(clientId);
              const messageType = client.isAdmin 
                ? MessageType.ADMIN_MESSAGE 
                : MessageType.USER_MESSAGE;
              
              const message = new ChatMessage(
                messageType,
                client.username || 'Guest',
                data.text
              );
              
              this.addMessageToHistory(message);
              this.broadcastMessage(message);
              
              // If it's a user message, potentially send a bot response
              if (messageType === MessageType.USER_MESSAGE) {
                this.sendBotResponse(data.text);
              }
              
              break;
              
            default:
              break;
          }
        } catch (error) {
          console.error('Error handling WebSocket message:', error);
        }
      });

      // Handle client disconnect
      socket.on('close', () => {
        const client = this.clients.get(clientId);
        
        if (client && client.username) {
          const leaveMessage = new ChatMessage(
            MessageType.LEAVE,
            client.username,
            `${client.username} has left the chat`
          );
          this.broadcastMessage(leaveMessage);
        }
        
        this.clients.delete(clientId);
      });
    });
  }

  // Send message to a specific client
  sendToClient(clientId, message) {
    const client = this.clients.get(clientId);
    
    if (client && client.socket.readyState === WebSocket.OPEN) {
      client.socket.send(JSON.stringify(message));
    }
  }

  // Broadcast message to all connected clients
  broadcastMessage(message) {
    this.clients.forEach(client => {
      if (client.socket.readyState === WebSocket.OPEN) {
        client.socket.send(JSON.stringify(message));
      }
    });
  }

  // Add message to history
  addMessageToHistory(message) {
    this.messageHistory.push(message);
    
    // Keep history within limit
    if (this.messageHistory.length > this.maxHistoryLength) {
      this.messageHistory.shift();
    }
  }

  // Simple bot response logic
  sendBotResponse(userMessage) {
    // Only respond to certain keywords
    if (userMessage.toLowerCase().includes('hello') || 
        userMessage.toLowerCase().includes('hi')) {
      
      setTimeout(() => {
        const botResponse = new ChatMessage(
          MessageType.BOT_MESSAGE,
          'Salt Assistant',
          'Hello! How can I help you with our pink Himalayan salt products today?'
        );
        
        this.addMessageToHistory(botResponse);
        this.broadcastMessage(botResponse);
      }, 1000);
      
      return;
    }
    
    if (userMessage.toLowerCase().includes('help') || 
        userMessage.toLowerCase().includes('support')) {
      
      setTimeout(() => {
        const botResponse = new ChatMessage(
          MessageType.BOT_MESSAGE,
          'Salt Assistant',
          'I\'m here to help! You can ask about our products, shipping, or special offers. For complex inquiries, our support team will respond soon.'
        );
        
        this.addMessageToHistory(botResponse);
        this.broadcastMessage(botResponse);
      }, 1000);
      
      return;
    }
    
    // Default response for keywords we don't have specific answers for
    if (Math.random() > 0.7) {
      setTimeout(() => {
        const defaultResponse = new ChatMessage(
          MessageType.BOT_MESSAGE,
          'Salt Assistant',
          'Thank you for your message. Our team will get back to you shortly. In the meantime, feel free to browse our premium salt products.'
        );
        
        this.addMessageToHistory(defaultResponse);
        this.broadcastMessage(defaultResponse);
      }, 1500);
    }
  }
}

module.exports = { ChatService, MessageType, ChatMessage };