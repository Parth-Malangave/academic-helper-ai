import { CommunityDoubt } from '@/data/mockData';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface DoubtCardProps {
  doubt: CommunityDoubt;
  onAnswerClick: (doubtId: string) => void;
}

export function DoubtCard({ doubt, onAnswerClick }: DoubtCardProps) {
  return (
    <Card className="border-border hover:border-primary/30 transition-colors">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <Badge variant="secondary" className="text-xs shrink-0">
            {doubt.topic}
          </Badge>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {formatDistanceToNow(doubt.timestamp, { addSuffix: true })}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="text-sm text-foreground line-clamp-2">{doubt.doubt}</p>
        <p className="text-xs text-muted-foreground mt-2">Asked by {doubt.author}</p>
      </CardContent>
      <CardFooter className="pt-0 flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MessageCircle className="h-3 w-3" />
          {doubt.answersCount} answers
        </div>
        <Button 
          size="sm" 
          onClick={() => onAnswerClick(doubt.id)}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Answer This
        </Button>
      </CardFooter>
    </Card>
  );
}
