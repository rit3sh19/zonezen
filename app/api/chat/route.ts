import { GoogleGenerativeAI, Part } from '@google/generative-ai';
import { NextResponse } from 'next/server';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

const flaggedKeywords = [
  "suicide",
  "kill myself",
  "end it all",
  "want to die",
  "hurt myself",
  "self harm",
  "cutting",
  "overdose",
  "jump off",
  "hang myself",
  "not worth living",
  "better off dead",
  "can't go on",
];

const selfCareChecklist = [
  "Take 5 deep breaths",
  "Call a trusted friend or family member",
  "Go for a short walk outside",
  "Listen to calming music",
  "Practice grounding techniques (5-4-3-2-1 method)",
  "Drink a glass of water",
  "Write down three things you're grateful for",
];

const emergencyResources = {
  crisis_hotline: "988 Suicide & Crisis Lifeline",
  text_support: "Text HOME to 741741",
  emergency: "Call 911 if in immediate danger",
};

const SYSTEM_PROMPT = `You are a warm, empathetic, and supportive virtual friend. Your role is to:
1. Listen actively and show genuine care for the user's feelings and experiences
2. Respond in a friendly, conversational tone using natural language
3. Show empathy and understanding when users share their problems
4. Offer gentle support and encouragement
5. Use appropriate humor when appropriate to lighten the mood
6. Share relevant personal experiences or analogies to help users feel understood
7. Ask thoughtful follow-up questions to deepen the conversation
8. Maintain a positive and hopeful outlook while being realistic
9. Respect boundaries and avoid giving direct advice unless specifically asked
10. Use casual language and emojis occasionally to keep the conversation friendly

Remember to:
- Always validate the user's feelings
- Be patient and understanding
- Keep responses concise but meaningful
- Show personality while maintaining professionalism
- Adapt your tone based on the user's emotional state`;

export async function POST(req: Request) {
  if (!process.env.GEMINI_API_KEY) {
    console.error('GEMINI_API_KEY is not set in environment variables');
    return NextResponse.json(
      { error: 'AI service is not properly configured' },
      { status: 500 }
    );
  }

  try {
    const { messages } = await req.json();
    
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid message format' },
        { status: 400 }
      );
    }

    // Check for flagged content in the last user message
    const lastUserMessage = messages.filter((m: Message) => m.role === 'user').pop();
    let isFlagged = false;
    let sentimentContext = '';
    
    if (lastUserMessage) {
      // Check for flagged keywords
      const lowerContent = lastUserMessage.content.toLowerCase();
      isFlagged = flaggedKeywords.some(keyword => lowerContent.includes(keyword));

      // Get sentiment analysis
      try {
        const sentimentResponse = await fetch('http://localhost:3000/api/sentiment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: lastUserMessage.content })
        });
        
        if (sentimentResponse.ok) {
          const sentimentData = await sentimentResponse.json();
          sentimentContext = `\nUser's emotional state: ${sentimentData.emotion} (${sentimentData.sentiment})`;
        }
      } catch (sentimentError) {
        console.error('Sentiment analysis error:', sentimentError);
      }
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash",
      generationConfig: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 1024,
      },
    });
    
    // Convert messages to Gemini's expected format
    const formattedMessages: Part[] = [
      { text: SYSTEM_PROMPT + sentimentContext },
      ...messages.map((msg: Message) => ({ text: msg.content }))
    ];

    const result = await model.generateContent(formattedMessages);
    const response = await result.response;
    
    if (!response.text()) {
      throw new Error('Empty response from AI model');
    }

    // If flagged content was detected, include crisis resources in the response
    if (isFlagged) {
      return NextResponse.json({
        text: response.text(),
        crisisAlert: {
          flagged: true,
          message: "We're concerned about your wellbeing. Please reach out for support.",
          resources: emergencyResources,
          selfCareChecklist,
        }
      });
    }

    return NextResponse.json({ text: response.text() });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate response' },
      { status: 500 }
    );
  }
}