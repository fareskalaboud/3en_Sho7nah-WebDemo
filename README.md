# Shipping Item Checker

A mobile-friendly Next.js application that uses AI to analyze uploaded photos and determine shipping eligibility.

## Features

- 📱 **Mobile-First Design**: Optimized for mobile devices with touch-friendly interface
- 🎨 **Material UI**: Beautiful, modern UI with custom color scheme (black, white, #d95633)
- 🌐 **Multi-Language**: Support for English and Arabic responses
- 🤖 **AI-Powered**: Uses advanced image recognition to analyze shipping eligibility
- ⚡ **Instant Results**: Get shipping decisions in seconds
- 📦 **Comprehensive Rules**: Checks size, weight, and content restrictions

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd 3en_Sho7nah_WebDemo
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

This app is optimized for Vercel deployment:

1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Deploy automatically

Or use the Vercel CLI:
```bash
npm i -g vercel
vercel --prod
```

## API Integration

The app integrates with the Shipping Item Checker API:
- **Endpoint**: `https://3en-sho7nah-production.up.railway.app/check-item`
- **Method**: POST (multipart/form-data)
- **Languages**: English (en), Arabic (ar)
- **File Limits**: Max 10MB, supports JPEG, PNG, WebP, GIF, BMP, TIFF, SVG

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **UI Library**: Material UI v5
- **Language**: TypeScript
- **Styling**: Emotion (CSS-in-JS)
- **Icons**: Material UI Icons
- **Deployment**: Vercel

## Project Structure

```
├── app/
│   ├── components/
│   │   └── ImageUpload.tsx    # Main upload component
│   ├── layout.tsx             # Root layout with theme
│   ├── page.tsx               # Home page
│   └── theme.ts               # Material UI theme
├── package.json
├── next.config.js
├── tsconfig.json
└── vercel.json
```

## Shipping Rules

### ✅ Accepted Items
- Small electronics and accessories
- Books, documents, and stationery  
- Clothing and textiles
- Non-fragile household items
- Items under 10kg and 1m × 1m

### ❌ Prohibited Items
- Liquids and hazardous materials
- Fragile items without proper packaging
- Oversized items
- Perishable foods and live plants
- Weapons and dangerous items

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
