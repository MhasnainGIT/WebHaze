const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: String,
    
    // Plan entity structure for flexibility
    pricing: {
        basePrice: { type: Number, required: true },
        currency: { type: String, default: 'USD' },
        billingCycle: { type: String, enum: ['monthly', 'yearly', 'one-time'], required: true },
        validityPeriod: { type: Number, required: true }, // in days
    },
    
    // Features as flexible object for easy expansion
    features: {
        websites: { type: Number, default: 1 },
        storage: { type: String, default: '5GB' },
        bandwidth: { type: String, default: 'unlimited' },
        emails: { type: Number, default: 2 },
        support: { type: String, default: '24/7' },
        ssl: { type: Boolean, default: true },
        backups: { type: Boolean, default: true }
    },
    
    // Support for bundles and add-ons
    addOns: [{
        name: String,
        price: Number,
        description: String
    }],
    
    // EMI support
    emiOptions: [{
        tenure: Number, // months
        interestRate: Number,
        minAmount: Number
    }],
    
    isActive: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 }
}, {
    timestamps: true
});

module.exports = mongoose.model('Plan', planSchema);