// Neynar Farcaster API Integration
// FREE: 200K compute units/month

const NEYNAR_API_KEY = process.env.NEYNAR_API_KEY || ''
const NEYNAR_BASE_URL = 'https://api.neynar.com/v2'

export interface FarcasterUser {
  fid: number;
  username: string;
  display_name: string;
  pfp_url: string;
  bio?: string;
  follower_count: number;
  following_count: number;
  verified_addresses: {
    eth_addresses: string[];
  };
}

export interface FarcasterCast {
  hash: string;
  text: string;
  timestamp: string;
  author: {
    fid: number;
    username: string;
  };
  reactions: {
    likes: number;
    recasts: number;
  };
}

export interface FarcasterChannel {
  id: string;
  name: string;
  follower_count: number;
}

// Get user profile
export async function getUserProfile(fid: number): Promise<FarcasterUser | null> {
  try {
    const response = await fetch(
      `${NEYNAR_BASE_URL}/farcaster/user/bulk?fids=${fid}`,
      {
        headers: {
          'accept': 'application/json',
          'x-api-key': NEYNAR_API_KEY
        },
        next: { revalidate: 300 } // Cache for 5 minutes
      }
    )
    
    if (!response.ok) {
      console.error('Neynar API error:', response.status)
      return null
    }
    
    const data = await response.json()
    return data.users?.[0] || null
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return null
  }
}

// Get user's recent casts
export async function getUserCasts(fid: number, limit: number = 25): Promise<FarcasterCast[]> {
  try {
    const response = await fetch(
      `${NEYNAR_BASE_URL}/farcaster/feed/user/${fid}/casts?limit=${limit}`,
      {
        headers: {
          'accept': 'application/json',
          'x-api-key': NEYNAR_API_KEY
        },
        next: { revalidate: 300 }
      }
    )
    
    if (!response.ok) {
      console.error('Neynar casts API error:', response.status)
      return []
    }
    
    const data = await response.json()
    return data.casts || []
  } catch (error) {
    console.error('Error fetching user casts:', error)
    return []
  }
}

// Get user's following list (for social graph analysis)
export async function getUserFollowing(fid: number, limit: number = 100): Promise<number[]> {
  try {
    const response = await fetch(
      `${NEYNAR_BASE_URL}/farcaster/following?fid=${fid}&limit=${limit}`,
      {
        headers: {
          'accept': 'application/json',
          'x-api-key': NEYNAR_API_KEY
        },
        next: { revalidate: 600 } // Cache for 10 minutes
      }
    )
    
    if (!response.ok) {
      console.error('Neynar following API error:', response.status)
      return []
    }
    
    const data = await response.json()
    const users = data.users || []
    return users.map((u: any) => u.fid)
  } catch (error) {
    console.error('Error fetching following:', error)
    return []
  }
}

// Get user's channels
export async function getUserChannels(fid: number): Promise<FarcasterChannel[]> {
  try {
    const response = await fetch(
      `${NEYNAR_BASE_URL}/farcaster/user/channels?fid=${fid}&limit=50`,
      {
        headers: {
          'accept': 'application/json',
          'x-api-key': NEYNAR_API_KEY
        },
        next: { revalidate: 600 }
      }
    )
    
    if (!response.ok) {
      console.error('Neynar channels API error:', response.status)
      return []
    }
    
    const data = await response.json()
    return data.channels || []
  } catch (error) {
    console.error('Error fetching channels:', error)
    return []
  }
}

// Find common following between two users
export function findCommonFollowing(user1Follows: number[], user2Follows: number[]): number[] {
  return user1Follows.filter(fid => user2Follows.includes(fid))
}

// Calculate social similarity score (0-100)
export function calculateSocialSimilarity(
  commonFollows: number,
  user1TotalFollows: number,
  user2TotalFollows: number
): number {
  if (user1TotalFollows === 0 || user2TotalFollows === 0) return 0
  
  const avgFollows = (user1TotalFollows + user2TotalFollows) / 2
  const similarityRatio = commonFollows / Math.min(avgFollows, 100) // Cap at 100
  
  return Math.min(Math.round(similarityRatio * 100), 100)
}

// Get wallet address from Farcaster user
export function getWalletFromUser(user: FarcasterUser): string | null {
  const ethAddresses = user.verified_addresses?.eth_addresses || []
  return ethAddresses[0] || null
}

// Search for similar users based on activity
export async function findSimilarUsers(fid: number, limit: number = 10): Promise<FarcasterUser[]> {
  // This would use OpenRank or similar APIs in production
  // For now, return empty array as fallback
  try {
    // TODO: Implement with OpenRank API or similar
    return []
  } catch (error) {
    console.error('Error finding similar users:', error)
    return []
  }
}

// Check if Neynar API is configured
export function isNeynarConfigured(): boolean {
  return NEYNAR_API_KEY !== '' && NEYNAR_API_KEY.length > 10
}
