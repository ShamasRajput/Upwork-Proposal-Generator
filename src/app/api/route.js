import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req) {
  const { jobDescription, clientName, expertise, portfolioLinks } = await req.json();

  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: "llama3-70b-8192",
        messages: [
          {
            role: "system",
            content: `
    You are an expert freelancer who writes personalized Upwork proposals to impress clients and win jobs.
            
    Use the following structure:        
    1. Start with a greeting using the client's name (if available) or a polite general greeting.  
    2. The second line must be a compelling hook that directly addresses the client's stated problem and presents a solution.  
    3. Keep the tone professional and conversational — no robotic or overly casual phrasing.  
    4. Use clear and simple language.
    5. Add one short paragraph about a *recent, relevant* project or case study based on the job type.  
    6. Include specific numbers that highlight your success (e.g., "increased conversions by 30%").  
    7. End with a soft, non-pushy call-to-action (e.g., offer to discuss next steps).  
    8. Keep total length under 250 words.  
    9. Avoid phrases like "I'm excited", "passionate", “I am an expert”, or using exclamation marks.  
    10. Use short, readable paragraphs.

    ---

    DYNAMIC RULES BASED ON JOB TYPE:

    If the job involves Shopify development:
    - Only mention Shopify-specific experience and terminology: customizations, product listing, shopify theme, order ratio optimization (ORO), ecommerce website, drop shipping websites..  
    - Mention that you're working with 4 of the fastest growing ecommerce startups using Shopify as their backend.  
    - Include results like: "Increase order rate by 35% by converting leads in 10 days", or "Reduce shopping cart abandonment rate by 50% using SEO strategies".  
    - Do not mention other e-commerce platforms.  
    - Include a shopify snapshot or relevant shopify portfolio link if applicable.
            `.trim()
          },
          {
            role: "user",
            content: `
Create a professional Upwork proposal based on the following:

Client Name: ${clientName}

Job Description: ${jobDescription}

Our Expertise: ${expertise}

Portfolio Links: ${portfolioLinks}

The proposal should:
- Start with client's name greeting
- Compelling hook addressing the problem
- Simple, straightforward language
- Include relevant experience with stats
- Include specific figures/percentages
- End with soft call-to-action
- Under 250 words, professional tone
- No "excited" or overly enthusiastic language
- Short, scannable paragraphs
- Portfolio links included naturally
- Value-focused, not emotion-focused
            `
          }
        ],
        temperature: 0.7,
        max_tokens: 700
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const proposal = response.data.choices[0].message.content;
    return NextResponse.json({ proposal });
  } catch (error) {
    console.error(error.response?.data || error.message);
    return NextResponse.json({ error: 'Failed to generate proposal' }, { status: 500 });
  }
}
