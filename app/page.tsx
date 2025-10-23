'use client'

import { useEffect, useState } from 'react'
import sdk from '@farcaster/frame-sdk'
import HomeScreen from '@/components/HomeScreen'
import LoadingScreen from '@/components/LoadingScreen'
import ResultScreen from '@/components/ResultScreen'
import UserMatchScreen from '@/components/UserMatchScreen'

type Screen = 'home' | 'loading' | 'result' | 'user-match'

export default function Page() {
  const [screen, setScreen] = useState<Screen>('home')
  const [context, setContext] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [matchData, setMatchData] = useState<any>(null)
  const [userMatchData, setUserMatchData] = useState<any>(null)

  useEffect(() => {
    const initSDK = async () => {
      try {
        await sdk.actions.ready()
        const ctx = await sdk.context
        setContext(ctx)
      } catch (error) {
        console.error('Failed to initialize SDK:', error)
      }
    }
    initSDK()
  }, [])

  const handleFindMatch = async () => {
    if (!context?.user) return

    setLoading(true)
    setScreen('loading')

    try {
      const response = await fetch('/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fid: context.user.fid,
          username: context.user.username,
          bio: context.user.bio,
          walletAddress: context.user.custody_address
        })
      })

      const data = await response.json()
      
      if (data.success) {
        setMatchData(data.compatibility)
        setScreen('result')
      }
    } catch (error) {
      console.error('Match error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUserMatch = async () => {
    if (!context?.user) return

    setLoading(true)
    setScreen('loading')

    try {
      const response = await fetch('/api/user-match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fid: context.user.fid,
          username: context.user.username
        })
      })

      const data = await response.json()
      
      if (data.success) {
        setUserMatchData(data)
        setScreen('user-match')
      }
    } catch (error) {
      console.error('User match error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    setScreen('home')
    setMatchData(null)
    setUserMatchData(null)
  }

  return (
    <>
      {screen === 'home' && (
        <HomeScreen
          context={context}
          loading={loading}
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
