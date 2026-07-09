import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { question, correctAnswer, userAnswer } = await req.json();

    if (!question || !correctAnswer || !userAnswer) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const apiKey = process.env.NVIDIA_API_KEY || process.env.AI_API_KEY;
    
    if (!apiKey || apiKey === 'your_nvidia_api_key_here') {
      return NextResponse.json(
        { error: 'NVIDIA API key is not configured.' },
        { status: 500 }
      );
    }

const systemPrompt = `You are an elite USA Payroll Learning Assistant conducting an interview.
Your task is to evaluate the user's answer to a specific payroll question.

Question: "${question}"
Known Correct Answer: "${correctAnswer}"

User's Answer: "${userAnswer}"

CRITICAL INSTRUCTION: First, carefully verify if the user's answer correctly addresses the core concepts in the Known Correct Answer. 
Then, evaluate the user's answer in a highly simplified, direct, and friendly tone. 

RULES FOR FEEDBACK:
1. NEVER use formal robotic intros (e.g., "I appreciate your participation...", "Unfortunately...").
2. GET STRAIGHT TO THE POINT. 
3. If they are correct, start with "✅ Correct!" and briefly explain why. 
4. If they are wrong, start with "❌ Not quite!" and give the correct answer in simple, easy-to-understand terms. 
5. Keep it extremely concise (1-3 sentences max). Use simple English.`;

    let apiUrl = 'https://integrate.api.nvidia.com/v1/chat/completions';
    let apiModel = 'meta/llama-3.1-70b-instruct';

    if (apiKey.startsWith('gsk_')) {
      apiUrl = 'https://api.groq.com/openai/v1/chat/completions';
      apiModel = 'llama3-70b-8192';
    } else if (apiKey.startsWith('AIza')) {
      apiUrl = 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions';
      apiModel = 'gemini-1.5-flash';
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: apiModel,
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
        ],
        temperature: 0.1,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "No text");
      console.error(`NVIDIA API Error (${response.status} ${response.statusText}):`, errorText);
      return NextResponse.json(
        { error: 'Failed to evaluate answer using NVIDIA API.' },
        { status: 500 }
      );
    }

    const data = await response.json();
    const feedback = data.choices?.[0]?.message?.content || 'Unable to generate feedback.';

    return NextResponse.json({ feedback });
  } catch (error) {
    console.error('Error evaluating answer:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
