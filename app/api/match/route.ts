import { NextRequest, NextResponse } from 'next/server'
import { analyzeWallet } from '@/lib/blockchain'

const cryptoCelebrities = [
  {
    id: 'elon',
    name: 'Elon Musk 🚀',
    avatar: 'https://pbs.twimg.com/profile_images/1815749056821346304/jS8I28PL_400x400.jpg',
    traits: ['Doge Enthusiast', 'Mars Dreamer', 'Meme Lord', 'Innovation Addict'],
    why: "You both love memes, disruption, and taking crypto to the moon! Your shared vision of making humanity multi-planetary through crypto innovation is legendary.",
    fact: "You both tweet about Dogecoin at 3 AM! 🌙🐕",
    compatibility: { min: 88, max: 98 },
    matchConditions: {
      hasDoge: true,
      prefersMeme: true,
      multiChain: true,
    }
  },
  {
    id: 'vitalik',
    name: 'Vitalik Buterin 🦄',
    avatar: 'https://pbs.twimg.com/profile_images/977496875887558661/L86xyLF4_400x400.jpg',
    traits: ['Smart Contract Genius', 'ETH Believer', 'Proof of Stake Champion', 'Philosophy Nerd'],
    why: "Your deep understanding of blockchain technology and passion for decentralization makes you Vitalik's intellectual soulmate. Together, you'll scale Ethereum to infinity!",
    fact: "You both can explain gas fees without getting angry! 🤓⛽",
    compatibility: { min: 90, max: 99 },
    matchConditions: {
      hasEth: true,
      usesL2: true,
      defiUser: true,
    }
  },
  {
    id: 'cz',
    name: 'CZ (Changpeng Zhao) 💰',
    avatar: 'https://pbs.twimg.com/profile_images/1470217541593337857/Kqq2P66w_400x400.jpg',
    traits: ['Trading Master', 'Global Visionary', 'Builder Mindset', 'Community First'],
    why: "Your entrepreneurial spirit and ability to build at lightning speed matches CZ's legendary pace. Together, you'll disrupt the entire financial system!",
    fact: "You both check trading volumes more than your bank account! 📊💸",
    compatibility: { min: 85, max: 96 },
    matchConditions: {
      usesBsc: true,
      hasStables: true,
      highVolume: true,
    }
  },
  {
    id: 'saylor',
    name: 'Michael Saylor 💎',
    avatar: 'https://pbs.twimg.com/profile_images/1437322601677930506/JdQupzLl_400x400.jpg',
    traits: ['Bitcoin Maximalist', 'Diamond Hands', 'Corporate Treasury Innovator', 'Laser Eyes'],
    why: "Your unwavering belief in Bitcoin as digital gold and ability to HODL through any storm makes you Saylor's perfect match. Together, you'll orange-pill the world!",
    fact: "You both have Bitcoin price alerts set for every $1 move! 🔔₿",
    compatibility: { min: 92, max: 99 },
    matchConditions: {
      hasWbtc: true,
      hodler: true,
      btcMaxi: true,
    }
  },
  {
    id: 'cathie',
    name: 'Cathie Wood 📈',
    avatar: 'https://pbs.twimg.com/profile_images/1367530419704172544/7Zy2qE7N_400x400.jpg',
    traits: ['Innovation Investor', 'Disruptive Tech Lover', 'Long-term Vision', 'Risk Taker'],
    why: "Your ability to spot innovation years before others and invest in disruptive technologies matches Cathie's legendary foresight. Together, you'll predict the future!",
    fact: "You both bought Bitcoin when everyone said it was too volatile! 📈🚀",
    compatibility: { min: 87, max: 97 },
    matchConditions: {
      diversified: true,
      multiChain: true,
      innovativeTokens: true,
    }
  },
  {
    id: 'satoshi',
    name: 'Satoshi Nakamoto 👻',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png',
    traits: ['Anonymous Legend', 'Cypherpunk', 'P2P Pioneer', 'Mystery Master'],
    why: "You understand the true vision of decentralization and privacy. Your commitment to permissionless money and financial sovereignty is unmatched. You might BE Satoshi!",
    fact: "You both value privacy more than fame! 🥷🔐",
    compatibility: { min: 95, max: 100 },
    matchConditions: {
      oldWallet: true,
      hasWbtc: true,
      simpleHolder: true,
    }
  },
  {
    id: 'sbf',
    name: 'SBF (Sam Bankman-Fried) ⚠️',
    avatar: 'https://pbs.twimg.com/profile_images/1518730952162791424/gBwEHNIl_400x400.jpg',
    traits: ['Risk Management Fail', 'Leverage Lover', 'Yacht Collector', 'Compliance Optional'],
    why: "This is actually a BAD match! You're too smart to fall for over-leveraged schemes. Unlike SBF, you understand that customer funds aren't 'company assets'! 😅",
    fact: "You both use Slack... but you don't use it to commit fraud! 🚫💸",
    compatibility: { min: 5, max: 15 },
    matchConditions: {
      reckless: true,
      noTokens: true,
    }
  },
  {
    id: 'andreas',
    name: 'Andreas Antonopoulos 🎓',
    avatar: 'https://pbs.twimg.com/profile_images/1201297355916705792/H_KBJGnx_400x400.jpg',
    traits: ['Bitcoin Educator', 'Tech Explainer', 'Decentralization Advocate', 'Open Source Champion'],
    why: "Your passion for education and making crypto accessible to everyone mirrors Andreas's mission. Together, you'll orange-pill billions through knowledge!",
    fact: "You both can explain Bitcoin to your grandma AND she actually gets it! 👵💡",
    compatibility: { min: 89, max: 98 },
    matchConditions: {
      balanced: true,
      defiUser: true,
      ethUser: true,
    }
  },
]

