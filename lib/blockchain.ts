// ============================================================================
// MULTI-CHAIN BLOCKCHAIN SERVICE - 100% FREE!
// ============================================================================
// Desteklenen Ağlar: Ethereum, BSC, Polygon, Arbitrum, Optimism, Base, Avalanche
// Kullanılan API'ler: dRPC (ücretsiz), CoinGecko (ücretsiz)
// ============================================================================

export interface TokenBalance {
  symbol: string
  name: string
  balance: string
  decimals: number
  value_usd: string
  contract?: string
  chain: string
  logo?: string
}

export interface WalletAnalysis {
  address: string
  total_value_usd: string
  chains: {
    [key: string]: {
      native_balance: string
      native_value_usd: string
      tokens: TokenBalance[]
    }
  }
  all_tokens: TokenBalance[]
  analyzed_at: string
}

// ============================================================================
// FREE RPC ENDPOINTS - NO API KEY REQUIRED!
// ============================================================================
const FREE_RPC_ENDPOINTS = {
  ethereum: 'https://eth.drpc.org',
  bsc: 'https://bsc-dataseed.binance.org',
  polygon: 'https://polygon-rpc.com',
  arbitrum: 'https://arb1.arbitrum.io/rpc',
  optimism: 'https://mainnet.optimism.io',
  base: 'https://mainnet.base.org',
  avalanche: 'https://api.avax.network/ext/bc/C/rpc',
}

// Chain bilgileri
const CHAIN_INFO = {
  ethereum: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
    logo: '⟠',
    coingecko_id: 'ethereum'
  },
  bsc: {
    name: 'BSC',
    symbol: 'BNB',
    decimals: 18,
    logo: '⚡',
    coingecko_id: 'binancecoin'
  },
  polygon: {
    name: 'Polygon',
    symbol: 'MATIC',
    decimals: 18,
    logo: '⬡',
    coingecko_id: 'matic-network'
  },
  arbitrum: {
    name: 'Arbitrum',
    symbol: 'ETH',
    decimals: 18,
    logo: '🔷',
    coingecko_id: 'ethereum'
  },
  optimism: {
    name: 'Optimism',
    symbol: 'ETH',
    decimals: 18,
    logo: '🔴',
    coingecko_id: 'ethereum'
  },
  base: {
    name: 'Base',
    symbol: 'ETH',
    decimals: 18,
    logo: '🔵',
    coingecko_id: 'ethereum'
  },
  avalanche: {
    name: 'Avalanche',
    symbol: 'AVAX',
    decimals: 18,
    logo: '🔺',
    coingecko_id: 'avalanche-2'
  },
}

// ============================================================================
// ERC20 TOKEN BALANCE CHECKER (Multi-chain)
// ============================================================================
// ERC20 balanceOf ABI
const ERC20_BALANCE_ABI = {
  constant: true,
  inputs: [{ name: '_owner', type: 'address' }],
  name: 'balanceOf',
  outputs: [{ name: 'balance', type: 'uint256' }],
  type: 'function',
}

