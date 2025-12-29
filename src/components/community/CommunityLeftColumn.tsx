import { ScrollArea } from '@/components/ui/scroll-area';
import { myDoubtsSolved, myDoubtsAsked } from '@/data/mockData';
import { CheckCircle, HelpCircle } from 'lucide-react';

export function CommunityLeftColumn() {
  return (
    <div className="h-full flex flex-col gap-4 p-4">
      <div className="flex-1 min-h-0">
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Doubts I Solved</h3>
        </div>
        <ScrollArea className="h-[calc(50%-2rem)]">
          <div className="space-y-2 pr-2">
            {myDoubtsSolved.map((doubt) => (
              <div
                key={doubt.id}
                className="p-2 rounded-md bg-muted hover:bg-accent cursor-pointer transition-colors"
              >
                <p className="text-xs font-medium text-muted-foreground">{doubt.topic}</p>
                <p className="text-sm text-foreground truncate">{doubt.doubt}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="flex-1 min-h-0">
        <div className="flex items-center gap-2 mb-3">
          <HelpCircle className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold text-foreground">Doubts I Asked</h3>
        </div>
        <ScrollArea className="h-[calc(50%-2rem)]">
          <div className="space-y-2 pr-2">
            {myDoubtsAsked.map((doubt) => (
              <div
                key={doubt.id}
                className="p-2 rounded-md bg-muted hover:bg-accent cursor-pointer transition-colors"
              >
                <p className="text-xs font-medium text-muted-foreground">{doubt.topic}</p>
                <p className="text-sm text-foreground truncate">{doubt.doubt}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
