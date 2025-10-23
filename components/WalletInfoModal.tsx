import { useState } from 'react'

interface WalletInfoModalProps {
  show: boolean
  hasWallet: boolean
  onContinue: (manualWallet?: string) => void
  onCancel: () => void
}

export default function WalletInfoModal({ show, hasWallet, onContinue, onCancel }: WalletInfoModalProps) {
  const [manualInput, setManualInput] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')

  if (!show) return null

  const handleContinue = () => {
    if (manualInput && walletAddress) {
      onContinue(walletAddress)
    } else {
      onContinue()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="max-w-md w-full bg-gradient-to-br from-purple-900/95 to-blue-900/95 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl animate-scale-in">
        
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
            <span className="text-3xl">💰</span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-black text-center mb-3 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300">
          {hasWallet ? 'Wallet Connected! ✨' : 'Connect Your Wallet 🔗'}
        </h2>

        {/* Message */}
        <div className="bg-white/5 rounded-2xl p-4 mb-5 border border-white/10">
          {hasWallet ? (
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="text-white/90 text-sm font-bold mb-1">Wallet Found!</p>
                  <p className="text-white/70 text-xs">We'll analyze your NFTs, tokens, and DeFi activity for more accurate matching!</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-2xl">💡</span>
                <div>
                  <p className="text-white/90 text-sm font-bold mb-1">Pro Tip!</p>
                  <p className="text-white/70 text-xs">Connect your wallet on Warpcast for better results! We'll analyze your NFTs and tokens.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎯</span>
                <div>
                  <p className="text-white/90 text-sm font-bold mb-1">How to Connect</p>
                  <p className="text-white/70 text-xs">Go to Warpcast Settings → Verified Addresses → Add your wallet</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Benefits */}
        {!hasWallet && (
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-3 mb-5 border border-purple-400/30">
            <p className="text-xs text-white/80 text-center font-bold">
              🚀 With wallet: Analyze 20 chains, NFT collections, DeFi activity
            </p>
          </div>
        )}

        {/* Manual Input Option - Only if no wallet */}
        {!hasWallet && !manualInput && (
          <button
            onClick={() => setManualInput(true)}
            className="w-full bg-white/10 backdrop-blur-xl text-white py-3 px-4 rounded-xl text-sm font-bold 
                     hover:bg-white/15 active:scale-98 transition-all duration-200
                     border border-white/20 mb-3"
          >
            🔗 Enter Wallet Address Manually
          </button>
        )}

        {/* Manual Input Field */}
        {manualInput && (
          <div className="mb-4">
            <label className="text-xs text-white/70 mb-2 block">Ethereum Wallet Address</label>
            <input
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              placeholder="0x..."
              className="w-full bg-white/10 backdrop-blur-xl text-white py-3 px-4 rounded-xl text-sm
                       border border-white/20 focus:border-purple-400 focus:outline-none
                       placeholder:text-white/30"
            />
            <button
              onClick={() => {
                setManualInput(false)
                setWalletAddress('')
              }}
              className="text-xs text-white/50 hover:text-white/80 mt-2"
            >
              ← Back to auto-detect
            </button>
          </div>
        )}

        {/* Buttons */}
        <div className="space-y-2">
          <button
            onClick={handleContinue}
            disabled={manualInput && !walletAddress}
            className="w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-white py-4 px-6 rounded-xl text-lg font-black 
                     hover:scale-[1.02] active:scale-98 transition-all duration-200
                     shadow-xl hover:shadow-pink-500/50
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {hasWallet ? '🎉 Continue with Wallet' : 
             manualInput ? '✨ Continue with Manual Wallet' :
             '✨ Continue Anyway'}
          </button>
          
          <button
            onClick={onCancel}
            className="w-full bg-white/10 backdrop-blur-xl text-white py-3 px-6 rounded-xl text-sm font-bold 
                     hover:bg-white/15 active:scale-98 transition-all duration-200
                     border border-white/20"
          >
            Cancel
          </button>
        </div>

        {/* Note */}
        <p className="text-xs text-white/40 text-center mt-3">
          {hasWallet ? 
            "Don't worry, your data is never stored!" : 
            "You can still get matched without a wallet 🎯"
          }
        </p>
      </div>
    </div>
  )
}