// Popüler tokenler (tüm chainler için)
const POPULAR_TOKENS: { [chain: string]: Array<{ address: string; symbol: string; name: string; decimals: number }> } = {
  ethereum: [
    { address: '0xdac17f958d2ee523a2206206994597c13d831ec7', symbol: 'USDT', name: 'Tether', decimals: 6 },
    { address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', symbol: 'USDC', name: 'USD Coin', decimals: 6 },
    { address: '0x6b175474e89094c44da98b954eedeac495271d0f', symbol: 'DAI', name: 'Dai', decimals: 18 },
    { address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599', symbol: 'WBTC', name: 'Wrapped Bitcoin', decimals: 8 },
    { address: '0x514910771af9ca656af840dff83e8264ecf986ca', symbol: 'LINK', name: 'Chainlink', decimals: 18 },
    { address: '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0', symbol: 'MATIC', name: 'Polygon', decimals: 18 },
    { address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984', symbol: 'UNI', name: 'Uniswap', decimals: 18 },
  ],
  bsc: [
    { address: '0x55d398326f99059ff775485246999027b3197955', symbol: 'USDT', name: 'Tether', decimals: 18 },
    { address: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d', symbol: 'USDC', name: 'USD Coin', decimals: 18 },
    { address: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3', symbol: 'DAI', name: 'Dai', decimals: 18 },
    { address: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c', symbol: 'BTCB', name: 'Bitcoin BEP2', decimals: 18 },
    { address: '0x2170ed0880ac9a755fd29b2688956bd959f933f8', symbol: 'ETH', name: 'Ethereum', decimals: 18 },
  ],
  polygon: [
    { address: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f', symbol: 'USDT', name: 'Tether', decimals: 6 },
    { address: '0x3c499c542cef5e3811e1192ce70d8cc03d5c3359', symbol: 'USDC', name: 'USD Coin', decimals: 6 },
    { address: '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063', symbol: 'DAI', name: 'Dai', decimals: 18 },
    { address: '0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6', symbol: 'WBTC', name: 'Wrapped Bitcoin', decimals: 8 },
    { address: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619', symbol: 'WETH', name: 'Wrapped Ether', decimals: 18 },
  ],
  arbitrum: [
    { address: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9', symbol: 'USDT', name: 'Tether', decimals: 6 },
    { address: '0xaf88d065e77c8cc2239327c5edb3a432268e5831', symbol: 'USDC', name: 'USD Coin', decimals: 6 },
    { address: '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1', symbol: 'DAI', name: 'Dai', decimals: 18 },
    { address: '0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f', symbol: 'WBTC', name: 'Wrapped Bitcoin', decimals: 8 },
    { address: '0xf97f4df75117a78c1a5a0dbb814af92458539fb4', symbol: 'LINK', name: 'Chainlink', decimals: 18 },
  ],
  optimism: [
    { address: '0x94b008aa00579c1307b0ef2c499ad98a8ce58e58', symbol: 'USDT', name: 'Tether', decimals: 6 },
    { address: '0x0b2c639c533813f4aa9d7837caf62653d097ff85', symbol: 'USDC', name: 'USD Coin', decimals: 6 },
    { address: '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1', symbol: 'DAI', name: 'Dai', decimals: 18 },
    { address: '0x68f180fcce6836688e9084f035309e29bf0a2095', symbol: 'WBTC', name: 'Wrapped Bitcoin', decimals: 8 },
  ],
  base: [
    { address: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913', symbol: 'USDC', name: 'USD Coin', decimals: 6 },
    { address: '0x50c5725949a6f0c72e6c4a641f24049a917db0cb', symbol: 'DAI', name: 'Dai', decimals: 18 },
  ],
  avalanche: [
    { address: '0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7', symbol: 'USDT', name: 'Tether', decimals: 6 },
    { address: '0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e', symbol: 'USDC', name: 'USD Coin', decimals: 6 },
    { address: '0xd586e7f844cea2f87f50152665bcbc2c279d8d70', symbol: 'DAI', name: 'Dai', decimals: 18 },
    { address: '0x50b7545627a5162f82a992c33b87adc75187b218', symbol: 'WBTC', name: 'Wrapped Bitcoin', decimals: 8 },
    { address: '0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab', symbol: 'WETH', name: 'Wrapped Ether', decimals: 18 },
  ],
}

// ============================================================================
// NATIVE BALANCE FETCH (ETH, BNB, MATIC, etc.)
// ============================================================================
async function getNativeBalance(address: string, chain: keyof typeof FREE_RPC_ENDPOINTS): Promise<string> {
  try {
    const rpcUrl = FREE_RPC_ENDPOINTS[chain]
    const response = await fetch(rpcUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_getBalance',
        params: [address, 'latest'],
        id: 1,
      }),
    })

    const data = await response.json()
    if (data.result) {
      const balanceWei = parseInt(data.result, 16)
      const chainInfo = CHAIN_INFO[chain]
      return (balanceWei / Math.pow(10, chainInfo.decimals)).toFixed(6)
    }
    return '0'
  } catch (error) {
    console.error(`Failed to fetch ${chain} balance:`, error)
    return '0'
  }
}

// ============================================================================
// TOKEN PRICE FETCHER (CoinGecko FREE API)
// ============================================================================
const PRICE_CACHE: { [key: string]: { price: number; timestamp: number } } = {}
const CACHE_DURATION = 60000 // 1 dakika cache

async function getTokenPrice(coingeckoId: string): Promise<number> {
  // Cache kontrolü
  if (PRICE_CACHE[coingeckoId]) {
    const cached = PRICE_CACHE[coingeckoId]
    if (Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.price
    }
  }

  try {
    // CoinGecko FREE API - API key gerektirmez!
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coingeckoId}&vs_currencies=usd`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    )

    const data = await response.json()
    const price = data[coingeckoId]?.usd || 0

    // Cache'e kaydet
    PRICE_CACHE[coingeckoId] = {
      price,
      timestamp: Date.now(),
    }

    return price
  } catch (error) {
    console.error(`Failed to fetch price for ${coingeckoId}:`, error)
    return 0
  }
}

// ============================================================================
// ERC20 TOKEN BALANCE CHECKER
// ============================================================================
async function getTokenBalance(
  walletAddress: string,
  tokenAddress: string,
  chain: keyof typeof FREE_RPC_ENDPOINTS,
  decimals: number
): Promise<string> {
  try {
    const rpcUrl = FREE_RPC_ENDPOINTS[chain]

    // balanceOf function signature: 0x70a08231
    const data = '0x70a08231' + walletAddress.slice(2).padStart(64, '0')

    const response = await fetch(rpcUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_call',
        params: [
          {
            to: tokenAddress,
            data: data,
          },
          'latest',
        ],
        id: 1,
      }),
    })

    const result = await response.json()
    if (result.result) {
      const balance = parseInt(result.result, 16)
      return (balance / Math.pow(10, decimals)).toFixed(6)
    }
    return '0'
  } catch (error) {
    console.error(`Failed to fetch token balance on ${chain}:`, error)
    return '0'
  }
}

// ============================================================================
// MAIN WALLET ANALYZER
// ============================================================================
export async function analyzeWallet(address: string): Promise<WalletAnalysis> {
  const analysis: WalletAnalysis = {
    address,
    total_value_usd: '0',
    chains: {},
    all_tokens: [],
    analyzed_at: new Date().toISOString(),
  }

  let totalValueUsd = 0

  // Her chain için paralel analiz
  const chainKeys = Object.keys(FREE_RPC_ENDPOINTS) as Array<keyof typeof FREE_RPC_ENDPOINTS>

  for (const chain of chainKeys) {
    const chainInfo = CHAIN_INFO[chain]

    // 1. Native balance al
    const nativeBalance = await getNativeBalance(address, chain)
    const nativeBalanceNum = parseFloat(nativeBalance)

    // 2. Native token fiyatını al
    const nativePrice = await getTokenPrice(chainInfo.coingecko_id)
    const nativeValue = nativeBalanceNum * nativePrice

    // Chain datasını başlat
    analysis.chains[chain] = {
      native_balance: nativeBalance,
      native_value_usd: nativeValue.toFixed(2),
      tokens: [],
    }

    // Native token'ı ekle (eğer balance varsa)
    if (nativeBalanceNum > 0.001) {
      const nativeToken: TokenBalance = {
        symbol: chainInfo.symbol,
        name: chainInfo.name,
        balance: nativeBalance,
        decimals: chainInfo.decimals,
        value_usd: nativeValue.toFixed(2),
        chain: chain,
        logo: chainInfo.logo,
      }
      analysis.chains[chain].tokens.push(nativeToken)
      analysis.all_tokens.push(nativeToken)
      totalValueUsd += nativeValue
    }

    // 3. Popüler token'ları kontrol et
    const popularTokens = POPULAR_TOKENS[chain] || []

    for (const token of popularTokens) {
      const balance = await getTokenBalance(address, token.address, chain, token.decimals)
      const balanceNum = parseFloat(balance)

      if (balanceNum > 0.001) {
        // Token fiyatını al (basitleştirilmiş - genelde stable coinler)
        let tokenPrice = 1 // Default for stablecoins
        if (token.symbol === 'WBTC') tokenPrice = await getTokenPrice('bitcoin')
        else if (token.symbol.includes('ETH')) tokenPrice = await getTokenPrice('ethereum')
        else if (token.symbol === 'LINK') tokenPrice = await getTokenPrice('chainlink')
        else if (token.symbol === 'UNI') tokenPrice = await getTokenPrice('uniswap')
        else if (token.symbol === 'MATIC') tokenPrice = await getTokenPrice('matic-network')

        const tokenValue = balanceNum * tokenPrice

        const tokenBalance: TokenBalance = {
          symbol: token.symbol,
          name: token.name,
          balance: balance,
          decimals: token.decimals,
          value_usd: tokenValue.toFixed(2),
          contract: token.address,
          chain: chain,
        }

        analysis.chains[chain].tokens.push(tokenBalance)
        analysis.all_tokens.push(tokenBalance)
        totalValueUsd += tokenValue
      }
    }
  }

  analysis.total_value_usd = totalValueUsd.toFixed(2)

  return analysis
}

// ============================================================================
// FARCASTER WALLET INTEGRATION
// ============================================================================
export async function getFarcasterWallets(fid: number): Promise<string[]> {
  try {
    // Farcaster API'den cüzdan adreslerini al
    const response = await fetch(`https://api.warpcast.com/v2/user-by-fid?fid=${fid}`)
    const data = await response.json()

    const wallets: string[] = []

    // Verified addresses
    if (data.result?.user?.verifiedAddresses?.eth_addresses) {
      wallets.push(...data.result.user.verifiedAddresses.eth_addresses)
    }

    // Custody address
    if (data.result?.user?.custody_address) {
      wallets.push(data.result.user.custody_address)
    }

    return Array.from(new Set(wallets)) // Remove duplicates
  } catch (error) {
    console.error('Failed to fetch Farcaster wallets:', error)
    return []
  }
}
