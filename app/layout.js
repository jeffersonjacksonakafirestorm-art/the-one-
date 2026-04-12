export const metadata = {
  title: 'CallRecoverAI — Stop Losing Jobs to Missed Calls',
  description: 'Miss a call. We text them back in 30 seconds. AI qualifies the lead. You close the job.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, padding: 0, background: '#0a0a0a', color: '#ffffff', fontFamily: "'Inter', sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
