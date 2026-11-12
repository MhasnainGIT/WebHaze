const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');
const { authenticate, admin } = require('../middleware/auth');
const { cache, invalidateCache } = require('../middleware/cache');

// Public: list published posts
router.get('/', cache(300), async (req, res) => {
  try {
    const posts = await BlogPost.find({ published: true })
      .select('title slug excerpt author tags publishedAt')
      .sort({ publishedAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Public: get post by slug
router.get('/:slug', async (req, res) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug, published: true });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

// Admin: create post
router.post('/', authenticate, admin, async (req, res) => {
  try {
    const post = new BlogPost(req.body);
    if (post.published && !post.publishedAt) post.publishedAt = new Date();
    await post.save();
    await invalidateCache('/api/blog');
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message || 'Creation failed' });
  }
});

// Admin: update post
router.put('/:id', authenticate, admin, async (req, res) => {
  try {
    const update = req.body;
    if (update.published && !update.publishedAt) update.publishedAt = new Date();
    const post = await BlogPost.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    await invalidateCache('/api/blog');
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: 'Update failed' });
  }
});

// Admin: delete post
router.delete('/:id', authenticate, admin, async (req, res) => {
  try {
    await BlogPost.findByIdAndDelete(req.params.id);
    await invalidateCache('/api/blog');
    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Deletion failed' });
  }
});

module.exports = router;
