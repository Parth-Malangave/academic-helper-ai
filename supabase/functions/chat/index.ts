import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// In-memory chat history storage
const chatHistories: Map<string, Array<{ role: string; content: string; timestamp: string }>> = new Map();

const getModeSystemPrompt = (mode: string): string => {
  const basePrompt = `You are an academic AI assistant helping students.

Mode rules:`;

  switch (mode) {
    case 'exam':
      return `${basePrompt}
- Exam Mode:
  Give concise, structured, exam-ready answers.
  Focus on definitions, formulas, steps, and short explanations.
  Be direct and to the point.
  
Always be academically correct and easy to understand.`;
    
    case 'cheat-sheet':
      return `${basePrompt}
- Cheat Sheet Mode:
  Respond in bullet points.
  Highlight key formulas, facts, shortcuts, and summaries.
  Keep everything brief and scannable.
  Use formatting like bullets, numbered lists, and bold for key terms.
  
Always be academically correct and easy to understand.`;
    
    case 'descriptive':
    default:
      return `${basePrompt}
- Descriptive Mode:
  Give detailed explanations.
  Use examples, step-by-step reasoning, and clear elaboration.
  Break down complex concepts into understandable parts.
  Provide context and background when helpful.
  
Always be academically correct and easy to understand.`;
  }
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, mode, chatId } = await req.json();

    // Validate request
    if (!message || message.trim() === '') {
      return new Response(
        JSON.stringify({ error: 'Message cannot be empty' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    if (!GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY is not configured');
      return new Response(
        JSON.stringify({ error: 'AI service is not properly configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate a chatId if not provided
    const activeChatId = chatId || crypto.randomUUID();
    const timestamp = new Date().toISOString();

    // Get or create chat history for this conversation
    if (!chatHistories.has(activeChatId)) {
      chatHistories.set(activeChatId, []);
    }
    const history = chatHistories.get(activeChatId)!;

    // Add user message to history
    history.push({
      role: 'user',
      content: message,
      timestamp
    });

    // Build conversation for Gemini
    const systemPrompt = getModeSystemPrompt(mode || 'descriptive');
    
    // Format history for Gemini API
    const contents = history.map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    console.log(`Processing chat request - ChatId: ${activeChatId}, Mode: ${mode}, Message length: ${message.length}`);

    // Call Gemini API
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: systemPrompt }]
          },
          contents: contents,
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
          safetySettings: [
            {
              category: 'HARM_CATEGORY_HARASSMENT',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE'
            },
            {
              category: 'HARM_CATEGORY_HATE_SPEECH',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE'
            },
            {
              category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE'
            },
            {
              category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE'
            }
          ]
        }),
      }
    );

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.error('Gemini API error:', geminiResponse.status, errorText);
      return new Response(
        JSON.stringify({ 
          error: 'I apologize, but I encountered an issue processing your question. Please try again in a moment.',
          chatId: activeChatId,
          timestamp
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const geminiData = await geminiResponse.json();
    console.log('Gemini response received successfully');

    // Extract the response text
    const answer = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || 
      'I apologize, but I could not generate a response. Please try rephrasing your question.';

    // Add assistant response to history
    const responseTimestamp = new Date().toISOString();
    history.push({
      role: 'assistant',
      content: answer,
      timestamp: responseTimestamp
    });

    // Limit history to last 20 messages to prevent memory issues
    if (history.length > 20) {
      history.splice(0, history.length - 20);
    }

    return new Response(
      JSON.stringify({
        answer,
        chatId: activeChatId,
        timestamp: responseTimestamp
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in chat function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'An unexpected error occurred. Please try again.',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
