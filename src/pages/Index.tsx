import { useState } from 'react';
import { ChatSidebar } from '@/components/chat/ChatSidebar';
import { TopBar } from '@/components/chat/TopBar';
import { ChatArea } from '@/components/chat/ChatArea';
import { InputBar } from '@/components/chat/InputBar';
import { CommunityPage } from '@/pages/CommunityPage';
import { BookmarkedChatsPage } from '@/pages/BookmarkedChatsPage';
import { useChat } from '@/hooks/useChat';

type Tab = 'community' | 'bookmarks';
type Mode = 'exam' | 'cheat-sheet' | 'descriptive';

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab | null>(null);
  const [activeMode, setActiveMode] = useState<Mode>('descriptive');
  const [bookmarkedChats, setBookmarkedChats] = useState<string[]>([]);

  const { 
    messages, 
    isLoading, 
    currentChatId, 
    sendMessage, 
    startNewChat 
  } = useChat();

  const handleNewChat = () => {
    startNewChat();
    setActiveTab(null);
  };

  const handleSendMessage = (message: string) => {
    sendMessage(message, activeMode);
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

  const handleBackToHome = () => {
    setActiveTab(null);
  };

  const handleSelectChatFromBookmarks = (chatId: string) => {
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
        onBackToHome={handleBackToHome}
      />

      <ChatSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        selectedChatId={currentChatId}
        onSelectChat={() => {}}
        onNewChat={handleNewChat}
        onOpenBookmarks={handleOpenBookmarks}
        bookmarkedChats={bookmarkedChats}
        onToggleBookmark={handleToggleChatBookmark}
      />

      <div className="flex-1 flex overflow-hidden">
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
              <ChatArea 
                chatId={currentChatId} 
                messages={messages}
                isLoading={isLoading}
              />
              <InputBar onSendMessage={handleSendMessage} />
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
