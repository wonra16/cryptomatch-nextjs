# 🤖 CRYPTOMATCH - MASTER AI DEVELOPMENT PROMPT

Bu dosyayı gelecekte başka projelerde kullanmak için saklayın!

---

## 📋 PROJE BAŞLATMA PROMPTU

\`\`\`
Bana profesyonel bir Farcaster Mini App oluştur. Gereksinimler:

1. **Tech Stack:**
   - Next.js 14 (App Router)
   - TypeScript (strict mode)
   - Tailwind CSS (glassmorphism design)
   - Farcaster Frame SDK
   - RainbowKit (wallet connection)
   
2. **Özellikler:**
   - SDK entegrasyonu (sdk.actions.ready() çağrılmalı)
   - Responsive design (mobile-first)
   - Loading states ve error handling
   - Modern UI (gradient, animations, glassmorphism)
   
3. **Dosya Yapısı:**
   - /app - Next.js pages & API routes
   - /components - React components
   - /public - Static assets
   
4. **Önemli:**
   - Avatar loading için CORS proxy
   - Fallback images (DiceBear)
   - Environment variables (.env.example)
   - Detaylı README.md
   - TypeScript types
   
5. **Deployment:**
   - Vercel-ready
   - Farcaster manifest (/.well-known/farcaster.json)
   - Account association
\`\`\`

---

## 🎨 UI/UX İYİLEŞTİRME PROMPTU

\`\`\`
Mevcut UI'ı profesyonel seviyeye çıkar:

1. **Design Principles:**
   - Glassmorphism (backdrop-blur-xl, white/10 background)
   - Gradient overlays (purple → pink)
   - Smooth animations (hover:scale-105, transition-all)
   - Rounded corners (rounded-2xl, rounded-3xl)
   - Shadow effects (shadow-2xl, shadow-accent/50)
   
2. **Components:**
   - Cards: bg-white/10 backdrop-blur-xl border border-white/20
   - Buttons: gradient background, scale on hover, shadow
   - Text: font-black for headers, proper hierarchy
   - Spacing: consistent padding (p-4, p-6, p-8)
   
3. **Responsive:**
   - Mobile-first approach
   - Text size scales (text-2xl md:text-3xl)
   - Grid layouts (grid-cols-2 gap-3)
   - Max-width containers (max-w-lg, max-w-2xl)
   
4. **Accessibility:**
   - Alt tags for images
   - ARIA labels for buttons
   - Keyboard navigation
   - Color contrast (WCAG AA)
\`\`\`

---

## 🔧 SORUN GİDERME PROMPTU

\`\`\`
[HATA MESAJINI BURAYA YAPIŞTIR]

Yukarıdaki hatayı çöz. Kontrol edilecekler:

1. **Farcaster SDK:**
   - sdk.context await edilmiş mi?
   - sdk.actions.ready() çağrıldı mı?
   - useEffect içinde mi?
   
2. **Avatar Loading:**
   - CORS proxy kullanılıyor mu?
   - Fallback image var mı?
   - onError handler eklenmiş mi?
   
3. **Wallet Connection:**
   - WalletConnect Project ID var mı?
   - RainbowKitProvider sarılmış mı?
   - wagmi config doğru mu?
   
4. **API Routes:**
   - NextRequest/NextResponse kullanılıyor mu?
   - Try-catch block var mı?
   - CORS headers ayarlı mı?
   
5. **TypeScript:**
   - Types tanımlanmış mı?
   - any kullanımı minimal mi?
   - Interface vs Type doğru mu?

Çözüm kodunu tam dosya olarak ver.
\`\`\`

---

## 🚀 YENİ ÖZELLIK EKLEME PROMPTU

\`\`\`
[ÖZELLİK AÇIKLAMASI]

Yukarıdaki özelliği ekle. Gereksinimler:

1. **Planning:**
   - Hangi dosyalar değişecek?
   - Yeni dependency gerekli mi?
   - API route gerekli mi?
   
2. **Implementation:**
   - Type-safe kod yaz
   - Error handling ekle
   - Loading states ekle
   - Responsive design
   
3. **Testing:**
   - Edge cases düşün
   - Fallback scenarios
   - Error messages
   
4. **Documentation:**
   - README'ye ekle
   - Code comments
   - Usage examples

Adım adım implementation ver.
\`\`\`

---

## 🎯 OPTIMIZATION PROMPTU

\`\`\`
Uygulamayı optimize et:

1. **Performance:**
   - Dynamic imports kullan
   - Image optimization (Next.js Image)
   - Code splitting
   - Bundle size reduction
   
2. **SEO:**
   - Metadata optimization
   - OpenGraph tags
   - Structured data
   - Sitemap
   
3. **Caching:**
   - API response caching
   - Static asset caching
   - CDN usage
   
4. **Loading:**
   - Skeleton screens
   - Progressive enhancement
   - Lazy loading
   
5. **Error Handling:**
   - Error boundaries
   - Fallback UI
   - Retry mechanisms
   - User feedback

Optimization önerileri ve kod ver.
\`\`\`

---

## 📱 MOBILE OPTIMIZATION PROMPTU

\`\`\`
Mobile experience'i iyileştir:

1. **Touch Interactions:**
   - Tap targets minimum 44x44px
   - Swipe gestures
   - Pull to refresh
   
2. **Layout:**
   - Single column on mobile
   - Bottom navigation
   - Safe area insets
   
3. **Performance:**
   - Reduced animations
   - Image compression
   - Minimal JavaScript
   
4. **UX:**
   - Thumb-friendly buttons
   - Auto-focus prevention
   - Smooth scrolling
   - Loading indicators

Mobile-optimized kod ver.
\`\`\`

---

## 🤝 COLLABORATION PROMPTU

\`\`\`
Ekip için documentation hazırla:

1. **Setup Guide:**
   - Adım adım kurulum
   - Required tools
   - Environment setup
   
2. **Code Style Guide:**
   - Naming conventions
   - File structure
   - Component patterns
   
3. **Git Workflow:**
   - Branch strategy
   - Commit messages
   - PR template
   
4. **API Documentation:**
   - Endpoints list
   - Request/response examples
   - Error codes
   
5. **Troubleshooting:**
   - Common errors
   - Solutions
   - Debug tips

Markdown formatında complete guide.
\`\`\`

---

## 🎨 DESIGN SYSTEM OLUŞTURMA PROMPTU

\`\`\`
Design system oluştur:

1. **Colors:**
   - Primary palette
   - Semantic colors
   - Gradients
   - Dark mode variants
   
2. **Typography:**
   - Font families
   - Size scale
   - Line heights
   - Weights
   
3. **Spacing:**
   - 8px grid system
   - Margin/padding scale
   - Component spacing
   
4. **Components:**
   - Buttons (variants, sizes, states)
   - Cards
   - Forms
   - Navigation
   
5. **Animations:**
   - Transitions
   - Timing functions
   - Keyframes
   
Tailwind config ve component library.
\`\`\`

---

## 💾 NASIL KULLANILIR?

1. **Copy-paste** istediğin promptu
2. **[PLACEHOLDER]** kısımları doldur
3. **AI'a gönder** (Claude, GPT-4)
4. **Kodu al** ve projene ekle
5. **Test et** ve iterate et

---

## 🎓 ÖĞRENME NOKTALARI

Bu projeden öğrenilenler:

1. ✅ **Farcaster Mini App** geliştirme
2. ✅ **RainbowKit** entegrasyonu
3. ✅ **Next.js 14** App Router
4. ✅ **TypeScript** best practices
5. ✅ **Glassmorphism** UI design
6. ✅ **CORS** problemleri çözme
7. ✅ **Vercel** deployment
8. ✅ **Error handling** patterns
9. ✅ **Responsive design**
10. ✅ **Professional UI/UX**

---

## 📚 KAYNAKLAR

- **Farcaster Docs:** https://docs.farcaster.xyz
- **Mini App SDK:** https://miniapps.farcaster.xyz
- **RainbowKit:** https://rainbowkit.com
- **Next.js:** https://nextjs.org
- **Tailwind CSS:** https://tailwindcss.com
- **Vercel:** https://vercel.com/docs

---

## 🔮 GELECEKTEKİ SEN İÇİN NOTLAR

**Unutma:**
- 🎯 Her zaman type-safe kod yaz
- 🎨 UI/UX'e önem ver
- 🐛 Error handling her yerde olsun
- 📱 Mobile-first düşün
- ⚡ Performance önceliğin olsun
- 📖 Documentation yaz
- 🧪 Test et!

**Başarı Formülü:**
```
Profesyonel App = Clean Code + Great UI/UX + Error Handling + Documentation
```

---

## 💡 PRO TIPS

1. **Component Reusability:** Her component'i reusable yap
2. **Type Safety:** any kullanma, proper types tanımla
3. **Error Boundaries:** Fallback UI'lar ekle
4. **Loading States:** Her async operation için loading göster
5. **User Feedback:** Toast notifications, success/error messages
6. **Accessibility:** Keyboard navigation, screen readers
7. **Performance:** Bundle size'ı küçük tut
8. **SEO:** Metadata, OpenGraph, sitemap
9. **Analytics:** User behavior track et
10. **Monitoring:** Error tracking (Sentry, LogRocket)

---

**Bu promptları kaydet ve gelecekte referans olarak kullan!** 🚀
