interface UserMatchScreenProps {
  data: any
  onBack: () => void
}

export default function UserMatchScreen({ data, onBack }: UserMatchScreenProps) {
  const match = data.top_match
  
  if (!match) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white flex items-center justify-center p-6">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold mb-4">No matches found yet!</h2>
          <p className="text-white/70 mb-8">Keep building your presence on Farcaster 🚀</p>
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 rounded-xl font-bold hover:scale-105 transition"
          >
            Back Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col p-6">
        <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full">
          
          {/* Match Header */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4 animate-bounce">👥</div>
            <h1 className="text-4xl md:text-5xl font-black mb-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300">
                User Match Found!
              </span>
            </h1>
            <p className="text-lg text-white/70">You might vibe with this person</p>
          </div>

          {/* Match Card */}
          <div className="w-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl mb-8">
            
            {/* User Avatar & Info */}
            <div className="text-center mb-6">
              <div className="relative inline-block mb-4">
                <img
                  src={match.user.pfp_url || 'https://i.imgur.com/placeholder.png'}
                  alt={match.user.display_name}
                  className="w-32 h-32 rounded-full border-4 border-white/20 shadow-xl"
                />
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs font-black px-3 py-1 rounded-full">
                  Active
                </div>
              </div>
              
              <h2 className="text-3xl font-black mb-1">{match.user.display_name}</h2>
              <p className="text-lg text-purple-300 mb-4">@{match.user.username}</p>
              
              {/* Compatibility Score */}
              <div className="inline-block bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 rounded-2xl p-1">
                <div className="bg-[#16213e] rounded-xl px-6 py-3">
                  <div className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-300">
                    {match.compatibility_score}%
                  </div>
                  <div className="text-xs text-white/60 mt-1">Compatible</div>
                </div>
              </div>
            </div>

            {/* Match Reasons */}
            <div className="space-y-3 mb-6">
              <h3 className="text-xl font-bold text-center mb-4 text-purple-200">Why You Match:</h3>
              {match.match_reasons.map((reason: string, idx: number) => (
                <div key={idx} className="flex items-center gap-3 bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="text-2xl">✨</div>
                  <p className="text-base text-white/90">{reason}</p>
                </div>
              ))}
            </div>

            {/* Common Interests */}
            {match.common_interests && match.common_interests.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-bold text-white/60 mb-3 text-center">Common Interests:</h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {match.common_interests.map((interest: string, idx: number) => (
                    <span key={idx} className="bg-purple-500/20 text-purple-200 px-3 py-1 rounded-full text-sm font-semibold">
                      #{interest}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center bg-white/5 rounded-xl p-3 border border-white/10">
                <div className="text-2xl font-black text-blue-400">{match.common_following}</div>
                <div className="text-xs text-white/60 mt-1">Mutual Follows</div>
              </div>
              <div className="text-center bg-white/5 rounded-xl p-3 border border-white/10">
                <div className="text-2xl font-black text-green-400">{match.portfolio_similarity}%</div>
                <div className="text-xs text-white/60 mt-1">Portfolio Match</div>
              </div>
              <div className="text-center bg-white/5 rounded-xl p-3 border border-white/10">
                <div className="text-2xl font-black text-pink-400">High</div>
                <div className="text-xs text-white/60 mt-1">Vibe</div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => window.open(`https://warpcast.com/${match.user.username}`, '_blank')}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-6 rounded-xl text-lg font-bold
                       hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg"
            >
              <span className="flex items-center justify-center gap-2">
                <span>View on Warpcast</span>
                <span className="text-xl">→</span>
              </span>
            </button>
          </div>

          {/* All Matches Preview */}
          {data.all_matches && data.all_matches.length > 1 && (
            <div className="w-full mb-8">
              <h3 className="text-lg font-bold text-center mb-4 text-white/80">
                More Matches ({data.all_matches.length - 1})
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {data.all_matches.slice(1, 5).map((match: any, idx: number) => (
                  <div key={idx} className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10 hover:bg-white/10 transition">
                    <div className="flex items-center gap-3">
                      <img
                        src={match.user.pfp_url || 'https://i.imgur.com/placeholder.png'}
                        alt={match.user.username}
                        className="w-12 h-12 rounded-full border-2 border-white/20"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate">@{match.user.username}</p>
                        <p className="text-xs text-white/60">{match.compatibility_score}% match</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Back Button */}
          <button
            onClick={onBack}
            className="w-full bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl text-white py-4 px-6 rounded-xl text-lg font-bold
                     hover:scale-105 active:scale-95 transition-all duration-300 border border-white/20"
          >
            <span className="flex items-center justify-center gap-2">
              <span>←</span>
              <span>Find Another Match</span>
            </span>
          </button>
        </div>

        {/* Footer */}
        <div className="text-center text-white/40 text-sm mt-8">
          <p>🤖 AI-powered user matching • Share & connect!</p>
        </div>
      </div>
    </div>
  )
}
