// Alchemy NFT API Integration
// FREE: 300M compute units/month
// NFT API: ~5 CU per request
// Portfolio API: ~10 CU per request
// Token API: ~3 CU per request

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY || ''
const ALCHEMY_NFT_URL = 'https://eth-mainnet.g.alchemy.com/nft/v3'
const ALCHEMY_V2_URL = 'https://eth-mainnet.g.alchemy.com/v2'

export interface NFT {
  contract: {
    address: string;
    name: string;
    symbol: string;
  };
  tokenId: string;
  name?: string;
  description?: string;
  image?: string;
  collection?: string;
}

export interface NFTCollection {
  name: string;
  symbol: string;
  contractAddress: string;
  totalCount: number;
  floorPrice?: number;
}

export interface TokenBalance {
  contractAddress: string;
  tokenBalance: string;
  name: string;
  symbol: string;
  decimals: number;
  logo?: string;
}

export interface AlchemyPortfolio {
  address: string;
  nativeBalance: string;
  tokenBalances: TokenBalance[];
  totalValueUSD: number;
}

// Popular NFT collections for detection
export const POPULAR_COLLECTIONS: Record<string, string> = {
  '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d': 'Bored Ape Yacht Club',
  '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb': 'CryptoPunks',
  '0xed5af388653567af2f388e6224dc7c4b3241c544': 'Azuki',
  '0x8a90cab2b38dba80c64b7734e58ee1db38b8992e': 'Doodles',
  '0x23581767a106ae21c074b2276d25e5c3e136a68b': 'Moonbirds',
  '0xbd3531da5cf5857e7cfaa92426877b022e612cf8': 'Pudgy Penguins',
  '0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b': 'Clone X',
  '0x60e4d786628fea6478f785a6d7e704777c86a7c6': 'Mutant Ape Yacht Club',
  '0xe785e82358879f061bc3dcac6f0444462d4b5330': 'World of Women',
  '0x08d7c0242953446436f34b4c78fe9da38c73668d': 'PROOF Collective',
  '0x79fcdef22feed20eddacbb2587640e45491b757f': 'mfers',
  '0xbce3781ae7ca1a5e050bd9c4c77369867ebc307e': 'Goblintown',
  '0x306b1ea3ecdf94ab739f1910bbda052ed4a9f949': 'Beanz',
  '0x34d85c9cdeb23fa97cb08333b511ac86e1c4e258': 'Otherdeed',
}

// ===== ALCHEMY PORTFOLIO API =====
// Get wallet balance & tokens using Alchemy (replaces dRPC)
export async function getAlchemyPortfolio(address: string): Promise<AlchemyPortfolio | null> {
  if (!ALCHEMY_API_KEY) {
    console.warn('Alchemy API key not configured')
    return null
  }

  try {
    const response = await fetch(
      `${ALCHEMY_V2_URL}/${ALCHEMY_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'alchemy_getTokenBalances',
          params: [address, 'DEFAULT_TOKENS']
        }),
        next: { revalidate: 300 }
      }
    )

    if (!response.ok) return null

    const data = await response.json()
    const tokenBalances = data.result?.tokenBalances || []

    // Get ETH balance
    const ethResponse = await fetch(
      `${ALCHEMY_V2_URL}/${ALCHEMY_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'eth_getBalance',
          params: [address, 'latest']
        })
      }
    )

    const ethData = await ethResponse.json()
    const nativeBalance = ethData.result || '0x0'

    // Get token metadata
    const enrichedTokens: TokenBalance[] = []
    for (const token of tokenBalances.slice(0, 20)) { // Limit to top 20
      if (token.tokenBalance === '0x0') continue
      
      const metadata = await getTokenMetadata(token.contractAddress)
      if (metadata) {
        enrichedTokens.push({
          contractAddress: token.contractAddress,
          tokenBalance: token.tokenBalance,
          name: metadata.name,
          symbol: metadata.symbol,
          decimals: metadata.decimals,
          logo: metadata.logo
        })
      }
    }

    return {
      address,
      nativeBalance,
      tokenBalances: enrichedTokens,
      totalValueUSD: 0 // Would need price API
    }
  } catch (error) {
    console.error('Error fetching Alchemy portfolio:', error)
    return null
  }
}

// Get token metadata using Alchemy
async function getTokenMetadata(contractAddress: string): Promise<any> {
  try {
    const response = await fetch(
      `${ALCHEMY_V2_URL}/${ALCHEMY_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'alchemy_getTokenMetadata',
          params: [contractAddress]
        }),
        next: { revalidate: 3600 }
      }
    )

    const data = await response.json()
    return data.result
  } catch (error) {
    return null
  }
}

// ===== ALCHEMY NFT API =====
// Get NFTs owned by wallet address
export async function getNFTsForOwner(ownerAddress: string): Promise<NFT[]> {
  if (!ALCHEMY_API_KEY) {
    console.warn('Alchemy API key not configured')
    return []
  }

  try {
    const response = await fetch(
      `${ALCHEMY_NFT_URL}/${ALCHEMY_API_KEY}/getNFTsForOwner?owner=${ownerAddress}&withMetadata=true&pageSize=100`,
      {
        method: 'GET',
        headers: {
          'accept': 'application/json'
        },
        next: { revalidate: 600 } // Cache for 10 minutes
      }
    )

    if (!response.ok) {
      console.error('Alchemy NFT API error:', response.status)
      return []
    }

    const data = await response.json()
    const nfts: NFT[] = (data.ownedNfts || []).map((nft: any) => ({
      contract: {
        address: nft.contract.address,
        name: nft.contract.name || 'Unknown',
        symbol: nft.contract.symbol || 'NFT'
      },
      tokenId: nft.tokenId,
      name: nft.name || nft.title || `#${nft.tokenId}`,
      description: nft.description,
      image: nft.image?.cachedUrl || nft.image?.thumbnailUrl || nft.media?.[0]?.thumbnail,
      collection: nft.contract.name
    }))

    return nfts
  } catch (error) {
    console.error('Error fetching NFTs:', error)
    return []
  }
}

