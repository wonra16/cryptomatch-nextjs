interface HomeScreenProps {
  context: any
  loading: boolean
  onFindMatch: () => void
  onUserMatch: () => void
  onPortfolio: () => void
}

export default function HomeScreen({ context, loading, onFindMatch, onUserMatch, onPortfolio }: HomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col p-6">
        <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full">
          
          {/* Hero Section */}
          <div className="text-center mb-12 relative">
            <div className="relative inline-block mb-6">
              <img 
                src="/images/icon-512.png" 
                alt="CryptoMatch" 
                className="w-24 h-24 md:w-32 md:h-32 drop-shadow-2xl animate-float"
              />
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
              Find Your Perfect Match 🌟
            </p>
            
            <div className="mt-4 inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl px-4 py-2 rounded-full border border-white/20">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-sm text-white/80">AI-Powered + Content Analysis</span>
            </div>
          </div>

          {/* Premium Glass Card */}
          <div className="w-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-[2rem] p-8 md:p-10 mb-8 border border-white/20 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500"></div>
            
            <h2 className="text-2xl md:text-3xl font-black mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
              🆕 V3.0 Features
            </h2>
            
            <div className="space-y-5">
              {[
                { num: '1', icon: '🤖', text: 'AI analyzes your Farcaster casts', color: 'from-purple-500 to-purple-600' },
                { num: '2', icon: '🎨', text: 'Extracts your interests & hobbies', color: 'from-pink-500 to-pink-600' },
                { num: '3', icon: '🌟', text: 'Matches with 100+ celebrities', color: 'from-yellow-500 to-orange-500' },
                { num: '4', icon: '👥', text: 'Find similar Farcaster users!', color: 'from-green-500 to-emerald-500' },
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
                <div className="text-2xl font-black text-yellow-400">100+</div>
                <div className="text-xs text-white/60 mt-1">Celebrities</div>
              </div>
              <div className="text-center bg-white/5 rounded-xl p-3 border border-white/10">
                <div className="text-2xl font-black text-green-400">AI</div>
                <div className="text-xs text-white/60 mt-1">Powered</div>
              </div>
              <div className="text-center bg-white/5 rounded-xl p-3 border border-white/10">
                <div className="text-2xl font-black text-pink-400">∞</div>
                <div className="text-xs text-white/60 mt-1">Matches</div>
              </div>
            </div>
          </div>

          {/* CTA Buttons - Modern 3-Button Layout */}
          <div className="w-full space-y-3">
            
            {/* Primary: Celebrity Match */}
            <button
              onClick={onFindMatch}
              disabled={loading}
              className="w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-white py-6 px-8 rounded-2xl text-xl md:text-2xl font-black 
                       hover:scale-[1.02] active:scale-98 transition-all duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed
                       shadow-2xl hover:shadow-pink-500/50 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center justify-center gap-3">
                {loading ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Finding Match...</span>
                  </>
                ) : (
                  <>
                    <span className="text-2xl">🌟</span>
                    <span>Find Celebrity Match</span>
                  </>
                )}
              </span>
            </button>

            {/* Secondary Buttons Grid */}
            <div className="grid grid-cols-2 gap-3">
              
              {/* User Match */}
              <button
                onClick={onUserMatch}
                disabled={loading}
                className="bg-gradient-to-br from-purple-600/90 to-pink-600/90 backdrop-blur-xl text-white py-4 px-4 rounded-xl text-base md:text-lg font-bold 
                         hover:scale-[1.02] active:scale-98 transition-all duration-200
                         border border-purple-400/30 shadow-lg hover:shadow-purple-500/30
                         disabled:opacity-50 disabled:cursor-not-allowed relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                <span className="relative z-10 flex flex-col items-center justify-center gap-2">
                  <span className="text-3xl group-hover:scale-110 transition-transform">👥</span>
                  <span className="text-sm font-extrabold">Find Similar</span>
                  <span className="text-xs font-bold opacity-80">Users</span>
                </span>
                <span className="absolute top-2 right-2 text-[10px] bg-green-400 text-black px-1.5 py-0.5 rounded-md font-black">NEW</span>
              </button>

              {/* Portfolio */}
              <button
                onClick={onPortfolio}
                disabled={loading}
                className="bg-gradient-to-br from-blue-600/90 to-cyan-600/90 backdrop-blur-xl text-white py-4 px-4 rounded-xl text-base md:text-lg font-bold 
                         hover:scale-[1.02] active:scale-98 transition-all duration-200
                         border border-blue-400/30 shadow-lg hover:shadow-cyan-500/30
                         disabled:opacity-50 disabled:cursor-not-allowed relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                <span className="relative z-10 flex flex-col items-center justify-center gap-2">
                  <span className="text-3xl group-hover:scale-110 transition-transform">💰</span>
                  <span className="text-sm font-extrabold">Analyze</span>
                  <span className="text-xs font-bold opacity-80">Portfolio</span>
                </span>
              </button>
              
            </div>
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
            <span>🤖 V3.0</span>
            <span>•</span>
            <span>100+ Celebrities</span>
            <span>•</span>
            <span>💜 User Matching</span>
          </p>
        </div>
      </div>
    </div>
  )
}
