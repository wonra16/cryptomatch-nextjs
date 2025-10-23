import { NextResponse } from 'next/server'

export async function GET() {
  const appUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'

  const manifest = {
    accountAssociation: {
      header: "eyJmaWQiOjMzOTk3MiwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDIxMUNGMzAwNjFDNTIyZDc0MjgzOGQzODc2ZEY2NTk3NzExQ0NCRTMifQ",
      payload: "eyJkb21haW4iOiJjcnlwdG9tYXRjaC1uZXh0anMudmVyY2VsLmFwcCJ9",
      signature: "2ZmSXpW9P66NQiyyNZYKClnrMW1JtC3ttwJp59BMTbBGPTJr/1MHkx24jcaqBW7vvV3/vRxNp/kW0T4DSWKwQBs="
    },
    frame: {
      version: "1",
      name: "CryptoMatch",
      author: "wonra16",
      authorUrl: "https://warpcast.com/wonra16",
      description: "AI-powered crypto personality matching! Find your perfect match in the crypto world. Get hilarious compatibility reports and share viral results!",
      iconUrl: `${appUrl}/images/icon-512.png`,
      homeUrl: appUrl,
      imageUrl: `${appUrl}/images/preview-og.png`,
      buttonTitle: "Find My Match",
      splashImageUrl: `${appUrl}/images/splash-1024.png`,
      splashBackgroundColor: "#6200EA",
      subtitle: "Find your crypto soulmate",
      heroImageUrl: `${appUrl}/images/preview-og.png`,
      tagline: "Find your crypto match",
      ogTitle: "CryptoMatch - Find Your Crypto Soulmate",
      ogDescription: "AI-powered crypto personality matching! Find your perfect match in the crypto world.",
      ogImageUrl: `${appUrl}/images/preview-og.png`,
      primaryCategory: "entertainment",
      tags: [
        "personality",
        "match",
        "compatibility",
        "viral",
        "web3"
      ],
      screenshotUrls: [],
      noindex: false
    }
  }

  return NextResponse.json(manifest, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
