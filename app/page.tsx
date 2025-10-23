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
  const [showUserMatchWalletModal, setShowUserMatchWalletModal] = useState(false)  // ← NEW!

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

    // Show wallet modal FIRST (user can skip or add manual wallet)
    setShowWalletModal(true)
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

    // Show wallet modal FIRST (user can skip or add manual wallet)
    setShowUserMatchWalletModal(true)
  }

  const handleUserMatchContinue = async (manualWallet?: string) => {
    setShowUserMatchWalletModal(false)

    if (!context?.user?.fid) {
      setError('Please open in Warpcast')
      setScreen('error')
      return
    }

    setLoading(true)
    setScreen('loading')

    try {
      console.log('👥 Finding similar users for FID:', context.user.fid)
      
      // If manual wallet provided, use it
      if (manualWallet) {
        console.log('💰 Using manual wallet for user match:', manualWallet)
      }
      
      const res = await fetch('/api/user-match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fid: context.user.fid,
          username: context.user.username || `fid${context.user.fid}`,
          walletAddress: manualWallet  // Optional wallet
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

    // ✅ DON'T analyze immediately! Just show portfolio screen!
    // User will add wallet manually using "+ Wallet" button
    
    console.log('💰 Opening portfolio screen for FID:', context.user.fid)
    
    // Set empty portfolio data to show welcome screen
    setPortfolioData({
      success: true,
      analysis: {
        total_value_usd: '0',
        total_meme_coins: 0,
        chains: {},
        all_tokens: [],
        wallets_analyzed: []
      }
    })
    
    setScreen('portfolio')
  }

  const handleAddWallet = async (newWallet: string) => {
    if (!context?.user?.fid) return

    setLoading(true)
    setScreen('loading')
    
    try {
      let walletsToAnalyze: string[] = []
      
      // ✅ AUTO FETCH - Farcaster wallets!
      if (newWallet === 'AUTO_FETCH') {
        console.log('💰 Auto-fetching Farcaster wallets for FID:', context.user.fid)
        
        const walletRes = await fetch('/api/get-wallet', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fid: context.user.fid })
        })

        if (walletRes.ok) {
          const walletData = await walletRes.json()
          
          if (walletData.success) {
            if (walletData.wallets?.eth && Array.isArray(walletData.wallets.eth)) {
              walletsToAnalyze = walletData.wallets.eth.filter((w: string) => w && w.length > 0)
            } else if (walletData.wallet) {
              walletsToAnalyze = [walletData.wallet]
            }
          }
        }
        
        if (walletsToAnalyze.length === 0) {
          setError('No Farcaster wallets found!\n\nConnect your wallet on Farcaster:\nSettings → Verified Addresses → Connect Wallet')
          setScreen('error')
          setLoading(false)
          return
        }
        
        console.log('💰 Found Farcaster wallets:', walletsToAnalyze)
      }
      // ✅ MANUAL WALLET - Single wallet!
      else {
        console.log('💰 Adding manual wallet:', newWallet)
        
        // If portfolio already has wallets, add to existing
        if (portfolioData?.analysis?.wallets_analyzed && portfolioData.analysis.wallets_analyzed.length > 0) {
          walletsToAnalyze = [...portfolioData.analysis.wallets_analyzed, newWallet]
        } else {
          walletsToAnalyze = [newWallet]
        }
      }
      
      console.log('💰 Analyzing wallets:', walletsToAnalyze)
      
      const res = await fetch('/api/portfolio/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          addresses: walletsToAnalyze,
          fid: context.user.fid
        })
      })

      const data = await res.json()
      
      if (data.success) {
        setPortfolioData(data)
        setScreen('portfolio')
        console.log('✅ Portfolio analysis complete!')
      } else {
        throw new Error(data.error || 'Failed to analyze portfolio')
      }
    } catch (err: any) {
      console.error('❌ Portfolio analysis error:', err)
      setError(err.message || 'Failed to analyze portfolio')
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
      {/* Celebrity Match Wallet Modal */}
      <WalletInfoModal
        show={showWalletModal}
        hasWallet={!!(context?.user?.custody_address || context?.user?.verified_addresses?.eth_addresses?.[0])}
        onContinue={handleContinueMatch}
        onCancel={() => setShowWalletModal(false)}
      />

      {/* User Match Wallet Modal */}
      <WalletInfoModal
        show={showUserMatchWalletModal}
        hasWallet={!!(context?.user?.custody_address || context?.user?.verified_addresses?.eth_addresses?.[0])}
        onContinue={handleUserMatchContinue}
        onCancel={() => setShowUserMatchWalletModal(false)}
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
        <PortfolioScreen 
          data={portfolioData} 
          onBack={handleBack}
          onAddWallet={handleAddWallet}
        />
      )}
    </>
  )
}
