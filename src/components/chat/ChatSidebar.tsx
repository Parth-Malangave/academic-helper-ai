import { Plus, Search, Bookmark, BookmarkCheck, MessageSquare, Link2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { mockChatHistory, ChatThread } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

interface ChatSidebarProps {
  isOpen: boolean;
  selectedChatId: string | null;
  onSelectChat: (id: string) => void;
  onNewChat: () => void;
  onOpenBookmarks: () => void;
  bookmarkedChats: string[];
  onToggleBookmark: (chatId: string) => void;
}

export function ChatSidebar({ 
  isOpen, 
  selectedChatId, 
  onSelectChat, 
  onNewChat,
  onOpenBookmarks,
  bookmarkedChats,
  onToggleBookmark,
}: ChatSidebarProps) {
  const personalChats = mockChatHistory.filter(chat => !chat.isGroup);
  const groupChats = mockChatHistory.filter(chat => chat.isGroup);

  if (!isOpen) return null;

  return (
    <aside className="w-64 h-full bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-3 space-y-2">
        <Button 
          onClick={onNewChat}
          className="w-full justify-start gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          New Chat
        </Button>
        <Button 
          variant="outline" 
          className="w-full justify-start gap-2 border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <Search className="h-4 w-4" />
          Search Chat
        </Button>
        <Button 
          variant="outline" 
          className="w-full justify-start gap-2 border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent"
          onClick={onOpenBookmarks}
        >
          <Bookmark className="h-4 w-4" />
          Bookmarked Doubts
        </Button>
      </div>

      <ScrollArea className="flex-1 px-3">
        <div className="space-y-4 pb-4">
          {groupChats.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
                Group Chats
              </h3>
              <div className="space-y-1">
                {groupChats.map((chat) => (
                  <ChatHistoryItem
                    key={chat.id}
                    chat={chat}
                    isSelected={selectedChatId === chat.id}
                    onClick={() => onSelectChat(chat.id)}
                    isBookmarked={bookmarkedChats.includes(chat.id)}
                    onToggleBookmark={() => onToggleBookmark(chat.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {personalChats.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
                Personal Chats
              </h3>
              <div className="space-y-1">
                {personalChats.map((chat) => (
                  <ChatHistoryItem
                    key={chat.id}
                    chat={chat}
                    isSelected={selectedChatId === chat.id}
                    onClick={() => onSelectChat(chat.id)}
                    isBookmarked={bookmarkedChats.includes(chat.id)}
                    onToggleBookmark={() => onToggleBookmark(chat.id)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </aside>
  );
}

interface ChatHistoryItemProps {
  chat: ChatThread;
  isSelected: boolean;
  onClick: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}

function ChatHistoryItem({ chat, isSelected, onClick, isBookmarked, onToggleBookmark }: ChatHistoryItemProps) {
  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareLink = `${window.location.origin}/chat/${chat.id}`;
    navigator.clipboard.writeText(shareLink);
    toast({
      title: "Link copied!",
      description: "Chat link copied to clipboard",
    });
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleBookmark();
    toast({
      title: isBookmarked ? "Bookmark removed" : "Bookmarked",
      description: isBookmarked ? "Removed from bookmarked chats" : "Added to bookmarked chats",
    });
  };

  return (
    <div
      className={cn(
        "w-full text-left p-2 rounded-md transition-colors group",
        isSelected 
          ? "bg-sidebar-accent text-sidebar-accent-foreground" 
          : "hover:bg-sidebar-accent/50 text-sidebar-foreground"
      )}
    >
      <button onClick={onClick} className="w-full text-left">
        <div className="flex items-start gap-2">
          <MessageSquare className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium truncate">{chat.title}</p>
            <p className="text-xs text-muted-foreground truncate">{chat.lastMessage}</p>
          </div>
        </div>
      </button>
      <div className="mt-1.5 flex items-center gap-3">
        <button
          onClick={handleShareClick}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <Link2 className="h-3 w-3" />
          Share
        </button>
        <button
          onClick={handleBookmarkClick}
          className={cn(
            "flex items-center gap-1.5 text-xs transition-colors",
            isBookmarked ? "text-primary" : "text-muted-foreground hover:text-foreground"
          )}
        >
          {isBookmarked ? <BookmarkCheck className="h-3 w-3" /> : <Bookmark className="h-3 w-3" />}
          {isBookmarked ? "Bookmarked" : "Bookmark"}
        </button>
      </div>
    </div>
  );
}
