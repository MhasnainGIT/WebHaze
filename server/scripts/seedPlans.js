const mongoose = require('mongoose');
const Plan = require('../models/Plan');
require('dotenv').config();

const samplePlans = [
    {
        name: "Shared Hosting",
        slug: "shared-hosting",
        description: "Perfect for small websites and blogs",
        pricing: {
            basePrice: 2.99,
            currency: 'USD',
            billingCycle: 'monthly',
            validityPeriod: 30
        },
        features: {
            websites: 1,
            storage: '5GB',
            bandwidth: 'unlimited',
            emails: 2,
            support: '24/7',
            ssl: true,
            backups: true
        },
        addOns: [
            { name: 'Extra Storage', price: 5, description: 'Additional 10GB storage' },
            { name: 'Priority Support', price: 10, description: 'Priority customer support' }
        ],
        emiOptions: [
            { tenure: 3, interestRate: 0, minAmount: 50 },
            { tenure: 6, interestRate: 5, minAmount: 100 }
        ],
        sortOrder: 1
    },
    {
        name: "E-commerce Hosting",
        slug: "ecommerce-hosting",
        description: "Optimized for online stores",
        pricing: {
            basePrice: 4.99,
            currency: 'USD',
            billingCycle: 'monthly',
            validityPeriod: 30
        },
        features: {
            websites: 1,
            storage: '25GB',
            bandwidth: 'unlimited',
            emails: 4,
            support: '24/7',
            ssl: true,
            backups: true
        },
        addOns: [
            { name: 'SSL Certificate', price: 15, description: 'Premium SSL certificate' },
            { name: 'CDN Service', price: 20, description: 'Global content delivery network' }
        ],
        emiOptions: [
            { tenure: 3, interestRate: 0, minAmount: 50 },
            { tenure: 6, interestRate: 3, minAmount: 100 },
            { tenure: 12, interestRate: 8, minAmount: 200 }
        ],
        sortOrder: 2
    }
];

async function seedPlans() {
    try {
        const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI;
        await mongoose.connect(MONGO_URI);
        
        console.log('Connected to MongoDB');
        
        await Plan.deleteMany({});
        console.log('Cleared existing plans');
        
        await Plan.insertMany(samplePlans);
        console.log('Sample plans seeded successfully');
        
        process.exit(0);
    } catch (error) {
        console.error('Error seeding plans:', error);
        process.exit(1);
    }
}

seedPlans();