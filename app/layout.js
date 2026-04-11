export const metadata = {
  title: 'CallRecoverAI — Every Missed Call, Answered.',
  description: 'AI texts back every missed caller in under 30 seconds. Automatically qualifies leads and keeps jobs from walking out the door.',
  keywords: 'missed call text back, AI lead recovery, business automation, call recovery',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, fontFamily: "'Inter Tight', 'Inter', system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  )
}
