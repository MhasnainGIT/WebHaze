const express = require('express');
const Website = require('../models/Website');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all websites for authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const websites = await Website.find({ 
      owner: req.user.userId,
      isActive: true 
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: websites.length,
      data: websites
    });
  } catch (error) {
    console.error('Get websites error:', error);
    res.status(500).json({
      error: 'Failed to fetch websites'
    });
  }
});

// Get single website
router.get('/:id', auth, async (req, res) => {
  try {
    const website = await Website.findOne({
      _id: req.params.id,
      owner: req.user.userId,
      isActive: true
    });

    if (!website) {
      return res.status(404).json({
        error: 'Website not found'
      });
    }

    res.json({
      success: true,
      data: website
    });
  } catch (error) {
    console.error('Get website error:', error);
    res.status(500).json({
      error: 'Failed to fetch website'
    });
  }
});

// Create new website
router.post('/', auth, async (req, res) => {
  try {
    const { title, domain, template, content, seo } = req.body;

    // Check if domain already exists
    const existingWebsite = await Website.findOne({ domain });
    if (existingWebsite) {
      return res.status(409).json({
        error: 'Domain already exists'
      });
    }

    const website = new Website({
      title,
      domain,
      template,
      owner: req.user.userId,
      content: content || {},
      seo: seo || {}
    });

    await website.save();

    res.status(201).json({
      success: true,
      message: 'Website created successfully',
      data: website
    });
  } catch (error) {
    console.error('Create website error:', error);
    res.status(500).json({
      error: 'Failed to create website'
    });
  }
});

// Update website
router.put('/:id', auth, async (req, res) => {
  try {
    const website = await Website.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.user.userId,
        isActive: true
      },
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!website) {
      return res.status(404).json({
        error: 'Website not found'
      });
    }

    res.json({
      success: true,
      message: 'Website updated successfully',
      data: website
    });
  } catch (error) {
    console.error('Update website error:', error);
    res.status(500).json({
      error: 'Failed to update website'
    });
  }
});

// Delete website (soft delete)
router.delete('/:id', auth, async (req, res) => {
  try {
    const website = await Website.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.user.userId,
        isActive: true
      },
      { isActive: false },
      { new: true }
    );

    if (!website) {
      return res.status(404).json({
        error: 'Website not found'
      });
    }

    res.json({
      success: true,
      message: 'Website deleted successfully'
    });
  } catch (error) {
    console.error('Delete website error:', error);
    res.status(500).json({
      error: 'Failed to delete website'
    });
  }
});

// Publish website
router.patch('/:id/publish', auth, async (req, res) => {
  try {
    const website = await Website.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.user.userId,
        isActive: true
      },
      { status: 'published' },
      { new: true }
    );

    if (!website) {
      return res.status(404).json({
        error: 'Website not found'
      });
    }

    res.json({
      success: true,
      message: 'Website published successfully',
      data: website
    });
  } catch (error) {
    console.error('Publish website error:', error);
    res.status(500).json({
      error: 'Failed to publish website'
    });
  }
});

module.exports = router;