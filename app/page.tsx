'use client'

import { useEffect, useState } from 'react'
import sdk from '@farcaster/frame-sdk'
import HomeScreen from '@/components/HomeScreen'
import LoadingScreen from '@/components/LoadingScreen'
import ResultScreen from '@/components/ResultScreen'
import UserMatchScreen from '@/components/UserMatchScreen'
import PortfolioScreen from '@/components/PortfolioScreen_New'
import WalletInfoModal from '@/components/WalletInfoModal'

type Screen = 'home' | 'loading' | 'result' | 'user-match' | 'portfolio' | 'error'

export default function Page() {
  const [screen, setScreen] = useState<Screen>('home')
  const [context, setContext] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [matchData, setMatchData] = useState<any>(null)
  const [userMatchData, setUserMatchData] = useState<any>(null)
  const [portfolioData, setPortfolioData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [showWalletModal, setShowWalletModal] = useState(false)

  useEffect(() => {
    const initSDK = async () => {
      try {
        console.log('🚀 Initializing Frame SDK...')
        await sdk.actions.ready()
        const ctx = await sdk.context
        console.log('📦 Context:', ctx)
        
        if (ctx?.user?.fid) {
          setContext(ctx)
        }
      } catch (err) {
        console.error('❌ SDK Error:', err)
      } finally {
        setLoading(false)
      }
    }
    initSDK()
  }, [])

  const handleFindMatch = async () => {
    if (!context?.user?.fid) {
      setError('Please open in Warpcast')
      setScreen('error')
      return
    }

    // BYPASS MODAL - START DIRECTLY!
    setLoading(true)
    setScreen('loading')

    try {
      // Fetch wallet via internal API (no modal!)
      console.log('🔍 Auto-fetching wallet for FID:', context.user.fid)
      
      const walletRes = await fetch('/api/get-wallet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fid: context.user.fid })
      })

      let walletAddress = null
      
      if (walletRes.ok) {
        const walletData = await walletRes.json()
        if (walletData.success && walletData.wallet) {
          walletAddress = walletData.wallet
          console.log('💰 Auto-detected wallet:', walletAddress)
        } else {
          console.log('⚠️ No wallet found, continuing without portfolio')
        }
      }

      // Perform match with or without wallet
      console.log('🎯 Starting match analysis...')
      
      const res = await fetch('/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fid: context.user.fid,
          username: context.user.username || `fid${context.user.fid}`,
          walletAddress: walletAddress
        })
      })

      const data = await res.json()
      
      if (data.success) {
        setMatchData(data.compatibility)
        setScreen('result')
      } else {
        throw new Error(data.error || 'Match failed')
      }
    } catch (err: any) {
      console.error('❌ Match error:', err)
      setError(err.message)
      setScreen('error')
    } finally {
      setLoading(false)
    }
  }

  const handleContinueMatch = async (manualWallet?: string) => {
    setShowWalletModal(false)

    // PRIORITY 1: Manuel wallet varsa direk kullan
    if (manualWallet) {
      console.log('💰 Using manual wallet:', manualWallet)
      await performMatch(manualWallet)
      return
    }

    // PRIORITY 2: Internal API ile wallet çek (GUARANTEED!)
    try {
      console.log('🔍 Fetching wallet via API for FID:', context.user.fid)
      
      const walletRes = await fetch('/api/get-wallet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fid: context.user.fid })
      })

      if (walletRes.ok) {
        const walletData = await walletRes.json()
        
        console.log('📦 Wallet API response:', walletData)

        if (walletData.success && walletData.wallet) {
          console.log('💰 Wallet found:', walletData.wallet)
          await performMatch(walletData.wallet)
          return
        }
      }
    } catch (error) {
      console.error('❌ Wallet API error:', error)
    }

    // NO WALLET - Continue without portfolio
    console.log('⚠️ No wallet found, continuing without portfolio analysis')
    await performMatch(null)
  }

  const performMatch = async (walletAddress: string | null) => {
    console.log('🔍 Performing match with wallet:', walletAddress || 'none')
    
    setLoading(true)
    setScreen('loading')

    try {
      const res = await fetch('/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fid: context.user.fid,
          username: context.user.username || `fid${context.user.fid}`,
          walletAddress: walletAddress
        })
      })

      const data = await res.json()
      
      if (data.success) {
        setMatchData(data.compatibility)
        setScreen('result')
      } else {
        throw new Error(data.error || 'Match failed')
      }
    } catch (err: any) {
      console.error('❌ Match error:', err)
      setError(err.message)
      setScreen('error')
    } finally {
      setLoading(false)
    }
  }

  const handleUserMatch = async () => {
    if (!context?.user?.fid) {
      setError('Please open in Warpcast')
      setScreen('error')
      return
    }

    setLoading(true)
    setScreen('loading')

    try {
      console.log('👥 Finding similar users for FID:', context.user.fid)
      
      const res = await fetch('/api/user-match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fid: context.user.fid,
          username: context.user.username || `fid${context.user.fid}`
        })
      })

      console.log('📡 User match response status:', res.status)
      const data = await res.json()
      console.log('📦 User match data:', data)
      
      if (data.success) {
        setUserMatchData(data)
        setScreen('user-match')
      } else {
        // Better error message
        throw new Error(data.error || 'Could not find similar users. Try following more people on Farcaster!')
      }
    } catch (err: any) {
      console.error('❌ User match error:', err)
      setError(err.message)
      setScreen('error')
    } finally {
      setLoading(false)
    }
  }

  const handlePortfolio = async () => {
    if (!context?.user?.fid) {
      setError('Please open in Warpcast')
      setScreen('error')
      return
    }

    setLoading(true)
    setScreen('loading')

    // Fetch wallet via internal API - NO MANUAL INPUT!
    try {
      console.log('💰 Portfolio - Fetching wallet for FID:', context.user.fid)
      
      const walletRes = await fetch('/api/get-wallet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fid: context.user.fid })
      })

      if (!walletRes.ok) {
        throw new Error('Failed to fetch wallet')
      }

      const walletData = await walletRes.json()
      
      console.log('📦 Wallet API response:', walletData)

      if (!walletData.success || !walletData.wallet) {
        setError('No wallet found! Connect your Ethereum wallet on Farcaster:\n\nSettings → Verified Addresses → Connect Wallet')
        setScreen('error')
        setLoading(false)
        return
      }

      const walletAddress = walletData.wallet
      console.log('💰 Portfolio wallet:', walletAddress)

      console.log('💰 Analyzing portfolio for:', walletAddress)
      
      const res = await fetch('/api/portfolio/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          walletAddress,
          username: context.user.username || `fid${context.user.fid}`
        })
      })

      const data = await res.json()
      
      if (data.success) {
        setPortfolioData(data)
        setScreen('portfolio')
      } else {
        throw new Error(data.error || 'Portfolio analysis failed')
      }
    } catch (err: any) {
      console.error('❌ Portfolio error:', err)
      setError(err.message)
      setScreen('error')
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    setScreen('home')
    setError(null)
  }

  if (loading && !context) {
    return <LoadingScreen />
  }

  if (screen === 'error') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-4">
        <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p className="mb-6">{error}</p>
          <button
            onClick={handleBack}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold"
          >
            Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Wallet Info Modal */}
      <WalletInfoModal
        show={showWalletModal}
        hasWallet={!!(context?.user?.custody_address || context?.user?.verified_addresses?.eth_addresses?.[0])}
        onContinue={handleContinueMatch}
        onCancel={() => setShowWalletModal(false)}
      />

      {screen === 'home' && (
        <HomeScreen
          context={context}
          loading={false}
          onFindMatch={handleFindMatch}
          onUserMatch={handleUserMatch}
          onPortfolio={handlePortfolio}
        />
      )}
      
      {screen === 'loading' && <LoadingScreen />}
      
      {screen === 'result' && matchData && (
        <ResultScreen data={matchData} context={context} onBack={handleBack} />
      )}
      
      {screen === 'user-match' && userMatchData && (
        <UserMatchScreen data={userMatchData} onBack={handleBack} />
      )}
      
      {screen === 'portfolio' && portfolioData && (
        <PortfolioScreen data={portfolioData} onBack={handleBack} />
      )}
    </>
  )
}
