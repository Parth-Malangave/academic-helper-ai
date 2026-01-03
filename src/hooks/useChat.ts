import { useState, useCallback } from 'react';
import { Message } from '@/components/chat/ChatArea';

type Mode = 'exam' | 'cheat-sheet' | 'descriptive';

interface ChatSession {
  chatId: string;
  messages: Message[];
  title: string;
  createdAt: string;
}

// Mock responses based on mode
const getMockResponse = (message: string, mode: Mode): string => {
  const lowerMessage = message.toLowerCase();
  
  if (mode === 'exam') {
    if (lowerMessage.includes('newton') || lowerMessage.includes('law')) {
      return `**Newton's 3rd Law of Motion**

**Definition:** For every action, there is an equal and opposite reaction.

**Key Points:**
- Forces always occur in pairs
- Action-reaction forces act on different objects
- Equal in magnitude, opposite in direction

**Formula:** F₁₂ = -F₂₁

**Example:** When you push against a wall, the wall pushes back with equal force.`;
    }
    return `This is a concise, exam-ready response for: "${message}"

Key points:
1. Definition and core concept
2. Important formulas
3. Brief example`;
  }
  
  if (mode === 'cheat-sheet') {
    if (lowerMessage.includes('newton') || lowerMessage.includes('law')) {
      return `• **Newton's 3rd Law:** Action = Reaction
• **Formula:** F₁₂ = -F₂₁
• Forces act on **different objects**
• Always in **pairs**
• **Example:** Walking - foot pushes ground, ground pushes foot`;
    }
    return `• **Topic:** ${message}
• Key fact 1
• Key fact 2
• **Formula:** (if applicable)
• Quick example`;
  }
  
  // Descriptive mode (default)
  if (lowerMessage.includes('newton') || lowerMessage.includes('law')) {
    return `# Newton's Third Law of Motion

Newton's Third Law states that **for every action, there is an equal and opposite reaction**. This is one of the fundamental principles of classical mechanics.

## Understanding the Concept

When one object exerts a force on a second object, the second object simultaneously exerts a force equal in magnitude but opposite in direction on the first object. These forces are called action-reaction pairs.

## Key Characteristics

1. **Equal Magnitude:** Both forces have the same strength
2. **Opposite Direction:** The forces point in opposite directions
3. **Different Objects:** The forces act on different objects
4. **Simultaneous:** Both forces occur at the same time

## Real-World Examples

- **Walking:** Your foot pushes backward on the ground, and the ground pushes forward on your foot
- **Swimming:** You push water backward, water pushes you forward
- **Rocket Propulsion:** Exhaust gases push downward, rocket is pushed upward

## Mathematical Representation

F₁₂ = -F₂₁

Where F₁₂ is the force exerted by object 1 on object 2, and F₂₁ is the force exerted by object 2 on object 1.`;
  }
  
  return `Thank you for your question about "${message}". 

This is a placeholder response demonstrating the descriptive mode. In a full implementation, this would provide a detailed explanation with examples, step-by-step reasoning, and helpful context.

The response would include:
- Comprehensive explanation of the concept
- Relevant examples and analogies
- Step-by-step breakdowns where applicable
- Additional context and background information`;
};

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

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Generate new chat ID if needed
    const chatId = currentChatId || crypto.randomUUID();
    if (!currentChatId) {
      setCurrentChatId(chatId);
      
      // Create a new chat session
      const newSession: ChatSession = {
        chatId: chatId,
        messages: [],
        title: content.trim().slice(0, 50) + (content.length > 50 ? '...' : ''),
        createdAt: new Date().toISOString(),
      };
      setChatSessions(prev => [newSession, ...prev]);
    }

    // Add mock assistant message
    const assistantMessage: Message = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: getMockResponse(content, mode),
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsLoading(false);
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
