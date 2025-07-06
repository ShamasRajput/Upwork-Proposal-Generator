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
            content: "You are an expert freelancer who writes personalized Upwork proposals to impress clients and win jobs."
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
- Address the client by name.
- Acknowledge their project needs.
- Highlight relevant expertise confidently.
- Mention portfolio examples if useful.
- End with a friendly invitation to discuss further.

Keep the tone friendly, professional, and persuasive.
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
