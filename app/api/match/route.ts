import { NextRequest, NextResponse } from 'next/server'

const cryptoCelebrities = [
  {
    id: 'elon',
    name: 'Elon Musk 🚀',
    avatar: 'https://pbs.twimg.com/profile_images/1815749056821346304/jS8I28PL_400x400.jpg',
    traits: ['Doge Enthusiast', 'Mars Dreamer', 'Meme Lord', 'Innovation Addict'],
    why: "You both love memes, disruption, and taking crypto to the moon! Your shared vision of making humanity multi-planetary through crypto innovation is legendary.",
    fact: "You both tweet about Dogecoin at 3 AM! 🌙🐕",
    compatibility: { min: 88, max: 98 }
  },
  {
    id: 'vitalik',
    name: 'Vitalik Buterin 🦄',
    avatar: 'https://pbs.twimg.com/profile_images/977496875887558661/L86xyLF4_400x400.jpg',
    traits: ['Smart Contract Genius', 'ETH Believer', 'Proof of Stake Champion', 'Philosophy Nerd'],
    why: "Your deep understanding of blockchain technology and passion for decentralization makes you Vitalik's intellectual soulmate. Together, you'll scale Ethereum to infinity!",
    fact: "You both can explain gas fees without getting angry! 🤓⛽",
    compatibility: { min: 90, max: 99 }
  },
  {
    id: 'cz',
    name: 'CZ (Changpeng Zhao) 💰',
    avatar: 'https://pbs.twimg.com/profile_images/1470217541593337857/Kqq2P66w_400x400.jpg',
    traits: ['Trading Master', 'Global Visionary', 'Builder Mindset', 'Community First'],
    why: "Your entrepreneurial spirit and ability to build at lightning speed matches CZ's legendary pace. Together, you'll disrupt the entire financial system!",
    fact: "You both check trading volumes more than your bank account! 📊💸",
    compatibility: { min: 85, max: 96 }
  },
  {
    id: 'saylor',
    name: 'Michael Saylor 💎',
    avatar: 'https://pbs.twimg.com/profile_images/1437322601677930506/JdQupzLl_400x400.jpg',
    traits: ['Bitcoin Maximalist', 'Diamond Hands', 'Corporate Treasury Innovator', 'Laser Eyes'],
    why: "Your unwavering belief in Bitcoin as digital gold and ability to HODL through any storm makes you Saylor's perfect match. Together, you'll orange-pill the world!",
    fact: "You both have Bitcoin price alerts set for every $1 move! 🔔₿",
    compatibility: { min: 92, max: 99 }
  },
  {
    id: 'cathie',
    name: 'Cathie Wood 📈',
    avatar: 'https://pbs.twimg.com/profile_images/1367530419704172544/7Zy2qE7N_400x400.jpg',
    traits: ['Innovation Investor', 'Disruptive Tech Lover', 'Long-term Vision', 'Risk Taker'],
    why: "Your ability to spot innovation years before others and invest in disruptive technologies matches Cathie's legendary foresight. Together, you'll predict the future!",
    fact: "You both bought Bitcoin when everyone said it was too volatile! 📈🚀",
    compatibility: { min: 87, max: 97 }
  },
  {
    id: 'satoshi',
    name: 'Satoshi Nakamoto 👻',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png',
    traits: ['Anonymous Legend', 'Cypherpunk', 'P2P Pioneer', 'Mystery Master'],
    why: "You understand the true vision of decentralization and privacy. Your commitment to permissionless money and financial sovereignty is unmatched. You might BE Satoshi!",
    fact: "You both value privacy more than fame! 🥷🔐",
    compatibility: { min: 95, max: 100 }
  },
  {
    id: 'sbf',
    name: 'SBF (Sam Bankman-Fried) ⚠️',
    avatar: 'https://pbs.twimg.com/profile_images/1518730952162791424/gBwEHNIl_400x400.jpg',
    traits: ['Risk Management Fail', 'Leverage Lover', 'Yacht Collector', 'Compliance Optional'],
    why: "This is actually a BAD match! You're too smart to fall for over-leveraged schemes. Unlike SBF, you understand that customer funds aren't 'company assets'! 😅",
    fact: "You both use Slack... but you don't use it to commit fraud! 🚫💸",
    compatibility: { min: 5, max: 15 }
  },
  {
    id: 'andreas',
    name: 'Andreas Antonopoulos 🎓',
    avatar: 'https://pbs.twimg.com/profile_images/1201297355916705792/H_KBJGnx_400x400.jpg',
    traits: ['Bitcoin Educator', 'Tech Explainer', 'Decentralization Advocate', 'Open Source Champion'],
    why: "Your passion for education and making crypto accessible to everyone mirrors Andreas's mission. Together, you'll orange-pill billions through knowledge!",
    fact: "You both can explain Bitcoin to your grandma AND she actually gets it! 👵💡",
    compatibility: { min: 89, max: 98 }
  },
]

interface MatchRequest {
  fid: number
  username: string
  bio?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: MatchRequest = await request.json()
    const { fid, username, bio } = body

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Smart match based on FID (deterministic but feels random)
    const matchIndex = Math.abs(fid % cryptoCelebrities.length)
    const match = cryptoCelebrities[matchIndex]

    // Generate score within celebrity's range
    const score = match.compatibility.min + 
                  Math.floor(Math.random() * (match.compatibility.max - match.compatibility.min + 1))

    // Generate personalized insights based on username/bio
    const personalizedInsight = generatePersonalizedInsight(username, bio, match)

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
        image_url: match.avatar
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

function generatePersonalizedInsight(username: string, bio: string | undefined, match: any): string {
  const insights = [
    `${username}, your Farcaster vibe perfectly aligns with ${match.name.split(' ')[0]}'s energy!`,
    `Based on your activity, you and ${match.name.split(' ')[0]} share the same crypto philosophy!`,
    `Your posts suggest you'd be best friends with ${match.name.split(' ')[0]} IRL!`,
    `${match.name.split(' ')[0]} would definitely follow you back on Farcaster!`,
  ]
  
  return insights[Math.abs(username.length % insights.length)]
}
