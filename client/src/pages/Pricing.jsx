import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PricingCard = ({ plan, index }) => (
    <motion.div
        className={`relative p-8 rounded-2xl border-2 backdrop-blur-lg ${
            plan.popular 
                ? 'border-primary bg-white/90 shadow-2xl scale-105' 
                : 'border-white/30 bg-white/80 shadow-lg'
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -5 }}
    >
        {plan.popular && (
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium">
                    Most Popular
                </span>
            </div>
        )}
        
        <div className="text-center mb-8">
            <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
            <div className="flex items-baseline justify-center">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-gray-600 ml-1">{plan.period}</span>
            </div>
            <p className="text-gray-600 mt-2">{plan.description}</p>
        </div>

        <ul className="space-y-4 mb-8">
            {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                </li>
            ))}
        </ul>

        <Link 
            to="/contact" 
            className={`block w-full py-3 px-6 rounded-lg font-medium transition-colors text-center ${
                plan.popular
                    ? 'bg-primary text-white hover:bg-primary/90'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
            }`}
        >
            Get Started
        </Link>
    </motion.div>
);

const Pricing = () => {
    const plans = [
        {
            name: "Shared Hosting",
            price: "$4.99",
            period: "/month",
            description: "Launch your website without the hassle. Speed, security, and simplicity.",
            features: [
                "Host 1 Website",
                "5GB SSD Disk Space",
                "Unmetered Bandwidth",
                "2 Email Accounts",
                "2 Sub domains",
                "24/7 Technical Support",
                "99.9% Uptime Guarantee",
                "Free SSL Certificate",
                "24/7 Auto Backups"
            ],
            popular: false
        },
        {
            name: "WordPress Hosting",
            price: "$7.99",
            period: "/month",
            description: "Build faster with ease. Optimized for speed, security, and effortless management.",
            features: [
                "Host 1 Website",
                "7GB SSD Disk Space",
                "Unmetered Bandwidth",
                "2 Email Accounts",
                "2 Sub domains",
                "24/7 Technical Support",
                "WordPress acceleration (LiteSpeed)",
                "Free SSL Certificate",
                "24/7 Auto Backups"
            ],
            popular: true
        },
        {
            name: "E-commerce Hosting",
            price: "$12.99",
            period: "/month",
            description: "Start selling online with confidence. Speed, security, and tools your store needs.",
            features: [
                "Host 1 Website",
                "25GB SSD Disk Space",
                "Unmetered Bandwidth",
                "4 Email Accounts",
                "2 Sub domains",
                "24/7 Technical Support",
                "WooCommerce acceleration (LiteSpeed)",
                "Free SSL Certificate",
                "24/7 Auto Backups"
            ],
            popular: false
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-24">
            <div className="container-site py-16">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold mb-4">
                        Choose Your Perfect Plan
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Simple, transparent pricing that grows with you. Try any plan free for 30 days.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {plans.map((plan, index) => (
                        <PricingCard key={index} plan={plan} index={index} />
                    ))}
                </div>

                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-8">
                        All Plans Include These Amazing Features
                    </h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            "Free Migration",
                            "Money-back Guarantee",
                            "One-click WordPress",
                            "24/7 Expert Support"
                        ].map((feature, index) => (
                            <div key={index} className="text-center">
                                <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3">
                                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className="font-medium">{feature}</p>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Additional whitespace */}
                <div className="py-16"></div>
            </div>
        </div>
    );
};

export default Pricing;