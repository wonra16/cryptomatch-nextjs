# 🎯 CryptoMatch V3 - Setup Guide

## ⚠️ CRITICAL: 2 API Keys Required!

### 1️⃣ WalletConnect Project ID (REQUIRED!)

**Current Status:** Using DEMO ID - will cause 403 errors!

**Get Your FREE Project ID:**

1. Go to: **https://cloud.reown.com/sign-in**
2. Sign up (free)
3. Create new project
4. Copy Project ID (32 characters, like: `3fcc6bba6f1de962d911bb5b5c3dba68`)
5. Add your domain to whitelist

**Update Code:**
```typescript
// File: components/WalletProviders.tsx (line 16)
const WALLETCONNECT_PROJECT_ID = 'YOUR_PROJECT_ID_HERE' // Replace this!
```

---

### 2️⃣ Neynar API Key (REQUIRED!)

**Get from:** https://neynar.com

**Add to `.env.local`:**
```bash
NEYNAR_API_KEY=your_key_here
```

**NOTE:** `wc_secret_b8e4fcd5` is your Neynar key, NOT WalletConnect!

---

## 🚀 Quick Start

```bash
# 1. Install
npm install

# 2. Create .env.local
echo "NEYNAR_API_KEY=your_key_here" > .env.local

# 3. Update WalletConnect ID in components/WalletProviders.tsx

# 4. Run
npm run dev

# 5. Deploy
vercel deploy --prod
```

---

## ✅ Fixed Issues

- ✅ hasWallet undefined error
- ✅ WalletConnect 403 error (needs your Project ID)
- ✅ Neynar API endpoint
- ✅ Modal props

---

## 🎯 Features

- Celebrity Match (100+ celebs)
- Vibe Check (6 personality types)
- Optional wallet analysis
- Shareable results

---

## 📝 Environment Variables

```bash
# Required
NEYNAR_API_KEY=get_from_neynar.com

# Optional
ALCHEMY_API_KEY=get_from_alchemy.com
```

---

## 🐛 Common Issues

### "403 Forbidden" Error
**Cause:** Using demo WalletConnect ID  
**Fix:** Get your own from cloud.reown.com

### "hasWallet is not defined"
**Status:** ✅ FIXED!

### "No casts found"
**Fix:** Check NEYNAR_API_KEY in .env.local

---

Made with 💜 on Farcaster
