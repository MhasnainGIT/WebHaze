const express = require('express');
const router = express.Router();
const Page = require('../models/Page');

// GET /api/pages - list pages (slug/title/summary)
router.get('/', async (req, res) => {
  try {
    const pages = await Page.find().select('slug title summary').lean();
    res.json(pages);
  } catch (err) {
    console.error('Error fetching pages list', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/pages/:slug - fetch a page by slug
router.get('/:slug', async (req, res) => {
  try {
    const slug = req.params.slug;
    const page = await Page.findOne({ slug }).lean();
    if (!page) return res.status(404).json({ error: 'Page not found' });
    res.json(page);
  } catch (err) {
    console.error('Error fetching page', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;