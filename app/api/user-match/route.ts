import { NextRequest, NextResponse } from 'next/server'
import { getUserProfile, getUserCasts, getUserFollowing, findCommonFollowing, calculateSocialSimilarity, getWalletFromUser, isNeynarConfigured } from '@/lib/neynar'
import { analyzeContent, calculateContentSimilarity, getTopInterests } from '@/lib/content-analysis'
import { analyzeWallet } from '@/lib/blockchain'

interface UserMatchRequest {
  fid: number;
  username?: string;
}

interface UserMatchResult {
  user: {
    fid: number;
    username: string;
    display_name: string;
    pfp_url: string;
  };
  compatibility_score: number;
  match_reasons: string[];
  common_interests: string[];
  common_following: number;
  portfolio_similarity: number;
}

async function findSimilarUsers(fid: number): Promise<UserMatchResult[]> {
  // Get user's data
  const userProfile = await getUserProfile(fid)
  if (!userProfile) throw new Error('User not found')
  
  const userCasts = await getUserCasts(fid, 25)
  const userFollowing = await getUserFollowing(fid, 100)
  const userWallet = getWalletFromUser(userProfile)
  
  // Analyze user's content
  const userContentProfile = analyzeContent(userCasts.map((c: any) => c.text || ''))
  
  // Analyze user's portfolio (if wallet available)
  let userPortfolio = null
  if (userWallet) {
    try {
      userPortfolio = await analyzeWallet(userWallet)
    } catch (error) {
      console.log('Portfolio analysis skipped:', error)
    }
  }
  
  // Get similar users (would use OpenRank or similar in production)
  // For demo, we'll create sample matches
  const potentialMatches: UserMatchResult[] = []
  
  // In production, you would:
  // 1. Query Farcaster/Neynar for users with similar interests
  // 2. Use OpenRank for social graph analysis
  // 3. Check common channels
  // 4. Analyze engagement patterns
  
  // For now, return a sample match to demonstrate the feature
  const sampleMatch: UserMatchResult = {
    user: {
      fid: 12345,
      username: 'cryptoenthusiast',
      display_name: 'Crypto Enthusiast',
      pfp_url: 'https://i.imgur.com/placeholder.png'
    },
    compatibility_score: 85,
    match_reasons: [
      'You both are into DeFi and NFTs! 🏦🎨',
      'Similar portfolio composition detected 💎',
      'You follow 15 people in common 👥'
    ],
    common_interests: userContentProfile.topicsDetected.slice(0, 3),
    common_following: 15,
    portfolio_similarity: 75
  }
  
  potentialMatches.push(sampleMatch)
  
  return potentialMatches.sort((a, b) => b.compatibility_score - a.compatibility_score)
}

function calculateUserCompatibility(
  userContentProfile: any,
  userFollowing: number[],
  userPortfolio: any | null,
  matchContentProfile: any,
  matchFollowing: number[],
  matchPortfolio: any | null
): number {
  let score = 0
  
  // Content similarity (40 points)
  if (userContentProfile && matchContentProfile) {
    const contentSimilarity = calculateContentSimilarity(userContentProfile, matchContentProfile)
    score += (contentSimilarity / 100) * 40
  }
  
  // Social graph similarity (30 points)
  const commonFollows = findCommonFollowing(userFollowing, matchFollowing)
  const socialScore = calculateSocialSimilarity(
    commonFollows.length,
    userFollowing.length,
    matchFollowing.length
  )
  score += (socialScore / 100) * 30
  
  // Portfolio similarity (20 points)
  if (userPortfolio && matchPortfolio) {
    // Simple portfolio comparison
    const userValue = parseFloat(userPortfolio.total_value_usd) || 0
    const matchValue = parseFloat(matchPortfolio.total_value_usd) || 0
    
    if (userValue > 0 && matchValue > 0) {
      const ratio = Math.min(userValue, matchValue) / Math.max(userValue, matchValue)
      score += ratio * 20
    }
  }
  
  // Active user bonus (10 points)
  score += 10
  
  return Math.min(Math.round(score), 100)
}

function generateMatchReasons(
  contentSimilarity: number,
  commonFollowing: number,
  portfolioSimilarity: number,
  commonInterests: string[]
): string[] {
  const reasons: string[] = []
  
  if (contentSimilarity > 70) {
    reasons.push(`You share ${commonInterests.length}+ interests! 🎯`)
  }
  
  if (commonInterests.includes('nft')) {
    reasons.push('Both NFT collectors! 🎨💎')
  }
  
  if (commonInterests.includes('defi')) {
    reasons.push('DeFi power users unite! 🏦⚡')
  }
  
  if (commonFollowing > 10) {
    reasons.push(`${commonFollowing} mutual connections! 👥`)
  }
  
  if (portfolioSimilarity > 60) {
    reasons.push('Similar portfolio strategies! 💼📈')
  }
  
  if (commonInterests.includes('music')) {
    reasons.push('Music lovers! 🎵🎧')
  }
  
  if (commonInterests.includes('gaming')) {
    reasons.push('Gaming enthusiasts! 🎮👾')
  }
  
  if (reasons.length === 0) {
    reasons.push('Great vibes all around! ✨')
  }
  
  return reasons.slice(0, 3)
}

export async function POST(request: NextRequest) {
  try {
    if (!isNeynarConfigured()) {
      return NextResponse.json({
        success: false,
        error: 'User matching requires Neynar API key'
      }, { status: 400 })
    }
    
    const body: UserMatchRequest = await request.json()
    const { fid, username } = body

    // Find similar users
    const matches = await findSimilarUsers(fid)
    
    // AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    if (matches.length === 0) {
      return NextResponse.json({
        success: true,
        matches: [],
        message: 'No matches found yet. Keep building your presence on Farcaster! 🚀'
      })
    }

    // Get top match
    const topMatch = matches[0]

    return NextResponse.json({
      success: true,
      top_match: topMatch,
      all_matches: matches.slice(0, 5), // Return top 5
      message: `Found ${matches.length} potential matches for you! 🎉`
    })
    
  } catch (error) {
    console.error('User match API error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to find user matches',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
