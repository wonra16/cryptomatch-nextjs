// Analytics tracking utility
// Tracks user interactions for product improvements

type EventName = 
  | 'app_opened'
  | 'celebrity_match_clicked'
  | 'vibe_check_clicked'
  | 'match_completed'
  | 'vibe_check_completed'
  | 'share_clicked'
  | 'error_occurred'

interface EventProps {
  [key: string]: string | number | boolean | undefined
}

class Analytics {
  private enabled: boolean = true

  constructor() {
    // Disable in development
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      this.enabled = false
    }
  }

  track(eventName: EventName, props?: EventProps) {
    if (!this.enabled) {
      console.log(`[Analytics] ${eventName}`, props)
      return
    }

    try {
      // Log to console for debugging
      console.log(`📊 [Analytics] ${eventName}`, props)

      // You can integrate with analytics services here:
      // - Google Analytics
      // - Mixpanel
      // - Amplitude
      // - PostHog
      // - etc.

      // Example: Google Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', eventName, props)
      }

      // Example: Custom analytics endpoint
      if (typeof window !== 'undefined') {
        fetch('/api/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: eventName,
            props,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
          })
        }).catch(err => console.error('Analytics error:', err))
      }
    } catch (error) {
      console.error('Analytics tracking error:', error)
    }
  }

  // Convenience methods
  trackPageView(page: string) {
    this.track('app_opened', { page })
  }

  trackCelebrityMatch(fid: number) {
    this.track('celebrity_match_clicked', { fid })
  }

  trackVibeCheck(fid: number) {
    this.track('vibe_check_clicked', { fid })
  }

  trackMatchCompleted(fid: number, celebrity: string, score: number) {
    this.track('match_completed', { fid, celebrity, score })
  }

  trackVibeCheckCompleted(fid: number, personalityType: string, vibeScore: number) {
    this.track('vibe_check_completed', { fid, personalityType, vibeScore })
  }

  trackShare(type: 'celebrity' | 'vibe', fid: number) {
    this.track('share_clicked', { type, fid })
  }

  trackError(error: string, context?: string) {
    this.track('error_occurred', { error, context })
  }
}

// Export singleton instance
export const analytics = new Analytics()

// Usage example:
// import { analytics } from '@/lib/analytics'
// analytics.trackCelebrityMatch(339972)
