const express = require('express');
const router = express.Router();
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;
const auth = require('../middleware/auth');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userPath = path.join(__dirname, '../uploads', req.user.userId);
    fs.mkdir(userPath, { recursive: true })
      .then(() => cb(null, userPath))
      .catch(err => cb(err));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG and WebP are allowed.'));
    }
  }
});

// Upload and optimize image
router.post('/upload', auth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const originalPath = req.file.path;
    const optimizedPath = originalPath.replace(/\.[^.]+$/, '.webp');

    // Optimize image
    await sharp(originalPath)
      .webp({ quality: 80 })
      .resize(2000, 2000, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .toFile(optimizedPath);

    // Delete original file
    await fs.unlink(originalPath);

    // Generate various sizes for responsive images
    const sizes = [
      { width: 320, suffix: '-sm' },
      { width: 768, suffix: '-md' },
      { width: 1024, suffix: '-lg' }
    ];

    const variants = await Promise.all(sizes.map(async size => {
      const variantPath = optimizedPath.replace('.webp', `${size.suffix}.webp`);
      await sharp(optimizedPath)
        .resize(size.width, null, { withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(variantPath);

      return {
        size: size.suffix.substring(1),
        width: size.width,
        url: `/uploads/${req.user.userId}/${path.basename(variantPath)}`
      };
    }));

    res.json({
      original: `/uploads/${req.user.userId}/${path.basename(optimizedPath)}`,
      variants
    });
  } catch (error) {
    console.error('Error processing upload:', error);
    res.status(500).json({ error: 'Failed to process upload' });
  }
});

// List media files for user
router.get('/', auth, async (req, res) => {
  try {
    const userPath = path.join(__dirname, '../uploads', req.user.userId);
    const files = await fs.readdir(userPath);
    
    const mediaFiles = files.filter(file => !file.includes('-sm') && !file.includes('-md') && !file.includes('-lg'))
      .map(file => ({
        url: `/uploads/${req.user.userId}/${file}`,
        name: file,
        created: fs.statSync(path.join(userPath, file)).ctime
      }));

    res.json(mediaFiles);
  } catch (error) {
    if (error.code === 'ENOENT') {
      res.json([]);
    } else {
      res.status(500).json({ error: 'Failed to list media files' });
    }
  }
});

// Delete media file
router.delete('/:filename', auth, async (req, res) => {
  try {
    const filename = req.params.filename;
    const basePath = path.join(__dirname, '../uploads', req.user.userId);
    
    // Delete all variants of the image
    const variants = ['', '-sm', '-md', '-lg'];
    await Promise.all(variants.map(variant => {
      const filePath = path.join(basePath, filename.replace('.webp', `${variant}.webp`));
      return fs.unlink(filePath).catch(() => {}); // Ignore errors if variant doesn't exist
    }));

    res.json({ message: 'Media files deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete media files' });
  }
});

module.exports = router;