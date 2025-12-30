import { Moon, Sun, Menu, Globe, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

type Tab = 'community' | 'bookmarks';
type Mode = 'exam' | 'cheat-sheet' | 'descriptive';

interface TopBarProps {
  activeTab: Tab | null;
  onTabChange: (tab: Tab) => void;
  activeMode: Mode;
  onModeChange: (mode: Mode) => void;
  onToggleSidebar: () => void;
  onBackToHome: () => void;
}

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'community', label: 'Community', icon: <Globe className="h-4 w-4" /> },
];

const modes: { id: Mode; label: string }[] = [
  { id: 'exam', label: 'Exam Mode' },
  { id: 'cheat-sheet', label: 'Cheat Sheet' },
  { id: 'descriptive', label: 'Descriptive' },
];

export function TopBar({
  activeTab,
  onTabChange,
  activeMode,
  onModeChange,
  onToggleSidebar,
  onBackToHome,
}: TopBarProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-14 border-b border-border bg-background flex items-center justify-between px-4 gap-4">
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggleSidebar}
          className="text-muted-foreground hover:text-foreground"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <nav className="hidden sm:flex items-center gap-1 bg-muted rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                activeTab === tab.id
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.icon}
              <span className="hidden md:inline">{tab.label}</span>
            </button>
          ))}
          
          {activeTab === 'community' && (
            <button
              onClick={onBackToHome}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors text-muted-foreground hover:text-foreground"
            >
              <Home className="h-4 w-4" />
              <span className="hidden md:inline">Back to Home</span>
            </button>
          )}
        </nav>
      </div>

      <div className="flex items-center gap-2">
        {activeTab !== 'community' && (
          <div className="hidden lg:flex items-center gap-1 bg-muted rounded-lg p-1">
            {modes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => onModeChange(mode.id)}
                className={cn(
                  "px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap",
                  activeMode === mode.id
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {mode.label}
              </button>
            ))}
          </div>
        )}

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="text-muted-foreground hover:text-foreground"
        >
          {theme === 'light' ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </Button>

        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
            AJ
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
