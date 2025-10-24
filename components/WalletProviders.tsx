'use client'

import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultConfig, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { mainnet, base, optimism, arbitrum, polygon } from 'wagmi/chains'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

// IMPORTANT: Get your FREE WalletConnect Project ID from:
// https://cloud.reown.com/sign-in (formerly cloud.walletconnect.com)
// 
// Steps:
// 1. Sign up for free
// 2. Create new project
// 3. Copy Project ID (looks like: 3fcc6bba6f1de962d911bb5b5c3dba68)
// 4. Add your domain to allowed list
//
// For now using a demo ID - REPLACE THIS!
const WALLETCONNECT_PROJECT_ID = '5c865560b61a1667bbbb05a1adef5ad0' // DEMO - Get your own!

const config = getDefaultConfig({
  appName: 'CryptoMatch',
  projectId: WALLETCONNECT_PROJECT_ID,
  chains: [mainnet, base, optimism, arbitrum, polygon],
  ssr: false, // IMPORTANT: Must be false for Farcaster Frame SDK!
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

export function WalletProviders({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: '#FFD93D',
            accentColorForeground: '#764ba2',
            borderRadius: 'large',
          })}
          modalSize="compact"
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
