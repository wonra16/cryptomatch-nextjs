// Content Analysis & Interest Extraction
// NLP-based interest matching

export interface InterestProfile {
  keywords: string[];
  categories: CategoryScore[];
  sentiment: 'positive' | 'neutral' | 'negative';
  topicsDetected: string[];
  nftMentions: string[];
  cryptoMentions: string[];
}

export interface CategoryScore {
  name: string;
  score: number;
  matchedKeywords: string[];
}

// Comprehensive interest categories with keywords
export const INTEREST_CATEGORIES = {
  // Crypto & DeFi
  defi: {
    keywords: ['defi', 'uniswap', 'aave', 'compound', 'lending', 'yield', 'farming', 'liquidity', 'swap', 'amm', 'pool'],
    weight: 1.2
  },
  nft: {
    keywords: ['nft', 'opensea', 'pfp', 'art', 'collection', 'mint', 'drop', 'generative', 'bored ape', 'bayc', 'cryptopunk', 'azuki', '10k'],
    weight: 1.3
  },
  gaming: {
    keywords: ['game', 'gaming', 'play', 'metaverse', 'sandbox', 'axie', 'guild', 'p2e', 'play to earn', 'gamefi', 'esports'],
    weight: 1.1
  },
  ai: {
    keywords: ['ai', 'artificial intelligence', 'ml', 'machine learning', 'gpt', 'llm', 'neural', 'chatgpt', 'midjourney', 'stable diffusion'],
    weight: 1.2
  },
  blockchain: {
    keywords: ['blockchain', 'ethereum', 'bitcoin', 'solana', 'polygon', 'crypto', 'web3', 'decentralized', 'l2', 'layer2'],
    weight: 1.0
  },
  
  // Lifestyle
  fitness: {
    keywords: ['gym', 'workout', 'fitness', 'exercise', 'running', 'yoga', 'health', 'training', 'muscle', 'cardio', 'crossfit'],
    weight: 0.9
  },
  food: {
    keywords: ['food', 'cooking', 'recipe', 'restaurant', 'coffee', 'wine', 'chef', 'meal', 'dinner', 'breakfast', 'cuisine'],
    weight: 0.8
  },
  travel: {
    keywords: ['travel', 'trip', 'vacation', 'explore', 'adventure', 'journey', 'destination', 'flight', 'hotel', 'beach', 'mountain'],
    weight: 0.9
  },
  photography: {
    keywords: ['photo', 'photography', 'camera', 'picture', 'shoot', 'lens', 'capture', 'instagram', 'portrait', 'landscape'],
    weight: 0.9
  },
  music: {
    keywords: ['music', 'song', 'band', 'concert', 'album', 'spotify', 'playlist', 'artist', 'festival', 'dj', 'producer'],
    weight: 1.0
  },
  
  // Hobbies
  reading: {
    keywords: ['book', 'reading', 'novel', 'author', 'literature', 'story', 'kindle', 'writing', 'poetry'],
    weight: 0.8
  },
  sports: {
    keywords: ['football', 'soccer', 'basketball', 'tennis', 'sports', 'team', 'match', 'game', 'nfl', 'nba', 'fifa'],
    weight: 0.9
  },
  nature: {
    keywords: ['nature', 'hiking', 'outdoor', 'mountain', 'forest', 'camping', 'wildlife', 'trail', 'backpacking'],
    weight: 0.8
  },
  art: {
    keywords: ['art', 'painting', 'drawing', 'artist', 'creative', 'design', 'illustration', 'gallery', 'museum'],
    weight: 1.0
  },
  fishing: {
    keywords: ['fishing', 'fish', 'catch', 'river', 'lake', 'angling', 'boat', 'bass', 'tackle'],
    weight: 0.7
  },
  
  // Professional
  entrepreneurship: {
    keywords: ['startup', 'founder', 'business', 'entrepreneur', 'venture', 'launch', 'building', 'hustle', 'grind'],
    weight: 1.1
  },
  investing: {
    keywords: ['invest', 'trading', 'portfolio', 'market', 'stocks', 'hodl', 'buy', 'sell', 'bull', 'bear'],
    weight: 1.1
  },
  technology: {
    keywords: ['tech', 'technology', 'code', 'programming', 'developer', 'software', 'app', 'api', 'cloud'],
    weight: 1.0
  },
  design: {
    keywords: ['design', 'ui', 'ux', 'figma', 'graphic', 'branding', 'logo', 'visual', 'aesthetic'],
    weight: 0.9
  },
  
  // Social
  memes: {
    keywords: ['meme', 'lol', 'lmao', 'funny', 'joke', 'humor', 'haha', '😂', 'gm', 'wagmi', 'ngmi'],
    weight: 0.9
  },
  community: {
    keywords: ['community', 'fam', 'frens', 'together', 'squad', 'tribe', 'group', 'discord', 'telegram'],
    weight: 0.8
  },
  learning: {
    keywords: ['learn', 'learning', 'education', 'study', 'course', 'tutorial', 'teach', 'knowledge'],
    weight: 0.9
  },
  
  // Specific Interests
  anime: {
    keywords: ['anime', 'manga', 'otaku', 'cosplay', 'japanese', 'weeb'],
    weight: 0.8
  },
  cars: {
    keywords: ['car', 'cars', 'auto', 'vehicle', 'drive', 'racing', 'formula1', 'tesla'],
    weight: 0.8
  },
  fashion: {
    keywords: ['fashion', 'style', 'outfit', 'wear', 'clothes', 'sneaker', 'drip', 'streetwear'],
    weight: 0.8
  },
  pets: {
    keywords: ['dog', 'cat', 'pet', 'puppy', 'kitten', 'animal', 'pets'],
    weight: 0.7
  }
}

