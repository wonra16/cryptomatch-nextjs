import { NextRequest, NextResponse } from 'next/server'
import { getUserProfile, getUserCasts, getUserFollowing, findCommonFollowing, calculateSocialSimilarity, getWalletFromUser, isNeynarConfigured } from '@/lib/neynar'
import { analyzeContent, calculateContentSimilarity, getTopInterests } from '@/lib/content-analysis'
import { analyzeWallet } from '@/lib/blockchain'

// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

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
  console.log('🔍 Finding similar users for FID:', fid)
  
  // Get user's data
  const userProfile = await getUserProfile(fid)
  if (!userProfile) throw new Error('User not found')
  
  console.log('✅ User profile loaded:', userProfile.username)
  
  const userCasts = await getUserCasts(fid, 25)
  const userFollowing = await getUserFollowing(fid, 100)
  const userWallet = getWalletFromUser(userProfile)
  
  console.log('📊 User stats:', {
    casts: userCasts.length,
    following: userFollowing.length,
    hasWallet: !!userWallet
  })
  
  // CHECK: If following count is too low!
  if (userFollowing.length < 10) {
    console.log('⚠️ User follows too few people!')
    return []  // Return empty - will show friendly error message
  }
  
  // Analyze user's content
  const userContentProfile = analyzeContent(userCasts.map((c: any) => c.text || ''))
  console.log('📝 User interests:', userContentProfile.topicsDetected.slice(0, 5))
  
  // Analyze user's portfolio (if wallet available)
  let userPortfolio = null
  if (userWallet) {
    try {
      userPortfolio = await analyzeWallet(userWallet)
    } catch (error) {
      console.log('Portfolio analysis skipped:', error)
    }
  }
  
  // Get REAL similar users from their following list
  // Strategy: Find users who follow similar people
  const potentialMatches: UserMatchResult[] = []
  
  // Get a sample of users from following list - INCREASED TO 100!
  const sampleFollowing = userFollowing.slice(0, 100) // ← 50 → 100!
  console.log(`🎯 Analyzing ${sampleFollowing.length} users from following list`)
  
  for (const followedFid of sampleFollowing) {
    try {
      const followedProfile = await getUserProfile(followedFid)
      if (!followedProfile) continue
      
      // Get their casts for content analysis
      const followedCasts = await getUserCasts(followedFid, 25)
      const followedContentProfile = analyzeContent(followedCasts.map((c: any) => c.text || ''))
      
      // Get their following for social similarity
      const followedFollowing = await getUserFollowing(followedFid, 100)
      
      // Calculate similarity
      const contentSimilarity = calculateContentSimilarity(userContentProfile, followedContentProfile)
      const commonFollows = findCommonFollowing(userFollowing, followedFollowing)
      const socialScore = calculateSocialSimilarity(
        commonFollows.length,
        userFollowing.length,
        followedFollowing.length
      )
      
      // Combined score
      const compatibilityScore = Math.round(
        (contentSimilarity * 0.6) + (socialScore * 0.4)
      )
      
      console.log(`🔢 FID ${followedFid} (@${followedProfile.username}): score=${compatibilityScore}, content=${contentSimilarity}, social=${socialScore}`)
      
      // Only add if score > 10 (ULTRA LOW threshold for maximum matches!)
      if (compatibilityScore > 10) {
        const commonInterests = userContentProfile.topicsDetected.filter((t: string) =>
          followedContentProfile.topicsDetected.includes(t)
        )
        
        const matchReasons = generateMatchReasons(
          contentSimilarity,
          commonFollows.length,
          0, // portfolio similarity not implemented yet
          commonInterests
        )
        
        potentialMatches.push({
          user: {
            fid: followedProfile.fid,
            username: followedProfile.username,
            display_name: followedProfile.display_name,
            pfp_url: followedProfile.pfp_url
          },
          compatibility_score: compatibilityScore,
          match_reasons: matchReasons,
          common_interests: commonInterests.slice(0, 3),
          common_following: commonFollows.length,
          portfolio_similarity: 0
        })
        
        console.log(`✅ Match found! @${followedProfile.username} - Score: ${compatibilityScore}`)
      }
      
      // Limit API calls - stop after finding 10 good matches (increased from 5)
      if (potentialMatches.length >= 10) break
      
    } catch (error) {
      console.error(`Error analyzing FID ${followedFid}:`, error)
      continue
    }
  }
  
  console.log(`🎉 Found ${potentialMatches.length} total matches`)
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
        success: false,
        matches: [],
        error: 'No matches found yet! 😔\n\nTips:\n• Follow 50+ people on Farcaster\n• Engage with crypto/NFT content\n• Build your on-chain presence\n• Try again after following more users! 🚀'
      }, { status: 404 })
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
