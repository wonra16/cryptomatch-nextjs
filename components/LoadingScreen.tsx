export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 text-center">
        {/* Animated Hearts Stack */}
        <div className="relative inline-block mb-8">
          <div className="text-8xl animate-bounce">💕</div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-12 text-4xl animate-ping opacity-75">✨</div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-8 text-3xl animate-pulse delay-500">🔥</div>
        </div>

        {/* Premium Logo */}
        <h1 className="text-5xl md:text-6xl font-black mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white animate-pulse">
            Crypto
          </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400">
            Match
          </span>
        </h1>

        {/* Loading Animation */}
        <div className="flex flex-col items-center gap-4 mt-8">
          <div className="relative">
            {/* Outer Ring */}
            <div className="w-16 h-16 rounded-full border-4 border-purple-500/30"></div>
            {/* Spinning Ring */}
            <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-t-purple-500 border-r-pink-500 animate-spin"></div>
            {/* Inner Glow */}
            <div className="absolute inset-2 w-12 h-12 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-lg animate-pulse"></div>
          </div>
          
          <p className="text-white/80 font-semibold text-lg animate-pulse">
            Initializing Magic...
          </p>
        </div>

        {/* Bottom Text */}
        <p className="text-white/40 text-sm mt-12 animate-pulse">
          🤖 Powered by AI • 💜 Built for Farcaster
        </p>
      </div>
    </div>
  )
}
