import { NextRequest, NextResponse } from 'next/server'
import { getUserProfile, getUserCasts, isNeynarConfigured } from '@/lib/neynar'

// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

interface VibeCheckRequest {
  fid: number
}

const PERSONALITY_TYPES = [
  {
    type: 'The Degen 🎲',
    emoji: '🎲',
    keywords: ['gm', 'wagmi', 'ngmi', 'lfg', 'degen', 'ape', 'moon', 'pump', 'based', 'higher'],
    description: 'You live for the thrill! Memes, tokens, and chaos are your fuel.'
  },
  {
    type: 'The Builder 🔨',
    emoji: '🔨',
    keywords: ['building', 'shipping', 'launch', 'beta', 'test', 'code', 'dev', 'product', 'feature', 'api'],
    description: 'You\'re here to create, ship, and change the game. Respect!'
  },
  {
    type: 'The Shitposter 💩',
    emoji: '💩',
    keywords: ['lol', 'lmao', 'bruh', 'fr', 'ngl', 'literally', 'mood', 'vibe', 'bestie', 'slay'],
    description: 'Comedy gold! You keep the timeline entertaining with bangers.'
  },
  {
    type: 'The Philosopher 🧠',
    emoji: '🧠',
    keywords: ['think', 'perspective', 'interesting', 'consider', 'perhaps', 'question', 'explore', 'understand', 'reflect', 'insight'],
    description: 'Deep thoughts only. You make people think twice about everything.'
  },
  {
    type: 'The Community Builder 🤝',
    emoji: '🤝',
    keywords: ['community', 'together', 'support', 'help', 'share', 'thanks', 'appreciate', 'love', 'welcome', 'friend'],
    description: 'You bring people together and make Farcaster feel like home.'
  },
  {
    type: 'The Artist 🎨',
    emoji: '🎨',
    keywords: ['art', 'create', 'design', 'nft', 'mint', 'collection', 'aesthetic', 'beauty', 'visual', 'creative'],
    description: 'Your timeline is a gallery. Pure creative energy!'
  }
]

function analyzePersonality(casts: any[]): any {
  const allText = casts.map(c => (c.text || '').toLowerCase()).join(' ')
  
  // Count keyword matches for each personality type
  const scores = PERSONALITY_TYPES.map(type => {
    const matches = type.keywords.filter(keyword => allText.includes(keyword)).length
    return { ...type, score: matches }
  })
  
  // Sort by score
  scores.sort((a, b) => b.score - a.score)
  
  // Return top personality
  return scores[0].score > 0 ? scores[0] : {
    type: 'The Mysterious One 🎭',
    emoji: '🎭',
    description: 'You\'re an enigma! Hard to read, impossible to predict.',
    score: 0
  }
}

function calculateVibeScore(casts: any[], profile: any): number {
  let score = 50 // Base score
  
  // Activity bonus (up to +20)
  const castsCount = casts.length
  score += Math.min(20, castsCount * 0.8)
  
  // Engagement bonus (up to +15)
  const avgLikes = casts.reduce((sum, c) => sum + (c.reactions?.likes?.length || 0), 0) / Math.max(castsCount, 1)
  score += Math.min(15, avgLikes * 2)
  
  // Recency bonus (up to +10)
  const recentCasts = casts.filter(c => {
    const castDate = new Date(c.timestamp)
    const daysSince = (Date.now() - castDate.getTime()) / (1000 * 60 * 60 * 24)
    return daysSince < 7
  }).length
  score += Math.min(10, recentCasts * 2)
  
  // Variety bonus (up to +5)
  const hasLinks = casts.some(c => (c.text || '').includes('http'))
  const hasImages = casts.some(c => c.embeds && c.embeds.length > 0)
  if (hasLinks) score += 2.5
  if (hasImages) score += 2.5
  
  return Math.min(100, Math.max(10, Math.round(score)))
}

function getTopInterests(casts: any[]): string[] {
  const allText = casts.map(c => (c.text || '').toLowerCase()).join(' ')
  
  const topics = [
    { name: 'Crypto', keywords: ['crypto', 'btc', 'eth', 'token', 'defi', 'nft'] },
    { name: 'Building', keywords: ['build', 'ship', 'launch', 'product', 'code'] },
    { name: 'Memes', keywords: ['meme', 'lol', 'lmao', 'funny', 'joke'] },
    { name: 'Community', keywords: ['community', 'together', 'fam', 'frens', 'gm'] },
    { name: 'AI', keywords: ['ai', 'gpt', 'claude', 'llm', 'ml'] },
    { name: 'Art', keywords: ['art', 'design', 'creative', 'aesthetic', 'mint'] },
    { name: 'Tech', keywords: ['tech', 'software', 'developer', 'engineer', 'api'] },
    { name: 'Finance', keywords: ['money', 'invest', 'trade', 'market', 'price'] }
  ]
  
  const scores = topics.map(topic => {
    const matches = topic.keywords.filter(keyword => allText.includes(keyword)).length
    return { name: topic.name, score: matches }
  })
  
  scores.sort((a, b) => b.score - a.score)
  
  return scores.slice(0, 3).filter(t => t.score > 0).map(t => t.name)
}

