const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const fs = require('fs').promises;
const path = require('path');

const TEMPLATES_DIR = path.join(__dirname, '../../client/templates');

const sanitizeTemplateId = (id) => {
  if (!id || typeof id !== 'string') return null;
  if (/[./\\]/.test(id)) return null;
  return id;
};

// Get all available templates
router.get('/', async (req, res) => {
  try {
    const templates = await fs.readdir(TEMPLATES_DIR);
    
    const templateData = await Promise.all(templates.map(async (templateDir) => {
      const configPath = path.join(TEMPLATES_DIR, templateDir, 'template.json');
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
    const templateId = sanitizeTemplateId(req.params.id);
    if (!templateId) {
      return res.status(400).json({ error: 'Invalid template ID' });
    }

    const templatePath = path.join(TEMPLATES_DIR, templateId, 'template.json');
    const templateContent = await fs.readFile(templatePath, 'utf-8');
    res.json({
      id: templateId,
      ...JSON.parse(templateContent)
    });
  } catch (error) {
    if (error.code === 'ENOENT') {
      return res.status(404).json({ error: 'Template not found' });
    } else {
      res.status(500).json({ error: 'Failed to load template' });
    }
  }
});

module.exports = router;