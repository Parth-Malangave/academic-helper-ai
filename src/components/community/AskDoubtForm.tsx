import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Image, X, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AskDoubtFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AskDoubtForm({ isOpen, onClose }: AskDoubtFormProps) {
  const [topic, setTopic] = useState('');
  const [doubt, setDoubt] = useState('');

  const handleSubmit = () => {
    if (topic.trim() && doubt.trim()) {
      // UI only - would submit to backend
      setTopic('');
      setDoubt('');
      onClose();
    }
  };

  return (
    <div className={cn(
      "overflow-hidden transition-all duration-300 ease-in-out",
      isOpen ? "max-h-96 opacity-100 mb-4" : "max-h-0 opacity-0"
    )}>
      <div className="bg-card border border-border rounded-lg p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Ask a New Doubt</h3>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-3">
          <div>
            <Label htmlFor="topic" className="text-sm text-foreground">Topic</Label>
            <Input
              id="topic"
              placeholder="e.g., Physics, Chemistry, Mathematics..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="mt-1 bg-background border-input"
            />
          </div>

          <div>
            <Label htmlFor="doubt" className="text-sm text-foreground">Your Doubt</Label>
            <Textarea
              id="doubt"
              placeholder="Describe your doubt in detail..."
              value={doubt}
              onChange={(e) => setDoubt(e.target.value)}
              rows={3}
              className="mt-1 bg-background border-input resize-none"
            />
          </div>

          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm" className="gap-2">
              <Image className="h-4 w-4" />
              Add Image
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={!topic.trim() || !doubt.trim()}
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Send className="h-4 w-4" />
              Post Doubt
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
