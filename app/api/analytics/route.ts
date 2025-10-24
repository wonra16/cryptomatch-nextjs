import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { event, props, timestamp, userAgent } = body

    // Log analytics event (you can send to external service here)
    console.log('📊 Analytics Event:', {
      event,
      props,
      timestamp,
      userAgent: userAgent?.substring(0, 50),
    })

    // Example: Send to external analytics service
    // await fetch('https://your-analytics-service.com/events', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ event, props, timestamp })
    // })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Analytics API error:', error)
    return NextResponse.json(
      { error: 'Failed to track event' },
      { status: 500 }
    )
  }
}