// Popular NFT collections
const NFT_COLLECTIONS = [
  'bored ape', 'bayc', 'cryptopunk', 'azuki', 'doodles', 'moonbirds', 
  'pudgy penguins', 'clone x', 'mayc', 'world of women', 'proof collective',
  'mfer', 'goblintown', 'beanz', 'otherdeed', 'mutant ape'
]

// Popular crypto projects
const CRYPTO_PROJECTS = [
  'ethereum', 'bitcoin', 'uniswap', 'aave', 'compound', 'curve', 'sushiswap',
  'pancakeswap', 'solana', 'polygon', 'arbitrum', 'optimism', 'base',
  'avalanche', 'fantom', 'binance', 'coinbase'
]

// Analyze text content and extract interests
export function analyzeContent(texts: string[]): InterestProfile {
  const combinedText = texts.join(' ').toLowerCase()
  const categories: CategoryScore[] = []
  
  // Score each category
  for (const [categoryName, category] of Object.entries(INTEREST_CATEGORIES)) {
    const matchedKeywords: string[] = []
    let score = 0
    
    for (const keyword of category.keywords) {
      const regex = new RegExp(`\\b${keyword.toLowerCase()}\\b`, 'gi')
      const matches = combinedText.match(regex)
      if (matches) {
        matchedKeywords.push(keyword)
        score += matches.length * category.weight
      }
    }
    
    if (score > 0) {
      categories.push({
        name: categoryName,
        score,
        matchedKeywords
      })
    }
  }
  
  // Sort by score
  categories.sort((a, b) => b.score - a.score)
  
  // Extract all unique keywords
  const keywords = Array.from(
    new Set(categories.flatMap(c => c.matchedKeywords))
  )
  
  // Detect sentiment
  const sentiment = detectSentiment(combinedText)
  
  // Find NFT mentions
  const nftMentions = NFT_COLLECTIONS.filter(nft => 
    combinedText.includes(nft.toLowerCase())
  )
  
  // Find crypto mentions
  const cryptoMentions = CRYPTO_PROJECTS.filter(crypto =>
    combinedText.includes(crypto.toLowerCase())
  )
  
  // Get top topics
  const topicsDetected = categories.slice(0, 5).map(c => c.name)
  
  return {
    keywords,
    categories,
    sentiment,
    topicsDetected,
    nftMentions,
    cryptoMentions
  }
}

