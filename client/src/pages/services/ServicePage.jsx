import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ServicePage = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, [slug]);

  const services = {
    'web-hosting': {
      title: 'Web Hosting Services',
      subtitle: 'Lightning-fast, secure hosting with 99.9% uptime guarantee',
      description: 'Our hosting ensures your website loads quickly and stays online. Perfect for businesses of all sizes.',
      features: [
        { name: 'SSD Storage', description: 'Ultra-fast solid-state drives for optimal performance' },
        { name: 'Free SSL Certificate', description: 'Secure your website with industry-standard encryption' },
        { name: '99.9% Uptime', description: 'Reliable hosting with minimal downtime' },
        { name: '24/7 Support', description: 'Expert technical support whenever you need it' },
        { name: 'Daily Backups', description: 'Automatic backups to keep your data safe' },
        { name: 'CDN Integration', description: 'Global content delivery for faster loading times' }
      ],
      plans: [
        { name: 'Starter', price: '$9.99', features: ['1 Website', '10GB Storage', 'Free SSL'] },
        { name: 'Professional', price: '$19.99', features: ['5 Websites', '50GB Storage', 'Free SSL', 'Priority Support'] },
        { name: 'Enterprise', price: '$39.99', features: ['Unlimited Websites', '200GB Storage', 'Free SSL', '24/7 Support', 'CDN'] }
      ],
      icon: (
        <svg className="w-12 h-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      )
    },
    'website-development': {
      title: 'Website Development',
      subtitle: 'Custom websites that convert visitors into customers',
      description: 'Full-service development from design to deployment. Built with modern technologies and best practices.',
      features: [
        { name: 'Responsive Design', description: 'Websites that look great on all devices' },
        { name: 'SEO Optimized', description: 'Built-in SEO best practices for better search rankings' },
        { name: 'Fast Loading', description: 'Optimized for speed and performance' },
        { name: 'Content Management', description: 'Easy-to-use CMS for content updates' },
        { name: 'E-commerce Ready', description: 'Online store functionality available' },
        { name: 'Analytics Integration', description: 'Track your website performance' }
      ],
      plans: [
        { name: 'Basic', price: '$999', features: ['5 Pages', 'Responsive Design', 'Contact Form'] },
        { name: 'Professional', price: '$1999', features: ['10 Pages', 'CMS', 'SEO Setup', 'Analytics'] },
        { name: 'Enterprise', price: '$3999', features: ['Unlimited Pages', 'E-commerce', 'Custom Features', 'Priority Support'] }
      ],
      icon: (
        <svg className="w-12 h-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    'app-development': {
      title: 'App Development',
      subtitle: 'High-performance mobile and web apps to grow your business',
      description: 'We build scalable apps with great UX that help your business reach more customers.',
      features: [
        { name: 'Cross-Platform', description: 'Apps that work on iOS and Android' },
        { name: 'Native Performance', description: 'Fast, responsive user experience' },
        { name: 'Cloud Integration', description: 'Seamless data synchronization' },
        { name: 'Push Notifications', description: 'Keep users engaged with timely updates' },
        { name: 'Offline Support', description: 'Apps that work without internet connection' },
        { name: 'App Store Deployment', description: 'We handle the app store submission process' }
      ],
      plans: [
        { name: 'MVP', price: '$4999', features: ['Basic Features', 'iOS or Android', '3 Months Support'] },
        { name: 'Professional', price: '$9999', features: ['Advanced Features', 'iOS & Android', '6 Months Support'] },
        { name: 'Enterprise', price: '$19999', features: ['Custom Features', 'Backend API', '12 Months Support', 'Maintenance'] }
      ],
      icon: (
        <svg className="w-12 h-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    }
  };

  const service = services[slug];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Not Found</h1>
          <Link to="/" className="btn-primary">Go Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container-site">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {service.icon}
            </motion.div>
            <motion.h1
              className="text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {service.title}
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {service.subtitle}
            </motion.p>
            <motion.p
              className="text-lg text-gray-700 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {service.description}
            </motion.p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-site">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What's Included</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to succeed with our {service.title.toLowerCase()} service.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.name}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-site">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Flexible pricing options to match your needs and budget.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {service.plans.map((plan, index) => (
              <motion.div
                key={index}
                className={`bg-white border-2 rounded-2xl p-8 ${index === 1 ? 'border-primary scale-105' : 'border-gray-200'}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {index === 1 && (
                  <div className="text-center mb-4">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold text-gray-900">{plan.price}</div>
                </div>
                <ul className="space-y-3 mb-8">
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
                  className={`w-full py-3 px-6 rounded-lg font-medium text-center block transition-colors ${
                    index === 1
                      ? 'bg-primary text-white hover:bg-primary/90'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Get Started
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container-site text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Let's discuss your project and create something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Start Your Project
            </Link>
            <Link to="/pricing" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors">
              View All Plans
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicePage;
