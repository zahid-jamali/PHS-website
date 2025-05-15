import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { MessageType } from '@/types/chat';

interface ChatMessageProps {
  id: string;
  type: MessageType;
  sender: string;
  text: string;
  timestamp: number;
  isCurrentUser?: boolean;
}

export default function ChatMessage({
  type,
  sender,
  text,
  timestamp,
  isCurrentUser
}: ChatMessageProps) {
  const isSystemMessage = type === 'system_message' || type === 'join' || type === 'leave';
  const isAdminMessage = type === 'admin_message';
  const isBotMessage = type === 'bot_message';
  
  // Return a system message for join/leave events
  if (isSystemMessage) {
    return (
      <div className="text-center my-2">
        <span className="inline-block bg-neutral-100 text-neutral-600 rounded-full px-3 py-1 text-xs">
          {text}
        </span>
      </div>
    );
  }
  
  // Get first letter of sender name for avatar fallback
  const firstLetter = sender.charAt(0).toUpperCase();
  
  return (
    <div className={cn(
      "flex gap-2 mb-4",
      isCurrentUser ? "flex-row-reverse" : "flex-row"
    )}>
      <Avatar className="h-8 w-8 mt-1">
        {isAdminMessage ? (
          <AvatarImage src="/images/logo.webp" alt="Admin" />
        ) : isBotMessage ? (
          <AvatarImage src="/images/bot-avatar.png" alt="Chat Bot" />
        ) : null}
        <AvatarFallback className={isAdminMessage ? "bg-accent text-white" : ""}>
          {firstLetter}
        </AvatarFallback>
      </Avatar>
      
      <div className={cn(
        "max-w-[75%]",
        isCurrentUser ? "items-end" : "items-start"
      )}>
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium">
              {isAdminMessage ? 'Support' : isBotMessage ? 'Assistant' : sender}
            </span>
            <span className="text-xs text-neutral-500">
              {format(new Date(timestamp), 'h:mm a')}
            </span>
          </div>
          
          <div className={cn(
            "rounded-lg px-4 py-2 break-words",
            isCurrentUser 
              ? "bg-accent text-white rounded-tr-none" 
              : isAdminMessage
                ? "bg-accent/10 rounded-tl-none"
                : "bg-neutral-100 rounded-tl-none"
          )}>
            <p className="whitespace-pre-wrap">{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}