# 🚀 Quick Deployment Guide

## Step 1: Deploy Your Website

### Option A: Vercel (Easiest - Recommended)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy:**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository
   - Click "Deploy" (no configuration needed!)
   - Your site will be live at `https://your-project.vercel.app`

### Option B: Netlify

1. **Push to GitHub** (same as above)

2. **Deploy:**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect GitHub and select your repo
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `.next`
   - Click "Deploy site"
   - Your site will be live at `https://your-project.netlify.app`

## Step 2: Generate QR Code

### Method 1: Use Built-in QR Code (After Deployment)

1. Visit your deployed website
2. Scroll to the QR Code section
3. Click "Download QR Code" button
4. The QR code will download as PNG
5. Print it on a card or sticky note

### Method 2: Online QR Code Generator

1. Copy your deployed website URL (e.g., `https://your-project.vercel.app`)
2. Go to [qr-code-generator.com](https://www.qr-code-generator.com)
3. Paste your URL
4. Download the QR code
5. Print it

## Step 3: Print QR Code

1. Open the downloaded QR code image
2. Print on:
   - Sticky note (recommended size: 2x2 inches)
   - Card (recommended size: 3x3 inches)
   - Any paper (make sure it's clear and scannable)

## Step 4: Test

1. Scan the QR code with your phone camera
2. It should open the birthday website
3. Share the printed QR code with Zeeshan Bhai! 🎉

## Tips

- ✅ Make sure QR code is at least 1x1 inch when printed
- ✅ Use high contrast (black on white)
- ✅ Test scan before printing multiple copies
- ✅ Keep the QR code flat and clean

---

**Need Help?** Check the main README.md for more details.
