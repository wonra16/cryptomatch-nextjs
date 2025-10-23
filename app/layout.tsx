import type { Metadata } from 'next'
import './globals.css'
import { WalletProviders } from '@/components/WalletProviders'

const appUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'

export const metadata: Metadata = {
  title: 'CryptoMatch - Find Your Crypto Soulmate',
  description: 'AI-powered crypto personality matching! Find your perfect match in the crypto world.',
  icons: {
    icon: [
      { url: '/images/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/images/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/images/icon-512.png',
  },
  openGraph: {
    title: 'CryptoMatch - Find Your Crypto Soulmate',
    description: 'AI-powered crypto personality matching! Find your perfect match in the crypto world.',
    images: [{
      url: `${appUrl}/images/preview-og.png`,
      width: 1200,
      height: 630,
      alt: 'CryptoMatch'
    }],
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': `${appUrl}/images/preview-og.png`,
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
        <link rel="icon" href="/images/icon-512.png" sizes="any" />
        <link rel="apple-touch-icon" href="/images/icon-512.png" />
      </head>
      <body>
        <WalletProviders>
          {children}
        </WalletProviders>
      </body>
    </html>
  )
}