function generateRoast(personality: any, vibeScore: number, casts: any[]): string {
  const roasts: { [key: string]: string[] } = {
    'The Degen 🎲': [
      'Your timeline looks like a casino floor at 3am. Impressive and concerning at the same time.',
      'Every cast is basically "just one more trade bro, trust me". We\'re not worried at all...',
      'You say WAGMI so much, I think you\'re trying to manifest it into existence.',
      'Your portfolio is probably as diverse as your vocabulary: mostly DEGEN and HIGHER.'
    ],
    'The Builder 🔨': [
      'You\'ve announced 47 projects this month. Shipped? Let\'s not ask uncomfortable questions.',
      'Still building? At this point you could have reconstructed the pyramids.',
      'Your GitHub commits are more active than your social life. Respect, I guess?',
      'Shipping so fast, I hope you included unit tests this time.'
    ],
    'The Shitposter 💩': [
      'Your timeline is 90% memes and 10% more memes. Quality content right there.',
      'You post so much, I think you\'re trying to hit a world record. Almost there!',
      'Every cast is peak comedy to you. Your bar is... low.',
      'Ratio-ing yourself speedrun champion. Impressive strategy!'
    ],
    'The Philosopher 🧠': [
      'You write essays in a 280-character world. Nobody is reading all that.',
      'Your thoughts are so deep, we need scuba gear to understand them.',
      'Dropping wisdom bombs like you\'re running a TED talk on Farcaster.',
      'Hot take: Maybe some thoughts should stay thoughts.'
    ],
    'The Community Builder 🤝': [
      'You say "gm" to literally everyone. It\'s sweet but also slightly concerning.',
      'Your positivity is suspicious. What are you hiding?',
      'Supporting everyone so much, who\'s supporting you? Just checking.',
      'Building community or building a cult? The line is blurry here.'
    ],
    'The Artist 🎨': [
      'Your aesthetic is immaculate but where\'s the substance? Asking for a friend.',
      'Every post is a masterpiece. Too bad masterpieces don\'t pay rent.',
      'Your NFT collection is impressive. Your explanation of what they do? Less so.',
      'Creating more art than engagement. Maybe switch the ratio?'
    ]
  }
  
  const defaultRoasts = [
    'You\'re so mysterious, even your timeline doesn\'t know what you\'re about.',
    'Fascinating vibe! Like a crypto Schrödinger\'s cat - simultaneously based and cringe.',
    'Your energy is unique. That\'s... that\'s definitely a compliment. Trust me.',
    'I\'ve seen many vibes, but yours is truly one of them.'
  ]
  
  const typeRoasts = roasts[personality.type] || defaultRoasts
  const selectedRoast = typeRoasts[Math.floor(Math.random() * typeRoasts.length)]
  
  // Add vibe score commentary
  if (vibeScore >= 80) {
    return `${selectedRoast} Though I gotta admit, your vibe is actually legendary. 🔥`
  } else if (vibeScore < 40) {
    return `${selectedRoast} Also your vibe score is... well, there's room for improvement! 📈`
  }
  
  return selectedRoast
}

function getMostActiveHour(casts: any[]): string {
  const hours = casts.map(c => {
    const date = new Date(c.timestamp)
    return date.getHours()
  })
  
  const hourCounts: { [key: number]: number } = {}
  hours.forEach(h => {
    hourCounts[h] = (hourCounts[h] || 0) + 1
  })
  
  let maxHour = 12
  let maxCount = 0
  Object.entries(hourCounts).forEach(([hour, count]) => {
    if (count > maxCount) {
      maxCount = count
      maxHour = parseInt(hour)
    }
  })
  
  return `${maxHour}:00`
}

export async function POST(request: NextRequest) {
  try {
    if (!isNeynarConfigured()) {
      return NextResponse.json({
        success: false,
        error: 'Neynar API not configured'
      }, { status: 500 })
    }

    const body: VibeCheckRequest = await request.json()
    const { fid } = body

    if (!fid) {
      return NextResponse.json({
        success: false,
        error: 'FID is required'
      }, { status: 400 })
    }

    console.log('🎯 Analyzing Farcaster vibe for FID:', fid)

    // Get user profile
    const profile = await getUserProfile(fid)
    if (!profile) {
      return NextResponse.json({
        success: false,
        error: 'User not found'
      }, { status: 404 })
    }

    // Get recent casts (25 should be enough)
    const casts = await getUserCasts(fid, 25)
    
    if (casts.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'No casts found! Post something first!'
      }, { status: 404 })
    }

    console.log(`📊 Analyzing ${casts.length} casts for @${profile.username}`)

    // Analyze!
    const personality = analyzePersonality(casts)
    const vibeScore = calculateVibeScore(casts, profile)
    const topInterests = getTopInterests(casts)
    const roast = generateRoast(personality, vibeScore, casts)
    
    const avgCastLength = Math.round(
      casts.reduce((sum, c) => sum + (c.text || '').length, 0) / casts.length
    )

    const result = {
      username: profile.username,
      displayName: profile.display_name,
      pfpUrl: profile.pfp_url,
      vibeScore,
      personalityType: {
        type: personality.type,
        emoji: personality.emoji,
        description: personality.description
      },
      topInterests: topInterests.length > 0 ? topInterests : ['Mystery', 'Enigma', 'Unknown'],
      roast,
      stats: {
        totalCasts: casts.length,
        avgCastLength,
        mostActiveHour: getMostActiveHour(casts)
      }
    }

    console.log(`✅ Vibe Check complete! @${profile.username} = ${personality.type} (${vibeScore}/100)`)

    return NextResponse.json({
      success: true,
      result
    })

  } catch (error: any) {
    console.error('❌ Vibe Check error:', error)
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to analyze vibe'
    }, { status: 500 })
  }
}
