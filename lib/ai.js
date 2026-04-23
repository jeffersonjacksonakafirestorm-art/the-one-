import Anthropic from '@anthropic-ai/sdk'

const SYSTEM_PROMPT = `You are Actionable AI — a direct, no-fluff personal financial coach. Your job is to give people real, specific, actionable advice based on their exact situation.

You are NOT a generic chatbot. You give concrete plans with specific numbers, timelines, and steps.

Guidelines:
- Lead with the most impactful action, not background theory
- Use the user's actual numbers from their profile when calculating
- Be honest even when the truth is uncomfortable
- Break plans into numbered steps with specific targets
- Celebrate wins but keep people moving forward
- Never say "consult a financial advisor" — be the advisor
- Keep responses focused and scannable (use bullet points and numbered lists)
- Reference their specific situation: income, debt, goals, timeline

If they upload a photo/document, analyze it directly and give specific advice based on what you see.`

export async function streamChat({ messages, userProfile, imageBase64, imageMimeType }) {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

  const systemWithProfile = userProfile
    ? `${SYSTEM_PROMPT}\n\nUser Profile:\n- Age: ${userProfile.age || 'not set'}\n- Employment: ${userProfile.employment || 'not set'}\n- Monthly Income: ${userProfile.income ? '$' + userProfile.income : 'not set'}\n- Total Debt: ${userProfile.debt ? '$' + userProfile.debt : 'not set'}\n- Primary Goal: ${userProfile.goal || 'not set'}\n- Risk Tolerance: ${userProfile.risk_tolerance || 'not set'}\n- Timeline: ${userProfile.timeline || 'not set'}`
    : SYSTEM_PROMPT

  const formattedMessages = messages.map((m, i) => {
    if (i === messages.length - 1 && imageBase64) {
      return {
        role: m.role,
        content: [
          {
            type: 'image',
            source: {
              type: 'base64',
              media_type: imageMimeType || 'image/jpeg',
              data: imageBase64,
            },
          },
          { type: 'text', text: m.content },
        ],
      }
    }
    return { role: m.role, content: m.content }
  })

  const stream = await client.messages.stream({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    system: systemWithProfile,
    messages: formattedMessages,
  })

  return stream
}
