import { useState } from 'react';
import { ChatSidebar } from '@/components/chat/ChatSidebar';
import { TopBar } from '@/components/chat/TopBar';
import { ChatArea } from '@/components/chat/ChatArea';
import { InputBar } from '@/components/chat/InputBar';
import { CommunityPage } from '@/pages/CommunityPage';
import { toast } from '@/hooks/use-toast';

type Tab = 'community';
type Mode = 'exam' | 'cheat-sheet' | 'descriptive';

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab | null>(null);
  const [activeMode, setActiveMode] = useState<Mode>('descriptive');
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleNewChat = () => {
    setSelectedChatId(null);
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

  const handleToggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Bookmark removed" : "Bookmarked",
      description: isBookmarked 
        ? "Removed from bookmarked doubts" 
        : "Added to bookmarked doubts",
    });
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <TopBar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        activeMode={activeMode}
        onModeChange={setActiveMode}
        isBookmarked={isBookmarked}
        onToggleBookmark={handleToggleBookmark}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex-1 flex overflow-hidden">
        {activeTab !== 'community' && (
          <ChatSidebar
            isOpen={sidebarOpen}
            selectedChatId={selectedChatId}
            onSelectChat={setSelectedChatId}
            onNewChat={handleNewChat}
          />
        )}

        <main className="flex-1 flex flex-col overflow-hidden">
          {activeTab === 'community' ? (
            <CommunityPage />
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
