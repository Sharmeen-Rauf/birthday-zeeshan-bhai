# 🖼️ Quick Start: Adding Images

## 📁 Folder Structure

```
public/
  └── images/
      ├── photo1.jpg      ← Add your photos here
      ├── photo2.jpg
      ├── memory.png
      └── ...
```

## 🎯 Two Ways to Use Images

### 1. Photo Gallery (Main Photos)

**File:** `components/ImageGallery.tsx`

Add your images here (around line 13):

```typescript
const IMAGE_PATHS: ImageInfo[] = [
  { src: '/images/photo1.jpg', alt: 'Memory with Zeeshan Bhai' },
  { src: '/images/photo2.jpg', alt: 'Another wonderful moment' },
  { src: '/images/photo3.png', alt: 'Special memory' },
];
```

**Result:** Images appear in a beautiful responsive gallery grid. Click to view full-screen!

---

### 2. Decorative Images (Background Accents)

**File:** `components/DecorativeImages.tsx`

Add decorative images here (around line 8):

```typescript
const DECORATIVE_IMAGES = [
  { 
    src: '/images/heart.png', 
    alt: '', 
    position: 'top-right',  // Options: 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'center'
    size: 'small',          // Options: 'small', 'medium', 'large'
    opacity: 0.3            // 0.1 to 1.0 (lower = more subtle)
  },
];
```

**Result:** Images float subtly in the background as decorative elements!

---

## ✅ Steps

1. **Copy images** to `public/images/` folder
2. **Open** `components/ImageGallery.tsx`
3. **Add** image paths to `IMAGE_PATHS` array
4. **Save** and refresh your browser
5. **Done!** 🎉

---

## 💡 Tips

- ✅ Use `.jpg`, `.png`, or `.webp` formats
- ✅ Keep file sizes under 2MB for faster loading
- ✅ Images are automatically optimized by Next.js
- ✅ Gallery is fully responsive (mobile/tablet/desktop)
- ✅ Click any gallery image to view full-screen

---

**Need more details?** See `HOW_TO_ADD_IMAGES.md`
