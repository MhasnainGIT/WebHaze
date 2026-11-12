// Adapter Pattern for Payment Gateways
class PaymentGatewayAdapter {
    constructor(provider) {
        this.provider = provider;
    }

    async createOrder(orderData) {
        throw new Error('createOrder method must be implemented');
    }

    async capturePayment(transactionId, amount) {
        throw new Error('capturePayment method must be implemented');
    }

    async refundPayment(transactionId, amount, reason) {
        throw new Error('refundPayment method must be implemented');
    }

    async verifyWebhook(payload, signature) {
        throw new Error('verifyWebhook method must be implemented');
    }
}

// Razorpay Adapter
class RazorpayAdapter extends PaymentGatewayAdapter {
    constructor(config) {
        super('razorpay');
        this.config = config;
        this.webhookSecret = config.webhookSecret;
    }

    async createOrder(orderData) {
        try {
            const order = {
                id: `order_${Date.now()}`,
                amount: orderData.amount * 100,
                currency: orderData.currency,
                receipt: orderData.transactionId
            };
            return { success: true, data: order };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async capturePayment(paymentId, amount) {
        try {
            const payment = { id: paymentId, amount: amount * 100, status: 'captured' };
            return { success: true, data: payment };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async refundPayment(paymentId, amount, reason) {
        try {
            const refund = { id: `rfnd_${Date.now()}`, amount: amount * 100, status: 'processed' };
            return { success: true, data: refund };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    verifyWebhook(payload, signature) {
        if (!this.webhookSecret || !signature) return false;
        const crypto = require('crypto');
        const body = typeof payload === 'string' ? payload : JSON.stringify(payload);
        const expected = crypto
            .createHmac('sha256', this.webhookSecret)
            .update(body)
            .digest('hex');
        return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
    }
}

// Gateway Factory
class PaymentGatewayFactory {
    static create(provider, config) {
        switch (provider) {
            case 'razorpay':
                return new RazorpayAdapter(config);
            default:
                throw new Error(`Unsupported payment provider: ${provider}`);
        }
    }
}

module.exports = { PaymentGatewayFactory, PaymentGatewayAdapter };