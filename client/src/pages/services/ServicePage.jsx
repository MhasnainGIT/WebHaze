import React from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../../components/SEO';

const ServicePage = () => {
  const { slug } = useParams();

  const services = {
    'web-hosting': {
      title: 'Web Hosting Services',
      subtitle: 'Lightning-fast, secure hosting with 99.9% uptime guarantee',
      description: 'Our hosting ensures your website loads quickly and stays online. Perfect for businesses of all sizes.',
      features: [
        {
          title: 'SSD Storage',
          description: 'Ultra-fast solid-state drives for optimal performance'
        },
        {
          title: 'Free SSL Certificate',
          description: 'Secure your website with industry-standard encryption'
        },
        {
          title: '99.9% Uptime',
          description: 'Reliable hosting with minimal downtime'
        },
        {
          title: '24/7 Support',
          description: 'Expert technical support whenever you need it'
        },
        {
          title: 'Daily Backups',
          description: 'Automatic backups to keep your data safe'
        },
        {
          title: 'CDN Integration',
          description: 'Global content delivery for faster loading times'
        }
      ],
      plans: [
        {
          name: 'Starter',
          price: '$9.99',
          features: ['1 Website', '10GB Storage', 'Free SSL']
        },
        {
          name: 'Professional',
          price: '$19.99',
          features: ['5 Websites', '50GB Storage', 'Free SSL', 'Priority Support'],
          popular: true
        },
        {
          name: 'Enterprise',
          price: '$39.99',
          features: ['Unlimited Websites', '200GB Storage', 'Free SSL', '24/7 Support', 'CDN']
        }
      ]
    },
    'website-development': {
      title: 'Website Development',
      subtitle: 'Custom websites that convert visitors into customers',
      description: 'Full-service development from design to deployment. Built with modern technologies and best practices.',
      features: [
        {
          title: 'Responsive Design',
          description: 'Websites that look great on all devices'
        },
        {
          title: 'SEO Optimized',
          description: 'Built-in SEO best practices for better search rankings'
        },
        {
          title: 'Fast Loading',
          description: 'Optimized for speed and performance'
        },
        {
          title: 'Content Management',
          description: 'Easy-to-use CMS for content updates'
        },
        {
          title: 'E-commerce Ready',
          description: 'Online store functionality available'
        },
        {
          title: 'Analytics Integration',
          description: 'Track your website performance'
        }
      ],
      plans: [
        {
          name: 'Basic',
          price: '$599',
          features: ['5 Pages', 'Responsive Design', 'Contact Form']
        },
        {
          name: 'Professional',
          price: '$1299',
          features: ['10 Pages', 'CMS', 'SEO Setup', 'Analytics'],
          popular: true
        },
        {
          name: 'Enterprise',
          price: '$2499',
          features: ['Unlimited Pages', 'E-commerce', 'Custom Features', 'Priority Support']
        }
      ]
    },
    'app-development': {
      title: 'App Development',
      subtitle: 'High-performance mobile and web apps to grow your business',
      description: 'We build scalable apps with great UX that help your business reach more customers.',
      features: [
        {
          title: 'Cross-Platform',
          description: 'Apps that work on iOS and Android'
        },
        {
          title: 'Native Performance',
          description: 'Fast, responsive user experience'
        },
        {
          title: 'Cloud Integration',
          description: 'Seamless data synchronization'
        },
        {
          title: 'Push Notifications',
          description: 'Keep users engaged with timely updates'
        },
        {
          title: 'Offline Support',
          description: 'Apps that work without internet connection'
        },
        {
          title: 'App Store Deployment',
          description: 'We handle the app store submission process'
        }
      ],
      plans: [
        {
          name: 'MVP',
          price: '$2999',
          features: ['Basic Features', 'iOS or Android', '3 Months Support']
        },
        {
          name: 'Professional',
          price: '$5999',
          features: ['Advanced Features', 'iOS & Android', '6 Months Support'],
          popular: true
        },
        {
          name: 'Enterprise',
          price: '$12999',
          features: ['Custom Features', 'Backend API', '12 Months Support', 'Maintenance']
        }
      ]
    }
  };

  const service = services[slug];

  if (!service) {
    return (
      <div className="min-h-screen bg-black text-white pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
          <Link to="/" className="btn-primary">Go Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <SEO 
        title={`${service.title} - WebHaze`}
        description={service.subtitle}
      />
      
      <div className="container-site py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black mb-6">
            {service.title}
          </h1>
          <p className="text-xl text-gray-300 mb-4 max-w-3xl mx-auto">
            {service.subtitle}
          </p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {service.description}
          </p>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What's Included</h2>
            <p className="text-gray-400">Everything you need to succeed with our {service.title.toLowerCase()} service.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.features.map((feature, index) => (
              <div key={index} className="bg-white/5 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
            <p className="text-gray-400">Flexible pricing options to match your needs and budget.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {service.plans.map((plan, index) => (
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
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-4xl font-black mb-4">{plan.price}</div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="text-gray-300">{feature}</li>
                  ))}
                </ul>

                <Link 
                  to="/contact" 
                  className={`block w-full py-3 px-6 rounded-lg font-semibold text-center transition-colors ${
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
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white/5 rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-gray-400 mb-8">
            Let's discuss your project and create something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary">
              Start Your Project
            </Link>
            <Link to="/pricing" className="btn-secondary">
              View All Plans
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;