interface HomeScreenProps {
  context: any
  loading: boolean
  onFindMatch: () => void
  onOpenPortfolio: () => void
}

export default function HomeScreen({ context, loading, onFindMatch, onOpenPortfolio }: HomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col p-6">
        <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full">
          
          {/* Hero Section with 3D Hearts */}
          <div className="text-center mb-12 relative">
            {/* Floating Hearts Animation */}
            <div className="relative inline-block mb-6">
              <div className="text-7xl md:text-8xl animate-bounce">💕</div>
              <div className="absolute -top-4 -right-4 text-4xl animate-ping">✨</div>
              <div className="absolute -bottom-4 -left-4 text-3xl animate-pulse delay-500">🔥</div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-4 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-pink-200">
                Crypto
              </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400">
                Match
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-purple-200/90 font-medium">
              Find Your Crypto Celebrity Twin 🌟
            </p>
            
            <div className="mt-4 inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl px-4 py-2 rounded-full border border-white/20">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-sm text-white/80">AI-Powered Matching</span>
            </div>
          </div>

          {/* Premium Glass Card */}
          <div className="w-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-[2rem] p-8 md:p-10 mb-8 border border-white/20 shadow-2xl relative overflow-hidden">
            {/* Card Gradient Overlay */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500"></div>
            
            <h2 className="text-2xl md:text-3xl font-black mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
              How It Works
            </h2>
            
            <div className="space-y-5">
              {[
                { num: '1', icon: '🤖', text: 'AI analyzes your Farcaster profile', color: 'from-purple-500 to-purple-600' },
                { num: '2', icon: '🎯', text: 'Matches you with a crypto celebrity', color: 'from-pink-500 to-pink-600' },
                { num: '3', icon: '📊', text: 'Get hilarious compatibility report', color: 'from-yellow-500 to-orange-500' },
                { num: '4', icon: '🚀', text: 'Share & go viral!', color: 'from-green-500 to-emerald-500' },
              ].map((step) => (
                <div key={step.num} className="flex items-center gap-4 group hover:scale-105 transition-transform duration-300">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center font-black text-xl flex-shrink-0 shadow-lg group-hover:shadow-2xl transition-shadow`}>
                    {step.num}
                  </div>
                  <div className="flex-1 flex items-center gap-3">
                    <span className="text-3xl">{step.icon}</span>
                    <p className="text-base md:text-lg font-semibold text-white/90">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats Bar */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="text-center bg-white/5 rounded-xl p-3 border border-white/10">
                <div className="text-2xl font-black text-yellow-400">8</div>
                <div className="text-xs text-white/60 mt-1">Celebrities</div>
              </div>
              <div className="text-center bg-white/5 rounded-xl p-3 border border-white/10">
                <div className="text-2xl font-black text-green-400">100%</div>
                <div className="text-xs text-white/60 mt-1">Accuracy</div>
              </div>
              <div className="text-center bg-white/5 rounded-xl p-3 border border-white/10">
                <div className="text-2xl font-black text-pink-400">∞</div>
                <div className="text-xs text-white/60 mt-1">Fun</div>
              </div>
            </div>
          </div>

          {/* Premium CTA Buttons */}
          <div className="w-full space-y-4">
            <button
              onClick={onFindMatch}
              disabled={loading}
              className="w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-white py-6 px-8 rounded-2xl text-xl md:text-2xl font-black 
                       hover:scale-105 active:scale-95 transition-all duration-300
                       disabled:opacity-50 disabled:cursor-not-allowed
                       shadow-2xl hover:shadow-pink-500/50 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center justify-center gap-3">
                {loading ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Finding Your Match...</span>
                  </>
                ) : (
                  <>
                    <span className="text-2xl">🔥</span>
                    <span>Find My Celebrity Match</span>
                  </>
                )}
              </span>
            </button>

            <button
              onClick={onOpenPortfolio}
              className="w-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-xl text-white py-5 px-8 rounded-2xl text-lg md:text-xl font-bold 
                       hover:scale-105 active:scale-95 transition-all duration-300
                       border-2 border-purple-400/30 shadow-xl hover:shadow-purple-500/30
                       hover:from-purple-600/30 hover:to-pink-600/30 group"
            >
              <span className="flex items-center justify-center gap-3">
                <span className="text-2xl group-hover:scale-110 transition-transform">📊</span>
                <span>Track My Portfolio</span>
                <span className="text-xs bg-yellow-400 text-black px-2 py-1 rounded-full font-black">NEW</span>
              </span>
            </button>
          </div>

          {/* User Info */}
          {context && context.user && (
            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span className="text-sm text-white/70">Signed in as</span>
                <span className="text-sm font-bold text-white">
                  @{context.user.username || `FID ${context.user.fid}`}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center text-white/40 text-sm mt-8">
          <p className="flex items-center justify-center gap-2">
            <span>🤖 Powered by AI</span>
            <span>•</span>
            <span>💜 Built for Farcaster</span>
          </p>
        </div>
      </div>
    </div>
  )
}
