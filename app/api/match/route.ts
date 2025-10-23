import { NextRequest, NextResponse } from 'next/server'
import { CELEBRITIES, Celebrity } from '@/lib/celebrities'
import { analyzeWallet } from '@/lib/blockchain'
import { getUserProfile, getUserCasts, isNeynarConfigured } from '@/lib/neynar'
import { analyzeContent, generateInterestInsight } from '@/lib/content-analysis'

interface MatchRequest {
  fid: number;
  username?: string;
  bio?: string;
  walletAddress?: string;
}

interface PortfolioAnalysis {
  hasEth: boolean;
  hasWbtc: boolean;
  usesBsc: boolean;
  usesL2: boolean;
  defiUser: boolean;
  hasStables: boolean;
  multiChain: boolean;
  diversified: boolean;
  nftCollector: boolean;
  hodler: boolean;
  totalValue: number;
  activeChains: number;
}

function analyzePortfolioMatch(portfolioData: any): PortfolioAnalysis {
  const chains = portfolioData.chain_balances || []
  const tokens = portfolioData.tokens || []
  const totalValue = parseFloat(portfolioData.total_value) || 0
  
  return {
    hasEth: tokens.some((t: any) => t.symbol === 'ETH'),
    hasWbtc: tokens.some((t: any) => t.symbol.includes('WBTC') || t.symbol.includes('BTC')),
    usesBsc: chains.some((c: any) => c.chain.toLowerCase().includes('bsc')),
    usesL2: chains.some((c: any) => 
      ['arbitrum', 'optimism', 'base'].some(l2 => c.chain.toLowerCase().includes(l2))
    ),
    defiUser: tokens.some((t: any) => 
      ['UNI', 'AAVE', 'COMP', 'LINK', 'CRV', 'SUSHI'].includes(t.symbol)
    ),
    hasStables: tokens.some((t: any) => 
      ['USDT', 'USDC', 'DAI', 'BUSD'].includes(t.symbol)
    ),
    multiChain: portfolioData.active_chains >= 3,
    diversified: tokens.length >= 5,
    nftCollector: false, // Would need NFT API
    hodler: totalValue > 1000,
    totalValue,
    activeChains: portfolioData.active_chains || 0
  }
}

function findBestMatch(
  portfolioAnalysis: PortfolioAnalysis | null,
  contentProfile: any | null,
  fid: number
): Celebrity {
  const scores = CELEBRITIES.map(celeb => {
    let score = 0
    
    // Portfolio matching (30 points max)
    if (portfolioAnalysis && portfolioAnalysis.totalValue > 0) {
      if (celeb.matchConditions.hasEth && portfolioAnalysis.hasEth) score += 8
      if (celeb.matchConditions.hasWbtc && portfolioAnalysis.hasWbtc) score += 8
      if (celeb.matchConditions.usesBsc && portfolioAnalysis.usesBsc) score += 6
      if (celeb.matchConditions.usesL2 && portfolioAnalysis.usesL2) score += 7
      if (celeb.matchConditions.defiUser && portfolioAnalysis.defiUser) score += 8
      if (celeb.matchConditions.hasStables && portfolioAnalysis.hasStables) score += 5
      if (celeb.matchConditions.multiChain && portfolioAnalysis.multiChain) score += 8
      if (celeb.matchConditions.diversified && portfolioAnalysis.diversified) score += 6
      if (celeb.matchConditions.nftCollector && portfolioAnalysis.nftCollector) score += 10
      if (celeb.matchConditions.hodler && portfolioAnalysis.hodler) score += 6
      
      // Portfolio value bonuses
      if (portfolioAnalysis.totalValue > 10000) score += 5
      else if (portfolioAnalysis.totalValue > 1000) score += 3
      else if (portfolioAnalysis.totalValue > 100) score += 2
      
      // Active chains bonus
      if (portfolioAnalysis.activeChains >= 5) score += 4
      else if (portfolioAnalysis.activeChains >= 3) score += 3
      else if (portfolioAnalysis.activeChains >= 2) score += 2
    }
    
    // Content/Interest matching (25 points max)
    if (contentProfile && contentProfile.topicsDetected.length > 0) {
      const commonInterests = celeb.interests.filter(interest =>
        contentProfile.topicsDetected.includes(interest) ||
        contentProfile.keywords.includes(interest)
      )
      score += commonInterests.length * 5 // Max 25 points
      
      // NFT mentions bonus
      if (contentProfile.nftMentions.length > 0 && celeb.matchConditions.nftCollector) {
        score += 10
      }
      
      // Crypto mentions matching
      if (contentProfile.cryptoMentions.length > 0) {
        const matchingProjects = celeb.interests.filter(interest =>
          contentProfile.cryptoMentions.some((cm: string) => cm.includes(interest))
        )
        score += matchingProjects.length * 3
      }
      
      // Sentiment bonus
      if (contentProfile.sentiment === 'positive') score += 5
    }
    
    // Category preference (10 points)
    if (contentProfile) {
      if (contentProfile.topicsDetected.includes('crypto') && celeb.category === 'crypto') score += 5
      if (contentProfile.topicsDetected.includes('nft') && celeb.category === 'art') score += 5
      if (contentProfile.topicsDetected.includes('music') && celeb.category === 'music') score += 5
      if (contentProfile.topicsDetected.includes('sports') && celeb.category === 'sports') score += 5
    }
    
    // FID-based variety (0-10 points)
    const fidBonus = Math.abs((fid * 7) % 10)
    score += fidBonus
    
    return { celeb, score }
  })
  
  // Sort by score
  scores.sort((a, b) => b.score - a.score)
  
  console.log('Top 5 matches:', scores.slice(0, 5).map(s => ({
    name: s.celeb.name,
    score: s.score
  })))
  
  return scores[0].celeb
}

