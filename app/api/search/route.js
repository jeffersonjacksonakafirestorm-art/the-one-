import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM = `You are No Collar — an AI platform that deploys AI employees for people.

When someone describes their situation, you:
1. Briefly acknowledge their specific situation (1-2 sentences, direct, no fluff)
2. Tell them exactly which AI agents would help and what each one would do for them in the background
3. End with a clear next step

Keep the response tight and scannable. Use bold for agent names. No generic advice.

After your response, on a new line output a JSON block in this exact format:
AGENTS_JSON:{"agents":[{"id":"agent-id","icon":"emoji","name":"Agent Name","desc":"One sentence on what it does for them specifically"}]}

Agent IDs to use: "missed-call-agent", "invoice-agent", "booking-agent", "follow-up-agent", "content-agent", "report-agent"
Match the agent to their actual situation. Only suggest agents that are genuinely relevant. Max 3 agents.`

export async function POST(req) {
  try {
    const { situation } = await req.json()
    if (!situation?.trim()) return Response.json({ error: 'No situation provided' }, { status: 400 })

    const stream = await client.messages.stream({
      model: 'claude-sonnet-4-6',
      max_tokens: 600,
      system: SYSTEM,
      messages: [{ role: 'user', content: situation }],
    })

    const encoder = new TextEncoder()
    let fullText = ''

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (event.type === 'content_block_delta' && event.delta?.type === 'text_delta') {
              const text = event.delta.text
              fullText += text

              // Check if we've hit the agents JSON marker — don't stream that part
              if (fullText.includes('AGENTS_JSON:')) {
                const visiblePart = fullText.split('AGENTS_JSON:')[0]
                const newVisible = text
                // Only send text before the JSON marker
                if (!fullText.split('AGENTS_JSON:')[0].endsWith(visiblePart.slice(0, -text.length))) {
                  // streaming visible part only
                }
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`))
              } else {
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`))
              }
            }
          }

          // Parse agents JSON and send it
          if (fullText.includes('AGENTS_JSON:')) {
            try {
              const jsonStr = fullText.split('AGENTS_JSON:')[1].trim()
              const parsed = JSON.parse(jsonStr)
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ agents: parsed.agents })}\n\n`))
            } catch {}
          }

          controller.close()
        } catch (err) {
          controller.error(err)
        }
      }
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (err) {
    return Response.json({ error: 'Search failed' }, { status: 500 })
  }
}
