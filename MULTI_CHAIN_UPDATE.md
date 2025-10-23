# 🚀 CryptoMatch - Multi-Chain Wallet Tracker

## ⚡ YENİ ÖZELLİKLER - 100% ÜCRETSİZ!

### 🌐 Multi-Chain Desteği
Artık sadece Ethereum değil, **7 farklı blockchain**'de cüzdan analizi yapabilirsiniz:

- ✅ **Ethereum** Mainnet
- ✅ **Binance Smart Chain** (BSC)
- ✅ **Polygon** (MATIC)
- ✅ **Arbitrum**
- ✅ **Optimism**
- ✅ **Base**
- ✅ **Avalanche** (AVAX)

### 💎 Token Tracking
Her chain'de popüler tokenlerinizi otomatik tespit eder:
- USDT, USDC, DAI (Stablecoin'ler)
- WBTC, WETH (Wrapped coinler)
- LINK, UNI, MATIC ve daha fazlası!

### 💰 Real-time Fiyatlar
CoinGecko ücretsiz API ile gerçek zamanlı fiyat bilgisi:
- Native coin fiyatları (ETH, BNB, MATIC, AVAX)
- Token fiyatları (BTC, LINK, UNI vb.)
- USD bazlı değerleme

## 🎯 Kullanılan Ücretsiz API'ler

### 1. dRPC - Multi-chain RPC Nodes
- **Maliyet**: 100% ÜCRETSİZ
- **Limit**: YOK!
- **Özellikler**:
  - 7 blockchain için native balance
  - ERC20 token balance okuma
  - API key gerektirmez
  - Rate limit yok

**Endpoint'ler**:
```
Ethereum: https://eth.drpc.org
BSC: https://bsc-dataseed.binance.org
Polygon: https://polygon-rpc.com
Arbitrum: https://arb1.arbitrum.io/rpc
Optimism: https://mainnet.optimism.io
Base: https://mainnet.base.org
Avalanche: https://api.avax.network/ext/bc/C/rpc
```

### 2. CoinGecko Free API
- **Maliyet**: 100% ÜCRETSİZ
- **Limit**: 30 calls/dakika, 10,000/ay
- **Özellikler**:
  - Real-time crypto fiyatları
  - 19,000+ coin desteği
  - API key gerektirmez

**Endpoint**:
```
https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd
```

### 3. The Graph Token API (Beta)
- **Maliyet**: Beta'da ÜCRETSİZ
- **Özellikler**:
  - Token balances
  - Transfer history
  - Holder leaderboards
  - Multi-chain support

## 📦 Kurulum

### 1. Projeyi Klonla (veya zip'i aç)
```bash
# Eğer git kullanıyorsan
git clone <repo-url>
cd cryptomatch-nextjs

# Veya zip dosyasını aç ve klasöre gir
cd cryptomatch-nextjs
```

### 2. Dependencies Yükle
```bash
npm install
# veya
yarn install
# veya
pnpm install
```

### 3. Environment Variables (Opsiyonel)
`.env.local` dosyası zaten var, sadece Vercel URL'ini güncelle:
```env
NEXT_PUBLIC_URL=https://senin-vercel-urlin.vercel.app
```

### 4. Local Development
```bash
npm run dev
```
Tarayıcıda aç: `http://localhost:3000`

## 🚀 Vercel'e Deploy

### PowerShell ile Deploy:

```powershell
# 1. Git'e ekle ve commit et
git add .
git commit -m "Added multi-chain wallet tracking"

# 2. GitHub'a push et
git push origin main
# veya
git push origin master
```

### Vercel Otomatik Deploy:
1. Vercel dashboard'unda proje otomatik deploy olacak
2. Build tamamlandığında yeni özellikler aktif olur
3. Farcaster mini app'te test et!

## 🔧 Nasıl Çalışır?

### Portfolio Analysis Flow:

```
User Connect Wallet
       ↓
[PortfolioScreen.tsx]
       ↓
API Call → /api/portfolio/analyze
       ↓
[route.ts] → analyzeWallet()
       ↓
[lib/blockchain.ts]
       ↓
Multi-Chain Scanning:
├─ Ethereum (dRPC)
├─ BSC (Binance RPC)
├─ Polygon (Polygon RPC)
├─ Arbitrum (Arbitrum RPC)
├─ Optimism (Optimism RPC)
├─ Base (Base RPC)
└─ Avalanche (Avax RPC)
       ↓
For Each Chain:
├─ Get Native Balance (eth_getBalance)
├─ Get Token Balances (eth_call → balanceOf)
└─ Get Prices (CoinGecko API)
       ↓
Return Complete Analysis
       ↓
Display in UI
```

## 📊 Kod Yapısı

```
cryptomatch-nextjs/
├── app/
│   ├── api/
│   │   └── portfolio/
│   │       └── analyze/
│   │           └── route.ts          # Multi-chain API endpoint
│   ├── page.tsx                      # Ana sayfa
│   └── layout.tsx
├── components/
│   └── PortfolioScreen.tsx          # Güncellenmiş UI
├── lib/
│   └── blockchain.ts                # YENİ! Multi-chain service
├── package.json
└── README.md                        # Bu dosya
```

## 🎨 Yeni Özellikler

### PortfolioScreen.tsx
- ✅ Multi-chain desteği
- ✅ Chain breakdown görünümü
- ✅ Token listesi (tüm chain'ler)
- ✅ Gerçek zamanlı fiyatlar
- ✅ Responsive tasarım
- ✅ Loading states

### lib/blockchain.ts
- ✅ 7 chain için RPC integration
- ✅ Native balance checker
- ✅ ERC20 token scanner
- ✅ CoinGecko price fetcher
- ✅ Farcaster wallet integration
- ✅ Type-safe interfaces

## 🔐 Güvenlik

- ✅ Sadece READ-ONLY işlemler
- ✅ Private key gerektirmez
- ✅ Transaction imzalamaz
- ✅ Tüm API'ler public ve güvenli

## 🐛 Troubleshooting

### Build Hatası?
```bash
# Cache'i temizle
rm -rf .next node_modules
npm install
npm run build
```

### TypeScript Hatası?
```bash
# Types'ı yeniden oluştur
npm run dev
# Ctrl+C ile dur, tekrar çalıştır
```

### Rate Limit?
- CoinGecko: 30 req/min limiti var, cache kullanıyoruz
- dRPC: Limit yok!

## 📈 Performans

### Optimizasyonlar:
- ✅ Price caching (60 saniye)
- ✅ Paralel chain queries
- ✅ Error handling
- ✅ Timeout protection

### Ortalama Response Time:
- Single chain: ~500ms
- 7 chains: ~2-3 saniye
- Token scanning: +1-2 saniye

## 🌟 Gelecek Özellikler

- [ ] Solana desteği
- [ ] NFT portfolio tracking
- [ ] DeFi position monitoring
- [ ] Historical charts
- [ ] Price alerts
- [ ] Tax reports
- [ ] CSV export

## 💡 İpuçları

1. **Cache**: Fiyatlar 1 dakika cache'lenir, gereksiz API call'ları önler
2. **Paralel**: Tüm chain'ler paralel taranır, hızlı sonuç
3. **Popular Tokens**: Sadece popüler tokenler taranır, hız için
4. **Error Handling**: Bir chain fail olsa bile diğerleri çalışır

## 🆘 Destek

- Farcaster: [@yourhandle]
- GitHub Issues: [github.com/yourrepo/issues]
- Email: your@email.com

## 📝 Lisans

MIT License - Özgürce kullanın!

---

**Made with ❤️ for Farcaster Community**

🚀 Happy Building!
