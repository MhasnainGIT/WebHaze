import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const Pricing = () => {
  const plans = [
    {
      name: "Shared Hosting",
      price: "$4.99",
      period: "/month",
      description: "Perfect for personal websites and small businesses",
      features: [
        "1 Website",
        "5GB SSD Storage",
        "Unmetered Bandwidth",
        "2 Email Accounts",
        "Free SSL Certificate",
        "24/7 Support",
        "99.9% Uptime"
      ],
      popular: false
    },
    {
      name: "WordPress Hosting",
      price: "$7.99",
      period: "/month",
      description: "Optimized for WordPress websites",
      features: [
        "1 WordPress Site",
        "10GB SSD Storage",
        "Unmetered Bandwidth",
        "5 Email Accounts",
        "Free SSL Certificate",
        "WordPress Optimization",
        "24/7 Expert Support",
        "Auto Backups"
      ],
      popular: true
    },
    {
      name: "E-commerce Hosting",
      price: "$12.99",
      period: "/month",
      description: "Built for online stores and e-commerce",
      features: [
        "1 E-commerce Site",
        "25GB SSD Storage",
        "Unmetered Bandwidth",
        "10 Email Accounts",
        "Free SSL Certificate",
        "WooCommerce Ready",
        "24/7 Priority Support",
        "Daily Backups"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <SEO 
        title="Pricing - WebHaze"
        description="Choose the perfect hosting plan for your website. Affordable pricing with premium features."
      />
      
      <div className="container-site py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black mb-6">
            Simple, Transparent
            <br />
            <span className="text-white/60">Pricing</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Choose the plan that fits your needs. All plans include our core features with no hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-lg border transition-colors ${
                plan.popular 
                  ? 'border-white bg-white/5' 
                  : 'border-white/10 hover:border-white/30'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-black">{plan.price}</span>
                  <span className="text-gray-400">{plan.period}</span>
                </div>
                <p className="text-gray-400">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <svg className="w-5 h-5 text-white mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link 
                to="/contact" 
                className={`block w-full py-4 px-6 rounded-lg font-semibold text-center transition-colors ${
                  plan.popular
                    ? 'bg-white text-black hover:bg-gray-200'
                    : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                }`}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold mb-4">Need a Custom Solution?</h2>
          <p className="text-gray-400 mb-8">
            Contact us for enterprise plans and custom requirements.
          </p>
          <Link to="/contact" className="btn-primary">
            Contact Sales
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Pricing;