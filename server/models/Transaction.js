const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    // Single source of truth
    transactionId: { type: String, required: true, unique: true },
    
    // User and plan references
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    planId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan', required: true },
    
    // Transaction details
    amount: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    status: { 
        type: String, 
        enum: ['pending', 'processing', 'completed', 'failed', 'refunded', 'partially_refunded'],
        default: 'pending'
    },
    
    // Gateway details (adapter pattern support)
    gateway: {
        provider: { type: String, required: true }, // razorpay, stripe, paypal
        gatewayTransactionId: String,
        gatewayOrderId: String,
        gatewayResponse: mongoose.Schema.Types.Mixed, // Store full response for auditing
        webhookData: mongoose.Schema.Types.Mixed
    },
    
    // EMI and split payment support
    parentTransactionId: String, // For child transactions
    childTransactions: [String], // For parent transactions
    emiDetails: {
        tenure: Number,
        installmentNumber: Number,
        totalInstallments: Number,
        interestRate: Number
    },
    
    // Tax handling
    tax: {
        gstRate: Number,
        gstAmount: Number,
        taxableAmount: Number,
        gstNumber: String
    },
    
    // Refund tracking
    refunds: [{
        refundId: String,
        amount: Number,
        reason: String,
        gatewayRefundId: String,
        processedAt: Date,
        gstReversed: Boolean
    }],
    
    // Metadata for future use
    metadata: mongoose.Schema.Types.Mixed,
    
    // Audit trail
    events: [{
        event: String,
        timestamp: { type: Date, default: Date.now },
        data: mongoose.Schema.Types.Mixed
    }]
}, {
    timestamps: true
});

// Indexes for performance
transactionSchema.index({ transactionId: 1 });
transactionSchema.index({ userId: 1, status: 1 });
transactionSchema.index({ 'gateway.provider': 1, 'gateway.gatewayTransactionId': 1 });

module.exports = mongoose.model('Transaction', transactionSchema);