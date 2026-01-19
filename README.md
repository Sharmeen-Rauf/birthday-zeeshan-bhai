# 🎂 Happy Birthday Zeeshan Bhai - Birthday Website

A beautiful, professional one-page birthday website with animated 3D cake, confetti, and QR code generation.

## Features

- 🎂 **3D Animated Birthday Cake** - Built with React Three Fiber
- 🎉 **Confetti Animation** - Celebratory confetti on page load
- 💙 **Heart-touching Message** - Professional and elegant design
- 📱 **Responsive Design** - Works on mobile and desktop
- 📱 **QR Code Generation** - Download QR code for easy sharing
- ✨ **Smooth Animations** - Fade-in effects and smooth transitions

## Tech Stack

- **Next.js 14** - React framework
- **React Three Fiber** - 3D graphics
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **QRCode.react** - QR code generation

## Getting Started

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Deployment & QR Code

### Option 1: Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Deploy (it's automatic!)
5. Your site will be live at `https://your-project.vercel.app`

### Option 2: Deploy to Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Connect your repository
5. Build command: `npm run build`
6. Publish directory: `.next`
7. Your site will be live at `https://your-project.netlify.app`

### Option 3: Deploy to GitHub Pages

1. Install `gh-pages`: `npm install --save-dev gh-pages`
2. Add to `package.json` scripts:
   ```json
   "deploy": "npm run build && next export && gh-pages -d out"
   ```
3. Run: `npm run deploy`
4. Your site will be at `https://yourusername.github.io/repo-name`

### Generate QR Code

1. **After deployment**, visit your live website
2. Scroll down to the QR Code section
3. Click "Download QR Code" button
4. Print the QR code on a card or sticky note
5. When scanned, it will open the birthday website! 🎉

### Alternative QR Code Generation

If you need to generate a QR code manually:

1. Use any QR code generator (like [qr-code-generator.com](https://www.qr-code-generator.com))
2. Enter your deployed website URL
3. Download and print

## Project Structure

```
.
├── app/
│   ├── page.tsx          # Main birthday page
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   ├── BirthdayCake.tsx  # 3D cake component
│   ├── Confetti.tsx      # Confetti animation
│   └── QRCodeDisplay.tsx # QR code component
└── package.json
```

## Customization

- Edit the message in `app/page.tsx`
- Adjust colors in `app/globals.css` and component files
- Modify cake design in `components/BirthdayCake.tsx`
- Change confetti colors in `components/Confetti.tsx`

## License

Made with ❤️ for Zeeshan Bhai's birthday!
