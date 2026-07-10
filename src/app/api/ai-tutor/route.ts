import { NextResponse } from 'next/server';
import { interviewQuestions } from '@/data/interview-questions';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { message, category, history, isLiveMode, clientApiKey } = await req.json();

    if (!message || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const apiKey = clientApiKey || process.env.NVIDIA_API_KEY || process.env.AI_API_KEY;
    
    if (!apiKey || apiKey === 'your_nvidia_api_key_here') {
      return NextResponse.json(
        { error: 'AI API key is not configured. Please enter it in Settings.' },
        { status: 401 }
      );
    }

    // Filter questions by category to provide context, or use all if "All Topics"
    const categoryQuestions = category === "All Topics" 
      ? interviewQuestions 
      : interviewQuestions.filter(q => q.category === category);
    
    // Format the context concisely
    const contextText = categoryQuestions.map(q => `Q: ${q.q}\nA: ${q.a}`).join('\n\n');

    const systemPrompt = `You are an expert, elite AI Tutor specializing in USA Payroll and Taxation.
Your goal is to help the user learn and master payroll concepts.
You are currently helping the user study the topic: "${category}".

${isLiveMode ? `🚨 CRITICAL VOICE MODE INSTRUCTIONS 🚨
You are currently in a LIVE VOICE CONVERSATION with the user. You must act like a human speaking on a phone call.
1. NEVER use formatting like **bold**, *italics*, bullet points (-), or # headings. These sound terrible when read aloud by the text-to-speech engine. Speak in 100% plain text.
2. Be EXTREMELY conversational, natural, and friendly.
3. Keep your answers VERY SHORT and concise (2-3 sentences max). Do not lecture.
4. ALWAYS end your response with a quick, engaging question to keep the conversation flowing smoothly.` : `When answering, format your response beautifully using Markdown.
CRITICAL FORMATTING RULES:
1. If the information can be organized in rows/columns, ALWAYS create a Markdown TABLE.
2. If listing steps, rules, or multiple items, ALWAYS use a numbered list (serial numbers).
3. Use **bold text** to highlight key terms.`}

KNOWLEDGE BASE FOR THIS TOPIC:
${contextText}

CRITICAL INSTRUCTION: First, try to answer using the provided Knowledge Base. If the answer is NOT in the Knowledge Base, you ARE ALLOWED to use your own expert knowledge to answer the question, provided it is related to USA Payroll, Taxation, Accounting, or Human Resources. 
If the user asks something completely unrelated to finance or payroll (e.g. "how to bake a cake"), politely decline and steer them back to payroll topics.

IMPORTANT FORMATTING REQUIREMENT:
You MUST start your response with a category tag on the VERY FIRST LINE in exactly this format:
[Category: Your Category Name]

"Your Category Name" should be a 2-4 word summary of the core topic. If it matches "${category}", just use that.
The SECOND LINE ONWARDS must be your conversational reply to the user. Do not use JSON.`;

    // Prepare messages for DeepSeek
    const messages = [
      { role: 'system', content: systemPrompt },
      ...(history || []),
      { role: 'user', content: message }
    ];

    let apiUrl = 'https://integrate.api.nvidia.com/v1/chat/completions';
    let apiModel = 'deepseek-ai/deepseek-v4-flash';

    if (apiKey.startsWith('gsk_')) {
      apiUrl = 'https://api.groq.com/openai/v1/chat/completions';
      apiModel = 'llama3-70b-8192';
    } else if (apiKey.startsWith('AIza')) {
      apiUrl = 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions';
      apiModel = 'gemini-1.5-flash';
    }

    let response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: apiModel,
        messages,
        temperature: 0.2,
        max_tokens: 1024,
        stream: true,
      }),
    });

    // Fallback for NVIDIA 503 Resource Exhausted
    if (response.status === 503 && apiUrl.includes('nvidia.com')) {
      console.warn(`NVIDIA API 503 Resource Exhausted for ${apiModel}. Retrying with fallback model...`);
      response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'meta/llama-3.1-70b-instruct',
          messages,
          temperature: 0.2,
          max_tokens: 1024,
          stream: true,
        }),
      });
    }

    if (!response.ok) {
      const errorText = await response.text().catch(() => "No text");
      console.error(`NVIDIA API Error (${response.status} ${response.statusText}):`, errorText);
      return NextResponse.json(
        { error: `API Error: ${response.status} - ${errorText}` },
        { status: response.status }
      );
    }

    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error: any) {
    console.error('Error in AI Tutor:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