// Simple sentiment detection
function detectSentiment(text: string): 'positive' | 'neutral' | 'negative' {
  const positiveWords = ['love', 'great', 'amazing', 'awesome', 'good', 'best', 'nice', 'happy', 'excited', 'bullish', 'gm', 'wagmi', '❤️', '🔥', '💎', '🚀', '💪', '✨']
  const negativeWords = ['bad', 'hate', 'terrible', 'worst', 'sad', 'angry', 'scam', 'rug', 'bearish', 'ngmi', 'rekt', '😢', '😡', '💩']
  
  let positiveScore = 0
  let negativeScore = 0
  
  const lowerText = text.toLowerCase()
  
  for (const word of positiveWords) {
    const regex = new RegExp(`\\b${word.toLowerCase()}\\b`, 'g')
    const matches = lowerText.match(regex)
    if (matches) positiveScore += matches.length
  }
  
  for (const word of negativeWords) {
    const regex = new RegExp(`\\b${word.toLowerCase()}\\b`, 'g')
    const matches = lowerText.match(regex)
    if (matches) negativeScore += matches.length
  }
  
  if (positiveScore > negativeScore * 1.5) return 'positive'
  if (negativeScore > positiveScore * 1.5) return 'negative'
  return 'neutral'
}

// Calculate content similarity between two interest profiles (0-100)
export function calculateContentSimilarity(
  profile1: InterestProfile,
  profile2: InterestProfile
): number {
  let score = 0
  const maxScore = 100
  
  // Compare top categories (40 points)
  const commonTopics = profile1.topicsDetected.filter(topic =>
    profile2.topicsDetected.includes(topic)
  )
  score += (commonTopics.length / Math.max(profile1.topicsDetected.length, 1)) * 40
  
  // Compare NFT collections (20 points)
  if (profile1.nftMentions.length > 0 && profile2.nftMentions.length > 0) {
    const commonNFTs = profile1.nftMentions.filter(nft =>
      profile2.nftMentions.includes(nft)
    )
    score += (commonNFTs.length / Math.max(profile1.nftMentions.length, 1)) * 20
  }
  
  // Compare crypto projects (20 points)
  if (profile1.cryptoMentions.length > 0 && profile2.cryptoMentions.length > 0) {
    const commonCrypto = profile1.cryptoMentions.filter(crypto =>
      profile2.cryptoMentions.includes(crypto)
    )
    score += (commonCrypto.length / Math.max(profile1.cryptoMentions.length, 1)) * 20
  }
  
  // Sentiment match (10 points)
  if (profile1.sentiment === profile2.sentiment) {
    score += 10
  }
  
  // Keyword overlap (10 points)
  const commonKeywords = profile1.keywords.filter(kw =>
    profile2.keywords.includes(kw)
  )
  score += (commonKeywords.length / Math.max(profile1.keywords.length, 1)) * 10
  
  return Math.min(Math.round(score), maxScore)
}

// Generate human-readable insight from interest profile
export function generateInterestInsight(profile: InterestProfile): string {
  if (profile.topicsDetected.length === 0) {
    return "You're building your presence on Farcaster! Keep casting! 🚀"
  }
  
  const topInterest = profile.topicsDetected[0]
  const insights: Record<string, string[]> = {
    nft: [
      "You're deeply into the NFT space! 🎨",
      "Your NFT collecting game is strong! 🖼️",
      "You live and breathe digital art! 💎"
    ],
    defi: [
      "You're a DeFi power user! 🏦",
      "Your DeFi knowledge is impressive! 💰",
      "You understand yield farming like a pro! 🌾"
    ],
    music: [
      "Music is your passion! 🎵",
      "You've got great taste in music! 🎧",
      "The rhythm flows through you! 🎶"
    ],
    gaming: [
      "You're a gaming enthusiast! 🎮",
      "Your gaming passion shines through! 👾",
      "You're all about that gaming life! 🕹️"
    ],
    art: [
      "You're an art lover! 🎨",
      "Your artistic soul shows! 🖼️",
      "You appreciate true creativity! ✨"
    ],
    sports: [
      "You're a sports fanatic! ⚽",
      "Your athletic spirit is evident! 🏀",
      "You live for the game! 🏈"
    ],
    fitness: [
      "You're committed to fitness! 💪",
      "Your healthy lifestyle shows! 🏋️",
      "You're crushing those workouts! 🔥"
    ],
    entrepreneurship: [
      "You're building something great! 🚀",
      "Your entrepreneurial spirit is strong! 💼",
      "You're a true founder at heart! 🏗️"
    ]
  }
  
  const categoryInsights = insights[topInterest] || [
    `You're passionate about ${topInterest}! ⭐`
  ]
  
  return categoryInsights[Math.floor(Math.random() * categoryInsights.length)]
}

// Extract top interests as simple string array
export function getTopInterests(profile: InterestProfile, count: number = 3): string[] {
  return profile.topicsDetected.slice(0, count)
}
