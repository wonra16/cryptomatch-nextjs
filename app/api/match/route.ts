import { NextRequest, NextResponse } from 'next/server'
import { analyzeWallet } from '@/lib/blockchain'

const cryptoCelebrities = [
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
      defiUser: false,
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
      hodler: false,
      btcMaxi: false,
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
      hasStables: false,
      highVolume: false,
    }
  },
  {
    id: 'elon',
    name: 'Elon Musk 🚀',
    avatar: 'https://pbs.twimg.com/profile_images/1815749056821346304/jS8I28PL_400x400.jpg',
    traits: ['Innovation Addict', 'Mars Dreamer', 'Tech Visionary', 'Disruption King'],
    why: "Your love for innovation and taking bold risks matches Elon's legendary style. Together, you'll revolutionize the future!",
    fact: "You both think about Mars while others sleep! 🌙🚀",
    compatibility: { min: 85, max: 97 },
    matchConditions: {
      hasDoge: false,
      prefersMeme: false,
      multiChain: true,
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
      multiChain: false,
      innovativeTokens: false,
    }
  },
  {
    id: 'balaji',
    name: 'Balaji Srinivasan 🧠',
    avatar: 'https://pbs.twimg.com/profile_images/1761868990624124928/O9K0Qn8q_400x400.jpg',
    traits: ['Network State Visionary', 'Bitcoin Bull', 'Tech Philosopher', 'Future Thinker'],
    why: "Your understanding of crypto's role in rebuilding society and forming network states aligns perfectly with Balaji's vision!",
    fact: "You both believe Bitcoin fixes everything! ⚡🌍",
    compatibility: { min: 88, max: 98 },
    matchConditions: {
      hasEth: false,
      hasWbtc: true,
      defiUser: false,
    }
  },
  {
    id: 'hayden',
    name: 'Hayden Adams 🦄',
    avatar: 'https://pbs.twimg.com/profile_images/1634301697483763712/2EhsGVwo_400x400.jpg',
    traits: ['DeFi Pioneer', 'Uniswap Creator', 'DEX Believer', 'AMM Genius'],
    why: "Your passion for decentralized trading and DeFi protocols matches Hayden's revolutionary spirit. You understand the power of AMMs!",
    fact: "You both prefer swapping on DEXs over CEXs! 🦄💱",
    compatibility: { min: 89, max: 98 },
    matchConditions: {
      hasEth: true,
      defiUser: true,
      usesL2: false,
    }
  },
  {
    id: 'anatoly',
    name: 'Anatoly Yakovenko ⚡',
    avatar: 'https://pbs.twimg.com/profile_images/1529571393504362496/DIFlCEBq_400x400.jpg',
    traits: ['Solana Founder', 'Speed Obsessed', 'High TPS Believer', 'Compiler Expert'],
    why: "Your appreciation for fast, scalable blockchains and low fees perfectly aligns with Anatoly's Solana vision!",
    fact: "You both think 400ms block times are still too slow! ⚡🚀",
    compatibility: { min: 86, max: 96 },
    matchConditions: {
      hasEth: false,
      multiChain: true,
      defiUser: false,
    }
  },
  {
    id: 'andre',
    name: 'Andre Cronje 🏗️',
    avatar: 'https://pbs.twimg.com/profile_images/1467992413284896769/w8gg1Zy3_400x400.jpg',
    traits: ['DeFi Builder', 'Yield Farmer', 'Protocol Designer', 'Code Wizard'],
    why: "Your love for complex DeFi protocols and yield optimization matches Andre's building philosophy perfectly!",
    fact: "You both understand impermanent loss better than most! 📊🌾",
    compatibility: { min: 87, max: 97 },
    matchConditions: {
      defiUser: true,
      diversified: true,
      hasEth: false,
    }
  },
  {
    id: 'nic',
    name: 'Nic Carter 📊',
    avatar: 'https://pbs.twimg.com/profile_images/1489365868033454081/Uk-LluZb_400x400.jpg',
    traits: ['Bitcoin Analyst', 'On-Chain Researcher', 'Crypto Economist', 'Data Nerd'],
    why: "Your analytical approach to crypto and understanding of on-chain metrics aligns with Nic's data-driven philosophy!",
    fact: "You both analyze blockchain data for breakfast! 📈🔍",
    compatibility: { min: 86, max: 95 },
    matchConditions: {
      hasWbtc: true,
      hodler: false,
      btcMaxi: false,
    }
  },
  {
    id: 'stani',
    name: 'Stani Kulechov 👻',
    avatar: 'https://pbs.twimg.com/profile_images/1634256028968534017/b_FQ8qNu_400x400.jpg',
    traits: ['Aave Founder', 'DeFi Lending Pioneer', 'Governance Believer', 'GHO Creator'],
    why: "Your interest in lending protocols and DeFi infrastructure matches Stani's vision for decentralized finance!",
    fact: "You both believe in the power of money markets! 💰👻",
    compatibility: { min: 88, max: 97 },
    matchConditions: {
      hasEth: true,
      defiUser: true,
      hasStables: false,
    }
  },
  {
    id: 'dankrad',
    name: 'Dankrad Feist 🌈',
    avatar: 'https://pbs.twimg.com/profile_images/1631991780991406081/SgClwVL2_400x400.jpg',
    traits: ['Ethereum Researcher', 'Danksharding Pioneer', 'Scaling Expert', 'Math Wizard'],
    why: "Your understanding of Ethereum's scaling solutions and rollups shows you think like Dankrad about the future!",
    fact: "You both get excited about KZG commitments! 🌈🔬",
    compatibility: { min: 89, max: 98 },
    matchConditions: {
      hasEth: true,
      usesL2: true,
      defiUser: false,
    }
  },
  {
    id: 'cobie',
    name: 'Cobie 🎭',
    avatar: 'https://pbs.twimg.com/profile_images/1493210553054351360/L3UpY0Kj_400x400.jpg',
    traits: ['Crypto Trader', 'Market Analyst', 'Meme Connoisseur', 'Alpha Hunter'],
    why: "Your trading instincts and ability to spot alpha early matches Cobie's legendary market sense!",
    fact: "You both check your portfolio during dinner! 📱💎",
    compatibility: { min: 84, max: 94 },
    matchConditions: {
      diversified: true,
      multiChain: false,
      hasStables: false,
    }
  },
  {
    id: 'jesse',
    name: 'Jesse Pollak 🔵',
    avatar: 'https://pbs.twimg.com/profile_images/1765801702087245824/MaJK1Rqn_400x400.jpg',
    traits: ['Base Lead', 'Onchain Believer', 'Builder Culture', 'Optimistic Vision'],
    why: "Your enthusiasm for bringing billions onchain and building on Base aligns with Jesse's mission perfectly!",
    fact: "You both believe the future is onchain! 🔵⛓️",
    compatibility: { min: 87, max: 96 },
    matchConditions: {
      hasEth: true,
      usesL2: true,
      multiChain: false,
    }
  },
  {
    id: 'punk6529',
    name: 'Punk6529 🖼️',
    avatar: 'https://pbs.twimg.com/profile_images/1570118146045796353/csLlv5xY_400x400.jpg',
    traits: ['NFT Visionary', 'Decentralization Maxi', 'Art Collector', 'Freedom Fighter'],
    why: "Your belief in digital ownership and NFTs as tools for freedom matches 6529's revolutionary vision!",
    fact: "You both understand NFTs are more than JPEGs! 🖼️✨",
    compatibility: { min: 85, max: 95 },
    matchConditions: {
      hasEth: true,
      diversified: false,
      defiUser: false,
    }
  },
  {
    id: 'polynya',
    name: 'Polynya 🔷',
    avatar: 'https://pbs.twimg.com/profile_images/1631659176654303234/hFCiIuqP_400x400.jpg',
    traits: ['Rollup Researcher', 'Scaling Analyst', 'L2 Maximalist', 'Tech Writer'],
    why: "Your deep understanding of rollups and Layer 2 scaling shows you share Polynya's vision for Ethereum's future!",
    fact: "You both believe rollups are inevitable! 🔷📊",
    compatibility: { min: 88, max: 97 },
    matchConditions: {
      hasEth: true,
      usesL2: true,
      defiUser: false,
    }
  },
  {
    id: 'ryan',
    name: 'Ryan Sean Adams 🦇',
    avatar: 'https://pbs.twimg.com/profile_images/1595540207545745409/cdgZI1LV_400x400.jpg',
    traits: ['Bankless Co-Founder', 'ETH Bull', 'DeFi Educator', 'Web3 Pioneer'],
    why: "Your commitment to going bankless and understanding of Ethereum's monetary premium aligns with Ryan's mission!",
    fact: "You both see ETH as ultrasound money! 🦇💰",
    compatibility: { min: 88, max: 97 },
    matchConditions: {
      hasEth: true,
      defiUser: true,
      hodler: false,
    }
  },
  {
    id: 'andreas',
    name: 'Andreas Antonopoulos 🎓',
    avatar: 'https://pbs.twimg.com/profile_images/1201297355916705792/H_KBJGnx_400x400.jpg',
    traits: ['Bitcoin Educator', 'Tech Explainer', 'Decentralization Advocate', 'Open Source Champion'],
    why: "Your passion for education and making crypto accessible to everyone mirrors Andreas's mission!",
    fact: "You both can explain Bitcoin to your grandma! 👵💡",
    compatibility: { min: 87, max: 96 },
    matchConditions: {
      balanced: false,
      defiUser: false,
      ethUser: false,
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
    
    // Portfolio based scoring (yüksek ağırlık)
    if (celeb.matchConditions.hasEth && analysis.hasEth) score += 25
    if (celeb.matchConditions.hasWbtc && analysis.hasWbtc) score += 25
    if (celeb.matchConditions.hasStables && analysis.hasStables) score += 20
    if (celeb.matchConditions.usesBsc && analysis.usesBsc) score += 20
    if (celeb.matchConditions.usesL2 && analysis.usesL2) score += 20
    if (celeb.matchConditions.multiChain && analysis.multiChain) score += 25
    if (celeb.matchConditions.diversified && analysis.diversified) score += 20
    if (celeb.matchConditions.defiUser && analysis.defiUser) score += 25
    
    // Portfolio value bonuses
    if (analysis.totalValue > 10000) score += 20
    else if (analysis.totalValue > 1000) score += 15
    else if (analysis.totalValue > 100) score += 10
    else if (analysis.totalValue > 10) score += 5
    
    // Active chains bonus
    if (analysis.activeChains >= 5) score += 15
    else if (analysis.activeChains >= 3) score += 10
    else if (analysis.activeChains >= 2) score += 5
    
    // Negative scoring for mismatches (important!)
    if (celeb.matchConditions.hasEth && !analysis.hasEth) score -= 15
    if (celeb.matchConditions.hasWbtc && !analysis.hasWbtc) score -= 15
    if (celeb.matchConditions.defiUser && !analysis.defiUser) score -= 10
    
    // Small FID-based randomness (5% variance)
    const fidBonus = Math.abs((fid * 7) % 10)
    score += fidBonus
    
    return { celeb, score }
  })
  
  // En yüksek skorlu match'i bul
  scores.sort((a, b) => b.score - a.score)
  
  // Log scores for debugging
  console.log('Match scores:', scores.slice(0, 5).map(s => ({ 
    name: s.celeb.name, 
    score: s.score 
  })))
  
  // En yüksek skorlu celebrity'yi seç
  return scores[0].celeb
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
    let match
    if (portfolioAnalysis && portfolioAnalysis.totalValue > 0) {
      // Gerçek portfolio varsa - en uygun match
      match = findBestMatch(portfolioAnalysis, fid)
      console.log('Portfolio-based match:', match.name)
    } else {
      // Portfolio yok - balanced/neutral match seç
      // Vitalik, Hayden, Ryan gibi balanced karakterler
      const neutralMatches = cryptoCelebrities.filter(c => 
        ['vitalik', 'hayden', 'ryan', 'andreas', 'balaji'].includes(c.id)
      )
      match = neutralMatches[Math.abs(fid % neutralMatches.length)] || cryptoCelebrities[0]
      console.log('FID-based neutral match:', match.name)
    }

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
  const firstName = match.name.split(' ')[0]
  
  // Specific token holdings
  if (analysis.hasEth && analysis.usesL2) {
    insights.push(`${username}, you're using L2s like ${firstName}! That's next-level Ethereum thinking. 🦄⚡`)
  } else if (analysis.hasEth) {
    insights.push(`${username}, your ETH holdings show you understand sound money like ${firstName}! ⟠💎`)
  }
  
  if (analysis.hasWbtc) {
    insights.push(`Holding WBTC? You and ${firstName} both see Bitcoin's value! 💎₿`)
  }
  
  if (analysis.hasStables && analysis.usesBsc) {
    insights.push(`Your stablecoin strategy on BSC mirrors ${firstName}'s pragmatic approach! 💰⚡`)
  } else if (analysis.hasStables) {
    insights.push(`Smart use of stablecoins - ${firstName} would approve your risk management! 💵✅`)
  }
  
  // Multi-chain prowess
  if (analysis.activeChains >= 5) {
    insights.push(`${analysis.activeChains} chains!? You're a multi-chain master like ${firstName}! 🌐🚀`)
  } else if (analysis.activeChains >= 3) {
    insights.push(`Active on ${analysis.activeChains} chains - ${firstName} level diversification! 🌐💪`)
  }
  
  // DeFi engagement
  if (analysis.defiUser && analysis.diversified) {
    insights.push(`Your DeFi portfolio is chef's kiss! ${firstName} sees a fellow protocol power user! 🏦👨‍🍳`)
  } else if (analysis.defiUser) {
    insights.push(`DeFi native detected! You and ${firstName} are building the future of finance! 🏦⚡`)
  }
  
  // Portfolio size
  if (analysis.totalValue > 10000) {
    insights.push(`$${Math.floor(analysis.totalValue).toLocaleString()} portfolio? ${firstName} respects the commitment! 🐋💰`)
  } else if (analysis.totalValue > 1000) {
    insights.push(`Your $${Math.floor(analysis.totalValue).toLocaleString()} portfolio shows you're serious like ${firstName}! 💪💰`)
  } else if (analysis.totalValue > 100) {
    insights.push(`Starting strong with $${Math.floor(analysis.totalValue)}! ${firstName} started somewhere too! 🚀💫`)
  }
  
  // Diversification
  if (analysis.diversified && analysis.multiChain) {
    insights.push(`Diversified across chains? You think like ${firstName} - don't put all eggs in one basket! 🥚🌐`)
  } else if (analysis.diversified) {
    insights.push(`Your diversified holdings match ${firstName}'s investment philosophy perfectly! 📊✨`)
  }
  
  // Default fallback
  if (insights.length === 0) {
    insights.push(`${username}, your on-chain activity shows you vibe with ${firstName}'s crypto philosophy! 🎯✨`)
  }
  
  // Return random insight from matches
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
