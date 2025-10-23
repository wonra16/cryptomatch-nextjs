import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const { fid } = await request.json()

    if (!fid) {
      return NextResponse.json({ success: false, error: 'FID required' }, { status: 400 })
    }

    console.log('🔍 Fetching wallet for FID:', fid)

    // Fetch from Neynar API
    const neynarKey = process.env.NEYNAR_API_KEY
    
    if (!neynarKey) {
      console.error('❌ Neynar API key not configured')
      return NextResponse.json({ success: false, wallet: null })
    }

    const neynarRes = await fetch(
      `https://api.neynar.com/v2/farcaster/user/bulk?fids=${fid}`,
      {
        headers: {
          'accept': 'application/json',
          'x-api-key': neynarKey
        }
      }
    )

    if (!neynarRes.ok) {
      console.error('❌ Neynar API error:', neynarRes.status, neynarRes.statusText)
      return NextResponse.json({ success: false, wallet: null })
    }

    const neynarData = await neynarRes.json()
    const user = neynarData.users?.[0]

    if (!user) {
      console.error('❌ User not found')
      return NextResponse.json({ success: false, wallet: null })
    }

    console.log('📦 Neynar user fetched:', user.username)
    console.log('🔍 custody_address:', user.custody_address)
    console.log('🔍 verified_addresses:', JSON.stringify(user.verified_addresses, null, 2))

    // Extract ALL wallets - not just primary!
    const ethWallets = user.verified_addresses?.eth_addresses || []
    const solWallets = user.verified_addresses?.sol_addresses || []
    const custodyWallet = user.custody_address
    
    // Combine all Ethereum wallets (verified + custody)
    const allEthWallets = [...new Set([
      ...ethWallets,
      ...(custodyWallet ? [custodyWallet] : [])
    ])]
    
    // Primary wallet (for backward compatibility)
    const primaryWallet = allEthWallets[0] || null
    
    console.log('💰 ALL ETH wallets:', allEthWallets)
    console.log('💰 ALL SOL wallets:', solWallets)
    console.log('💰 Primary wallet:', primaryWallet)

    return NextResponse.json({
      success: true,
      wallet: primaryWallet,  // Primary for backward compatibility
      wallets: {
        eth: allEthWallets,
        sol: solWallets,
        primary: primaryWallet
      },
      user: {
        fid: user.fid,
        username: user.username,
        pfp_url: user.pfp_url,
        display_name: user.display_name
      }
    })

  } catch (error) {
    console.error('❌ get-wallet API error:', error)
    return NextResponse.json(
      { success: false, wallet: null, error: 'Internal error' },
      { status: 500 }
    )
  }
}
