'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface HomeScreenProps {
  context: any
  loading: boolean
  onFindMatch: () => void
  onVibeCheck: () => void
}

export default function HomeScreen({ context, loading, onFindMatch, onVibeCheck }: HomeScreenProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-2xl">
        
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex justify-center mb-4">
            <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 p-1 shadow-2xl hover:scale-110 transition-transform duration-300">
              <div className="w-full h-full bg-[#1a1a2e] rounded-[22px] flex items-center justify-center text-5xl">
                🎯
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 animate-gradient">
            CryptoMatch
          </h1>
          
          <p className="text-lg md:text-xl text-white/70 font-medium max-w-md mx-auto">
            AI-powered personality analysis & celebrity matching for Farcaster
          </p>
        </div>

        {/* User Card */}
        {context?.user && (
          <div className="mb-8 animate-slide-up">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl hover:shadow-pink-500/20 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-white/20 hover:ring-pink-500/50 transition-all">
                  {context.user.pfp_url ? (
                    <Image
                      src={context.user.pfp_url}
                      alt={context.user.username || 'User'}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        e.currentTarget.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${context.user.fid}`
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl font-black">
                      {context.user.username?.[0]?.toUpperCase() || '?'}
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <p className="font-black text-lg text-white mb-1">
                    {context.user.display_name || context.user.username || `User ${context.user.fid}`}
                  </p>
                  <p className="text-sm text-white/60">
                    @{context.user.username || `fid${context.user.fid}`}
                  </p>
                </div>

                <div className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                  <p className="text-xs font-bold text-purple-300">
                    FID: {context.user.fid}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Feature Cards */}
        <div className="space-y-4 mb-8">
          
          {/* Celebrity Match Card */}
          <div className="group animate-slide-up animation-delay-200">
            <button
              onClick={onFindMatch}
              disabled={loading || !context?.user?.fid}
              className="w-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-3xl p-6 border border-white/10 
                       hover:border-pink-500/50 hover:shadow-2xl hover:shadow-pink-500/20 hover:scale-[1.02]
                       active:scale-[0.98] transition-all duration-300
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform">
                  🌟
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-2xl font-black text-white mb-1">
                    Celebrity Match
                  </h3>
                  <p className="text-sm text-white/60">
                    Find your celebrity twin with AI
                  </p>
                </div>
                <div className="text-3xl opacity-50 group-hover:opacity-100 group-hover:translate-x-2 transition-all">
                  →
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="bg-white/5 rounded-xl p-2 text-center">
                  <div className="text-lg mb-1">🎭</div>
                  <div className="text-white/60">100+ Celebs</div>
                </div>
                <div className="bg-white/5 rounded-xl p-2 text-center">
                  <div className="text-lg mb-1">🤖</div>
                  <div className="text-white/60">AI Analysis</div>
                </div>
                <div className="bg-white/5 rounded-xl p-2 text-center">
                  <div className="text-lg mb-1">💎</div>
                  <div className="text-white/60">NFT Bonus</div>
                </div>
              </div>
            </button>
          </div>

          {/* Vibe Check Card */}
          <div className="group animate-slide-up animation-delay-400">
            <button
              onClick={onVibeCheck}
              disabled={loading || !context?.user?.fid}
              className="w-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-xl rounded-3xl p-6 border border-white/10 
                       hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 hover:scale-[1.02]
                       active:scale-[0.98] transition-all duration-300
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform">
                  🎯
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-2xl font-black text-white mb-1">
                    Vibe Check
                  </h3>
                  <p className="text-sm text-white/60">
                    Discover your Farcaster personality
                  </p>
                </div>
                <div className="text-3xl opacity-50 group-hover:opacity-100 group-hover:translate-x-2 transition-all">
                  →
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="bg-white/5 rounded-xl p-2 text-center">
                  <div className="text-lg mb-1">🎲</div>
                  <div className="text-white/60">6 Types</div>
                </div>
                <div className="bg-white/5 rounded-xl p-2 text-center">
                  <div className="text-lg mb-1">📊</div>
                  <div className="text-white/60">Vibe Score</div>
                </div>
                <div className="bg-white/5 rounded-xl p-2 text-center">
                  <div className="text-lg mb-1">🔥</div>
                  <div className="text-white/60">AI Roast</div>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-2xl p-4 border border-white/10 animate-slide-up animation-delay-600">
          <div className="flex items-start gap-3">
            <div className="text-2xl mt-1">💡</div>
            <div>
              <p className="text-sm text-white/80 font-medium mb-2">
                <strong className="text-white">How it works:</strong>
              </p>
              <ul className="text-xs text-white/60 space-y-1">
                <li>• AI analyzes your Farcaster posts & activity</li>
                <li>• Matches personality traits with celebrities</li>
                <li>• Get personalized insights & funny roasts</li>
                <li>• Share your results with friends!</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center animate-fade-in animation-delay-800">
          <p className="text-xs text-white/40">
            Made with 💜 on Farcaster
          </p>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        .animate-slide-up {
          animation: slideUp 0.6s ease-out forwards;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }
        .animation-delay-600 {
          animation-delay: 0.6s;
          opacity: 0;
        }
        .animation-delay-800 {
          animation-delay: 0.8s;
          opacity: 0;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
