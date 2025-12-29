import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DoubtCard } from './DoubtCard';
import { AskDoubtForm } from './AskDoubtForm';
import { mockCommunityDoubts, CommunityDoubt } from '@/data/mockData';
import { PlusCircle, Search, RefreshCw } from 'lucide-react';

interface CommunityCenterColumnProps {
  onSelectDoubt: (doubtId: string) => void;
}

export function CommunityCenterColumn({ onSelectDoubt }: CommunityCenterColumnProps) {
  const [isAskFormOpen, setIsAskFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [displayedDoubts, setDisplayedDoubts] = useState<CommunityDoubt[]>(
    mockCommunityDoubts.slice(0, 10)
  );

  const filteredDoubts = useMemo(() => {
    if (!searchQuery.trim()) return displayedDoubts;
    const query = searchQuery.toLowerCase();
    return displayedDoubts.filter(
      (doubt) =>
        doubt.topic.toLowerCase().includes(query) ||
        doubt.doubt.toLowerCase().includes(query)
    );
  }, [displayedDoubts, searchQuery]);

  const handleRefresh = () => {
    // Shuffle and get new 10 doubts
    const shuffled = [...mockCommunityDoubts].sort(() => Math.random() - 0.5);
    setDisplayedDoubts(shuffled.slice(0, 10));
  };

  return (
    <div className="h-full flex flex-col p-4">
      <div className="mb-4">
        <Button
          onClick={() => setIsAskFormOpen(!isAskFormOpen)}
          className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base"
        >
          <PlusCircle className="h-5 w-5" />
          Ask Doubt Online
        </Button>
      </div>

      <AskDoubtForm isOpen={isAskFormOpen} onClose={() => setIsAskFormOpen(false)} />

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search for doubts already solved..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-background border-input"
        />
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-3 pr-4">
          {filteredDoubts.map((doubt) => (
            <DoubtCard
              key={doubt.id}
              doubt={doubt}
              onAnswerClick={onSelectDoubt}
            />
          ))}
        </div>
        
        <div className="py-4 flex justify-center">
          <Button
            variant="outline"
            onClick={handleRefresh}
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh Doubts
          </Button>
        </div>
      </ScrollArea>
    </div>
  );
}
