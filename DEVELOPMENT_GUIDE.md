# 🚀 CryptoMatch - Professional Development Guide

## 📚 İÇİNDEKİLER

1. [Proje Özeti](#proje-özeti)
2. [Teknik Mimari](#teknik-mimari)
3. [Özellikler](#özellikler)
4. [Kurulum](#kurulum)
5. [Deployment](#deployment)
6. [Sorun Giderme](#sorun-giderme)
7. [Gelecek Özellikler](#gelecek-özellikler)
8. [AI Prompts](#ai-prompts)

---

## 🎯 PROJE ÖZETİ

**CryptoMatch**, Farcaster Mini App olarak geliştirilen, kullanıcıları ünlü kripto kişilikleri ile eşleştiren AI destekli bir eşleştirme uygulamasıdır.

### Ana Özellikler:
- ✅ Ünlü kripto kişilikleri ile eşleşme
- ✅ Profesyonel glassmorphism UI
- ✅ Cüzdan bağlantısı (RainbowKit)
- ✅ Portfolio takip sistemi
- ✅ AI ile komik analiz raporları
- ✅ Farcaster SDK entegrasyonu
- ✅ Share fonksiyonalitesi

---

## 🏗️ TEKNİK MİMARİ

### Frontend Stack:
- **Next.js 14** - React framework (App Router)
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **@farcaster/frame-sdk** - Farcaster Mini App SDK
- **@rainbow-me/rainbowkit** - Wallet connection
- **wagmi** - Ethereum hooks
- **viem** - Ethereum library

### Backend APIs:
- **Next.js API Routes** - Serverless functions
- **Match Algorithm** - Celebrity matching logic
- **Portfolio Analyzer** - Wallet scanning & AI roasting

### Deployment:
- **Vercel** - Hosting & CI/CD
- **GitHub** - Version control

---

## ✨ ÖZELLİKLER

### 1. Celebrity Matching System

**Nasıl Çalışır:**
1. Kullanıcının FID'si alınır
2. FID % 8 → Hangi ünlü ile eşleşeceği belirlenir
3. Avatar fetch edilir (CORS proxy ile)
4. Personalized insight generate edilir
5. Compatibility score (ünlüye özel range)

**Ünlüler:**
- Elon Musk 🚀
- Vitalik Buterin 🦄
- CZ 💰
- Michael Saylor 💎
- Cathie Wood 📈
- Satoshi Nakamoto 👻
- SBF ⚠️ (kötü match)
- Andreas Antonopoulos 🎓

### 2. Wallet Connection

**Kullanılan Teknoloji:** RainbowKit + wagmi

**Desteklenen Cüzdanlar:**
- MetaMask
- Coinbase Wallet
- Rainbow
- WalletConnect (tüm cüzdanlar)
- Farcaster custody wallet

**Güvenlik:**
- ✅ READ-ONLY erişim
- ✅ Hiçbir transaction izni yok
- ✅ Sadece bakiye okuma
- ✅ Kullanıcı onayı gerekli

### 3. Portfolio Tracker

**Özellikler:**
- Wallet bağlantısı
- Token bakiye okuma
- Portfolio value hesaplama
- AI komik analiz
- Daily reports (gelecek)

**AI Roasting:**
Kullanıcının portföyüne göre komik yorumlar:
- "Diamond hands or just forgot password?"
- "Your strategy: Buy high, panic sell low!"
- "Collecting shitcoins like Pokemon cards!"

---

## 📦 KURULUM

### 1. Proje Klonlama

\`\`\`bash
git clone https://github.com/wonra16/cryptomatch-nextjs.git
cd cryptomatch-nextjs
\`\`\`

### 2. Dependencies

\`\`\`bash
npm install
# veya
yarn install
\`\`\`

### 3. Environment Variables

\`.env.local\` oluştur:

\`\`\`env
NEXT_PUBLIC_URL=http://localhost:3000
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=get_from_walletconnect_cloud
\`\`\`

**WalletConnect Project ID Alma:**
1. https://cloud.walletconnect.com 'a git
2. "Create Project" tıkla
3. Project ID'yi kopyala
4. .env.local'e yapıştır

### 4. Development Server

\`\`\`bash
npm run dev
\`\`\`

http://localhost:3000 'da çalışacak.

---

## 🚀 DEPLOYMENT

### Vercel'e Deploy

1. **GitHub'a Push:**
\`\`\`bash
git add .
git commit -m "Initial commit"
git push origin main
\`\`\`

2. **Vercel'de Import:**
- https://vercel.com → New Project
- GitHub repo seç
- Import

3. **Environment Variables:**
\`\`\`
NEXT_PUBLIC_URL = https://cryptomatch-nextjs.vercel.app
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID = <your_project_id>
\`\`\`

4. **Deploy!**

5. **Farcaster Manifest Güncelle:**
- https://farcaster.xyz/~/developers/mini-apps/manifest
- Domain: cryptomatch-nextjs.vercel.app
- "Generate account association" → Sign
- Manifest'i güncelle

---

## 🐛 SORUN GİDERME

### Problem 1: Avatar Yüklenmiyor

**Sebep:** CORS policy

**Çözüm:**
- `/api/avatar-proxy` endpoint'i kullanılıyor
- Fallback olarak DiceBear avatarları var
- Gerçek üretimde CDN kullan

### Problem 2: Wallet Bağlanmıyor

**Sebep:** WalletConnect Project ID eksik

**Çözüm:**
1. https://cloud.walletconnect.com
2. Project oluştur
3. ID'yi .env.local'e ekle
4. Server'ı restart et

### Problem 3: SDK Ready() Çalışmıyor

**Sebep:** Farcaster SDK doğru initialize edilmemiş

**Çözüm:**
\`\`\`typescript
useEffect(() => {
  const init = async () => {
    const ctx = await sdk.context
    sdk.actions.ready() // CRITICAL!
    setContext(ctx)
  }
  init()
}, [])
\`\`\`

### Problem 4: Share Butonu Çalışmıyor

**Sebep:** URL encoding problemi

**Çözüm:**
\`\`\`typescript
sdk.actions.openUrl(
  \`https://warpcast.com/~/compose?text=\${encodeURIComponent(text)}&embeds[]=\${encodeURIComponent(url)}\`
)
\`\`\`

---

## 🔮 GELECEK ÖZELLİKLER

### Phase 1 (Şu An):
- [x] Celebrity matching
- [x] Glassmorphism UI
- [x] Wallet connection
- [x] Basic portfolio tracker
- [x] AI roasting

### Phase 2 (Yakında):
- [ ] Real blockchain data (Alchemy/Moralis)
- [ ] Token price tracking (CoinGecko API)
- [ ] Historical charts (Recharts)
- [ ] Daily push notifications
- [ ] OpenAI GPT-4 personalized roasts

### Phase 3 (Gelecek):
- [ ] Exchange API integration (Binance, Coinbase)
- [ ] Multi-wallet support
- [ ] Portfolio leaderboard
- [ ] Social features (compare with friends)
- [ ] Trading suggestions
- [ ] NFT portfolio tracking

---

## 🤖 AI PROMPTS

### Logo Tasarım Promptları (Midjourney/DALL-E)

**App Icon (200x200):**
\`\`\`
A modern, minimal app icon for a crypto dating app called "CryptoMatch". 
Purple gradient background, gold heart symbol made of blockchain nodes, 
glassmorphism effect, professional, clean, iOS style, 3D render
\`\`\`

**Preview Image (1200x630):**
\`\`\`
Social media preview image for CryptoMatch app. Two people's silhouettes 
facing each other with crypto symbols floating between them, purple and 
gold gradient, modern UI, hearts and blockchain elements, professional 
marketing material, wide format
\`\`\`

**Splash Screen (1000x1000):**
\`\`\`
Loading screen for crypto matchmaking app. Animated heart made of golden 
particles, purple gradient background, glassmorphism, modern, clean, 
premium feel, mobile app splash screen
\`\`\`

### UI Component Promptları

**Celebrity Cards:**
\`\`\`
Design a glassmorphism card component for showing crypto celebrity matches. 
Include: circular avatar with glow effect, name, compatibility percentage 
badge, traits list with pill-shaped elements, all with purple-to-pink 
gradient background
\`\`\`

**Portfolio Dashboard:**
\`\`\`
Modern crypto portfolio dashboard UI. Dark theme with neon accents, 
glassmorphism cards, token balance list, performance chart, AI analysis 
section with funny roast text, purple and gold color scheme
\`\`\`

### AI Roast Generation Prompt (GPT-4)

\`\`\`
You are a witty crypto trader analyst with a sense of humor. 
Analyze this portfolio and create a funny but insightful roast:

Portfolio: {tokens_list}
Total Value: ${total_value}
24h Change: {change_percent}%

Rules:
- Be funny and slightly sarcastic
- Reference crypto culture (HODL, diamond hands, etc.)
- Keep it under 100 words
- End with an emoji
- Don't be too mean, keep it light-hearted
\`\`\`

---

## 📖 DEVELOPMENT BEST PRACTICES

### Code Style:
- **TypeScript strict mode**
- **Component-based architecture**
- **Error boundary implementation**
- **Loading states everywhere**
- **Responsive design (mobile-first)**

### Performance:
- **Image optimization** (Next.js Image)
- **Code splitting** (dynamic imports)
- **API caching** (SWR/React Query)
- **Lazy loading** (React.lazy)

### Security:
- **Never store private keys**
- **Read-only wallet access**
- **Input sanitization**
- **Rate limiting** (API routes)
- **CORS configuration**

---

## 🎨 DESIGN SYSTEM

### Colors:
\`\`\`css
--primary: #667eea (Purple)
--secondary: #764ba2 (Dark Purple)
--accent: #FFD93D (Gold)
--gradient: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)
\`\`\`

### Typography:
- **Headings:** font-black (900)
- **Body:** font-medium (500)
- **Captions:** font-normal (400)

### Spacing:
- **Small:** 0.5rem (8px)
- **Medium:** 1rem (16px)
- **Large:** 2rem (32px)
- **XL:** 3rem (48px)

### Border Radius:
- **Small:** 0.75rem (12px)
- **Medium:** 1rem (16px)
- **Large:** 1.5rem (24px)
- **XL:** 2rem (32px)

---

## 📞 DESTEK

### Sorun mu yaşıyorsun?

1. **GitHub Issues:** https://github.com/wonra16/cryptomatch-nextjs/issues
2. **Farcaster:** @wonra16
3. **Documentation:** https://miniapps.farcaster.xyz

---

## 📄 LİSANS

MIT License - Commercial use allowed

---

## 🙏 TEŞEKKÜRLER

Built with 💜 by [@wonra16](https://warpcast.com/wonra16) for the Farcaster community!

Special thanks to:
- Farcaster team for the Mini App SDK
- RainbowKit for wallet connections
- Vercel for hosting
- The crypto community for inspiration
