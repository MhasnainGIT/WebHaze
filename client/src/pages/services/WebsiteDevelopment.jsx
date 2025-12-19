import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO';
import Snowfall from 'react-snowfall';

const WebsiteDevelopment = () => {
  const services = [
    {
      title: "Custom Website Design",
      description: "Unique, responsive designs tailored to your brand",
      price: "Starting at $999"
    },
    {
      title: "E-commerce Development",
      description: "Full-featured online stores with payment integration",
      price: "Starting at $1999"
    },
    {
      title: "CMS Development",
      description: "Easy-to-manage content management systems",
      price: "Starting at $1499"
    },
    {
      title: "Website Redesign",
      description: "Modernize your existing website",
      price: "Starting at $799"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-24 relative">
      <Snowfall />
      <SEO 
        title="Website Development - WebHaze"
        description="Professional website development services. Custom designs, e-commerce solutions, and modern web applications."
      />
      
      <div className="container-site py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black mb-4">
            Website <span className="text-white/60">Development</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Professional website development services with modern designs, responsive layouts, and cutting-edge technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="p-8 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-gray-400 mb-6">{service.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold">{service.price}</span>
                <Link 
                  to="/contact" 
                  className="px-6 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300"
                >
                  Get Quote
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link 
            to="/contact" 
            className="inline-block px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300 font-semibold"
          >
            Start Your Project
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WebsiteDevelopment;