export const metadata = {
  title: 'No Collar',
  description: 'AI employees that run in the background. No code. No collar.',
  manifest: '/manifest.json',
  themeColor: '#ffffff',
  appleWebApp: { capable: true, statusBarStyle: 'default', title: 'No Collar' },
  viewport: { width: 'device-width', initialScale: 1, maximumScale: 1 },
  icons: { apple: '/icon-192.png' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100..900;1,100..900&family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body style={{
        margin: 0,
        background: '#fff',
        color: '#0a0a0a',
        fontFamily: "'Inter Tight', system-ui, sans-serif",
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      }}>
        {children}
      </body>
    </html>
  )
}
