'use client'

interface PortfolioScreenProps {
  data: any
  onBack: () => void
}

export default function PortfolioScreen({ data, onBack }: PortfolioScreenProps) {
  if (!data || !data.success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold mb-2">Analysis Failed</h2>
          <p className="text-white/70 mb-6">{data?.error || 'Could not analyze portfolio'}</p>
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

  const analysis = data.analysis || {}
  const totalValue = parseFloat(analysis.total_value_usd || '0')
  const allTokens = analysis.all_tokens || []
  const chains = Object.entries(analysis.chains || {})
  const totalMemeCoins = analysis.total_meme_coins || 0

  // Filter meme coins
  const MEME_KEYWORDS = [
    'DOGE', 'SHIB', 'PEPE', 'FLOKI', 'ELON', 'WOJAK', 'BONK', 'WIF',
    'MEME', 'APU', 'BRETT', 'TOSHI', 'MOCHI', 'DEGEN', 'MFER', 'CHAD',
    'BASED', 'HIGHER', 'NORMIE', 'NEIRO', 'POPCAT', 'MEW', 'MYRO'
  ]
  
  const memeCoins = allTokens.filter((token: any) => {
    const symbol = (token.symbol || '').toUpperCase()
    return MEME_KEYWORDS.some(keyword => symbol.includes(keyword))
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white p-4 overflow-y-auto">
      <div className="max-w-4xl mx-auto pb-20">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-all hover:scale-105"
          >
            <span className="text-2xl">←</span>
            <span className="font-bold">Back</span>
          </button>
          <h1 className="text-2xl md:text-3xl font-black">Portfolio Analysis 💰</h1>
          <div className="w-20"></div>
        </div>

        {/* Total Value Card */}
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-3xl p-8 mb-6 border border-white/20 text-center">
          <p className="text-white/70 text-sm mb-2">Total Portfolio Value</p>
          <h2 className="text-5xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-emerald-300 mb-2">
            ${totalValue.toFixed(2)}
          </h2>
          <p className="text-white/60 text-sm">Across {chains.length} Active Chains 🌐</p>
        </div>

        {/* Meme Coin Section - HIGHLIGHT! */}
        {memeCoins.length > 0 && (
          <div className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 backdrop-blur-xl rounded-3xl p-6 mb-6 border-2 border-yellow-400/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 text-9xl opacity-10">🐕</div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">🐕</span>
                <div>
                  <h3 className="text-2xl font-black text-yellow-300">MEME COINS DETECTED!</h3>
                  <p className="text-white/70 text-sm">You're a true degen! 🚀</p>
                </div>
              </div>

              <div className="bg-black/20 rounded-2xl p-4 mb-4">
                <p className="text-white/80 text-center">
                  <span className="text-3xl font-black text-yellow-300">{memeCoins.length}</span>
                  <span className="text-white/70 ml-2">meme coins in portfolio</span>
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {memeCoins.map((token: any, i: number) => (
                  <div key={i} className="bg-black/30 rounded-xl p-3 border border-yellow-400/30">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">🚀</span>
                      <span className="font-bold text-yellow-300">{token.symbol}</span>
                    </div>
                    <p className="text-xs text-white/60">{token.balance} tokens</p>
                    <p className="text-xs text-white/50">{token.chain}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-center">
                <p className="text-sm text-yellow-200">
                  💎 Diamond hands detected! Keep HODLing! 🙌
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Chain Breakdown */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 mb-6 border border-white/20">
          <h3 className="text-xl font-bold mb-4">Chain Breakdown 🌐</h3>
          
          <div className="space-y-3">
            {chains.map(([chainKey, chainData]: any, i: number) => (
              <div key={i} className="bg-white/5 rounded-2xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold capitalize">{chainKey.replace(/-/g, ' ')}</span>
                  <span className="text-green-300 font-bold">
                    ${parseFloat(chainData.native_value_usd || '0').toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm text-white/60">
                  <span>{chainData.native_balance} native</span>
                  <span>{chainData.tokens?.length || 0} tokens</span>
                  {chainData.meme_coins > 0 && (
                    <span className="text-yellow-300 font-bold">
                      🐕 {chainData.meme_coins} memes
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Tokens */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
          <h3 className="text-xl font-bold mb-4">All Tokens ({allTokens.length}) 💎</h3>
          
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {allTokens.slice(0, 50).map((token: any, i: number) => {
              const isMeme = MEME_KEYWORDS.some(k => (token.symbol || '').toUpperCase().includes(k))
              
              return (
                <div 
                  key={i} 
                  className={`rounded-xl p-3 ${
                    isMeme 
                      ? 'bg-yellow-500/20 border border-yellow-400/50' 
                      : 'bg-white/5'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-2">
                        {isMeme && <span className="text-lg">🐕</span>}
                        <span className="font-bold">{token.symbol}</span>
                      </div>
                      <p className="text-xs text-white/60">{token.name}</p>
                      <p className="text-xs text-white/50">{token.chain}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-sm">{parseFloat(token.balance).toFixed(4)}</p>
                    </div>
                  </div>
                </div>
              )
            })}
            
            {allTokens.length > 50 && (
              <div className="text-center text-white/50 text-sm pt-4">
                ... and {allTokens.length - 50} more tokens
              </div>
            )}
          </div>
        </div>

        {/* Stats Footer */}
        <div className="mt-6 bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold">{chains.length}</p>
              <p className="text-xs text-white/60">Chains</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{allTokens.length}</p>
              <p className="text-xs text-white/60">Tokens</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-300">{memeCoins.length}</p>
              <p className="text-xs text-white/60">Meme Coins 🐕</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
