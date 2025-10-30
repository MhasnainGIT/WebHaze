const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const fs = require('fs').promises;
const path = require('path');

// Get all available templates
router.get('/', async (req, res) => {
  try {
    const templatesPath = path.join(__dirname, '../../client/templates');
    const templates = await fs.readdir(templatesPath);
    
    const templateData = await Promise.all(templates.map(async (templateDir) => {
      const configPath = path.join(templatesPath, templateDir, 'template.json');
      const configContent = await fs.readFile(configPath, 'utf-8');
      return {
        id: templateDir,
        ...JSON.parse(configContent)
      };
    }));

    res.json(templateData);
  } catch (error) {
    console.error('Error loading templates:', error);
    res.status(500).json({ error: 'Failed to load templates' });
  }
});

// Get a specific template by ID
router.get('/:id', async (req, res) => {
  try {
    const templatePath = path.join(__dirname, '../../client/templates', req.params.id, 'template.json');
    const templateContent = await fs.readFile(templatePath, 'utf-8');
    res.json({
      id: req.params.id,
      ...JSON.parse(templateContent)
    });
  } catch (error) {
    if (error.code === 'ENOENT') {
      res.status(404).json({ error: 'Template not found' });
    } else {
      res.status(500).json({ error: 'Failed to load template' });
    }
  }
});

module.exports = router;