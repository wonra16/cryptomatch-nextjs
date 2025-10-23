# 🚀 CryptoMatch V3.0 - AI-Powered Matching Platform

**Celebrity & User-to-User Matching with Portfolio & Content Analysis**

---

## ✨ Özellikler

### 🌟 Celebrity Matching
- **100+ Celebrity Database** - Crypto legends, müzisyenler, sporcular, sanatçılar
- **Portfolio Analysis** - 7 blockchain tarama (ETH, BSC, Polygon, Arbitrum, Optimism, Base, Avalanche)
- **Content Analysis** - Farcaster cast'lerinizi NLP ile analiz eder
- **Smart Scoring** - Portfolio (30p) + İçerik (25p) + Sosyal (20p) + NFT (15p) + Vibe (10p)

### 👥 User Matching (YENİ!)
- Benzer ilgi alanlarına sahip kullanıcıları bulur
- Ortak takip edilen hesapları analiz eder
- Portfolio benzerliğini karşılaştırır
- Social graph analizi

### 🤖 AI Features
- Otomatik ilgi alanı çıkarma (NLP)
- Sentiment analizi (pozitif/nötr/negatif)
- NFT koleksiyonu tespiti
- Crypto proje mention analizi
- 30+ ilgi kategorisi (DeFi, NFT, Gaming, Music, Sports, Art, vb.)

---

## 🔐 API GÜVENLİĞİ (ÖNEMLİ!)

### GitHub Private Yapmaya GEREK YOK! ✅

API key'lerinizi **Vercel Environment Variables** ile güvenli şekilde saklayın:

1. **Vercel Dashboard** → Settings → Environment Variables
2. Şu değişkenleri ekleyin:
   ```
   NEYNAR_API_KEY=your_actual_key_here
   ```
3. Tüm environment'lar için (Production, Preview, Development) ekleyin
4. Deploy edin!

**ASLA** `.env` dosyasını GitHub'a push etmeyin! (.gitignore zaten engelliyor)

---

## 📦 KURULUM

### 1. Projeyi Aç
```bash
cd cryptomatch-v3
```

### 2. Dependencies Yükle
```bash
npm install
```

### 3. Environment Variables (Lokal Test için)
```bash
# .env dosyası oluştur (opsiyonel - sadece lokal test için)
cp .env.example .env

# Düzenle:
NEYNAR_API_KEY=your_neynar_api_key_here
```

**Neynar API Key Al (ÜCRETSİZ):**
1. https://neynar.com adresine git
2. Kayıt ol
3. Dashboard'dan API key al
4. 200K compute units/ay ÜCRETSİZ! 🎉

### 4. Lokal Test (Opsiyonel)
```bash
npm run dev
# http://localhost:3000
```

### 5. GitHub'a Push
```bash
git init
git add .
git commit -m "Initial commit - CryptoMatch v3.0"
git branch -M main
git remote add origin https://github.com/KULLANICIADI/cryptomatch-v3.git
git push -u origin main
```

### 6. Vercel Deploy
1. https://vercel.com adresine git
2. "New Project" → GitHub repo'nu seç
3. **Environment Variables ekle:**
   - `NEYNAR_API_KEY` = your_key
4. Deploy!
5. 2 dakikada hazır! 🚀

---

## 🎯 KULLANIM

### Celebrity Matching:
1. "Find Celebrity Match" butonuna tıkla
2. AI senin:
   - Portfolio'nu analiz eder (7 blockchain)
   - Cast'lerini okur (son 25 cast)
   - İlgi alanlarını çıkarır
   - En uygun celebrity'yi bulur
3. Sonuç:
   - Match celebrity
   - Compatibility score (85-99%)
   - Why compatible
   - Personalized insights
   - Portfolio summary
   - Interest tags

### User Matching:
1. "Find Similar Users" butonuna tıkla
2. AI benzer kullanıcıları bulur:
   - Ortak ilgi alanları
   - Ortak takip edilenler
   - Portfolio benzerliği
3. Top 5 match gösterir
4. Warpcast'te bağlan!

---

## 🏗️ PROJE YAPISI

```
cryptomatch-v3/
├── app/
│   ├── api/
│   │   ├── match/
│   │   │   └── route.ts          # Celebrity matching API
│   │   └── user-match/
│   │       └── route.ts          # User matching API (YENİ!)
│   ├── layout.tsx
│   ├── page.tsx                  # Ana sayfa
│   └── globals.css
├── components/
│   ├── HomeScreen.tsx            # Ana ekran (güncellenmiş)
│   ├── LoadingScreen.tsx         # Loading animasyonu
│   ├── ResultScreen.tsx          # Celebrity match sonucu
│   └── UserMatchScreen.tsx       # User match sonucu (YENİ!)
├── lib/
│   ├── celebrities.ts            # 100+ celebrity database (YENİ!)
│   ├── neynar.ts                 # Farcaster API (YENİ!)
│   ├── content-analysis.ts       # NLP & ilgi alanı (YENİ!)
│   └── blockchain.ts             # Portfolio analizi
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.js
├── .gitignore
├── .env.example
└── README.md
```

---

