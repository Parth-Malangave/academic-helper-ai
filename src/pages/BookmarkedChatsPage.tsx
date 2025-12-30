import { ArrowLeft, MessageSquare, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { mockChatHistory, ChatThread } from '@/data/mockData';

interface BookmarkedChatsPageProps {
  bookmarkedChats: string[];
  onBack: () => void;
  onSelectChat: (chatId: string) => void;
}

export function BookmarkedChatsPage({ bookmarkedChats, onBack, onSelectChat }: BookmarkedChatsPageProps) {
  const bookmarkedChatData = mockChatHistory.filter(chat => bookmarkedChats.includes(chat.id));

  return (
    <div className="flex-1 flex flex-col bg-background">
      <header className="h-14 border-b border-border flex items-center gap-3 px-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onBack}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <Bookmark className="h-5 w-5 text-primary" />
          <h1 className="text-lg font-semibold text-foreground">Bookmarked Chats</h1>
        </div>
      </header>

      <ScrollArea className="flex-1">
        <div className="max-w-2xl mx-auto p-6">
          {bookmarkedChatData.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Bookmark className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">No bookmarked chats</h2>
              <p className="text-muted-foreground">
                Bookmark important chats to access them quickly here.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {bookmarkedChatData.map((chat) => (
                <BookmarkedChatCard 
                  key={chat.id} 
                  chat={chat} 
                  onClick={() => onSelectChat(chat.id)}
                />
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

interface BookmarkedChatCardProps {
  chat: ChatThread;
  onClick: () => void;
}

function BookmarkedChatCard({ chat, onClick }: BookmarkedChatCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left p-4 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
          <MessageSquare className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-medium text-foreground truncate">{chat.title}</p>
            {chat.isGroup && (
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">Group</span>
            )}
          </div>
          <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
          <p className="text-xs text-muted-foreground mt-1">{chat.timestamp.toLocaleDateString()}</p>
        </div>
      </div>
    </button>
  );
}
