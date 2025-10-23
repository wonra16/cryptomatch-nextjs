# 🎯 CryptoMatch V3.0 - VIBE CHECK Edition!

**AI-Powered Farcaster Personality Analyzer + Celebrity Matching**

## 🔥 NEW FEATURE: VIBE CHECK!

Discover your Farcaster personality with AI-powered analysis!

### What's Vibe Check?
- 🎯 **Analyzes your last 25 casts**
- 🤖 **AI determines your personality type**
- 📊 **Calculates your vibe score (0-100)**
- 🔥 **Gives you a funny AI roast**
- 📤 **Shareable results card**

### Personality Types:
- 🎲 **The Degen** - You live for the thrill!
- 🔨 **The Builder** - Shipping and creating!
- 💩 **The Shitposter** - Comedy gold!
- 🧠 **The Philosopher** - Deep thoughts only!
- 🤝 **The Community Builder** - Bringing people together!
- 🎨 **The Artist** - Pure creative energy!

---

## ✨ Features

### 1. Celebrity Match 🌟
- AI analyzes your Farcaster posts
- Matches you with 100+ celebrities
- Shows compatibility score & reasons
- Optional wallet integration for deeper insights

### 2. Vibe Check 🎯 **[NEW!]**
- Personality type detection
- Vibe score calculation
- Top interests extraction
- AI-generated roast
- Activity stats analysis
- Shareable results

---

## 🚀 Quick Start

### Deploy to Vercel:
```bash
git clone [your-repo]
cd cryptomatch-v3
vercel deploy
```

### Set Environment Variables:
```
NEYNAR_API_KEY=your_neynar_key
ALCHEMY_API_KEY=your_alchemy_key (optional)
```

### Test:
1. Open in Warpcast
2. Try "Find Celebrity Match" 🌟
3. Try "Farcaster Vibe Check" 🎯 **[NEW!]**

---

## 📖 How It Works

### Celebrity Match Flow:
1. User clicks "Find Celebrity Match"
2. Optional: Add wallet for portfolio analysis
3. AI analyzes Farcaster casts
4. Matches with celebrities based on interests
5. Shows compatibility score & reasons

### Vibe Check Flow: **[NEW!]**
1. User clicks "Farcaster Vibe Check"
2. Fetches last 25 casts
3. AI analyzes content & personality
4. Calculates vibe score (0-100)
5. Determines personality type
6. Generates funny AI roast
7. Shows shareable results card

---

## 🎨 Tech Stack

- **Framework**: Next.js 14 + TypeScript
- **Styling**: Tailwind CSS
- **Farcaster**: Frame SDK + Neynar API
- **Blockchain**: Alchemy API (optional)
- **AI**: Custom personality analysis algorithms

---

## 📊 Vibe Check Algorithm

```javascript
// Personality Detection
- Analyzes keyword frequency
- Matches against 6 personality types
- Returns best match

// Vibe Score Calculation (0-100)
- Base score: 50
- Activity bonus: +20
- Engagement bonus: +15
- Recency bonus: +10
- Variety bonus: +5

// AI Roast Generation
- Personality-specific roasts
- Score-based commentary
- Funny & engaging
```

---

## 🎯 API Endpoints

### POST /api/match
Celebrity matching endpoint
```json
{
  "fid": 339972,
  "username": "wonra16",
  "walletAddress": "0x..." // optional
}
```

### POST /api/vibe-check **[NEW!]**
Vibe check endpoint
```json
{
  "fid": 339972
}
```

Response:
```json
{
  "success": true,
  "result": {
    "username": "wonra16",
    "vibeScore": 85,
    "personalityType": {
      "type": "The Builder 🔨",
      "emoji": "🔨",
      "description": "..."
    },
    "topInterests": ["Crypto", "Building", "AI"],
    "roast": "...",
    "stats": {
      "totalCasts": 25,
      "avgCastLength": 120,
      "mostActiveHour": "14:00"
    }
  }
}
```

---

## 🔥 What's Changed

- ❌ Removed: User Matching (too complex)
- ❌ Removed: Portfolio Analysis (rate limiting)
- ✅ Kept: Celebrity Match (works perfectly!)
- ✅ Added: Vibe Check (viral potential!)

---

## 💡 Why Vibe Check?

1. **Simple**: Just needs FID, no wallet required
2. **Fast**: Analyzes 25 casts in seconds
3. **Fun**: Personality types + AI roasts
4. **Shareable**: Users love sharing results
5. **Viral**: "Wrapped" style content performs well
6. **Unique**: Nobody else has this on Farcaster!

---

## 📈 Expected Engagement

### Celebrity Match:
- Proven feature
- High completion rate
- Users love celebrity comparisons

### Vibe Check: **[NEW!]**
- Viral potential (Spotify Wrapped style)
- Easy to share
- Encourages repeat usage
- Community engagement

---

## 🎊 Credits

**Made with 💜 by wonra16**

Special thanks to:
- Farcaster team for amazing APIs
- Neynar for reliable data
- The crypto community for inspiration

---

## 📝 License

MIT License - Feel free to fork and customize!

---

## 🚀 Roadmap

- [x] Celebrity matching
- [x] Vibe Check personality analyzer
- [ ] Leaderboard (top vibes)
- [ ] Historical vibe tracking
- [ ] Vibe comparison with friends
- [ ] Custom personality types

---

**CryptoMatch V3.0 - Discover Your Vibe! 🎯**

*Celebrity Matching + Personality Analysis = Perfect Combination!*

**Deploy Now → Watch It Go Viral!** 🚀🔥💎
