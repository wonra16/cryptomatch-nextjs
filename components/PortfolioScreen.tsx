'use client'

import { useState } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useBalance } from 'wagmi'

interface PortfolioScreenProps {
  onBack: () => void
}

interface ChainBalance {
  chain: string
  native_balance: string
  native_value: string
  token_count: number
}

interface Token {
  symbol: string
  name: string
  balance: string
  value: string
  chain: string
  logo: string
}

interface AnalysisReport {
  ai_roast: string
  total_value: string
  change_24h: number
  active_chains: number
  chains_analyzed: string[]
  chain_balances: ChainBalance[]
  tokens: Token[]
  features: string[]
  data_source: string
}

export default function PortfolioScreen({ onBack }: PortfolioScreenProps) {
  const { address, isConnected } = useAccount()
  const { data: ethBalance } = useBalance({ address })
  const [analyzing, setAnalyzing] = useState(false)
  const [report, setReport] = useState<AnalysisReport | null>(null)

  const analyzePortfolio = async () => {
    if (!address) return

    setAnalyzing(true)

    try {
      const response = await fetch('/api/portfolio/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address }),
      })

      const data = await response.json()
      setReport(data)
    } catch (error) {
      console.error('Portfolio analysis failed:', error)
    } finally {
      setAnalyzing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#f093fb] text-white p-4 overflow-y-auto">
      <div className="max-w-2xl mx-auto pb-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/80 hover:text-white transition"
          >
            <span>←</span>
            <span>Back</span>
          </button>
          <h1 className="text-2xl font-black">Multi-Chain Portfolio 🌐</h1>
          <div className="w-16"></div>
        </div>

        {/* Connect Wallet Section */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 mb-6 border border-white/20">
          <h2 className="text-xl font-bold mb-2">Connect Your Wallet</h2>
          <p className="text-white/80 text-sm mb-4">
            Scan 7 blockchains instantly! We analyze Ethereum, BSC, Polygon, Arbitrum, Optimism, Base & Avalanche. 🚀
          </p>
          
          <div className="flex justify-center">
            <ConnectButton />
          </div>

          {isConnected && address && (
            <div className="mt-6 space-y-3">
              <div className="bg-white/10 rounded-2xl p-4">
                <p className="text-xs text-white/60 mb-1">Connected Wallet</p>
                <p className="font-mono text-sm">{address.slice(0, 6)}...{address.slice(-4)}</p>
              </div>

              {ethBalance && (
                <div className="bg-white/10 rounded-2xl p-4">
                  <p className="text-xs text-white/60 mb-1">ETH Balance (Mainnet)</p>
                  <p className="text-2xl font-bold">{parseFloat(ethBalance.formatted).toFixed(4)} ETH</p>
                </div>
              )}

              <button
                onClick={analyzePortfolio}
                disabled={analyzing}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-4 rounded-2xl font-bold
                         hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {analyzing ? '🔍 Scanning 7 Chains...' : '🚀 Analyze Multi-Chain Portfolio'}
              </button>
            </div>
          )}
        </div>

        {/* Analysis Report */}
        {report && (
          <>
            {/* Summary Card */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 mb-4 border border-white/20">
              <h3 className="text-2xl font-black mb-4">Portfolio Summary 📊</h3>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-white/10 rounded-2xl p-4">
                  <p className="text-xs text-white/60 mb-1">Total Value</p>
                  <p className="text-2xl font-bold">${report.total_value}</p>
                </div>
                <div className="bg-white/10 rounded-2xl p-4">
                  <p className="text-xs text-white/60 mb-1">24h Change</p>
                  <p className={`text-2xl font-bold ${report.change_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {report.change_24h >= 0 ? '+' : ''}{report.change_24h}%
                  </p>
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-3">
                <p className="text-xs text-white/60 mb-1">Active Chains</p>
                <p className="text-lg font-bold">{report.active_chains} / {report.chains_analyzed.length}</p>
              </div>
            </div>

            {/* AI Roast */}
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl p-6 mb-4 border border-purple-400/30">
              <h4 className="font-bold mb-2 flex items-center gap-2">
                <span>🤖</span>
                <span>AI Portfolio Analysis</span>
              </h4>
              <p className="text-sm leading-relaxed">{report.ai_roast}</p>
            </div>

            {/* Chain Breakdown */}
            {report.chain_balances && report.chain_balances.length > 0 && (
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 mb-4 border border-white/20">
                <h4 className="text-lg font-bold mb-4">⛓️ Chain Breakdown</h4>
                <div className="space-y-3">
                  {report.chain_balances.map((chain, idx) => (
                    chain.token_count > 0 && (
                      <div key={idx} className="bg-white/5 rounded-2xl p-4">
                        <div className="flex justify-between items-center mb-2">
                          <p className="font-bold">{chain.chain}</p>
                          <p className="text-sm text-white/60">{chain.token_count} tokens</p>
                        </div>
                        <p className="text-xl font-bold text-green-400">${chain.native_value}</p>
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}

            {/* Token List */}
            {report.tokens && report.tokens.length > 0 && (
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 mb-4 border border-white/20">
                <h4 className="text-lg font-bold mb-4">💎 Your Tokens ({report.tokens.length})</h4>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {report.tokens.map((token, idx) => (
                    <div key={idx} className="bg-white/5 rounded-xl p-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{token.logo}</div>
                        <div>
                          <p className="font-bold">{token.symbol}</p>
                          <p className="text-xs text-white/60">{token.chain}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{token.balance}</p>
                        <p className="text-xs text-green-400">{token.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 mb-4 border border-white/10">
              <h4 className="text-sm font-bold mb-3 text-white/80">✨ Features</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {report.features.map((feature, idx) => (
                  <div key={idx} className="text-white/70">{feature}</div>
                ))}
              </div>
              <p className="text-xs text-white/50 mt-3 text-center">{report.data_source}</p>
            </div>

            {/* Share Button */}
            <button
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-4 rounded-2xl font-bold
                       hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>Share My Multi-Chain Report</span>
              <span>📤</span>
            </button>
          </>
        )}

        {/* Info Section */}
        <div className="mt-6 bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
          <h3 className="text-lg font-bold mb-3">🔜 Coming Soon</h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li>• Solana & Cosmos ecosystem support</li>
            <li>• NFT portfolio tracking</li>
            <li>• DeFi position monitoring</li>
            <li>• Price alerts & notifications</li>
            <li>• Historical charts & analytics</li>
            <li>• Tax report generation</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
