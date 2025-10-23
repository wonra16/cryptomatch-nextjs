'use client'

import { useEffect, useState } from 'react'
import sdk from '@farcaster/frame-sdk'
import HomeScreen from '@/components/HomeScreen'
import LoadingScreen from '@/components/LoadingScreen'
import ResultScreen from '@/components/ResultScreen'
import VibeCheckScreen from '@/components/VibeCheckScreen'
import WalletInfoModal from '@/components/WalletInfoModal'

type Screen = 'home' | 'loading' | 'result' | 'vibe-check' | 'error'

export default function Page() {
  const [screen, setScreen] = useState<Screen>('home')
  const [context, setContext] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [matchData, setMatchData] = useState<any>(null)
  const [vibeCheckData, setVibeCheckData] = useState<any>(null)
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

  // ========================================
  // CELEBRITY MATCH
  // ========================================
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

    // NO WALLET - Continue without portfolio
    console.log('⚠️ No wallet, continuing without portfolio analysis')
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

  // ========================================
  // VIBE CHECK - NEW!
  // ========================================
  const handleVibeCheck = async () => {
    if (!context?.user?.fid) {
      setError('Please open in Warpcast')
      setScreen('error')
      return
    }

    console.log('🎯 Starting Vibe Check for FID:', context.user.fid)

    setLoading(true)
    setScreen('loading')

    try {
      const res = await fetch('/api/vibe-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fid: context.user.fid
        })
      })

      const data = await res.json()
      
      if (data.success) {
        console.log('✅ Vibe Check complete!', data.result)
        setVibeCheckData(data.result)
        setScreen('vibe-check')
      } else {
        throw new Error(data.error || 'Vibe check failed')
      }
    } catch (err: any) {
      console.error('❌ Vibe Check error:', err)
      setError(err.message)
      setScreen('error')
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    setScreen('home')
    setMatchData(null)
    setVibeCheckData(null)
    setError(null)
  }

  // ========================================
  // RENDER
  // ========================================
  if (loading && !context) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Loading...</p>
        </div>
      </div>
    )
  }

  if (screen === 'home') {
    return (
      <>
        <HomeScreen 
          context={context}
          loading={loading}
          onFindMatch={handleFindMatch}
          onVibeCheck={handleVibeCheck}
        />
        
        {/* Wallet Modal for Celebrity Match */}
        {showWalletModal && (
          <WalletInfoModal
            onClose={() => setShowWalletModal(false)}
            onContinue={handleContinueMatch}
          />
        )}
      </>
    )
  }

  if (screen === 'loading') {
    return <LoadingScreen />
  }

  if (screen === 'result') {
    return (
      <ResultScreen 
        compatibility={matchData}
        onBack={handleBack}
      />
    )
  }

  if (screen === 'vibe-check') {
    return (
      <VibeCheckScreen 
        result={vibeCheckData}
        onBack={handleBack}
      />
    )
  }

  if (screen === 'error') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white p-6 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-4">Oops!</h2>
          <p className="text-white/70 mb-6 whitespace-pre-line">{error}</p>
          <button
            onClick={handleBack}
            className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-xl font-bold hover:scale-105 transition"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    )
  }

  return null
}
