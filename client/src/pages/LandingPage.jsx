import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Build Your Professional Website in Minutes
            </motion.h1>
            <motion.p 
              className="text-xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Create a conversion-focused website that builds trust and grows your business.
              No technical skills needed.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link
                to="/templates"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Start Building Now
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose WebHaze?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon="🎯"
              title="Conversion-Focused"
              description="Strategic layouts and user experiences that turn visitors into customers"
            />
            <FeatureCard
              icon="🚀"
              title="Quick Launch"
              description="Professional templates ready for your business, customizable in minutes"
            />
            <FeatureCard
              icon="📱"
              title="Mobile-First"
              description="Fully responsive designs that look great on all devices"
            />
          </div>
        </div>
      </section>

      {/* Industry Solutions */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Solutions for Every Business</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <IndustrySolution
              image="/images/restaurant.jpg"
              title="Restaurants & Cafes"
              features={[
                "Online Menu Management",
                "Table Reservations",
                "Order System Integration"
              ]}
            />
            <IndustrySolution
              image="/images/retail.jpg"
              title="Retail & E-commerce"
              features={[
                "Product Catalog",
                "Secure Payment Gateway",
                "Inventory Management"
              ]}
            />
            <IndustrySolution
              image="/images/services.jpg"
              title="Professional Services"
              features={[
                "Appointment Booking",
                "Client Portfolio",
                "Service Showcase"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Growth Tools Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Built-in Growth Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <GrowthTool
              icon="📈"
              title="SEO Optimization"
              description="Get found on Google with built-in SEO tools"
            />
            <GrowthTool
              icon="📊"
              title="Analytics"
              description="Track performance with Microsoft Clarity integration"
            />
            <GrowthTool
              icon="📧"
              title="Email Marketing"
              description="Build your email list with integrated forms"
            />
            <GrowthTool
              icon="🔒"
              title="Security & Compliance"
              description="SSL certificates and GDPR compliance included"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Launch Your Professional Website?</h2>
          <Link
            to="/templates"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="p-6 bg-white rounded-lg shadow-lg text-center">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const IndustrySolution = ({ image, title, features }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
    <img src={image} alt={title} className="w-full h-48 object-cover" />
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const GrowthTool = ({ icon, title, description }) => (
  <div className="p-6 text-center">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

export default LandingPage;