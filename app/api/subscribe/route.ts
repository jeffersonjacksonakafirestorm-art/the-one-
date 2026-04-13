import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { name, email } = await req.json()

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required.' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      )
    }

    /*
     * -------------------------------------------------------
     * TODO: Connect a real email provider here.
     *
     * Options:
     *  - Resend (resend.com) — recommended, free tier generous
     *      import { Resend } from 'resend'
     *      const resend = new Resend(process.env.RESEND_API_KEY)
     *      await resend.emails.send({ from, to, subject, html })
     *
     *  - ConvertKit / Kit (kit.com) — for list building
     *  - Mailchimp — for marketing lists
     *
     * For now, submissions are logged to the console.
     * -------------------------------------------------------
     */
    console.log('New subscriber:', { name, email, ts: new Date().toISOString() })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