## 🔧 TEKNOLOJİLER

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Farcaster Frame SDK** - Farcaster integration
- **Neynar API** - Farcaster data (ÜCRETSİZ 200K/ay)
- **dRPC** - Blockchain RPC (ÜCRETSİZ)
- **CoinGecko API** - Crypto fiyatları (ÜCRETSİZ)

**TOPLAM MALIYET: $0/ay** 🎉

---

## 🎨 100+ CELEBRITY DATABASE

### Kategoriler:
- **Crypto**: Vitalik, CZ, Hayden, Balaji, Andre, Stani, Jesse, Dankrad, Cobie, Ryan, David, Nic, Andreas, Laura, Raoul, Justin, CZ Binance, Tim Draper, Mike Novogratz, Winklevoss Twins
- **Tech**: Elon Musk, Jack Dorsey, Sam Altman, Naval
- **Music**: Steve Aoki, Snoop Dogg, Deadmau5, Grimes
- **Sports**: Tom Brady, Serena Williams, Odell Beckham Jr, Messi
- **Art**: Beeple, Pak, XCOPY, FEWOCiOUS
- **Business**: Cathie Wood, Mark Cuban, Chamath, Gary Vee, Logan Paul, MrBeast, Paris Hilton, Meltem
- **Gaming**: Kieran Warwick, Yat Siu
- **ve daha fazlası...**

---

## 🧠 AKILLI SKORLAMA SİSTEMİ

### Portfolio Score (30 puan):
- ETH tutma: +8
- WBTC tutma: +8
- L2 kullanımı: +7
- DeFi tokens: +8
- Multi-chain (3+): +8
- Portfolio > $10K: +5

### Content Score (25 puan):
- Ortak ilgi alanları: +5 per topic
- NFT mention'ları: +10
- Crypto project mention: +3 per project
- Pozitif sentiment: +5
- Kategori uyumu: +5

### Social Score (20 puan):
- Ortak takip edilenler
- Channel membership
- Engagement patterns

### NFT Score (15 puan):
- NFT koleksiyonu sahipliği
- NFT mention'ları
- Art interest

### Vibe Score (10 puan):
- Sentiment analizi
- Posting frequency
- Community engagement
- FID-based variety

**TOPLAM: 100 puan**

---

## 📊 İLGİ KATEGORİLERİ (30+)

### Crypto & Tech:
- defi, nft, gaming, ai, blockchain

### Lifestyle:
- fitness, food, travel, photography, music

### Hobbies:
- reading, sports, nature, art, fishing

### Professional:
- entrepreneurship, investing, technology, design

### Social:
- memes, community, learning

### Specific:
- anime, cars, fashion, pets

---

## 🐛 SORUN GİDERME

### "Portfolio based: false"?
- Kullanıcının verified wallet yok
- Fallback: Content-based match

### Match çok uzun sürüyor?
- Normal: 2-3 saniye
- Portfolio analizi: +2 saniye
- Content analizi: +1 saniye

### "User matching requires Neynar API key"?
- Neynar API key eksik
- Vercel'de Environment Variable ekle

### Celebrity hep aynı?
- Normal değil!
- Portfolio + Content farklıysa = farklı match

---

## 🔮 GELECEK ÖZELLİKLER (Planlanan)

- [ ] OpenRank entegrasyonu (gerçek user matching)
- [ ] NFT koleksiyonu analizi
- [ ] Advanced social graph
- [ ] Match history
- [ ] Friend suggestions
- [ ] Group matching
- [ ] Channel-based matching
- [ ] Custom celebrity ekleme

---

## 💡 İPUÇLARI

### Daha İyi Match için:
1. **Cast at!** - Daha fazla cast = daha iyi analiz
2. **İlgi alanlarını paylaş** - NFT, DeFi, müzik, spor vb.
3. **Wallet verify et** - Portfolio analizi için
4. **Channel'lara katıl** - Sosyal skor için
5. **Takip et!** - Ortak takip = daha iyi user match

### API Key Güvenliği:
- ✅ Vercel Environment Variables kullan
- ✅ .gitignore zaten .env'i engelliyor
- ❌ ASLA API key'i koda yapıştırma
- ❌ ASLA .env'i GitHub'a push etme

---

## 📞 DESTEK

Sorular için:
- GitHub Issues
- Farcaster: @yourhandle
- Twitter: @yourhandle

---

## 📄 LİSANS

MIT License - Kullanmakta özgürsünüz!

---

## 🎉 TEŞEKKÜRLER

- **Neynar** - Farcaster API
- **Farcaster** - Protocol
- **dRPC** - Blockchain RPC
- **CoinGecko** - Price data
- **Vercel** - Hosting

---

**Made with 💜 for Farcaster**

**V3.0 - AI-Powered Matching** 🚀

## 🔥 ÖZELLİKLER ÖZET

| Özellik | V2.0 | V3.0 |
|---------|------|------|
| Celebrity Count | 15 | 100+ |
| Portfolio Analysis | ✅ | ✅ |
| Content Analysis | ❌ | ✅ NLP |
| User Matching | ❌ | ✅ |
| Interest Categories | ❌ | 30+ |
| Sentiment Analysis | ❌ | ✅ |
| NFT Detection | ❌ | ✅ |
| Social Graph | ❌ | ✅ |

---

**Uçmaya hazır! 🚀**
