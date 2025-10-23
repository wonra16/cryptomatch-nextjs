// ============================================================================
// ALCHEMY MULTI-CHAIN BLOCKCHAIN SERVICE - 20+ NETWORKS!
// ============================================================================
// Powered by: Alchemy API (requires API key)
// Supported Networks: 20 most popular chains (Alchemy supports 124 total)
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
      meme_coins?: number
    }
  }
  all_tokens: TokenBalance[]
  total_meme_coins?: number
  analyzed_at: string
}

// ============================================================================
// ALCHEMY SUPPORTED NETWORKS - TOP 20 MAINNETS
// ============================================================================
const ALCHEMY_NETWORKS: { [key: string]: { name: string, symbol: string, logo: string, coingecko: string } } = {
  // Top 10 - Most Popular
  'eth-mainnet': { name: 'Ethereum', symbol: 'ETH', logo: '⟠', coingecko: 'ethereum' },
  'polygon-mainnet': { name: 'Polygon', symbol: 'POL', logo: '⬡', coingecko: 'matic-network' },
  'arb-mainnet': { name: 'Arbitrum', symbol: 'ETH', logo: '🔷', coingecko: 'ethereum' },
  'opt-mainnet': { name: 'Optimism', symbol: 'ETH', logo: '🔴', coingecko: 'ethereum' },
  'base-mainnet': { name: 'Base', symbol: 'ETH', logo: '🔵', coingecko: 'ethereum' },
  'zksync-mainnet': { name: 'zkSync', symbol: 'ETH', logo: '⚡', coingecko: 'ethereum' },
  'avax-mainnet': { name: 'Avalanche', symbol: 'AVAX', logo: '🔺', coingecko: 'avalanche-2' },
  'bnb-mainnet': { name: 'BNB Chain', symbol: 'BNB', logo: '💰', coingecko: 'binancecoin' },
  'shape-mainnet': { name: 'Shape', symbol: 'ETH', logo: '⬟', coingecko: 'ethereum' },
  'worldchain-mainnet': { name: 'WorldChain', symbol: 'ETH', logo: '🌍', coingecko: 'ethereum' },
  
  // Top 11-20 - Popular L2s & Alt Chains
  'arbnova-mainnet': { name: 'Arbitrum Nova', symbol: 'ETH', logo: '💫', coingecko: 'ethereum' },
  'astar-mainnet': { name: 'Astar', symbol: 'ASTR', logo: '⭐', coingecko: 'astar' },
  'polygonzkevm-mainnet': { name: 'Polygon zkEVM', symbol: 'ETH', logo: '🟣', coingecko: 'ethereum' },
  'blast-mainnet': { name: 'Blast', symbol: 'ETH', logo: '💥', coingecko: 'ethereum' },
  'fraxtal-mainnet': { name: 'Fraxtal', symbol: 'frxETH', logo: '❄️', coingecko: 'ethereum' },
  'linea-mainnet': { name: 'Linea', symbol: 'ETH', logo: '📈', coingecko: 'ethereum' },
  'mantle-mainnet': { name: 'Mantle', symbol: 'MNT', logo: '🔥', coingecko: 'mantle' },
  'metis-mainnet': { name: 'Metis', symbol: 'METIS', logo: '🌊', coingecko: 'metis-token' },
  'scroll-mainnet': { name: 'Scroll', symbol: 'ETH', logo: '📜', coingecko: 'ethereum' },
  'zora-mainnet': { name: 'Zora', symbol: 'ETH', logo: '🎨', coingecko: 'ethereum' },
}

// Priority order for analysis (top 20)
const PRIORITY_NETWORKS = Object.keys(ALCHEMY_NETWORKS)

function isAlchemyConfigured(): boolean {
  return !!process.env.ALCHEMY_API_KEY
}

function getAlchemyUrl(network: string): string {
  const key = process.env.ALCHEMY_API_KEY
  return `https://${network}.g.alchemy.com/v2/${key}`
}

// ============================================================================
// ALCHEMY API - GET TOKEN BALANCES (COMPREHENSIVE!)
// ============================================================================
async function getTokenBalances(address: string, network: string): Promise<any> {
  if (!isAlchemyConfigured()) {
    console.warn('⚠️ Alchemy API not configured')
    return null
  }

  try {
    const url = getAlchemyUrl(network)
    
    console.log(`🔍 Fetching token balances for ${address} on ${network}`)
    
    // ✅ FIX: NO second parameter! Just address!
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'alchemy_getTokenBalances',
        params: [address]  // ← ONLY ADDRESS! NO 'erc20'!
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`❌ Alchemy HTTP error for ${network}:`, {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      })
      return null
    }

    const data = await response.json()
    
    // Check for JSON-RPC error
    if (data.error) {
      console.error(`❌ Alchemy JSON-RPC error for ${network}:`, data.error)
      return null
    }
    
    const tokenBalances = data.result?.tokenBalances || []
    
    console.log(`📊 ${network}: Found ${tokenBalances.length} total tokens`)
    
    // Filter out zero balances
    const nonZeroBalances = tokenBalances.filter((t: any) => {
      try {
        const balance = BigInt(t.tokenBalance || '0x0')
        return balance > 0n
      } catch (e) {
        console.warn(`⚠️ Invalid token balance:`, t)
        return false
      }
    })
    
    console.log(`✅ ${network}: ${nonZeroBalances.length} non-zero tokens`)
    
    return nonZeroBalances
    
  } catch (error) {
    console.error(`❌ Error fetching balances for ${network}:`, error)
    return null
  }
}

