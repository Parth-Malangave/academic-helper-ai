import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage, mockMessages } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { GraduationCap, User } from 'lucide-react';

interface ChatAreaProps {
  chatId: string | null;
}

export function ChatArea({ chatId }: ChatAreaProps) {
  const messages = chatId ? mockMessages : [];

  if (!chatId) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <GraduationCap className="h-8 w-8 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">AcademiQ</h2>
        <p className="text-muted-foreground max-w-md">
          Your AI-powered academic companion. Ask any question about your studies and get detailed explanations instantly.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8 max-w-lg">
          {[
            'Explain quantum entanglement',
            'Solve this calculus problem',
            'What is DNA replication?',
            'Help with organic chemistry'
          ].map((prompt) => (
            <button
              key={prompt}
              className="p-3 text-sm text-left rounded-lg border border-border hover:bg-muted transition-colors text-muted-foreground"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1">
      <div className="max-w-3xl mx-auto p-4 space-y-6">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </div>
    </ScrollArea>
  );
}

interface MessageBubbleProps {
  message: ChatMessage;
}

function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender === 'user';

  return (
    <div className={cn("flex gap-3", isUser && "flex-row-reverse")}>
      <div className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
        isUser ? "bg-primary text-primary-foreground" : "bg-muted"
      )}>
        {isUser ? (
          <User className="h-4 w-4" />
        ) : (
          <GraduationCap className="h-4 w-4 text-muted-foreground" />
        )}
      </div>
      <div className={cn(
        "max-w-[80%] rounded-2xl px-4 py-3",
        isUser 
          ? "bg-muted text-foreground" 
          : "bg-card border border-border text-foreground"
      )}>
        <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
      </div>
    </div>
  );
}
