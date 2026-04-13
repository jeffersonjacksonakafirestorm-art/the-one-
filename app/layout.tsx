import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Parker | TradrPros & ParkerFitness',
  description:
    'Day trading education and fitness programs. Real knowledge built over 4 years of study and training.',
  openGraph: {
    title: 'Parker | TradrPros & ParkerFitness',
    description:
      'Day trading education and fitness programs by Parker.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-black text-white antialiased font-sans">
        {children}
      </body>
    </html>
  )
}
