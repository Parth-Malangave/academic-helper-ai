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

interface UserDoubt {
  id: string;
  topic: string;
  doubt: string;
  timestamp: Date;
}

export function CommunityCenterColumn({ onSelectDoubt }: CommunityCenterColumnProps) {
  const [isAskFormOpen, setIsAskFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [displayedDoubts, setDisplayedDoubts] = useState<CommunityDoubt[]>(
    mockCommunityDoubts.slice(0, 10)
  );
  const [userDoubts, setUserDoubts] = useState<UserDoubt[]>([]);

  const filteredDoubts = useMemo(() => {
    if (!searchQuery.trim()) return displayedDoubts;
    const query = searchQuery.toLowerCase();
    return displayedDoubts.filter(
      (doubt) =>
        doubt.topic.toLowerCase().includes(query) ||
        doubt.doubt.toLowerCase().includes(query)
    );
  }, [displayedDoubts, searchQuery]);

  const filteredUserDoubts = useMemo(() => {
    if (!searchQuery.trim()) return userDoubts;
    const query = searchQuery.toLowerCase();
    return userDoubts.filter(
      (doubt) =>
        doubt.topic.toLowerCase().includes(query) ||
        doubt.doubt.toLowerCase().includes(query)
    );
  }, [userDoubts, searchQuery]);

  const handleRefresh = () => {
    const shuffled = [...mockCommunityDoubts].sort(() => Math.random() - 0.5);
    setDisplayedDoubts(shuffled.slice(0, 10));
  };

  const handleSubmitDoubt = (topic: string, doubt: string) => {
    const newDoubt: UserDoubt = {
      id: `user-${Date.now()}`,
      topic,
      doubt,
      timestamp: new Date(),
    };
    setUserDoubts(prev => [newDoubt, ...prev]);
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

      <AskDoubtForm 
        isOpen={isAskFormOpen} 
        onClose={() => setIsAskFormOpen(false)} 
        onSubmitDoubt={handleSubmitDoubt}
      />

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
          {/* User's posted doubts at the top without Answer button */}
          {filteredUserDoubts.map((doubt) => (
            <div
              key={doubt.id}
              className="p-4 rounded-lg border border-primary/30 bg-primary/5 animate-fade-in"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium bg-secondary text-secondary-foreground px-2 py-0.5 rounded">
                  {doubt.topic}
                </span>
                <span className="text-xs text-muted-foreground">Your doubt</span>
              </div>
              <p className="text-sm text-foreground">{doubt.doubt}</p>
            </div>
          ))}
          
          {/* Community doubts with Answer button */}
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
