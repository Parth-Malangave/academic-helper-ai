import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Message } from '@/components/chat/ChatArea';
import { toast } from '@/hooks/use-toast';

type Mode = 'exam' | 'cheat-sheet' | 'descriptive';

interface ChatSession {
  chatId: string;
  messages: Message[];
  title: string;
  createdAt: string;
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);

  const sendMessage = useCallback(async (content: string, mode: Mode) => {
    if (!content.trim()) return;

    // Add user message immediately
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('chat', {
        body: {
          message: content.trim(),
          mode: mode,
          chatId: currentChatId,
        },
      });

      if (error) {
        console.error('Chat API error:', error);
        toast({
          title: "Error",
          description: "Failed to get response. Please try again.",
          variant: "destructive",
        });
        return;
      }

      // Update chatId if this is a new conversation
      if (!currentChatId && data.chatId) {
        setCurrentChatId(data.chatId);
        
        // Create a new chat session
        const newSession: ChatSession = {
          chatId: data.chatId,
          messages: [],
          title: content.trim().slice(0, 50) + (content.length > 50 ? '...' : ''),
          createdAt: new Date().toISOString(),
        };
        setChatSessions(prev => [newSession, ...prev]);
      }

      // Add assistant message
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: data.answer,
        timestamp: data.timestamp,
      };

      setMessages(prev => [...prev, assistantMessage]);

    } catch (err) {
      console.error('Failed to send message:', err);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [currentChatId]);

  const startNewChat = useCallback(() => {
    setMessages([]);
    setCurrentChatId(null);
  }, []);

  const loadChat = useCallback((chatId: string) => {
    const session = chatSessions.find(s => s.chatId === chatId);
    if (session) {
      setCurrentChatId(chatId);
      setMessages(session.messages);
    }
  }, [chatSessions]);

  return {
    messages,
    isLoading,
    currentChatId,
    chatSessions,
    sendMessage,
    startNewChat,
    loadChat,
  };
}
