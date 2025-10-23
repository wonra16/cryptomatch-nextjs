# 🔐 API KEYS KURULUM TALIMATI

## ⚠️ ÖNEMLİ: API Keys Olmadan Uygulama ÇALIŞMAZ!

Celebrity match ve user match için **2 API key** gerekli:

---

## 1️⃣ NEYNAR API KEY (ZORUNLU)

### Ne İçin?
- ✅ Farcaster profile bilgisi
- ✅ User casts (content analysis)
- ✅ Following list
- ✅ User matching

### Nasıl Alınır?

**Adım 1:** https://neynar.com adresine git

**Adım 2:** "Sign Up" veya "Login" ile giriş yap

**Adım 3:** Dashboard → API Keys

**Adım 4:** "Create API Key" butonuna tıkla

**Adım 5:** Key'i kopyala (örnek: `NEYNAR_API_DOCS_...`)

**Adım 6:** Vercel'de ekle:
```
Vercel Dashboard → Your Project
→ Settings → Environment Variables
→ Add New

Name: NEYNAR_API_KEY
Value: [senin key'in]
→ Save
```

### Ücretsiz Limit:
- **200M CU (Compute Units) / ay**
- **30K user match** yapabilirsin

---

## 2️⃣ ALCHEMY API KEY (ZORUNLU)

### Ne İçin?
- ✅ NFT detection (BAYC, Punks, Azuki...)
- ✅ Portfolio analysis
- ✅ Token balances
- ✅ Multi-chain support

### Nasıl Alınır?

**Adım 1:** https://alchemy.com adresine git

**Adım 2:** "Sign Up" ile hesap oluştur

**Adım 3:** Dashboard → "+ Create new app"

**Adım 4:** Settings:
```
Chain: Ethereum
Network: Mainnet
Name: CryptoMatch
```

**Adım 5:** "Create app" → API Key'i kopyala

⚠️ **ÖNEMLİ:** Yeni bir key oluştur!  
**ESKİ KEY KULLANMA:** `rOPxQfljblmblEek_lJO2`

**Adım 6:** Vercel'de ekle:
```
Vercel Dashboard → Your Project
→ Settings → Environment Variables
→ Add New

Name: ALCHEMY_API_KEY
Value: [senin key'in]
→ Save
```

### Ücretsiz Limit:
- **300M CU / ay**
- **500K kullanıcı/gün** yapabilirsin

---

## ✅ KONTROL ET

### Local Test:
```bash
# .env dosyası oluştur
cp .env.example .env

# API keys ekle
NEYNAR_API_KEY=your_neynar_key_here
ALCHEMY_API_KEY=your_alchemy_key_here

# Test et
npm run dev

# Browser console'da kontrol et:
# 📊 API Status: { neynar: true, alchemy: true }
```

### Vercel Test:
```
1. Vercel Dashboard → Your Project
2. Settings → Environment Variables
3. İki key'i de kontrol et:
   ✅ NEYNAR_API_KEY
   ✅ ALCHEMY_API_KEY

4. Deployments → Redeploy
5. Logs'da kontrol et:
   📊 API Status: { neynar: true, alchemy: true }
```

---

## 🚨 HATA GİDERME

### "No matches found yet!"
**Sebep:** API keys yok veya yanlış

**Çözüm:**
1. Vercel Environment Variables kontrol et
2. Key'leri doğru kopyaladığından emin ol
3. Redeploy yap
4. Logs'da `API Status` kontrol et

### "Match failed" / "User match failed"
**Sebep:** API rate limit aşıldı veya key geçersiz

**Çözüm:**
1. Neynar dashboard → Usage kontrol et
2. Alchemy dashboard → Usage kontrol et
3. Yeni key oluştur
4. Vercel'de güncelle

### Celebrity match çalışıyor ama User match çalışmıyor
**Sebep:** Kullanıcının followingi az

**Çözüm:**
- Daha fazla kişi takip et Farcaster'da
- En az 20+ following olmalı

---

## 💡 İPUÇLARI

### API Key Güvenliği:
- ❌ GitHub'a commit etme
- ❌ Frontend'de kullanma
- ✅ Sadece Vercel Environment Variables'da tut
- ✅ `.env` dosyasını `.gitignore`'a ekle

### Maliyet Optimizasyonu:
- Neynar ve Alchemy free tier **geniş**
- 500K kullanıcı/gün → Hala ücretsiz
- Cache kullan (10 dakika)
- Rate limiting ekle

### Monitoring:
- Neynar dashboard → Usage graphs
- Alchemy dashboard → Analytics
- Vercel logs → API çağrıları

---

## 📊 EXPECTED LOGS

### Başarılı API Call:
```
🔍 Match API called for FID: 12345
📊 API Status: { neynar: true, alchemy: true }
✅ Content analysis: { topics: [...] }
✅ NFT Analysis: { total: 5, collections: 2 }
✅ Final match: Vitalik Buterin
```

### API Keys Eksik:
```
🔍 Match API called for FID: 12345
📊 API Status: { neynar: false, alchemy: false }
⚠️ Neynar API not configured - content analysis will be skipped
⚠️ Alchemy API not configured - NFT analysis will be skipped
⚠️ Match based on random selection
```

---

## 🎯 ÖZET

### Gerekli Keys:
1. **NEYNAR_API_KEY** → User data
2. **ALCHEMY_API_KEY** → NFT & Portfolio

### Nereden:
1. https://neynar.com → Create API Key
2. https://alchemy.com → Create App → Copy API Key

### Nereye:
```
Vercel → Settings → Environment Variables
```

### Test:
```
Vercel Logs → 📊 API Status: { neynar: true, alchemy: true }
```

---

**Her iki key de olmadan uygulama düzgün çalışmaz!** 🔐

**Celebrity match için:** Neynar + Alchemy gerekli  
**User match için:** Neynar gerekli

---

**Made with 💜 by Claude**
