export const metadata = {
  title: 'JointSync Systems — Clinical Continuity Automation for Orthopedic Practices',
  description: 'JointSync automates referral intake and MRI chasing to recover $150k+ in annual surgical revenue for private orthopedic practices in Texas and Florida.',
  keywords: 'orthopedic automation, referral management, MRI chasing, surgical practice automation, clinical continuity, HIPAA compliant',
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
