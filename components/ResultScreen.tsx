interface ResultScreenProps {
  data: any  // ← Changed from result to data (matching page.tsx)
  onBack: () => void  // ← Changed from onBack/onBack to onBack
}

export default function ResultScreen({ data, onBack }: ResultScreenProps) {
  // Defensive programming - check if data exists
  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-4">No Match Data</h2>
          <p className="text-white/70 mb-8">Something went wrong loading your match</p>
          <button
            onClick={onBack}
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-bold hover:scale-105 transition"
          >
            Back Home
          </button>
        </div>
      </div>
    )
  }

  // Extract compatibility with default values
  const compatibility = data || {}
  const {
    score = 0,
    match_name = 'Unknown',
    match_avatar = 'https://api.dicebear.com/7.x/avataaars/svg?seed=default',
    why_compatible = 'We found something special about you!',
    traits_in_common = [],
    fun_fact = '',
    personalized_insight = '',
    content_insight = null,
    portfolio_summary = null,
    content_summary = null,
  } = compatibility

  const userAvatar = 'https://api.dicebear.com/7.x/avataaars/svg?seed=user'
  const userName = 'You'

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center p-4">
        <div className="max-w-2xl mx-auto w-full">
          
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl px-4 py-2 rounded-full border border-white/20 mb-4">
              <span className="text-2xl animate-bounce">🎉</span>
              <span className="font-bold">Perfect Match Found!</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300">
              It's a Match!
            </h1>
          </div>

          {/* Main Match Card */}
          <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-2xl rounded-[2.5rem] overflow-hidden border border-white/20 shadow-2xl mb-6">
            
            {/* VS Section with Avatars */}
            <div className="relative bg-gradient-to-b from-purple-600/20 to-transparent p-8">
              <div className="flex items-center justify-center gap-6 mb-6">
                
                {/* User Avatar */}
                <div className="flex flex-col items-center relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-75 blur-xl animate-pulse"></div>
                  <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-white/40 shadow-2xl ring-4 ring-purple-500/30">
                    <img
                      src={userAvatar}
                      alt={userName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + userName
                      }}
                    />
                  </div>
                  <p className="text-sm font-bold mt-3 text-white/90 bg-white/10 px-3 py-1 rounded-full backdrop-blur-xl">
                    {userName}
                  </p>
                </div>

                {/* VS Badge + Score */}
                <div className="flex flex-col items-center -mx-2">
                  <div className="relative mb-3">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-xl opacity-75 animate-pulse"></div>
                    <div className="relative bg-gradient-to-br from-yellow-400 via-orange-500 to-pink-500 rounded-full w-20 h-20 flex items-center justify-center shadow-2xl border-4 border-white/40">
                      <span className="text-2xl font-black text-white drop-shadow-lg">VS</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 px-6 py-2.5 rounded-2xl shadow-xl border-2 border-white/40">
                    <span className="text-3xl font-black text-white drop-shadow-lg">
                      {score}%
                    </span>
                  </div>
                </div>

                {/* Celebrity Avatar */}
                <div className="flex flex-col items-center relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-75 blur-xl animate-pulse delay-500"></div>
                  <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-white/40 shadow-2xl ring-4 ring-yellow-500/30">
                    <img
                      src={match_avatar}
                      alt={match_name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://api.dicebear.com/7.x/bottts/svg?seed=' + match_name
                      }}
                    />
                  </div>
                  <p className="text-sm font-bold mt-3 text-center text-white/90 bg-white/10 px-3 py-1 rounded-full backdrop-blur-xl">
                    {match_name.split(' ')[0]}
                  </p>
                </div>
              </div>

              {/* Match Name */}
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300">
                  {match_name}
                </h2>
                {personalized_insight && (
                  <p className="text-yellow-300 font-bold text-sm md:text-base animate-pulse flex items-center justify-center gap-2">
                    <span>✨</span>
                    <span>{personalized_insight}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Content Sections */}
            <div className="p-6 space-y-5">
              
              {/* Why Compatible */}
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-5 border border-purple-400/20">
                <h3 className="text-lg md:text-xl font-black flex items-center gap-2 mb-3 text-purple-200">
                  <span className="text-2xl">🎯</span>
                  <span>Why You Match</span>
                </h3>
                <p className="text-white/90 text-sm md:text-base leading-relaxed">
                  {why_compatible}
                </p>
              </div>

              {/* Traits in Common */}
              <div>
                <h3 className="text-lg md:text-xl font-black flex items-center gap-2 mb-3 text-yellow-200">
                  <span className="text-2xl">✨</span>
                  <span>Traits in Common</span>
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {traits_in_common.map((trait: string, idx: number) => (
                    <div
                      key={idx}
                      className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-sm px-4 py-3 rounded-xl text-xs md:text-sm font-bold text-center border border-white/10 hover:scale-105 transition-all duration-200 hover:from-white/20 hover:to-white/10"
                    >
                      {trait}
                    </div>
                  ))}
                </div>
              </div>

              {/* Fun Fact */}
              <div className="bg-gradient-to-br from-yellow-500/15 to-orange-500/15 backdrop-blur-sm rounded-2xl p-5 border border-yellow-400/30">
                <h3 className="text-lg md:text-xl font-black flex items-center gap-2 mb-3 text-yellow-200">
                  <span className="text-2xl">🎉</span>
                  <span>Fun Fact</span>
                </h3>
                <p className="text-white/95 text-sm md:text-base leading-relaxed">
                  {fun_fact}
                </p>
              </div>

              {/* Portfolio-Based Match Badge */}
              {compatibility.portfolio_based && portfolio_summary && (
                <div className="bg-gradient-to-br from-green-500/15 to-emerald-500/15 backdrop-blur-sm rounded-2xl p-5 border border-green-400/30">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-2xl">💎</span>
                    <div>
                      <h3 className="text-lg md:text-xl font-black text-green-200">
                        Portfolio-Based Match!
                      </h3>
                      <p className="text-xs text-white/60 mt-1">
                        Matched using your real on-chain data
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="bg-white/5 rounded-xl p-3">
                      <p className="text-xs text-white/60 mb-1">Portfolio Value</p>
                      <p className="text-lg font-bold text-green-300">
                        ${portfolio_summary.total_value}
                      </p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3">
                      <p className="text-xs text-white/60 mb-1">Active Chains</p>
                      <p className="text-lg font-bold text-green-300">
                        {portfolio_summary.active_chains}/7
                      </p>
                    </div>
                  </div>

                  {portfolio_summary.is_multi_chain && (
                    <div className="mt-3 flex items-center gap-2 bg-purple-500/20 px-3 py-2 rounded-lg">
                      <span className="text-lg">🌐</span>
                      <span className="text-xs font-bold text-purple-200">Multi-Chain Pro</span>
                    </div>
                  )}
                  
                  {portfolio_summary.is_defi_user && (
                    <div className="mt-2 flex items-center gap-2 bg-blue-500/20 px-3 py-2 rounded-lg">
                      <span className="text-lg">🏦</span>
                      <span className="text-xs font-bold text-blue-200">DeFi Power User</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={onBack}
              className="w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-white py-5 px-6 rounded-2xl text-lg md:text-xl font-black 
                       hover:scale-105 active:scale-95 transition-all duration-300
                       shadow-2xl hover:shadow-pink-500/50 flex items-center justify-center gap-3 border-2 border-white/20
                       relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center gap-2">
                <span className="text-2xl">🚀</span>
                <span>Share My Match</span>
              </span>
            </button>
            
            <button
              onClick={onBack}
              className="w-full bg-white/10 backdrop-blur-xl text-white py-4 px-6 rounded-2xl text-base md:text-lg font-bold 
                       hover:scale-105 active:scale-95 transition-all duration-300
                       border-2 border-white/30 flex items-center justify-center gap-2 hover:bg-white/15"
            >
              <span className="text-xl">🔄</span>
              <span>Find Another Match</span>
            </button>
          </div>

          {/* Footer */}
          <p className="text-center text-white/40 text-xs mt-4">
            🤖 AI-Powered Celebrity Matching • Built with 💜 for Farcaster
          </p>
        </div>
      </div>
    </div>
  )
}
