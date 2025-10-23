import { NextRequest, NextResponse } from 'next/server'

const funnyRoasts = [
  "Your portfolio is like a rollercoaster - exciting but makes you want to throw up! 🎢😵",
  "You're basically a professional HODLer at this point. Diamond hands or just forgot your password? 💎🙌",
  "Your crypto strategy: Buy high, panic sell low, repeat. Classic! 📉😅",
  "I see you're collecting shitcoins like Pokemon cards. Gotta catch 'em all! 🃏💩",
  "Your portfolio diversification is like a buffet - a little bit of everything, mostly junk! 🍔🍕",
  "You bought the top, didn't you? Don't worry, we've all been there! 📈❌",
  "Your investment strategy: Follow CT influencers blindly. Bold move! 🐑💸",
  "I see you're a degen trader. Leverage is your middle name! ⚡💥",
  "Your portfolio looks like you let a monkey pick your coins. Surprisingly effective! 🐒🎯",
  "You're either a genius or completely insane. Only time will tell! 🤔🚀"
]

interface AnalyzeRequest {
  address: string
}

// Alchemy API kullanarak gerçek token balance'ları al
async function getRealTokenBalances(address: string) {
  try {
    // Alchemy API key varsa gerçek data çek
    const alchemyKey = process.env.ALCHEMY_API_KEY
    
    if (!alchemyKey) {
      console.log('No Alchemy API key, using mock data')
      return null
    }

    const response = await fetch(
      `https://eth-mainnet.g.alchemy.com/v2/${alchemyKey}/getTokenBalances`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'alchemy_getTokenBalances',
          params: [address],
          id: 1,
        }),
      }
    )

    const data = await response.json()
    return data.result
  } catch (error) {
    console.error('Failed to fetch real balances:', error)
    return null
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: AnalyzeRequest = await request.json()
    const { address } = body

    if (!address) {
      return NextResponse.json({ error: 'Address is required' }, { status: 400 })
    }

    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Try to get real balances
    const realBalances = await getRealTokenBalances(address)

    // Generate roast
    const roastIndex = Math.abs(parseInt(address.slice(-2), 16) % funnyRoasts.length)
    
    // If we have real balances, calculate actual value
    let totalValue = '0.00'
    let tokens = []
    
    if (realBalances && realBalances.tokenBalances) {
      // Calculate real portfolio value
      // Note: Bu gerçek fiyat verileri gerektirir (CoinGecko API gibi)
      totalValue = 'Calculating...'
      tokens = realBalances.tokenBalances.slice(0, 5).map((token: any) => ({
        symbol: 'TOKEN',
        balance: parseInt(token.tokenBalance || '0', 16).toString(),
        value: 'N/A'
      }))
    } else {
      // Mock data (şu anki)
      totalValue = (Math.random() * 10000 + 100).toFixed(2)
      tokens = [
        { symbol: 'ETH', balance: '0.15', value: '$300' },
        { symbol: 'USDC', balance: '500', value: '$500' },
      ]
    }

    const change24h = (Math.random() * 40 - 20).toFixed(2)
    
    return NextResponse.json({
      success: true,
      address,
      total_value: totalValue,
      change_24h: parseFloat(change24h),
      ai_roast: funnyRoasts[roastIndex],
      tokens,
      analyzed_at: new Date().toISOString(),
      using_real_data: !!realBalances,
      note: !realBalances ? 'Mock data - Add ALCHEMY_API_KEY for real balances' : undefined
    })

  } catch (error) {
    console.error('Portfolio analysis error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to analyze portfolio' },
      { status: 500 }
    )
  }
}
