# 💕 CryptoMatch - Farcaster Mini App

AI-powered crypto personality matching! Find your perfect crypto soulmate.

## 🚀 Features

- ✅ Farcaster Mini App SDK integration
- ✅ Interactive UI with Tailwind CSS
- ✅ AI-powered matching algorithm
- ✅ Share results to Warpcast
- ✅ Fully responsive design
- ✅ Production-ready

## 🛠️ Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Farcaster Frame SDK** - Mini App integration
- **Vercel** - Deployment

## 📦 Installation

1. Clone the repository:
\`\`\`bash
git clone <your-repo-url>
cd cryptomatch-nextjs
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Copy environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. Update \`.env.local\`:
\`\`\`
NEXT_PUBLIC_URL=http://localhost:3000
\`\`\`

5. Run development server:
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

6. Open [http://localhost:3000](http://localhost:3000)

## 🚢 Deployment to Vercel

1. Push code to GitHub

2. Import project in Vercel

3. Set environment variable:
   - \`NEXT_PUBLIC_URL\` = your production URL

4. Deploy!

5. Update Farcaster manifest with your production URL

## 📱 Farcaster Integration

### Manifest File

The app serves a Farcaster manifest at \`/.well-known/farcaster.json\`

Update the \`accountAssociation\` values in:
\`app/.well-known/farcaster.json/route.ts\`

Generate your own at: https://warpcast.com/~/developers/mini-apps/manifest

### Frame Metadata

Frame metadata is configured in \`app/layout.tsx\`

### SDK Integration

The Farcaster SDK is initialized in \`app/page.tsx\`:

\`\`\`typescript
import sdk from '@farcaster/frame-sdk'

// Initialize
const ctx = await sdk.context

// Notify ready (CRITICAL!)
sdk.actions.ready()
\`\`\`

## 🎨 Customization

### Colors

Edit \`tailwind.config.js\`:

\`\`\`javascript
colors: {
  primary: '#667eea',
  secondary: '#764ba2',
  accent: '#FFD93D',
}
\`\`\`

### Match Algorithm

Edit \`app/api/match/route.ts\` to customize matching logic

### Images

Replace images in \`public/images/\`:
- \`icon.png\` - App icon (200x200)
- \`preview.png\` - Preview image (1200x630)
- \`splash.png\` - Splash screen (200x200)

## 📄 File Structure

\`\`\`
cryptomatch-nextjs/
├── app/
│   ├── .well-known/
│   │   └── farcaster.json/
│   │       └── route.ts          # Farcaster manifest
│   ├── api/
│   │   └── match/
│   │       └── route.ts          # Match API
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Main app
│   └── globals.css               # Global styles
├── components/
│   ├── HomeScreen.tsx            # Home screen
│   ├── ResultScreen.tsx          # Result screen
│   └── LoadingScreen.tsx         # Loading screen
├── public/
│   └── images/                   # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
\`\`\`

## 🐛 Troubleshooting

### "Failed to load" error

Make sure you call \`sdk.actions.ready()\` after SDK initialization

### Developer mode warning

This is normal during development. It will disappear in production.

### Images not loading

Check that images exist in \`public/images/\` and URLs are correct

## 📚 Resources

- [Farcaster Mini Apps Docs](https://miniapps.farcaster.xyz)
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Deployment](https://vercel.com/docs)

## 💜 Credits

Built with love for the Farcaster community by [@wonra16](https://warpcast.com/wonra16)

## 📝 License

MIT
