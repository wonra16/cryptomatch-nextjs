'use client'

import { useState } from 'react'

interface VibeCheckResult {
  username: string
  displayName: string
  pfpUrl: string
  vibeScore: number
  personalityType: {
    type: string
    emoji: string
    description: string
  }
  topInterests: string[]
  roast: string
  stats: {
    totalCasts: number
    avgCastLength: number
    mostActiveHour: string
  }
}

interface VibeCheckScreenProps {
  result: VibeCheckResult | null
  onBack: () => void
}

export default function VibeCheckScreen({ result, onBack }: VibeCheckScreenProps) {
  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold mb-2">Analysis Failed</h2>
          <p className="text-white/70 mb-6">Could not analyze your Farcaster vibe</p>
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-xl font-bold hover:scale-105 transition"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    )
  }

  const { username, displayName, pfpUrl, vibeScore, personalityType, topInterests, roast, stats } = result

  // Vibe score color
  const getVibeColor = (score: number) => {
    if (score >= 80) return 'from-green-400 to-emerald-500'
    if (score >= 60) return 'from-blue-400 to-cyan-500'
    if (score >= 40) return 'from-yellow-400 to-orange-500'
    return 'from-red-400 to-pink-500'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white p-4 overflow-y-auto pb-20">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-all hover:scale-105"
          >
            <span className="text-2xl">←</span>
            <span className="font-bold">Back</span>
          </button>
          <h1 className="text-xl font-black">Vibe Check Results 🎯</h1>
          <div className="w-16"></div>
        </div>

        {/* Profile Card */}
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-3xl p-6 border border-white/20 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <img 
              src={pfpUrl} 
              alt={username}
              className="w-20 h-20 rounded-full border-4 border-white/20"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-black">{displayName}</h2>
              <p className="text-white/70">@{username}</p>
            </div>
          </div>
        </div>

        {/* Vibe Score */}
        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-xl rounded-3xl p-8 border border-white/20 mb-6 text-center">
          <h3 className="text-lg font-bold mb-4">Your Farcaster Vibe</h3>
          <div className="relative w-32 h-32 mx-auto mb-4">
            <svg className="transform -rotate-90" width="128" height="128">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="url(#vibeGradient)"
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${(vibeScore / 100) * 351.86} 351.86`}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="vibeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-black">{vibeScore}</span>
            </div>
          </div>
          <div className={`inline-block bg-gradient-to-r ${getVibeColor(vibeScore)} px-6 py-2 rounded-full font-bold text-sm`}>
            {vibeScore >= 80 && '🔥 LEGENDARY VIBE'}
            {vibeScore >= 60 && vibeScore < 80 && '✨ GREAT VIBE'}
            {vibeScore >= 40 && vibeScore < 60 && '👍 GOOD VIBE'}
            {vibeScore < 40 && '🤔 UNIQUE VIBE'}
          </div>
        </div>

        {/* Personality Type */}
        <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-xl rounded-3xl p-6 border border-white/20 mb-6">
          <div className="text-center mb-4">
            <div className="text-6xl mb-3">{personalityType.emoji}</div>
            <h3 className="text-2xl font-black mb-2">{personalityType.type}</h3>
            <p className="text-white/80">{personalityType.description}</p>
          </div>
        </div>

        {/* Interests */}
        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-xl rounded-3xl p-6 border border-white/20 mb-6">
          <h3 className="text-lg font-bold mb-4">Top Interests 🎯</h3>
          <div className="flex flex-wrap gap-2">
            {topInterests.map((interest, i) => (
              <span 
                key={i}
                className="bg-white/10 backdrop-blur-xl px-4 py-2 rounded-xl text-sm font-semibold border border-white/10"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* AI Roast */}
        <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 backdrop-blur-xl rounded-3xl p-6 border border-white/20 mb-6">
          <h3 className="text-lg font-bold mb-3">AI Roast 🔥</h3>
          <p className="text-white/90 italic leading-relaxed">"{roast}"</p>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-xl rounded-3xl p-6 border border-white/20 mb-6">
          <h3 className="text-lg font-bold mb-4">Your Stats 📊</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-black text-purple-400">{stats.totalCasts}</div>
              <div className="text-xs text-white/60 mt-1">Total Casts</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-pink-400">{stats.avgCastLength}</div>
              <div className="text-xs text-white/60 mt-1">Avg Length</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-cyan-400">{stats.mostActiveHour}</div>
              <div className="text-xs text-white/60 mt-1">Peak Hour</div>
            </div>
          </div>
        </div>

        {/* Share Button */}
        <div className="text-center">
          <button 
            onClick={() => {
              const shareText = `Just checked my Farcaster Vibe! 🎯\n\n${personalityType.emoji} ${personalityType.type}\nVibe Score: ${vibeScore}/100\n\nCheck yours at CryptoMatch!`
              if (navigator.share) {
                navigator.share({ text: shareText })
              } else {
                navigator.clipboard.writeText(shareText)
                alert('✅ Copied to clipboard!')
              }
            }}
            className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 rounded-xl font-bold hover:scale-105 transition shadow-xl"
          >
            📤 Share Your Vibe
          </button>
        </div>
      </div>
    </div>
  )
}
