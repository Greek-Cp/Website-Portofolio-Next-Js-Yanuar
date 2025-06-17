import { NextRequest, NextResponse } from 'next/server';

const OPENAI_API_KEY = 'sk-kEc7pFqp7nuOJffbRwBuuBwDMjP6vxuqvzLwJqMpzYTUnTlJ';
const OPENAI_BASE_URL = 'https://api.chatanywhere.tech/v1';

export async function POST(request: NextRequest) {
  try {
    const { content, type, prompt } = await request.json();
    
    if (!content) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    // Default prompts based on content type
    const defaultPrompts = {
      portfolio: 'Summarize this portfolio content in a professional and engaging way. Focus on key achievements, skills, and value proposition. Keep it concise but impactful.',
      experience: 'Summarize this work experience in a professional manner. Highlight key responsibilities, achievements, and skills gained. Make it compelling for potential employers.',
      project: 'Summarize this project description. Focus on the problem solved, technologies used, key features, and impact. Make it clear and engaging.',
      general: 'Summarize the following content in a clear, professional, and engaging manner.'
    };

    const systemPrompt = prompt || defaultPrompts[type as keyof typeof defaultPrompts] || defaultPrompts.general;

    // Retry logic for connection issues
    let response: Response | undefined;
    let lastError: any;
    const maxRetries = 3;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`Attempt ${attempt} to call OpenAI API...`);
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
        
        response = await fetch(`${OPENAI_BASE_URL}/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              {
                role: 'system',
                content: systemPrompt
              },
              {
                role: 'user',
                content: content
              }
            ],
            max_tokens: 500,
            temperature: 0.7,
          }),
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        break; // Success, exit retry loop
        
      } catch (error: any) {
        lastError = error;
        console.error(`Attempt ${attempt} failed:`, error.message);
        
        if (attempt === maxRetries) {
          throw error; // Re-throw on final attempt
        }
        
        // Wait before retry (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }

    // Check if response was successfully obtained
    if (!response) {
      console.error('All retry attempts failed, no response received');
      return NextResponse.json(
        { error: 'Failed to connect to OpenAI API after multiple attempts' },
        { status: 503 }
      );
    }

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API Error:', errorData);
      return NextResponse.json(
        { error: 'Failed to generate summary', details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    const summary = data.choices[0]?.message?.content;

    if (!summary) {
      return NextResponse.json(
        { error: 'No summary generated' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      summary: summary.trim(),
      usage: data.usage
    });

  } catch (error: any) {
    console.error('AI Summarize Error:', error);
    
    // Handle specific error types
    let errorMessage = 'Internal server error';
    let statusCode = 500;
    
    if (error.name === 'AbortError') {
      errorMessage = 'Request timeout - API call took too long';
      statusCode = 408;
    } else if (error.code === 'ECONNRESET' || error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      errorMessage = 'Connection error - Unable to reach AI service. Please try again.';
      statusCode = 503;
    } else if (error.message?.includes('fetch failed')) {
      errorMessage = 'Network error - Please check your internet connection and try again.';
      statusCode = 503;
    }
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
        code: error.code || 'UNKNOWN_ERROR'
      },
      { status: statusCode }
    );
  }
}

// GET endpoint to check service status
export async function GET() {
  return NextResponse.json({
    status: 'AI Summarize Service is running',
    models: ['gpt-4o-mini', 'gpt-3.5-turbo', 'gpt-4o'],
    supportedTypes: ['portfolio', 'experience', 'project', 'general']
  });
}