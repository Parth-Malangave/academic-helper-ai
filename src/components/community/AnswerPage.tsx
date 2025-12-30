import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { mockCommunityDoubts, mockAnswers, Answer } from '@/data/mockData';
import { ArrowLeft, ThumbsUp, ThumbsDown, Image, Send, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

interface AnswerPageProps {
  doubtId: string;
  onBack: () => void;
}

export function AnswerPage({ doubtId, onBack }: AnswerPageProps) {
  const doubt = mockCommunityDoubts.find((d) => d.id === doubtId);
  const [answers, setAnswers] = useState<Answer[]>(mockAnswers);
  const [newAnswer, setNewAnswer] = useState('');
  const [userVotes, setUserVotes] = useState<Record<string, 'up' | 'down' | null>>({});

  if (!doubt) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-muted-foreground">Doubt not found</p>
      </div>
    );
  }

  const handleSubmitAnswer = () => {
    if (newAnswer.trim()) {
      const answer: Answer = {
        id: Date.now().toString(),
        content: newAnswer,
        author: 'You',
        upvotes: 0,
        downvotes: 0,
        timestamp: new Date(),
      };
      setAnswers([...answers, answer]);
      setNewAnswer('');
    }
  };

  const handleVote = (answerId: string, type: 'up' | 'down') => {
    const currentVote = userVotes[answerId];
    
    // If user already voted the same way, do nothing
    if (currentVote === type) return;
    
    setUserVotes(prev => ({ ...prev, [answerId]: type }));
    
    setAnswers(
      answers.map((a) =>
        a.id === answerId
          ? {
              ...a,
              upvotes: type === 'up' 
                ? a.upvotes + 1 
                : (currentVote === 'up' ? a.upvotes - 1 : a.upvotes),
              downvotes: type === 'down' 
                ? a.downvotes + 1 
                : (currentVote === 'down' ? a.downvotes - 1 : a.downvotes),
            }
          : a
      )
    );
  };

  return (
    <div className="h-full flex flex-col p-4">
      <Button
        variant="ghost"
        onClick={onBack}
        className="self-start mb-4 gap-2 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Community
      </Button>

      <Card className="border-border mb-4">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <Badge variant="secondary">{doubt.topic}</Badge>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {formatDistanceToNow(doubt.timestamp, { addSuffix: true })}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-foreground">{doubt.doubt}</p>
          <p className="text-sm text-muted-foreground mt-2">Asked by {doubt.author}</p>
        </CardContent>
      </Card>

      <h3 className="font-semibold text-foreground mb-3">
        {answers.length} Answer{answers.length !== 1 ? 's' : ''}
      </h3>

      <ScrollArea className="flex-1 mb-4">
        <div className="space-y-3 pr-4">
          {answers.map((answer) => (
            <Card key={answer.id} className="border-border">
              <CardContent className="pt-4">
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                      {answer.author.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-foreground">{answer.author}</span>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(answer.timestamp, { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">{answer.content}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleVote(answer.id, 'up')}
                    className={cn(
                      "gap-1 h-8 transition-all duration-200",
                      userVotes[answer.id] === 'up' 
                        ? "text-primary scale-110" 
                        : "text-muted-foreground hover:text-foreground",
                      userVotes[answer.id] === 'up' && "animate-scale-in"
                    )}
                  >
                    <ThumbsUp className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      userVotes[answer.id] === 'up' && "fill-primary"
                    )} />
                    {answer.upvotes}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleVote(answer.id, 'down')}
                    className={cn(
                      "gap-1 h-8 transition-all duration-200",
                      userVotes[answer.id] === 'down' 
                        ? "text-destructive scale-110" 
                        : "text-muted-foreground hover:text-foreground",
                      userVotes[answer.id] === 'down' && "animate-scale-in"
                    )}
                  >
                    <ThumbsDown className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      userVotes[answer.id] === 'down' && "fill-destructive"
                    )} />
                    {answer.downvotes}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </ScrollArea>

      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        <Textarea
          placeholder="Write your answer..."
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          rows={3}
          className="bg-background border-input resize-none"
        />
        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm" className="gap-2">
            <Image className="h-4 w-4" />
            Add Image
          </Button>
          <Button
            onClick={handleSubmitAnswer}
            disabled={!newAnswer.trim()}
            className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Send className="h-4 w-4" />
            Post Answer
          </Button>
        </div>
      </div>
    </div>
  );
}
