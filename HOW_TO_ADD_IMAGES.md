# 📸 How to Add Images to the Birthday Website

## Step 1: Add Your Images

1. **Copy your image files** (jpg, png, webp, etc.) to the `public/images/` folder
   - Example: `public/images/photo1.jpg`
   - Example: `public/images/memory.png`

## Step 2: Update the Image Gallery Component

1. Open `components/ImageGallery.tsx`
2. Find the `IMAGE_PATHS` array (around line 12)
3. Add your images like this:

```typescript
const IMAGE_PATHS: ImageInfo[] = [
  { src: '/images/photo1.jpg', alt: 'Beautiful memory with Zeeshan Bhai' },
  { src: '/images/photo2.jpg', alt: 'Another wonderful moment' },
  { src: '/images/memory.png', alt: 'Special memory' },
  // Add more images as needed!
];
```

## Step 3: Test

1. Run `npm run dev`
2. Visit http://localhost:3000
3. Scroll down to see your images in the gallery!

## Tips

- ✅ Use high-quality images (they'll be optimized automatically)
- ✅ Keep file sizes reasonable (under 2MB per image)
- ✅ Use descriptive alt text for accessibility
- ✅ Images will automatically be responsive and optimized by Next.js
- ✅ Click any image to view it full-screen!

## Image Gallery Features

- 📱 **Responsive grid** - Automatically adjusts for mobile/tablet/desktop
- 🔍 **Click to enlarge** - Click any image to view full-screen
- ✨ **Smooth animations** - Beautiful fade-in effects
- 🎨 **Professional design** - Matches the birthday theme

---

## Bonus: Decorative Images (Optional)

You can also add decorative images that float in the background as subtle accents!

1. Open `components/DecorativeImages.tsx`
2. Add your decorative images to the `DECORATIVE_IMAGES` array:

```typescript
const DECORATIVE_IMAGES = [
  { 
    src: '/images/heart.png', 
    alt: '', 
    position: 'top-right',  // or 'top-left', 'bottom-left', 'bottom-right', 'center'
    size: 'small',          // or 'medium', 'large'
    opacity: 0.3            // 0.1 to 1.0 (lower = more subtle)
  },
];
```

These will appear as floating decorative elements around the page!

---

**That's it!** Your images will appear in a beautiful gallery section on the birthday website. 🎉
