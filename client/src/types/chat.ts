export type MessageType = 'user_message' | 'admin_message' | 'bot_message' | 'system_message' | 'join' | 'leave';

export interface ChatMessage {
  id: string;
  type: MessageType;
  sender: string;
  text: string;
  timestamp: number;
}

export interface ChatState {
  isOpen: boolean;
  messages: ChatMessage[];
  username: string | null;
  connected: boolean;
  loading: boolean;
}