// Get NFT collections grouped by contract
export async function getNFTCollections(ownerAddress: string): Promise<NFTCollection[]> {
  const nfts = await getNFTsForOwner(ownerAddress)
  
  // Group by contract address
  const collectionMap = new Map<string, NFTCollection>()
  
  for (const nft of nfts) {
    const address = nft.contract.address.toLowerCase()
    
    if (collectionMap.has(address)) {
      const collection = collectionMap.get(address)!
      collection.totalCount++
    } else {
      collectionMap.set(address, {
        name: nft.contract.name,
        symbol: nft.contract.symbol,
        contractAddress: address,
        totalCount: 1
      })
    }
  }
  
  return Array.from(collectionMap.values())
    .sort((a, b) => b.totalCount - a.totalCount)
}

// Check if wallet owns popular NFT collections
export async function checkPopularCollections(ownerAddress: string): Promise<string[]> {
  const collections = await getNFTCollections(ownerAddress)
  const ownedPopular: string[] = []
  
  for (const collection of collections) {
    const address = collection.contractAddress.toLowerCase()
    if (POPULAR_COLLECTIONS[address]) {
      ownedPopular.push(POPULAR_COLLECTIONS[address])
    }
  }
  
  return ownedPopular
}

// Get detailed NFT info
export async function getNFTMetadata(contractAddress: string, tokenId: string): Promise<NFT | null> {
  if (!ALCHEMY_API_KEY) return null

  try {
    const response = await fetch(
      `${ALCHEMY_NFT_URL}/${ALCHEMY_API_KEY}/getNFTMetadata?contractAddress=${contractAddress}&tokenId=${tokenId}&refreshCache=false`,
      {
        method: 'GET',
        headers: {
          'accept': 'application/json'
        },
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    )

    if (!response.ok) return null

    const data = await response.json()
    return {
      contract: {
        address: data.contract.address,
        name: data.contract.name || 'Unknown',
        symbol: data.contract.symbol || 'NFT'
      },
      tokenId: data.tokenId,
      name: data.name || data.title,
      description: data.description,
      image: data.image?.cachedUrl || data.media?.[0]?.thumbnail,
      collection: data.contract.name
    }
  } catch (error) {
    console.error('Error fetching NFT metadata:', error)
    return null
  }
}

// Analyze NFT portfolio
export interface NFTPortfolioAnalysis {
  totalNFTs: number;
  uniqueCollections: number;
  popularCollections: string[];
  hasBAYC: boolean;
  hasPunks: boolean;
  hasAzuki: boolean;
  topCollections: NFTCollection[];
  isCollector: boolean;
}

export async function analyzeNFTPortfolio(ownerAddress: string): Promise<NFTPortfolioAnalysis> {
  const [nfts, collections, popularOwned] = await Promise.all([
    getNFTsForOwner(ownerAddress),
    getNFTCollections(ownerAddress),
    checkPopularCollections(ownerAddress)
  ])

  const analysis: NFTPortfolioAnalysis = {
    totalNFTs: nfts.length,
    uniqueCollections: collections.length,
    popularCollections: popularOwned,
    hasBAYC: popularOwned.includes('Bored Ape Yacht Club'),
    hasPunks: popularOwned.includes('CryptoPunks'),
    hasAzuki: popularOwned.includes('Azuki'),
    topCollections: collections.slice(0, 5),
    isCollector: nfts.length >= 10 || popularOwned.length >= 1
  }

  return analysis
}

// Check if Alchemy API is configured
export function isAlchemyConfigured(): boolean {
  return ALCHEMY_API_KEY !== '' && ALCHEMY_API_KEY.length > 10
}

// Get NFT portfolio summary for display
export function getNFTSummary(analysis: NFTPortfolioAnalysis): string {
  if (analysis.totalNFTs === 0) {
    return "No NFTs detected"
  }

  const parts: string[] = []
  
  if (analysis.hasBAYC) parts.push("🐵 BAYC Holder")
  if (analysis.hasPunks) parts.push("👾 Punk Owner")
  if (analysis.hasAzuki) parts.push("🌸 Azuki Collector")
  
  if (parts.length === 0 && analysis.popularCollections.length > 0) {
    parts.push(`🎨 ${analysis.popularCollections[0]} Holder`)
  }
  
  if (parts.length === 0) {
    parts.push(`${analysis.totalNFTs} NFTs`)
  }
  
  return parts.join(" • ")
}
