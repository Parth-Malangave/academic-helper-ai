import { useState } from 'react';
import { CommunityLeftColumn } from '@/components/community/CommunityLeftColumn';
import { CommunityCenterColumn } from '@/components/community/CommunityCenterColumn';
import { CommunityRightColumn } from '@/components/community/CommunityRightColumn';
import { AnswerPage } from '@/components/community/AnswerPage';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, User } from 'lucide-react';

export function CommunityPage() {
  const [selectedDoubtId, setSelectedDoubtId] = useState<string | null>(null);
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);

  return (
    <div className="h-full flex flex-col">
      {/* Mobile drawer triggers */}
      <div className="lg:hidden flex items-center justify-between p-2 border-b border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setLeftDrawerOpen(!leftDrawerOpen)}
          className="gap-2"
        >
          <Menu className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setRightDrawerOpen(!rightDrawerOpen)}
          className="gap-2"
        >
          <User className="h-4 w-4" />
        </Button>
      </div>


      {/* Main Content */}
      <div className="flex-1 overflow-hidden relative">
        <div className="h-full flex">
          {/* Left sliding panel - Doubts History */}
          <div
            className={cn(
              "absolute lg:relative z-20 h-full bg-background border-r border-border transition-transform duration-300 ease-in-out w-64",
              leftDrawerOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            )}
          >
            <CommunityLeftColumn onSelectDoubt={(id) => { setSelectedDoubtId(id); setLeftDrawerOpen(false); }} />
          </div>

          {/* Center content */}
          <div className="flex-1 h-full overflow-hidden">
            {selectedDoubtId ? (
              <AnswerPage
                doubtId={selectedDoubtId}
                onBack={() => setSelectedDoubtId(null)}
              />
            ) : (
              <CommunityCenterColumn onSelectDoubt={setSelectedDoubtId} />
            )}
          </div>

          {/* Right sliding panel - Profile & Contributors */}
          <div
            className={cn(
              "absolute lg:relative right-0 z-20 h-full bg-background border-l border-border transition-transform duration-300 ease-in-out w-64",
              rightDrawerOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
            )}
          >
            <CommunityRightColumn />
          </div>
        </div>

        {/* Overlay for mobile when panels are open */}
        {(leftDrawerOpen || rightDrawerOpen) && (
          <div 
            className="lg:hidden absolute inset-0 bg-background/80 z-10"
            onClick={() => { setLeftDrawerOpen(false); setRightDrawerOpen(false); }}
          />
        )}
      </div>
    </div>
  );
}
