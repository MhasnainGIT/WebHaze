import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO';

const ServicePage = () => {
  const { slug } = useParams();

  const services = {
    'web-hosting': {
      title: 'Web Hosting Services',
      subtitle: 'Lightning-fast, secure hosting with 99.9% uptime guarantee',
      description: 'Our hosting ensures your website loads quickly and stays online. Perfect for businesses of all sizes.',
      features: [
        { title: 'SSD Storage', description: 'Ultra-fast solid-state drives for optimal performance' },
        { title: 'Free SSL Certificate', description: 'Secure your website with industry-standard encryption' },
        { title: '99.9% Uptime', description: 'Reliable hosting with minimal downtime' },
        { title: '24/7 Support', description: 'Expert technical support whenever you need it' },
        { title: 'Daily Backups', description: 'Automatic backups to keep your data safe' },
        { title: 'CDN Integration', description: 'Global content delivery for faster loading times' }
      ],
      plans: [
        { name: 'Starter', price: '$9.99', features: ['1 Website', '10GB Storage', 'Free SSL'] },
        { name: 'Professional', price: '$19.99', features: ['5 Websites', '50GB Storage', 'Free SSL', 'Priority Support'], popular: true },
        { name: 'Enterprise', price: '$39.99', features: ['Unlimited Websites', '200GB Storage', 'Free SSL', '24/7 Support', 'CDN'] }
      ]
    },
    'website-development': {
      title: 'Website Development',
      subtitle: 'Custom websites that convert visitors into customers',
      description: 'Full-service development from design to deployment. Built with modern technologies and best practices.',
      features: [
        { title: 'Responsive Design', description: 'Websites that look great on all devices' },
        { title: 'SEO Optimized', description: 'Built-in SEO best practices for better search rankings' },
        { title: 'Fast Loading', description: 'Optimized for speed and performance' },
        { title: 'Content Management', description: 'Easy-to-use CMS for content updates' },
        { title: 'E-commerce Ready', description: 'Online store functionality available' },
        { title: 'Analytics Integration', description: 'Track your website performance' }
      ],
      plans: [
        { name: 'Basic', price: '$599', features: ['5 Pages', 'Responsive Design', 'Contact Form'] },
        { name: 'Professional', price: '$1299', features: ['10 Pages', 'CMS', 'SEO Setup', 'Analytics'], popular: true },
        { name: 'Enterprise', price: '$2499', features: ['Unlimited Pages', 'E-commerce', 'Custom Features', 'Priority Support'] }
      ]
    },
    'app-development': {
      title: 'App Development',
      subtitle: 'High-performance mobile and web apps to grow your business',
      description: 'We build scalable apps with great UX that help your business reach more customers.',
      features: [
        { title: 'Cross-Platform', description: 'Apps that work on iOS and Android' },
        { title: 'Native Performance', description: 'Fast, responsive user experience' },
        { title: 'Cloud Integration', description: 'Seamless data synchronization' },
        { title: 'Push Notifications', description: 'Keep users engaged with timely updates' },
        { title: 'Offline Support', description: 'Apps that work without internet connection' },
        { title: 'App Store Deployment', description: 'We handle the app store submission process' }
      ],
      plans: [
        { name: 'MVP', price: '$2999', features: ['Basic Features', 'iOS or Android', '3 Months Support'] },
        { name: 'Professional', price: '$5999', features: ['Advanced Features', 'iOS & Android', '6 Months Support'], popular: true },
        { name: 'Enterprise', price: '$12999', features: ['Custom Features', 'Backend API', '12 Months Support', 'Maintenance'] }
      ]
    }
  };

  const service = services[slug];

  if (!service) {
    return (
      <div className="min-h-screen bg-background pt-32 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
          <Link to="/" className="btn-primary">Go Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-32 overflow-hidden">
      <SEO 
        title={`${service.title} - WebHaze`}
        description={service.subtitle}
      />
      
      <div className="container-site py-20">
        {/* Hero Section */}
        <div className="max-w-4xl mb-24">
          <motion.h1 
            className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {service.title.toUpperCase().split(' ')[0]} <span className="text-liquid">{service.title.toUpperCase().split(' ').slice(1).join(' ')}.</span>
          </motion.h1>
          <motion.p 
            className="text-xl text-text-light max-w-2xl font-medium leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {service.subtitle}
          </motion.p>
        </div>

        {/* Features Bento Grid */}
        <div className="mb-32">
          <h2 className="text-3xl font-bold mb-12 tracking-tight">Technical Architecture</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.features.map((feature, index) => (
              <motion.div 
                key={index} 
                className="glass-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-text-light font-medium text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pricing Section */}
        <div className="mb-32">
          <h2 className="text-3xl font-bold mb-12 tracking-tight">Investment Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {service.plans.map((plan, index) => (
              <motion.div
                key={index}
                className={`glass-card relative flex flex-col h-full ${plan.popular ? 'border-primary/50' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 right-8 bg-secondary text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                
                <div className="mb-10">
                  <h3 className="text-2xl font-bold mb-4 tracking-tight">{plan.name}</h3>
                  <div className="text-5xl font-black mb-4">{plan.price}</div>
                </div>

                <ul className="space-y-4 mb-12 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-text-light gap-3 font-medium">
                      <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link 
                  to="/contact" 
                  className={plan.popular ? "btn-primary w-full" : "btn-secondary w-full"}
                >
                  Initiate Project
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div 
          className="glass-card bg-primary/5 text-center py-20 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
          <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter relative z-10">READY TO <span className="text-liquid">LAUNCH?</span></h2>
          <p className="text-xl text-text-light mb-12 max-w-2xl mx-auto font-medium relative z-10">
            Every great venture begins with a single step. Let's make yours extraordinary.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
            <Link to="/contact" className="btn-primary px-10">
              Start Your Project
            </Link>
            <Link to="/pricing" className="btn-secondary px-10">
              View All Solutions
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ServicePage;