const express = require('express');
const router = express.Router();
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;
const { authenticate: auth } = require('../middleware/auth');

const useS3 = !!(process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY && process.env.AWS_S3_BUCKET);

let s3Client, PutObjectCommand, DeleteObjectCommand;
if (useS3) {
  const s3Module = require('@aws-sdk/client-s3');
  s3Client = new s3Module.S3Client({ region: process.env.AWS_REGION || 'ap-south-1' });
  PutObjectCommand = s3Module.PutObjectCommand;
  DeleteObjectCommand = s3Module.DeleteObjectCommand;
}

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) cb(null, true);
    else cb(new Error('Invalid file type. Only JPEG, PNG and WebP are allowed.'));
  }
});

const uploadToS3 = async (buffer, key, contentType) => {
  await s3Client.send(new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
    Body: buffer,
    ContentType: contentType,
  }));
  return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION || 'ap-south-1'}.amazonaws.com/${key}`;
};

const saveLocally = async (buffer, filePath) => {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, buffer);
};

router.post('/upload', auth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const userId = req.user.userId;
    const baseName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const sizes = [
      { width: 320, suffix: '-sm' },
      { width: 768, suffix: '-md' },
      { width: 1024, suffix: '-lg' },
    ];

    const mainBuffer = await sharp(req.file.buffer)
      .webp({ quality: 80 })
      .resize(2000, 2000, { fit: 'inside', withoutEnlargement: true })
      .toBuffer();

    let originalUrl;
    if (useS3) {
      originalUrl = await uploadToS3(mainBuffer, `uploads/${userId}/${baseName}.webp`, 'image/webp');
    } else {
      const localPath = path.join(__dirname, '../uploads', userId, `${baseName}.webp`);
      await saveLocally(mainBuffer, localPath);
      originalUrl = `/uploads/${userId}/${baseName}.webp`;
    }

    const variants = await Promise.all(sizes.map(async (size) => {
      const buf = await sharp(mainBuffer)
        .resize(size.width, null, { withoutEnlargement: true })
        .webp({ quality: 80 })
        .toBuffer();

      let url;
      if (useS3) {
        url = await uploadToS3(buf, `uploads/${userId}/${baseName}${size.suffix}.webp`, 'image/webp');
      } else {
        const localPath = path.join(__dirname, '../uploads', userId, `${baseName}${size.suffix}.webp`);
        await saveLocally(buf, localPath);
        url = `/uploads/${userId}/${baseName}${size.suffix}.webp`;
      }
      return { size: size.suffix.substring(1), width: size.width, url };
    }));

    res.json({ original: originalUrl, variants });
  } catch (error) {
    console.error('Error processing upload:', error);
    res.status(500).json({ error: 'Failed to process upload' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const userPath = path.join(__dirname, '../uploads', req.user.userId);
    const files = await fs.readdir(userPath);
    const mediaFiles = files
      .filter(file => !file.includes('-sm') && !file.includes('-md') && !file.includes('-lg'))
      .map(file => ({ url: `/uploads/${req.user.userId}/${file}`, name: file }));
    res.json(mediaFiles);
  } catch (error) {
    if (error.code === 'ENOENT') res.json([]);
    else res.status(500).json({ error: 'Failed to list media files' });
  }
});

router.delete('/:filename', auth, async (req, res) => {
  try {
    const filename = req.params.filename;
    const userId = req.user.userId;
    const variants = ['', '-sm', '-md', '-lg'];

    if (useS3) {
      await Promise.all(variants.map(v =>
        s3Client.send(new DeleteObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET,
          Key: `uploads/${userId}/${filename.replace('.webp', `${v}.webp`)}`,
        })).catch(() => {})
      ));
    } else {
      const basePath = path.join(__dirname, '../uploads', userId);
      await Promise.all(variants.map(v =>
        fs.unlink(path.join(basePath, filename.replace('.webp', `${v}.webp`))).catch(() => {})
      ));
    }
    res.json({ message: 'Media files deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete media files' });
  }
});

module.exports = router;
