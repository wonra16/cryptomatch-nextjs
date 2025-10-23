import type { Metadata } from 'next'
import './globals.css'
import { WalletProviders } from '@/components/WalletProviders'

const appUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'

export const metadata: Metadata = {
  title: 'CryptoMatch - Find Your Crypto Soulmate',
  description: 'AI-powered crypto personality matching! Find your perfect match in the crypto world.',
  openGraph: {
    title: 'CryptoMatch',
    description: 'Find your crypto soulmate with AI-powered personality matching!',
    images: [`${appUrl}/images/preview.png`],
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': `${appUrl}/images/preview.png`,
    'fc:frame:image:aspect_ratio': '1.91:1',
    'fc:frame:button:1': 'Find My Match',
    'fc:frame:button:1:action': 'launch_frame',
    'fc:frame:button:1:target': appUrl,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/icon.png" />
      </head>
      <body>
        <WalletProviders>
          {children}
        </WalletProviders>
      </body>
    </html>
  )
}
