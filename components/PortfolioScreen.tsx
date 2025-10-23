'use client'

import { useState } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useBalance } from 'wagmi'

interface PortfolioScreenProps {
  onBack: () => void
}

export default function PortfolioScreen({ onBack }: PortfolioScreenProps) {
  const { address, isConnected } = useAccount()
  const { data: ethBalance } = useBalance({ address })
  const [analyzing, setAnalyzing] = useState(false)
  const [report, setReport] = useState<any>(null)

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
    <div className="min-h-screen bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#f093fb] text-white p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/80 hover:text-white transition"
          >
            <span>←</span>
            <span>Back</span>
          </button>
          <h1 className="text-2xl font-black">Portfolio Tracker 📊</h1>
          <div className="w-16"></div>
        </div>

        {/* Connect Wallet Section */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 mb-6 border border-white/20">
          <h2 className="text-xl font-bold mb-4">Connect Your Wallet</h2>
          <p className="text-white/80 text-sm mb-4">
            Connect your wallet to analyze your crypto portfolio. We only READ your holdings - completely safe! 🔒
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
                  <p className="text-xs text-white/60 mb-1">ETH Balance</p>
                  <p className="text-2xl font-bold">{parseFloat(ethBalance.formatted).toFixed(4)} ETH</p>
                </div>
              )}

              <button
                onClick={analyzePortfolio}
                disabled={analyzing}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-4 rounded-2xl font-bold
                         hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
              >
                {analyzing ? '🔍 Analyzing...' : '🚀 Analyze My Portfolio'}
              </button>
            </div>
          )}
        </div>

        {/* Analysis Report */}
        {report && (
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
            <h3 className="text-2xl font-black mb-4">Your Crypto Report 📈</h3>
            
            <div className="space-y-4">
              {/* AI Roast */}
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-4 border border-purple-400/30">
                <h4 className="font-bold mb-2">🤖 AI Analysis</h4>
                <p className="text-sm leading-relaxed">{report.ai_roast}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/10 rounded-2xl p-4">
                  <p className="text-xs text-white/60 mb-1">Portfolio Value</p>
                  <p className="text-xl font-bold">${report.total_value}</p>
                </div>
                <div className="bg-white/10 rounded-2xl p-4">
                  <p className="text-xs text-white/60 mb-1">24h Change</p>
                  <p className={`text-xl font-bold ${report.change_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {report.change_24h >= 0 ? '+' : ''}{report.change_24h}%
                  </p>
                </div>
              </div>

              {/* Share Button */}
              <button
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-4 rounded-2xl font-bold
                         hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>Share My Report</span>
                <span>📤</span>
              </button>
            </div>
          </div>
        )}

        {/* Features Coming Soon */}
        <div className="mt-6 bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
          <h3 className="text-lg font-bold mb-3">🔜 Coming Soon</h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li>• Daily performance reports with AI roasts</li>
            <li>• Exchange API integration (Binance, Coinbase)</li>
            <li>• Multi-wallet tracking</li>
            <li>• Token price alerts</li>
            <li>• Historical performance charts</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