interface MatchRequest {
  fid: number
  username: string
  bio?: string
  walletAddress?: string
}

// Portfolio analiz sonucuna göre match skorunu hesapla
function analyzePortfolioMatch(portfolioData: any) {
  const analysis = {
    hasEth: false,
    hasWbtc: false,
    hasStables: false,
    usesBsc: false,
    usesL2: false,
    multiChain: false,
    diversified: false,
    defiUser: false,
    totalValue: 0,
    activeChains: 0,
  }

  if (!portfolioData) return analysis

  analysis.totalValue = parseFloat(portfolioData.total_value || '0')
  analysis.activeChains = portfolioData.active_chains || 0
  
  // Multi-chain kullanımı
  analysis.multiChain = analysis.activeChains >= 3

  // Token kontrolü
  if (portfolioData.tokens && Array.isArray(portfolioData.tokens)) {
    analysis.hasEth = portfolioData.tokens.some((t: any) => t.symbol === 'ETH' || t.symbol === 'WETH')
    analysis.hasWbtc = portfolioData.tokens.some((t: any) => t.symbol === 'WBTC')
    analysis.hasStables = portfolioData.tokens.some((t: any) => 
      ['USDT', 'USDC', 'DAI'].includes(t.symbol)
    )
    
    // Diversification - 5'ten fazla farklı token
    analysis.diversified = portfolioData.tokens.length >= 5
    
    // DeFi kullanımı - LINK, UNI gibi tokenler varsa
    analysis.defiUser = portfolioData.tokens.some((t: any) => 
      ['LINK', 'UNI', 'AAVE', 'COMP'].includes(t.symbol)
    )
  }

  // Chain kontrolü
  if (portfolioData.chain_balances && Array.isArray(portfolioData.chain_balances)) {
    analysis.usesBsc = portfolioData.chain_balances.some((c: any) => 
      c.chain.toLowerCase().includes('bsc') || c.chain.toLowerCase().includes('binance')
    )
    analysis.usesL2 = portfolioData.chain_balances.some((c: any) => 
      ['arbitrum', 'optimism', 'base'].some(l2 => c.chain.toLowerCase().includes(l2))
    )
  }

  return analysis
}

// En uygun celebrity'yi bul
function findBestMatch(analysis: any, fid: number) {
  const scores = cryptoCelebrities.map(celeb => {
    let score = 0
    
    // Match conditions kontrolü
    if (celeb.matchConditions.hasEth && analysis.hasEth) score += 20
    if (celeb.matchConditions.hasWbtc && analysis.hasWbtc) score += 20
    if (celeb.matchConditions.hasStables && analysis.hasStables) score += 15
    if (celeb.matchConditions.usesBsc && analysis.usesBsc) score += 15
    if (celeb.matchConditions.usesL2 && analysis.usesL2) score += 15
    if (celeb.matchConditions.multiChain && analysis.multiChain) score += 20
    if (celeb.matchConditions.diversified && analysis.diversified) score += 15
    if (celeb.matchConditions.defiUser && analysis.defiUser) score += 20
    
    // Büyük portfolio = daha yüksek tier eşleşmeler
    if (analysis.totalValue > 10000) score += 15
    else if (analysis.totalValue > 1000) score += 10
    else if (analysis.totalValue > 100) score += 5
    
    // FID bazlı randomness
    const fidBonus = Math.abs((fid * 7) % 20)
    score += fidBonus
    
    return { celeb, score }
  })
  
  // En yüksek skorlu match'i bul
  scores.sort((a, b) => b.score - a.score)
  
  // Top 3'ten random seç (çeşitlilik için)
  const topMatches = scores.slice(0, 3)
  const selectedMatch = topMatches[fid % topMatches.length]
  
  return selectedMatch.celeb
}

