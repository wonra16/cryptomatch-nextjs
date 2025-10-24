import type { Metadata } from 'next'
import './globals.css'
import { WalletProviders } from '@/components/WalletProviders'
import { ErrorBoundary } from '@/components/ErrorBoundary'

const appUrl = process.env.NEXT_PUBLIC_URL || 'https://cryptomatch-nextjs.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: 'CryptoMatch - AI Personality Analysis for Farcaster',
    template: '%s | CryptoMatch'
  },
  description: 'Discover your Farcaster personality with AI! Celebrity matching, vibe check, and personality analysis powered by artificial intelligence. Find your crypto soulmate today!',
  keywords: ['Farcaster', 'Crypto', 'AI', 'Personality', 'Matching', 'Celebrity', 'Vibe Check', 'Web3', 'Social'],
  authors: [{ name: 'CryptoMatch' }],
  creator: 'CryptoMatch',
  publisher: 'CryptoMatch',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/images/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/images/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/images/icon-512.png',
    apple: '/images/icon-512.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: appUrl,
    siteName: 'CryptoMatch',
    title: 'CryptoMatch - AI Personality Analysis for Farcaster',
    description: 'Discover your Farcaster personality with AI! Celebrity matching & vibe check powered by artificial intelligence.',
    images: [{
      url: '/images/preview-og.png',
      width: 1200,
      height: 630,
      alt: 'CryptoMatch - AI Personality Analysis'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CryptoMatch - AI Personality Analysis',
    description: 'Discover your Farcaster personality with AI!',
    images: ['/images/preview-og.png'],
    creator: '@cryptomatch',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    // Farcaster Frame metadata
    'fc:frame': 'vNext',
    'fc:frame:image': `${appUrl}/images/preview-og.png`,
    'fc:frame:image:aspect_ratio': '1.91:1',
    'fc:frame:button:1': 'Launch CryptoMatch',
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
        <link rel="canonical" href={appUrl} />
      </head>
      <body className="antialiased">
        <ErrorBoundary>
          <WalletProviders>
            {children}
          </WalletProviders>
        </ErrorBoundary>
      </body>
    </html>
  )
}
