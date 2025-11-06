const Transaction = require('../models/Transaction');
const { PaymentGatewayFactory } = require('./PaymentGateway');
const { v4: uuidv4 } = require('uuid');

class PaymentService {
    constructor() {
        this.gateway = PaymentGatewayFactory.create('razorpay', {
            keyId: process.env.RAZORPAY_KEY_ID,
            keySecret: process.env.RAZORPAY_KEY_SECRET,
            webhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET
        });
    }

    // Idempotent payment creation
    async createPayment(paymentData, idempotencyKey) {
        try {
            // Check for existing transaction with same idempotency key
            const existing = await Transaction.findOne({ 
                'metadata.idempotencyKey': idempotencyKey 
            });
            
            if (existing) {
                return { success: true, transaction: existing, isExisting: true };
            }

            const transactionId = uuidv4();
            
            // Create order with gateway
            const orderResult = await this.gateway.createOrder({
                amount: paymentData.amount,
                currency: paymentData.currency || 'USD',
                transactionId,
                metadata: paymentData.metadata
            });

            if (!orderResult.success) {
                throw new Error(orderResult.error);
            }

            // Create transaction record
            const transaction = new Transaction({
                transactionId,
                userId: paymentData.userId,
                planId: paymentData.planId,
                amount: paymentData.amount,
                currency: paymentData.currency || 'USD',
                gateway: {
                    provider: this.gateway.provider,
                    gatewayOrderId: orderResult.data.id,
                    gatewayResponse: orderResult.data
                },
                metadata: { 
                    ...paymentData.metadata, 
                    idempotencyKey 
                },
                events: [{
                    event: 'payment_created',
                    data: { orderId: orderResult.data.id }
                }]
            });

            await transaction.save();
            return { success: true, transaction };

        } catch (error) {
            console.error('Payment creation error:', error);
            return { success: false, error: error.message };
        }
    }

    // Idempotent payment capture
    async capturePayment(transactionId, gatewayPaymentId, idempotencyKey) {
        try {
            const transaction = await Transaction.findOne({ transactionId });
            if (!transaction) {
                throw new Error('Transaction not found');
            }

            // Check if already captured
            if (transaction.status === 'completed') {
                return { success: true, transaction, isExisting: true };
            }

            const captureResult = await this.gateway.capturePayment(
                gatewayPaymentId, 
                transaction.amount
            );

            if (!captureResult.success) {
                throw new Error(captureResult.error);
            }

            // Update transaction
            transaction.status = 'completed';
            transaction.gateway.gatewayTransactionId = gatewayPaymentId;
            transaction.gateway.gatewayResponse = captureResult.data;
            transaction.events.push({
                event: 'payment_captured',
                data: { paymentId: gatewayPaymentId }
            });

            await transaction.save();
            return { success: true, transaction };

        } catch (error) {
            console.error('Payment capture error:', error);
            return { success: false, error: error.message };
        }
    }

    // Idempotent refund
    async refundPayment(transactionId, amount, reason, idempotencyKey) {
        try {
            const transaction = await Transaction.findOne({ transactionId });
            if (!transaction) {
                throw new Error('Transaction not found');
            }

            // Check for existing refund with same idempotency key
            const existingRefund = transaction.refunds.find(
                r => r.metadata?.idempotencyKey === idempotencyKey
            );
            
            if (existingRefund) {
                return { success: true, refund: existingRefund, isExisting: true };
            }

            const refundResult = await this.gateway.refundPayment(
                transaction.gateway.gatewayTransactionId,
                amount,
                reason
            );

            if (!refundResult.success) {
                throw new Error(refundResult.error);
            }

            // Add refund record
            const refund = {
                refundId: refundResult.data.id,
                amount,
                reason,
                gatewayRefundId: refundResult.data.id,
                processedAt: new Date(),
                gstReversed: false,
                metadata: { idempotencyKey }
            };

            transaction.refunds.push(refund);
            transaction.events.push({
                event: 'payment_refunded',
                data: { refundId: refund.refundId, amount }
            });

            // Update status based on refund amount
            const totalRefunded = transaction.refunds.reduce((sum, r) => sum + r.amount, 0);
            if (totalRefunded >= transaction.amount) {
                transaction.status = 'refunded';
            } else {
                transaction.status = 'partially_refunded';
            }

            await transaction.save();
            return { success: true, refund };

        } catch (error) {
            console.error('Refund error:', error);
            return { success: false, error: error.message };
        }
    }

    // Get transaction by ID
    async getTransaction(transactionId) {
        try {
            const transaction = await Transaction.findOne({ transactionId })
                .populate('userId', 'name email')
                .populate('planId', 'name pricing');
            return { success: true, transaction };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // Webhook verification and processing
    async processWebhook(provider, payload, signature) {
        try {
            const gateway = PaymentGatewayFactory.create(provider, {
                webhookSecret: process.env[`${provider.toUpperCase()}_WEBHOOK_SECRET`]
            });

            if (!gateway.verifyWebhook(payload, signature)) {
                throw new Error('Invalid webhook signature');
            }

            // Process webhook based on event type
            // This would be expanded based on specific webhook events
            console.log('Webhook processed:', payload);
            
            return { success: true };
        } catch (error) {
            console.error('Webhook processing error:', error);
            return { success: false, error: error.message };
        }
    }
}

module.exports = PaymentService;