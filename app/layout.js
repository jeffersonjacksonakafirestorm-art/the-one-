export const metadata = {
  title: 'Groundwork — The Operating System for Your Trade Business',
  description: 'Automate quotes, follow-ups, invoices, customer reactivation, and weekly reports. Built for roofing, HVAC, plumbing, electrical, and landscaping businesses.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,800&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, background: '#000', color: '#fff', fontFamily: "'Inter Tight', system-ui, sans-serif", WebkitFontSmoothing: 'antialiased' }}>
        {children}
      </body>
    </html>
  )
}
