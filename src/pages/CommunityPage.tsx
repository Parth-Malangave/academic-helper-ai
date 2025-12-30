import { useState } from 'react';
import { CommunityLeftColumn } from '@/components/community/CommunityLeftColumn';
import { CommunityCenterColumn } from '@/components/community/CommunityCenterColumn';
import { CommunityRightColumn } from '@/components/community/CommunityRightColumn';
import { AnswerPage } from '@/components/community/AnswerPage';

export function CommunityPage() {
  const [selectedDoubtId, setSelectedDoubtId] = useState<string | null>(null);

  if (selectedDoubtId) {
    return (
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
    );
  }

  return (
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
  );
}
