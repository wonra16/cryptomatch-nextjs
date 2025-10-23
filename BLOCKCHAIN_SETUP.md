# 🚀 Gerçek Blockchain Verileri İçin Kurulum

## 📊 Portfolio Tracker - Gerçek Data

Şu an portfolio tracker **mock data** kullanıyor. Gerçek blockchain verilerini almak için:

---

## 🔑 ALCHEMY API KEY ALMA (ÜCRETSİZ!)

### Adım 1: Alchemy'ye Kaydol

1. https://www.alchemy.com/ 'a git
2. **Sign Up Free** tıkla
3. Email ile kayıt ol

### Adım 2: App Oluştur

1. Dashboard'a git
2. **Create new app**
3. Settings:
   - Name: `CryptoMatch`
   - Chain: **Ethereum**
   - Network: **Mainnet**
4. **Create app**

### Adım 3: API Key Al

1. App'e tıkla
2. **API Key** kopyala
3. `.env.local` dosyasına ekle:

```bash
ALCHEMY_API_KEY=your_api_key_here
```

### Adım 4: Vercel'de Ekle

1. Vercel Dashboard → Settings → Environment Variables
2. Add:
   ```
   Name: ALCHEMY_API_KEY
   Value: your_api_key_here
   ```
3. Save
4. Redeploy

---

## 💰 ÜCRETSİZ LİMİTLER

Alchemy Free Tier:
- ✅ 300M compute units/month
- ✅ Tüm temel API'ler
- ✅ Mainnet + testnet access
- ✅ Enhanced APIs
- ✅ Yeterli hobiler için!

---

## 🔮 GELECEKTEKİ İYİLEŞTİRMELER

### Phase 1 (Alchemy ile):
- [ ] Gerçek ETH balance
- [ ] ERC-20 token balances
- [ ] NFT holdings
- [ ] Transaction history

### Phase 2 (CoinGecko ile):
- [ ] Real-time token prices
- [ ] 24h change calculations
- [ ] Portfolio value tracking
- [ ] Historical charts

### Phase 3 (OpenAI ile):
- [ ] Personalized AI roasts
- [ ] Trading advice
- [ ] Risk analysis
- [ ] Funny insights

---

## 🛠️ ŞUAN NELER ÇALIŞIYOR?

### ✅ Çalışan:
- Wallet connection (RainbowKit)
- ETH balance display
- Mock portfolio analysis
- Funny pre-written roasts

### 🔄 Alchemy Eklenince:
- Real token balances
- Accurate portfolio value
- Multiple wallet support

### 💰 Paralı Eklenince:
- Real-time prices (CoinGecko API - Free tier var!)
- AI personalized roasts (OpenAI - $0.03/request)
- Advanced analytics

---

## 📞 YARDIM

Sorun mu var?
1. Alchemy dashboard'unu kontrol et
2. API key'i doğru kopyaladığından emin ol
3. Vercel'de environment variable'ı ekle
4. Redeploy yap

**Şimdilik mock data ile test edebilirsin! Gerçek data için Alchemy'yi sonra ekleyebilirsin.** 🚀
