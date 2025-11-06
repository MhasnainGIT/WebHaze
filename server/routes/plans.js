const express = require('express');
const PlanService = require('../services/PlanService');
const router = express.Router();

const planService = new PlanService();

// Get all active plans
router.get('/', async (req, res) => {
    try {
        const result = await planService.getActivePlans();
        
        if (!result.success) {
            return res.status(400).json({ error: result.error });
        }

        res.json({
            success: true,
            plans: result.plans
        });

    } catch (error) {
        console.error('Plans fetch error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get plan by slug
router.get('/:slug', async (req, res) => {
    try {
        const { slug } = req.params;
        
        const result = await planService.getPlanBySlug(slug);
        
        if (!result.success) {
            return res.status(404).json({ error: result.error });
        }

        res.json({
            success: true,
            plan: result.plan
        });

    } catch (error) {
        console.error('Plan fetch error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Calculate pricing with add-ons
router.post('/:planId/calculate', async (req, res) => {
    try {
        const { planId } = req.params;
        const { addOnIds, billingCycle } = req.body;
        
        const result = await planService.calculatePricing(planId, addOnIds, billingCycle);
        
        if (!result.success) {
            return res.status(400).json({ error: result.error });
        }

        res.json({
            success: true,
            pricing: result.pricing
        });

    } catch (error) {
        console.error('Pricing calculation error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get EMI options
router.get('/:planId/emi/:amount', async (req, res) => {
    try {
        const { planId, amount } = req.params;
        
        const result = await planService.getEMIOptions(planId, parseFloat(amount));
        
        if (!result.success) {
            return res.status(400).json({ error: result.error });
        }

        res.json({
            success: true,
            emiOptions: result.emiOptions
        });

    } catch (error) {
        console.error('EMI options error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;