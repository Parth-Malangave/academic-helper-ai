import { useState } from 'react';
import { CommunityLeftColumn } from '@/components/community/CommunityLeftColumn';
import { CommunityCenterColumn } from '@/components/community/CommunityCenterColumn';
import { CommunityRightColumn } from '@/components/community/CommunityRightColumn';
import { AnswerPage } from '@/components/community/AnswerPage';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
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
          onClick={() => setLeftDrawerOpen(true)}
          className="gap-2"
        >
          <Menu className="h-4 w-4" />
          My Doubts
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setRightDrawerOpen(true)}
          className="gap-2"
        >
          <User className="h-4 w-4" />
          Profile
        </Button>
      </div>

      {/* Left Drawer - Doubts History */}
      <Sheet open={leftDrawerOpen} onOpenChange={setLeftDrawerOpen}>
        <SheetContent side="left" className="w-80 p-0">
          <SheetHeader className="p-4 border-b border-border">
            <SheetTitle>My Doubts</SheetTitle>
          </SheetHeader>
          <CommunityLeftColumn onSelectDoubt={(id) => { setSelectedDoubtId(id); setLeftDrawerOpen(false); }} />
        </SheetContent>
      </Sheet>

      {/* Right Drawer - Profile & Contributors */}
      <Sheet open={rightDrawerOpen} onOpenChange={setRightDrawerOpen}>
        <SheetContent side="right" className="w-80 p-0">
          <SheetHeader className="p-4 border-b border-border">
            <SheetTitle>Profile & Contributors</SheetTitle>
          </SheetHeader>
          <CommunityRightColumn />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {selectedDoubtId ? (
          <div className="h-full grid grid-cols-1 lg:grid-cols-[1fr_3fr_1fr]">
            <div className="hidden lg:block border-r border-border">
              <CommunityLeftColumn onSelectDoubt={setSelectedDoubtId} />
            </div>
            <div className="h-full overflow-hidden">
              <AnswerPage
                doubtId={selectedDoubtId}
                onBack={() => setSelectedDoubtId(null)}
              />
            </div>
            <div className="hidden lg:block border-l border-border">
              <CommunityRightColumn />
            </div>
          </div>
        ) : (
          <div className="h-full grid grid-cols-1 lg:grid-cols-[1fr_3fr_1fr]">
            <div className="hidden lg:block border-r border-border">
              <CommunityLeftColumn onSelectDoubt={setSelectedDoubtId} />
            </div>
            <div className="h-full overflow-hidden">
              <CommunityCenterColumn onSelectDoubt={setSelectedDoubtId} />
            </div>
            <div className="hidden lg:block border-l border-border">
              <CommunityRightColumn />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
