'use client'

import { useEffect, useState } from 'react'
import sdk from '@farcaster/frame-sdk'
import HomeScreen from '@/components/HomeScreen'
import LoadingScreen from '@/components/LoadingScreen'
import ResultScreen from '@/components/ResultScreen'
import UserMatchScreen from '@/components/UserMatchScreen'

type Screen = 'home' | 'loading' | 'result' | 'user-match' | 'error'

export default function Page() {
  const [screen, setScreen] = useState<Screen>('home')
  const [context, setContext] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [matchData, setMatchData] = useState<any>(null)
  const [userMatchData, setUserMatchData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

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

    setLoading(true)
    setScreen('loading')

    try {
      const res = await fetch('/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fid: context.user.fid,
          username: context.user.username || `fid${context.user.fid}`
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
      const res = await fetch('/api/user-match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fid: context.user.fid,
          username: context.user.username || `fid${context.user.fid}`
        })
      })

      const data = await res.json()
      
      if (data.success) {
        setUserMatchData(data)
        setScreen('user-match')
      } else {
        throw new Error(data.error || 'User match failed')
      }
    } catch (err: any) {
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
      {screen === 'home' && (
        <HomeScreen
          context={context}
          loading={false}
          onFindMatch={handleFindMatch}
          onUserMatch={handleUserMatch}
        />
      )}
      
      {screen === 'loading' && <LoadingScreen />}
      
      {screen === 'result' && matchData && (
        <ResultScreen data={matchData} onBack={handleBack} />
      )}
      
      {screen === 'user-match' && userMatchData && (
        <UserMatchScreen data={userMatchData} onBack={handleBack} />
      )}
    </>
  )
}
