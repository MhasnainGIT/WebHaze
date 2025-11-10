import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "$9.99",
      period: "/month",
      description: "Perfect for small businesses and personal websites",
      features: [
        "1 Website",
        "10GB SSD Storage",
        "Unlimited Bandwidth",
        "Free SSL Certificate",
        "24/7 Support",
        "Basic SEO Tools"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "$29.99",
      period: "/month",
      description: "Ideal for growing businesses and e-commerce",
      features: [
        "5 Websites",
        "50GB SSD Storage",
        "Unlimited Bandwidth",
        "Free SSL Certificate",
        "Priority Support",
        "Advanced SEO Tools",
        "E-commerce Ready",
        "Custom Domain"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$99.99",
      period: "/month",
      description: "For large businesses with high traffic",
      features: [
        "Unlimited Websites",
        "500GB SSD Storage",
        "Unlimited Bandwidth",
        "Free SSL Certificate",
        "Dedicated Support",
        "Advanced Analytics",
        "White-label Solution",
        "API Access",
        "Custom Integrations"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <SEO 
        title="Pricing - WebHaze"
        description="Choose the perfect plan for your website needs. Transparent pricing with no hidden fees."
      />
      
      <div className="container-site py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black mb-4">
            Simple <span className="text-white/60">Pricing</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Choose the perfect plan for your needs. All plans include our core features with no hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`relative p-8 rounded-2xl backdrop-blur-sm border transition-all duration-300 ${
                plan.popular 
                  ? 'border-white/30 bg-white/10 scale-105' 
                  : 'border-white/10 bg-white/5 hover:border-white/20'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-semibold">
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
                <p className="text-gray-400 text-sm">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <svg className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link 
                to="/contact" 
                className="w-full inline-block text-center px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300 font-semibold"
              >
                Get Started
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;