export async function POST(request: NextRequest) {
  try {
    const body: MatchRequest = await request.json()
    const { fid, username, bio, walletAddress } = body

    // Portfolio analizi yap (eğer wallet adresi varsa)
    let portfolioData = null
    let portfolioAnalysis = null
    
    if (walletAddress) {
      try {
        // Gerçek portfolio analizi
        const analysis = await analyzeWallet(walletAddress)
        portfolioData = {
          total_value: analysis.total_value_usd,
          active_chains: Object.keys(analysis.chains).filter(
            chain => analysis.chains[chain].tokens.length > 0
          ).length,
          tokens: analysis.all_tokens,
          chain_balances: Object.entries(analysis.chains).map(([chain, data]) => ({
            chain: chain.charAt(0).toUpperCase() + chain.slice(1),
            native_balance: data.native_balance,
            native_value: data.native_value_usd,
            token_count: data.tokens.length,
          })),
        }
        portfolioAnalysis = analyzePortfolioMatch(portfolioData)
      } catch (error) {
        console.error('Portfolio analysis failed:', error)
      }
    }

    // AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    // En uygun celebrity'yi seç
    const match = portfolioAnalysis 
      ? findBestMatch(portfolioAnalysis, fid)
      : cryptoCelebrities[Math.abs(fid % cryptoCelebrities.length)]

    // Score hesapla
    const score = match.compatibility.min + 
                  Math.floor(Math.random() * (match.compatibility.max - match.compatibility.min + 1))

    // Personalized insight - portfolio bazlı
    const personalizedInsight = portfolioAnalysis
      ? generatePortfolioInsight(portfolioAnalysis, match, username)
      : generatePersonalizedInsight(username, bio, match)

    return NextResponse.json({
      success: true,
      compatibility: {
        score,
        match_name: match.name,
        match_avatar: match.avatar,
        match_id: match.id,
        why_compatible: match.why,
        traits_in_common: match.traits,
        fun_fact: match.fact,
        personalized_insight: personalizedInsight,
        image_url: match.avatar,
        // Portfolio insights
        portfolio_based: !!portfolioAnalysis,
        portfolio_summary: portfolioAnalysis ? {
          total_value: portfolioData?.total_value || '0',
          active_chains: portfolioAnalysis.activeChains,
          is_multi_chain: portfolioAnalysis.multiChain,
          is_defi_user: portfolioAnalysis.defiUser,
        } : null
      }
    })
  } catch (error) {
    console.error('Match API error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to find match' 
      },
      { status: 500 }
    )
  }
}

function generatePortfolioInsight(analysis: any, match: any, username: string): string {
  const insights = []
  
  if (analysis.multiChain) {
    insights.push(`${username}, your multi-chain mastery across ${analysis.activeChains} networks shows you think like ${match.name.split(' ')[0]}!`)
  }
  
  if (analysis.defiUser) {
    insights.push(`Your DeFi portfolio screams ${match.name.split(' ')[0]} energy - you're not just holding, you're BUILDING!`)
  }
  
  if (analysis.totalValue > 10000) {
    insights.push(`With $${Math.floor(analysis.totalValue)} in crypto, you and ${match.name.split(' ')[0]} are both whales! 🐋`)
  } else if (analysis.totalValue > 1000) {
    insights.push(`Your $${Math.floor(analysis.totalValue)} portfolio shows serious commitment - ${match.name.split(' ')[0]} would be proud!`)
  }
  
  if (analysis.diversified) {
    insights.push(`Your diversified portfolio strategy mirrors ${match.name.split(' ')[0]}'s approach to crypto investing!`)
  }
  
  if (analysis.hasWbtc) {
    insights.push(`Holding WBTC? You and ${match.name.split(' ')[0]} understand Bitcoin's digital gold thesis!`)
  }
  
  if (analysis.usesL2) {
    insights.push(`Using L2s shows you're tech-savvy like ${match.name.split(' ')[0]} - scaling solutions FTW!`)
  }
  
  if (insights.length === 0) {
    insights.push(`${username}, your portfolio vibe perfectly aligns with ${match.name.split(' ')[0]}'s philosophy!`)
  }
  
  return insights[Math.floor(Math.random() * insights.length)]
}

function generatePersonalizedInsight(username: string, bio: string | undefined, match: any): string {
  const insights = [
    `${username}, your Farcaster vibe perfectly aligns with ${match.name.split(' ')[0]}'s energy!`,
    `Based on your activity, you and ${match.name.split(' ')[0]} share the same crypto philosophy!`,
    `Your posts suggest you'd be best friends with ${match.name.split(' ')[0]} IRL!`,
    `${match.name.split(' ')[0]} would definitely follow you back on Farcaster!`,
  ]
  
  return insights[Math.abs(username.length % insights.length)]
}
