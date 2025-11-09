import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SEO from '../components/SEO';

const AnimatedSection = ({ children, className = "", animation = "slideUp" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const animations = {
    slideUp: { initial: { opacity: 0, y: 100 }, animate: { opacity: 1, y: 0 } },
    slideLeft: { initial: { opacity: 0, x: -100 }, animate: { opacity: 1, x: 0 } },
    slideRight: { initial: { opacity: 0, x: 100 }, animate: { opacity: 1, x: 0 } },
    scale: { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 } },
    rotate: { initial: { opacity: 0, rotateY: -45 }, animate: { opacity: 1, rotateY: 0 } }
  };
  
  return (
    <motion.div
      ref={ref}
      initial={animations[animation].initial}
      animate={isInView ? animations[animation].animate : animations[animation].initial}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Hero = () => {
  const { user } = useAuth();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div style={{ y, opacity }} className="w-full pt-32">
        <div className="container-site">
          <div className="max-w-6xl mx-auto text-center">
            {/* <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-8"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black text-sm font-bold">
                  MH
                </div>
                <span className="text-gray-400 text-sm">Mohammed Hasnain</span>
              </div>
            </motion.div> */}

            <motion.h1
              className="text-4xl md:text-6xl lg:text-8xl font-black leading-[0.9] mb-8 tracking-tight mt-8"
              initial={{ opacity: 0, y: 100, rotateX: -45, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ perspective: '1000px' }}
              whileInView={{ 
                rotateY: [0, 5, -5, 0],
                transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <motion.span 
                className="block text-white"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                LAUNCH YOUR WEBSITE
              </motion.span>
              <motion.span 
                className="block text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                IN 48 HOURS
              </motion.span>
            </motion.h1>
            
            <motion.div
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full text-lg font-bold mb-8 inline-block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              whileHover={{ scale: 1.05 }}
            >
              🚀 Limited Time: 50% OFF Launch Week!
            </motion.div>



            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-6 max-w-4xl mx-auto leading-relaxed font-medium"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              From concept to live website in just 48 hours. No coding required.
            </motion.p>
            
            <motion.p
              className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              Join 500+ businesses worldwide who chose WebHaze for lightning-fast hosting, professional design, and 24/7 expert support.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to={user ? "/contact" : "/signup"} 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-bold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 inline-flex items-center gap-2"
                >
                  🚀 Launch My Website Now
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/pricing" 
                  className="border-2 border-white/30 hover:border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 inline-flex items-center gap-2"
                >
                  💰 View Pricing (50% OFF)
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
            >
              {[
                { value: "500+", label: "Websites Built", icon: "🌐" },
                { value: "48hrs", label: "Average Launch", icon: "⚡" },
                { value: "25+", label: "Countries Served", icon: "🌍" },
                { value: "99.9%", label: "Uptime Guarantee", icon: "🛡️" }
              ].map((item, index) => (
                <motion.div 
                  key={index} 
                  className="text-center"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <div className="text-2xl md:text-3xl font-bold mb-2 text-white">{item.value}</div>
                  <div className="text-sm text-gray-300 font-medium">{item.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const TrustIndicators = () => {
  return (
    <AnimatedSection className="py-16 border-b border-white/10">
      <div className="container-site">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 text-lg mb-8">Trusted by businesses worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60">
            {[
              "TechFlow Solutions", "Bella Vista Restaurant", "GreenLeaf Consulting", 
              "Urban Threads", "Digital Dynamics", "Creative Studios"
            ].map((company, index) => (
              <motion.div
                key={index}
                className="text-white/70 font-semibold text-lg tracking-wide"
                whileHover={{ scale: 1.1, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {company}
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <motion.div
            className="p-6 glass-morphism rounded-xl"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-bold mb-2">48-Hour Launch</h3>
            <p className="text-gray-400">From concept to live website in just 2 days</p>
          </motion.div>
          
          <motion.div
            className="p-6 glass-morphism rounded-xl"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-4xl mb-4">📞</div>
            <h3 className="text-xl font-bold mb-2">WhatsApp Support</h3>
            <p className="text-gray-400">Direct line to our Hyderabad-based team</p>
          </motion.div>
          
          <motion.div
            className="p-6 glass-morphism rounded-xl"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-bold mb-2">Money-Back Guarantee</h3>
            <p className="text-gray-400">30-day full refund if not satisfied</p>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
};

const Features = () => {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "99.9% Uptime Guarantee",
      description: "Your site stays online, all the time performance you can trust."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "Free SSL Certificate",
      description: "Protect your visitors and boost trust with built-in SSL encryption."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
        </svg>
      ),
      title: "24/7 Expert Support",
      description: "Our friendly team is here for you anytime, day or night."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Lightning-Fast SSD Storage",
      description: "We deliver lightning-fast load times with SSD storage."
    }
  ];

  return (
    <AnimatedSection className="py-24">
      <div className="container-site">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Secure, scalable, and reliable hosting services
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="text-center p-6 border border-white/10 rounded-lg hover:border-white/30 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center text-white">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

const Services = () => {
  const services = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Free Website Builder with AI",
      description: "Best free website builder in India with AI-powered tools. Create professional business websites with drag-and-drop editor."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      ),
      title: "Web Hosting & Free Domain",
      description: "Lightning-fast hosting with free domain registration. Perfect for businesses worldwide with 99.9% uptime guarantee."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Website Maintenance Services",
      description: "Affordable website maintenance packages for global clients. Keep your website secure, updated, and optimized with 24/7 support."
    }
  ];

  return (
    <AnimatedSection id="services" className="py-24">
      <div className="container-site">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">WebHaze Services</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            WebHaze provides comprehensive Website-as-a-Service solutions to power your online success. From lightning-fast hosting to custom development, we've got you covered.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="p-8 border border-white/10 rounded-lg hover:border-white/30 transition-colors flex flex-col h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 mb-6 bg-white/10 rounded-lg flex items-center justify-center text-white">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
              <p className="text-gray-400 flex-grow">{service.description}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center">
          <Link to="/pricing" className="btn-primary">
            Explore Hosting Plans
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Choose a Plan",
      description: "Pick the hosting plan that fits your website's needs and budget."
    },
    {
      number: "02",
      title: "Set Up Instantly",
      description: "Get started right away with easy setup and 1-click app installs."
    },
    {
      number: "03",
      title: "We Launch Your Website",
      description: "Go live with fast, secure, and reliable hosting—backed by expert support."
    }
  ];

  return (
    <AnimatedSection className="py-24">
      <div className="container-site">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">How it works</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            From choosing a package to ongoing support, our streamlined process makes launching your custom website simple, fast, and stress-free.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

const MaintenanceServices = () => {
  const plans = [
    {
      title: "Basic Maintenance Package",
      price: "₹999/month",
      features: [
        "Website security updates",
        "Content updates (5 pages)",
        "Performance monitoring",
        "Monthly backup",
        "Email support"
      ]
    },
    {
      title: "Professional Maintenance",
      price: "₹2499/month",
      features: [
        "All basic features",
        "SEO optimization",
        "Analytics reporting",
        "Weekly backups",
        "Priority support",
        "Plugin updates"
      ]
    },
    {
      title: "Enterprise Maintenance",
      price: "₹4999/month",
      features: [
        "All professional features",
        "24/7 monitoring",
        "Daily backups",
        "Security scanning",
        "Performance optimization",
        "Dedicated support manager"
      ]
    }
  ];

  return (
    <AnimatedSection className="py-24">
      <div className="container-site">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Website Maintenance Services Worldwide</h2>
          <p className="text-lg text-gray-400 max-w-4xl mx-auto">
            Affordable website maintenance packages with transparent pricing for clients worldwide. Serving USA, Canada, UK, Germany, Australia and globally. Keep your website secure, updated, and performing at its best.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className="p-8 border border-white/10 rounded-lg hover:border-white/30 transition-colors flex flex-col h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
                <div className="text-2xl font-bold">{plan.price}</div>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-300">
                    <svg className="w-5 h-5 text-white mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <Link to="/contact" className="btn-primary w-full text-center">
                  Get Started
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

const Benefits = () => {
  const benefits = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      title: "Build professional trust",
      description: "Establish credibility with professional templates, a custom domain, and GDPR compliance for legal peace of mind."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        </svg>
      ),
      title: "Build your brand",
      description: "Personalise your website, add your images, content, and make it remarkably yours."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      title: "Be found online",
      description: "Boost visibility with SEO tools and automatic business listings, so people can find you or your service instantly."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Get your next customer",
      description: "Add forms, contact options, and engaging calls-to-action to turn visitors into real leads."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      title: "Sell more, sell faster",
      description: "Use booking tools or set up an online shop to get more sales."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2l3 3" />
        </svg>
      ),
      title: "Safe and secure",
      description: "Built with security in mind, WebHaze ensures your website complies with the highest privacy standards."
    }
  ];

  return (
    <AnimatedSection className="py-24">
      <div className="container-site">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Why choose WebHaze?</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Everything you need to build, grow, and succeed online.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="p-6 border border-white/10 rounded-lg hover:border-white/30 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-14 h-14 bg-white/10 rounded-lg flex items-center justify-center mb-4 text-white">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-semibold mb-3">{benefit.title}</h3>
              <p className="text-gray-400">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      quote: "WebHaze transformed our online presence completely. Our website now loads faster, looks professional, and we've seen a 40% increase in customer inquiries since launch.",
      author: "Sarah Mitchell",
      role: "CEO, TechFlow Solutions",
      stars: 5
    },
    {
      quote: "The team at WebHaze delivered exactly what we needed - a modern, responsive website that showcases our restaurant perfectly. Online orders have doubled!",
      author: "Marco Rodriguez",
      role: "Owner, Bella Vista Restaurant",
      stars: 5
    },
    {
      quote: "Professional service from start to finish. WebHaze understood our vision and created a website that perfectly represents our brand. Highly recommended!",
      author: "Jennifer Chen",
      role: "Founder, GreenLeaf Consulting",
      stars: 5
    },
    {
      quote: "WebHaze made the entire process seamless. From design to deployment, everything was handled professionally. Our e-commerce site is performing beyond expectations.",
      author: "David Thompson",
      role: "Director, Urban Threads",
      stars: 5
    }
  ];

  return (
    <AnimatedSection className="py-24 overflow-hidden">
      <div className="container-site">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Real stories from businesses that transformed their online presence with WebHaze.
          </p>
        </div>
        <div className="relative">
          <motion.div
            className="flex gap-8"
            animate={{ x: ["-100%", "0%"] }}
            transition={{
              duration: window.innerWidth < 768 ? 10 : 30,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <motion.div
                key={index}
                className="flex-none w-[400px] p-8 glass-morphism rounded-lg"
                whileHover={{ scale: 1.05, rotateY: 5 }}
                transition={{ duration: 0.3 }}
                style={{ perspective: '1000px' }}
              >
                <div className="flex gap-1 text-yellow-400 mb-4">
                  {Array(testimonial.stars).fill("★").map((star, i) => (
                    <span key={i}>{star}</span>
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">{testimonial.quote}</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
};

const HostingPlans = () => {
  const plans = [
    {
      name: "Shared Hosting",
      price: "$4.99",
      description: "Launch your website without the hassle. Our shared hosting offers everything you need speed, security, and simplicity.",
      features: [
        "Host 1 Websites",
        "5GB SSD Disk Space",
        "Unmetered Bandwidth",
        "2 Emails Accounts",
        "2 Sub domains",
        "24/7 Technical Support",
        "99.9% Uptime Guarantee",
        "Free SSL Certificate",
        "24/7 Auto Backups"
      ]
    },
    {
      name: "E-commerce Hosting",
      price: "$12.99",
      description: "Start selling online with confidence. Our e-commerce hosting delivers the speed, security, and tools your store needs.",
      features: [
        "Host 1 Websites",
        "25 GB SSD Disk Space",
        "Unmetered Bandwidth",
        "4 Emails Accounts",
        "2 Sub domains",
        "24/7 Technical Support",
        "WooCommerce acceleration (LiteSpeed)",
        "Free SSL Certificate",
        "24/7 Auto Backups"
      ],
      popular: true
    },
    {
      name: "WordPress Hosting",
      price: "$7.99",
      description: "Build faster with ease. Our WordPress hosting is optimized for speed, security, and effortless site management.",
      features: [
        "Host 1 Websites",
        "7GB SSD Disk Space",
        "Unmetered Bandwidth",
        "2 Emails Accounts",
        "2 Sub domains",
        "24/7 Technical Support",
        "WordPress acceleration (LiteSpeed)",
        "Free SSL Certificate",
        "24/7 Auto Backups"
      ]
    }
  ];

  return (
    <AnimatedSection className="py-24">
      <div className="container-site">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Choose Your Plan</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Simple, transparent pricing that grows with you. Try any plan free for 30 days.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`p-8 border rounded-lg transition-all duration-300 relative flex flex-col h-full ${
                plan.popular 
                  ? 'border-white bg-white/5 scale-105' 
                  : 'border-white/10 hover:border-white/30'
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100, rotateY: -30 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              style={{ perspective: '1000px' }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-lg font-bold mb-2">Starting from {plan.price}</p>
                <p className="text-gray-400 text-sm">{plan.description}</p>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-300">
                    <svg className="w-5 h-5 text-white mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <Link to="/contact" className="btn-primary w-full text-center">
                  Contact Us
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            Custom pricing available • Contact us for detailed quotes • Flexible payment options
          </p>
        </div>
      </div>
    </AnimatedSection>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = React.useState(null);
  
  const faqs = [
    {
      question: "Do you offer domain registration services?",
      answer: "Yes, we offer comprehensive domain registration services. You can register new domains, transfer existing ones, and manage all your domains through our user-friendly control panel."
    },
    {
      question: "Can I launch my site with your hosting?",
      answer: "Absolutely! Our hosting plans are designed to get your website online quickly. We offer one-click installations for popular platforms like WordPress."
    },
    {
      question: "How do I get started with WebHaze?",
      answer: "Getting started is easy! Simply choose your hosting plan, register or transfer your domain, and our WebHaze platform will guide you through the setup process."
    },
    {
      question: "Do you offer website design with hosting?",
      answer: "Yes, we provide complete website design services alongside our hosting packages. Our professional design team can create custom websites tailored to your brand."
    },
    {
      question: "Is domain management included?",
      answer: "Domain management is included with all our hosting plans. You can manage DNS settings, set up subdomains, configure email forwarding, and handle domain renewals."
    },
    {
      question: "Can I contact support through WhatsApp?",
      answer: "Yes, we offer multiple support channels including WhatsApp for quick assistance. You can also reach our 24/7 support team via live chat, email, or phone."
    }
  ];

  return (
    <AnimatedSection className="py-24">
      <div className="container-site">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Your hosting queries answered</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            We understand that choosing the right hosting provider is a crucial decision for your online presence. To help you make an informed choice, we have compiled a list of common questions asked.
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="border border-white/10 rounded-lg mb-4 overflow-hidden hover:border-white/30 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <span className="font-semibold pr-4">{faq.question}</span>
                <svg
                  className={`w-5 h-5 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5">
                  <div className="border-t border-white/10 pt-4">
                    <p className="text-gray-400">{faq.answer}</p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

const WhyChoose = () => {
  return (
    <AnimatedSection className="py-24">
      <div className="container-site">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Choose WebHaze?</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            We're not just another hosting provider. We're your digital growth partner.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <h3 className="text-xl font-semibold">Lightning Fast Performance</h3>
            </div>
            <p className="text-gray-400 mb-6">
              Our optimized servers and CDN ensure your website loads in under 2 seconds, keeping your visitors engaged and improving your search rankings.
            </p>
            
            <div className="flex items-center gap-3 mb-4">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <h3 className="text-xl font-semibold">Enterprise-Grade Security</h3>
            </div>
            <p className="text-gray-400">
              Advanced security measures including SSL certificates, DDoS protection, and regular security updates keep your website and data safe.
            </p>
          </div>
          
          <div>
            <div className="flex items-center gap-3 mb-4">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
              <h3 className="text-xl font-semibold">Scalable Solutions</h3>
            </div>
            <p className="text-gray-400 mb-6">
              Start small and grow big. Our infrastructure scales with your business, handling traffic spikes without breaking a sweat.
            </p>
            
            <div className="flex items-center gap-3 mb-4">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
              </svg>
              <h3 className="text-xl font-semibold">Expert Support</h3>
            </div>
            <p className="text-gray-400">
              Our team of experts is available 24/7 to help you succeed. From technical issues to growth strategies, we've got you covered.
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

const GetStarted = () => {
  const { user } = useAuth();
  
  return (
    <AnimatedSection className="py-24 bg-black text-white">
      <div className="container-site text-center">
        <motion.h2 
          className="text-3xl md:text-5xl font-bold mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Ready to Build with WebHaze?
        </motion.h2>
        <motion.p 
          className="text-lg text-gray-400 mb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Join thousands of businesses worldwide that trust WebHaze's Website-as-a-Service platform for their professional online presence.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link to={user ? "/contact" : "/signup"} className="btn-primary">
            Start Building Your Website
          </Link>
          <Link to="/contact" className="btn-secondary">
            Contact WebHaze Team
          </Link>
        </motion.div>
      </div>
    </AnimatedSection>
  );
};

const Home = () => {
  return (
    <div className="relative">
      <SEO 
        title="WebHaze - Website-as-a-Service Platform | Professional Web Development & Hosting"
        description="WebHaze is a scalable Website-as-a-Service platform that enables businesses to build, customize, and deploy professional websites rapidly."
        keywords="WebHaze, website-as-a-service, professional web development, website hosting"
        canonical="/"
      />
      
      <Hero />
      <TrustIndicators />
      <Features />
      <Services />
      <HowItWorks />
      <MaintenanceServices />
      <Benefits />
      <Testimonials />
      <HostingPlans />
      <FAQ />
      <WhyChoose />
      <GetStarted />
    </div>
  );
};

export default Home;