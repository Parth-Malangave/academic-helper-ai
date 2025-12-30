import { useState } from 'react';
import { ChatSidebar } from '@/components/chat/ChatSidebar';
import { TopBar } from '@/components/chat/TopBar';
import { ChatArea } from '@/components/chat/ChatArea';
import { InputBar } from '@/components/chat/InputBar';
import { CommunityPage } from '@/pages/CommunityPage';
import { BookmarkedChatsPage } from '@/pages/BookmarkedChatsPage';
import { toast } from '@/hooks/use-toast';

type Tab = 'community' | 'bookmarks';
type Mode = 'exam' | 'cheat-sheet' | 'descriptive';

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab | null>(null);
  const [activeMode, setActiveMode] = useState<Mode>('descriptive');
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [bookmarkedChats, setBookmarkedChats] = useState<string[]>([]);

  const handleNewChat = () => {
    setSelectedChatId(null);
    setActiveTab(null);
    toast({
      title: "New Chat",
      description: "Started a new conversation",
    });
  };

  const handleSendMessage = (message: string) => {
    if (!selectedChatId) {
      setSelectedChatId('new');
    }
    toast({
      title: "Message sent",
      description: "Your doubt has been submitted (UI only)",
    });
  };

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
  };

  const handleToggleChatBookmark = (chatId: string) => {
    setBookmarkedChats(prev => 
      prev.includes(chatId) 
        ? prev.filter(id => id !== chatId)
        : [...prev, chatId]
    );
  };

  const handleOpenBookmarks = () => {
    setActiveTab('bookmarks');
  };

  const handleBackFromBookmarks = () => {
    setActiveTab(null);
  };

  const handleSelectChatFromBookmarks = (chatId: string) => {
    setSelectedChatId(chatId);
    setActiveTab(null);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <TopBar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        activeMode={activeMode}
        onModeChange={setActiveMode}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex-1 flex overflow-hidden">
        {activeTab !== 'community' && activeTab !== 'bookmarks' && (
          <ChatSidebar
            isOpen={sidebarOpen}
            selectedChatId={selectedChatId}
            onSelectChat={setSelectedChatId}
            onNewChat={handleNewChat}
            onOpenBookmarks={handleOpenBookmarks}
            bookmarkedChats={bookmarkedChats}
            onToggleBookmark={handleToggleChatBookmark}
          />
        )}

        <main className="flex-1 flex flex-col overflow-hidden">
          {activeTab === 'community' ? (
            <CommunityPage />
          ) : activeTab === 'bookmarks' ? (
            <BookmarkedChatsPage
              bookmarkedChats={bookmarkedChats}
              onBack={handleBackFromBookmarks}
              onSelectChat={handleSelectChatFromBookmarks}
            />
          ) : (
            <>
              <ChatArea chatId={selectedChatId} />
              <InputBar onSendMessage={handleSendMessage} />
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
