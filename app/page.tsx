'use client'

import { useEffect, useState } from 'react'
import sdk from '@farcaster/frame-sdk'
import LoadingScreen from '@/components/LoadingScreen'
import HomeScreen from '@/components/HomeScreen'
import ResultScreen from '@/components/ResultScreen'
import PortfolioScreen from '@/components/PortfolioScreen'

type Screen = 'home' | 'result' | 'portfolio'

export default function Home() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false)
  const [context, setContext] = useState<any>(null)
  const [currentScreen, setCurrentScreen] = useState<Screen>('home')
  const [matchResult, setMatchResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const initSDK = async () => {
      try {
        const ctx = await sdk.context
        setContext(ctx)
        
        // CRITICAL: Notify frame is ready
        sdk.actions.ready()
        
        setIsSDKLoaded(true)
      } catch (err) {
        console.error('SDK initialization failed:', err)
        setIsSDKLoaded(true) // Show UI anyway for testing
      }
    }

    initSDK()
  }, [])

  const findMatch = async () => {
    setLoading(true)

    try {
      // Farcaster'dan wallet adreslerini al
      let walletAddress = null
      
      if (context?.user?.fid) {
        try {
          // Farcaster API'den wallet adreslerini çek
          const farcasterResponse = await fetch(`https://api.warpcast.com/v2/user-by-fid?fid=${context.user.fid}`)
          const farcasterData = await farcasterResponse.json()
          
          // Verified addresses varsa al
          if (farcasterData.result?.user?.verifiedAddresses?.eth_addresses?.length > 0) {
            walletAddress = farcasterData.result.user.verifiedAddresses.eth_addresses[0]
          }
          // Custody address'i fallback olarak kullan
          else if (farcasterData.result?.user?.custody_address) {
            walletAddress = farcasterData.result.user.custody_address
          }
        } catch (farcasterErr) {
          console.warn('Could not fetch Farcaster wallet:', farcasterErr)
        }
      }

      const response = await fetch('/api/match', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fid: context?.user?.fid || Math.floor(Math.random() * 100000),
          username: context?.user?.username || 'anon',
          walletAddress: walletAddress, // Wallet adresini gönder!
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to find match')
      }

      const data = await response.json()
      setMatchResult(data)
      setCurrentScreen('result')
    } catch (err) {
      console.error('Match failed:', err)
      // Show demo result on error
      setMatchResult({
        compatibility: {
          score: 92,
          match_name: 'Crypto Enthusiast 🚀',
          match_avatar: 'https://pbs.twimg.com/profile_images/1518730952162791424/gBwEHNIl_400x400.jpg',
          why_compatible: "You both love DeFi and have diamond hands! Your shared passion for decentralization and innovative blockchain tech makes you a perfect match.",
          traits_in_common: ['HODLer', 'DeFi Fan', 'Early Adopter', 'Diamond Hands'],
          fun_fact: 'You both check crypto prices every 5 minutes! 📈',
          personalized_insight: 'Your Farcaster vibe is immaculate!',
          image_url: '/images/match-result.png'
        }
      })
      setCurrentScreen('result')
    } finally {
      setLoading(false)
    }
  }

  const shareResult = async () => {
    if (!matchResult) return

    const { compatibility } = matchResult
    const appUrl = process.env.NEXT_PUBLIC_URL || 'https://cryptomatch-nextjs.vercel.app'
    
    const text = `I just matched with ${compatibility.match_name} on CryptoMatch! 💕\n\n${compatibility.score}% compatibility! 🔥\n\nFind YOUR crypto celebrity match:`

    // Use Farcaster SDK composeCast
    try {
      await sdk.actions.composeCast({
        text: text,
        embeds: [appUrl]
      })
    } catch (error) {
      console.error('Failed to open cast composer:', error)
    }
  }

  const tryAgain = () => {
    setCurrentScreen('home')
    setMatchResult(null)
  }

  const openPortfolio = () => {
    setCurrentScreen('portfolio')
  }

  const closePortfolio = () => {
    setCurrentScreen('home')
  }

  if (!isSDKLoaded) {
    return <LoadingScreen />
  }

  if (currentScreen === 'portfolio') {
    return <PortfolioScreen onBack={closePortfolio} />
  }

  if (currentScreen === 'result' && matchResult) {
    return (
      <ResultScreen
        result={matchResult}
        context={context}
        onShare={shareResult}
        onTryAgain={tryAgain}
      />
    )
  }

  return (
    <HomeScreen
      context={context}
      loading={loading}
      onFindMatch={findMatch}
      onOpenPortfolio={openPortfolio}
    />
  )
}