// ============================================================================
// ALCHEMY API - GET TOKEN METADATA
// ============================================================================
async function getTokenMetadata(contractAddress: string, network: string): Promise<any> {
  if (!isAlchemyConfigured()) return null

  try {
    const url = getAlchemyUrl(network)
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'alchemy_getTokenMetadata',
        params: [contractAddress]
      })
    })

    if (!response.ok) return null

    const data = await response.json()
    return data.result
    
  } catch (error) {
    return null
  }
}

// ============================================================================
// NATIVE BALANCE (ETH, MATIC, BNB, etc.)
// ============================================================================
async function getNativeBalance(address: string, network: string): Promise<string> {
  if (!isAlchemyConfigured()) return '0'

  try {
    const url = getAlchemyUrl(network)
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'eth_getBalance',
        params: [address, 'latest']
      })
    })

    if (!response.ok) return '0'

    const data = await response.json()
    const balanceWei = BigInt(data.result || '0')
    const balanceEth = Number(balanceWei) / 1e18
    
    return balanceEth.toFixed(6)
    
  } catch (error) {
    return '0'
  }
}

// ============================================================================
// COINGECKO - GET PRICES (FREE API)
// ============================================================================
let priceCache: { [key: string]: number } = {}
let lastPriceFetch = 0

async function getTokenPrices(): Promise<{ [key: string]: number }> {
  // Cache for 10 minutes
  if (Date.now() - lastPriceFetch < 10 * 60 * 1000 && Object.keys(priceCache).length > 0) {
    return priceCache
  }

  try {
    const coins = Object.values(ALCHEMY_NETWORKS)
      .map(n => n.coingecko)
      .filter((v, i, a) => a.indexOf(v) === i) // unique
      .join(',')

    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coins}&vs_currencies=usd`,
      {
        headers: {
          'Accept': 'application/json',
        }
      }
    )

    if (!response.ok) {
      console.warn('⚠️ CoinGecko price fetch failed')
      return priceCache
    }

    const data = await response.json()
    
    priceCache = {}
    for (const [coin, priceData] of Object.entries(data)) {
      if (typeof priceData === 'object' && priceData !== null) {
        priceCache[coin] = (priceData as any).usd || 0
      }
    }
    
    lastPriceFetch = Date.now()
    console.log('💵 Loaded prices:', priceCache)
    return priceCache
    
  } catch (error) {
    console.error('❌ Error fetching prices:', error)
    return priceCache
  }
}

// ============================================================================
// MAIN ANALYSIS FUNCTION - MULTI-CHAIN (20 NETWORKS!)
// ============================================================================
export async function analyzeWallet(address: string): Promise<WalletAnalysis> {
  console.log('💰 Analyzing wallet across 20 networks:', address)

  if (!isAlchemyConfigured()) {
    throw new Error('Alchemy API key required for portfolio analysis')
  }

  // Get prices first
  const prices = await getTokenPrices()
  console.log('💵 Loaded prices for', Object.keys(prices).length, 'assets')

  // Analyze each chain in parallel (20 networks!)
  const chainPromises = PRIORITY_NETWORKS.map(async (network) => {
    try {
      const networkInfo = ALCHEMY_NETWORKS[network]
      if (!networkInfo) return null

      // Get native balance
      const nativeBalance = await getNativeBalance(address, network)
      const nativePrice = prices[networkInfo.coingecko] || 0
      const nativeValue = parseFloat(nativeBalance) * nativePrice

      // Get ERC20 tokens - ALL OF THEM!
      const tokenBalances = await getTokenBalances(address, network) || []
      
      console.log(`📊 ${networkInfo.name}: Native: ${nativeBalance}, Tokens: ${tokenBalances.length}`)
      
      // ✅ Skip ONLY if BOTH native AND tokens are 0!
      if (parseFloat(nativeBalance) < 0.0001 && tokenBalances.length === 0) {
        console.log(`⏭️ ${networkInfo.name}: No assets, skipping`)
        return null
      }
      
      // Process tokens (limit to first 50 to avoid rate limiting!)
      const tokens: TokenBalance[] = []
      let memeCoinsFound = 0

      // Meme coin keywords
      const MEME_KEYWORDS = [
        'DOGE', 'SHIB', 'PEPE', 'FLOKI', 'ELON', 'WOJAK', 'BONK', 'WIF',
        'MEME', 'APU', 'BRETT', 'TOSHI', 'MOCHI', 'DEGEN', 'MFER', 'CHAD',
        'BASED', 'HIGHER', 'NORMIE', 'NEIRO', 'POPCAT', 'MEW', 'MYRO'
      ]

      // ✅ Process first 50 tokens to avoid rate limits!
      const tokensToProcess = tokenBalances.slice(0, 50)
      console.log(`📊 ${networkInfo.name}: Processing ${tokensToProcess.length}/${tokenBalances.length} tokens...`)

      for (const token of tokensToProcess) {
        try {
          if (token.tokenBalance === '0x0') continue

          // Get metadata
          const metadata = await getTokenMetadata(token.contractAddress, network)
          if (!metadata || !metadata.symbol) {
            console.log(`⚠️ No metadata for ${token.contractAddress}, skipping`)
            continue  // Skip this token if metadata fails
          }

          const balance = BigInt(token.tokenBalance)
          const decimals = metadata.decimals || 18
          const balanceFormatted = Number(balance) / (10 ** decimals)

          if (balanceFormatted < 0.0001) continue // Skip dust

          // Detect meme coins!
          const symbol = (metadata.symbol || '').toUpperCase()
          const isMeme = MEME_KEYWORDS.some(keyword => symbol.includes(keyword))
          
          if (isMeme) {
            memeCoinsFound++
            console.log(`🐕 MEME COIN FOUND: ${symbol}!`)
          }

          tokens.push({
            symbol: metadata.symbol || '???',
            name: metadata.name || 'Unknown',
            balance: balanceFormatted.toFixed(4),
            decimals,
            value_usd: '0',
            contract: token.contractAddress,
            chain: networkInfo.name,
            logo: metadata.logo
          })
        } catch (tokenError) {
          console.error(`❌ Error processing token ${token.contractAddress}:`, tokenError)
          continue  // Skip this token and continue with others
        }
      }

      console.log(`✅ ${networkInfo.name}: ${nativeBalance} ${networkInfo.symbol} ($${nativeValue.toFixed(2)}) + ${tokens.length} tokens (${memeCoinsFound} meme coins!)`)

      return {
        network,
        native_balance: nativeBalance,
        native_value_usd: nativeValue.toFixed(2),
        tokens,
        meme_coins: memeCoinsFound
      }

    } catch (error) {
      console.error(`❌ Error analyzing ${network}:`, error)
      return null
    }
  })

  const results = await Promise.all(chainPromises)
  const validResults = results.filter(r => r !== null)

  // ✅ Check if we found any assets at all!
  if (validResults.length === 0) {
    console.log('⚠️ No assets found on any chain for this wallet')
    // Return empty but valid result
    return {
      address,
      total_value_usd: '0',
      chains: {},
      all_tokens: [],
      total_meme_coins: 0,
      analyzed_at: new Date().toISOString()
    }
  }

  // Aggregate data
  const chains: any = {}
  let totalValue = 0
  let totalMemeCoins = 0
  const allTokens: TokenBalance[] = []

  for (const result of validResults) {
    if (!result) continue

    const networkInfo = ALCHEMY_NETWORKS[result.network]
    chains[result.network] = {
      native_balance: result.native_balance,
      native_value_usd: result.native_value_usd,
      tokens: result.tokens,
      meme_coins: result.meme_coins || 0
    }

    totalValue += parseFloat(result.native_value_usd)
    totalMemeCoins += result.meme_coins || 0
    allTokens.push(...result.tokens)
  }

  console.log(`🎉 Total portfolio: $${totalValue.toFixed(2)} across ${validResults.length} chains with ${allTokens.length} tokens (${totalMemeCoins} meme coins! 🐕)`)

  return {
    address,
    total_value_usd: totalValue.toFixed(2),
    chains,
    all_tokens: allTokens,
    total_meme_coins: totalMemeCoins,
    analyzed_at: new Date().toISOString()
  }
}

// ============================================================================
// PORTFOLIO MATCHING LOGIC
// ============================================================================
export function analyzePortfolioMatch(portfolioData: any, nftData: any) {
  if (!portfolioData) return null

  const totalValue = parseFloat(portfolioData.total_value_usd || '0')
  const activeChains = Object.keys(portfolioData.chains || {}).length
  const totalTokens = portfolioData.all_tokens?.length || 0

  return {
    totalValue,
    activeChains,
    multiChain: activeChains >= 3,
    defiUser: totalTokens >= 10,
    nftCount: nftData?.totalNFTs || 0,
    popularNFTs: nftData?.popularCollections || []
  }
}
