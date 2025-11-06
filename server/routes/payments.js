const express = require('express');
const PaymentService = require('../services/PaymentService');
const auth = require('../middleware/auth');
const router = express.Router();

const paymentService = new PaymentService();

// Create payment order
router.post('/create', auth, async (req, res) => {
    try {
        const { planId, amount, currency, metadata } = req.body;
        const idempotencyKey = req.headers['idempotency-key'] || `${req.user.id}-${Date.now()}`;

        const result = await paymentService.createPayment({
            userId: req.user.id,
            planId,
            amount,
            currency,
            metadata
        }, idempotencyKey);

        if (!result.success) {
            return res.status(400).json({ error: result.error });
        }

        res.json({
            success: true,
            transactionId: result.transaction.transactionId,
            gatewayOrderId: result.transaction.gateway.gatewayOrderId,
            amount: result.transaction.amount,
            currency: result.transaction.currency
        });

    } catch (error) {
        console.error('Payment creation error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Capture payment
router.post('/capture', auth, async (req, res) => {
    try {
        const { transactionId, gatewayPaymentId } = req.body;
        const idempotencyKey = req.headers['idempotency-key'] || `capture-${transactionId}-${Date.now()}`;

        const result = await paymentService.capturePayment(
            transactionId,
            gatewayPaymentId,
            idempotencyKey
        );

        if (!result.success) {
            return res.status(400).json({ error: result.error });
        }

        res.json({
            success: true,
            transaction: {
                id: result.transaction.transactionId,
                status: result.transaction.status,
                amount: result.transaction.amount
            }
        });

    } catch (error) {
        console.error('Payment capture error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Refund payment
router.post('/refund', auth, async (req, res) => {
    try {
        const { transactionId, amount, reason } = req.body;
        const idempotencyKey = req.headers['idempotency-key'] || `refund-${transactionId}-${Date.now()}`;

        const result = await paymentService.refundPayment(
            transactionId,
            amount,
            reason,
            idempotencyKey
        );

        if (!result.success) {
            return res.status(400).json({ error: result.error });
        }

        res.json({
            success: true,
            refund: {
                id: result.refund.refundId,
                amount: result.refund.amount,
                status: 'processed'
            }
        });

    } catch (error) {
        console.error('Refund error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get transaction details
router.get('/transaction/:transactionId', auth, async (req, res) => {
    try {
        const { transactionId } = req.params;
        
        const result = await paymentService.getTransaction(transactionId);
        
        if (!result.success) {
            return res.status(404).json({ error: result.error });
        }

        res.json({
            success: true,
            transaction: result.transaction
        });

    } catch (error) {
        console.error('Transaction fetch error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Webhook endpoint
router.post('/webhook/:provider', async (req, res) => {
    try {
        const { provider } = req.params;
        const signature = req.headers['x-razorpay-signature'] || req.headers['stripe-signature'];
        
        const result = await paymentService.processWebhook(
            provider,
            req.body,
            signature
        );

        if (!result.success) {
            return res.status(400).json({ error: result.error });
        }

        res.json({ success: true });

    } catch (error) {
        console.error('Webhook error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;