function generatePersonalizedInsight(
  username: string,
  portfolioAnalysis: PortfolioAnalysis | null,
  contentProfile: any | null,
  match: Celebrity
): string {
  const firstName = match.name.split(' ')[0]
  const insights: string[] = []
  
  // Portfolio-based insights
  if (portfolioAnalysis && portfolioAnalysis.totalValue > 0) {
    if (portfolioAnalysis.hasEth && portfolioAnalysis.usesL2) {
      insights.push(`${username}, you're using L2s like ${firstName}! Next-level thinking! 🦄⚡`)
    }
    if (portfolioAnalysis.multiChain) {
      insights.push(`${portfolioAnalysis.activeChains} chains!? Multi-chain master like ${firstName}! 🌐🚀`)
    }
    if (portfolioAnalysis.defiUser) {
      insights.push(`Your DeFi game is strong! ${firstName} sees a fellow power user! 🏦💪`)
    }
    if (portfolioAnalysis.totalValue > 10000) {
      insights.push(`$${Math.floor(portfolioAnalysis.totalValue).toLocaleString()} portfolio? ${firstName} respects that! 🐋💰`)
    }
  }
  
  // Content-based insights
  if (contentProfile && contentProfile.topicsDetected.length > 0) {
    const topInterest = contentProfile.topicsDetected[0]
    insights.push(`Your ${topInterest} passion matches ${firstName}'s vibe perfectly! ✨`)
    
    if (contentProfile.nftMentions.length > 0) {
      insights.push(`${contentProfile.nftMentions.length} NFT collections mentioned! ${firstName} level collector! 🎨💎`)
    }
    
    if (contentProfile.sentiment === 'positive') {
      insights.push(`Your positive energy matches ${firstName}'s bullish spirit! 🔥📈`)
    }
  }
  
  // Fallback
  if (insights.length === 0) {
    insights.push(`${username}, your vibe perfectly aligns with ${firstName}'s energy! 🎯✨`)
  }
  
  return insights[Math.floor(Math.random() * insights.length)]
}

export async function POST(request: NextRequest) {
  try {
    const body: MatchRequest = await request.json()
    const { fid, username, bio, walletAddress } = body

    let portfolioData = null
    let portfolioAnalysis = null
    let contentProfile = null
    
    // Portfolio analysis
    if (walletAddress) {
      try {
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
    
    // Content analysis (if Neynar configured)
    if (isNeynarConfigured()) {
      try {
        const casts = await getUserCasts(fid, 25)
        if (casts.length > 0) {
          const castTexts = casts.map((c: any) => c.text || '')
          contentProfile = analyzeContent(castTexts)
          console.log('Content analysis:', {
            topics: contentProfile.topicsDetected,
            nfts: contentProfile.nftMentions,
            crypto: contentProfile.cryptoMentions
          })
        }
      } catch (error) {
        console.error('Content analysis failed:', error)
      }
    }

    // AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Find best match
    const match = findBestMatch(portfolioAnalysis, contentProfile, fid)
    console.log('Final match:', match.name)

    // Calculate score
    const score = match.compatibility.min + 
                  Math.floor(Math.random() * (match.compatibility.max - match.compatibility.min + 1))

    // Generate insight
    const personalizedInsight = generatePersonalizedInsight(
      username || `FID ${fid}`,
      portfolioAnalysis,
      contentProfile,
      match
    )
    
    // Get content insight if available
    const contentInsight = contentProfile ? generateInterestInsight(contentProfile) : null

    return NextResponse.json({
      success: true,
      compatibility: {
        score,
        match_name: match.name,
        match_avatar: match.avatar,
        match_id: match.id,
        match_category: match.category,
        why_compatible: match.why,
        traits_in_common: match.traits,
        fun_fact: match.fact,
        personalized_insight: personalizedInsight,
        content_insight: contentInsight,
        image_url: match.avatar,
        
        // Analysis flags
        portfolio_based: !!portfolioAnalysis && portfolioAnalysis.totalValue > 0,
        content_based: !!contentProfile && contentProfile.topicsDetected.length > 0,
        
        // Portfolio summary
        portfolio_summary: portfolioAnalysis ? {
          total_value: portfolioData?.total_value || '0',
          active_chains: portfolioAnalysis.activeChains,
          is_multi_chain: portfolioAnalysis.multiChain,
          is_defi_user: portfolioAnalysis.defiUser,
        } : null,
        
        // Content summary
        content_summary: contentProfile ? {
          top_interests: contentProfile.topicsDetected.slice(0, 3),
          nft_mentions: contentProfile.nftMentions.length,
          sentiment: contentProfile.sentiment
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
