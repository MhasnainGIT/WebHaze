import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SEO from '../components/SEO';

const MotionLink = motion(Link);

const GradientBackground = () => (
    <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(11,97,255,0.08)_0%,rgba(11,97,255,0)_50%)]" />
        <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(11,155,255,0.08)_0%,rgba(11,155,255,0)_50%)]" />
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(0,196,140,0.08)_0%,rgba(0,196,140,0)_50%)]" />
    </div>
);

const FloatingGraphic = ({ children, delay = 0 }) => (
    <motion.div
        initial={{ y: 0 }}
        animate={{
            y: [0, -15, 0],
            transition: {
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay
            }
        }}
    >
        {children}
    </motion.div>
);

const ServiceCard = ({ icon, title, description }) => (
    <motion.div
        className="relative group"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
    >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-primary/0 rounded-2xl transform -rotate-1 backdrop-blur-sm" />
        <div className="relative p-6 sm:p-8 bg-white/60 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20">
            <div className="w-14 h-14 mb-6 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-md flex items-center justify-center">
                {icon}
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3">{title}</h3>
            <p className="text-sm sm:text-base text-gray-600">{description}</p>
        </div>
    </motion.div>
);

const Hero = () => {
    const { user } = useAuth();
    
    const scrollToServices = (e) => {
        e.preventDefault();
        const el = document.getElementById('services');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className="relative min-h-[90vh] flex items-center">
            <GradientBackground />

            <div className="container-site">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h1
                        className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight mb-4 sm:mb-6 mt-20 sm:mt-24 lg:mt-32 px-4 sm:px-0"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Best Free Website Builder with AI - Create Business Websites with{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                            WebHaze
                        </span>
                    </motion.h1>

                    <motion.p
                        className="text-lg sm:text-xl lg:text-2xl text-gray-700 mb-4 sm:mb-6 font-semibold px-4 sm:px-0"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Fast. Secure. Reliable.
                    </motion.p>

                    <motion.p
                        className="text-base sm:text-lg lg:text-xl text-gray-600 mb-8 sm:mb-12 leading-relaxed max-w-3xl mx-auto px-4 sm:px-0"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        Free website builder with AI-powered tools, free domain, and affordable website maintenance packages. 
                        Create professional business websites in India with our online website builder. 
                        Website maintenance cost starting ₹999/month with 24/7 support.
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <Link to={user ? "/contact" : "/signup"} className="btn-primary">
                            {user ? "Get Started" : "Start now"}
                        </Link>
                        <button onClick={scrollToServices} className="btn-secondary">
                            Learn more
                        </button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

const Testimonials = () => {
    const testimonials = [
        {
            quote: "WebHaze transformed our online presence completely. Our website now loads faster, looks professional, and we've seen a 40% increase in customer inquiries since launch.",
            author: "Sarah Mitchell",
            role: "CEO, TechFlow Solutions",
            stars: 5,
            icon: (
                <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                </svg>
            )
        },
        {
            quote: "The team at WebHaze delivered exactly what we needed - a modern, responsive website that showcases our restaurant perfectly. Online orders have doubled!",
            author: "Marco Rodriguez",
            role: "Owner, Bella Vista Restaurant",
            stars: 5,
            icon: (
                <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                </svg>
            )
        },
        {
            quote: "Professional service from start to finish. WebHaze understood our vision and created a website that perfectly represents our brand. Highly recommended!",
            author: "Jennifer Chen",
            role: "Founder, GreenLeaf Consulting",
            stars: 5,
            icon: (
                <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
            )
        },
        {
            quote: "WebHaze made the entire process seamless. From design to deployment, everything was handled professionally. Our e-commerce site is performing beyond expectations.",
            author: "David Thompson",
            role: "Director, Urban Threads",
            stars: 5,
            icon: (
                <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V7l-7-5z" clipRule="evenodd"/>
                </svg>
            )
        }
    ];

    return (
        <section className="py-12 sm:py-16 lg:py-24 bg-gray-50 relative">
            <div className="container-site">
                <div className="text-center mb-12 sm:mb-16 px-4 sm:px-0">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                        What Our Clients Say
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
                        Real stories from businesses that transformed their online presence with WebHaze.
                    </p>
                </div>

                <div className="relative">
                    {/* Left blur gradient - outer */}
                    <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-50 via-gray-50/90 to-gray-50/20 z-20 pointer-events-none"></div>
                    {/* Left blur gradient - inner */}
                    <div className="absolute left-6 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-50/60 via-gray-50/30 to-transparent z-10 pointer-events-none backdrop-blur-md"></div>
                    
                    {/* Right blur gradient - outer */}
                    <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-50 via-gray-50/90 to-gray-50/20 z-20 pointer-events-none"></div>
                    {/* Right blur gradient - inner */}
                    <div className="absolute right-6 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-50/60 via-gray-50/30 to-transparent z-10 pointer-events-none backdrop-blur-md"></div>
                    
                    <div className="overflow-hidden mask-gradient">
                        <motion.div
                            className="flex gap-6"
                            animate={{ x: ["0%", "-100%"] }}
                            transition={{
                                duration: 20,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        >
                            {[...testimonials, ...testimonials].map((testimonial, index) => (
                                <motion.div
                                    key={index}
                                    className="flex-none w-[300px] sm:w-[400px] relative group"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-white/30 rounded-2xl backdrop-blur-2xl transform -rotate-1" />
                                    <div className="relative p-4 sm:p-6 lg:p-8 bg-white/30 backdrop-blur-3xl rounded-2xl shadow-xl border border-white/30">
                                        <div className="flex gap-1 text-yellow-400 mb-4 relative backdrop-blur-lg">
                                            {Array(testimonial.stars).fill("★").map((star, i) => (
                                                <span key={i}>{star}</span>
                                            ))}
                                        </div>
                                        <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-4 sm:mb-6 min-h-[100px] sm:min-h-[120px] relative backdrop-blur-xl">{testimonial.quote}</p>
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white/40 backdrop-blur-2xl rounded-full flex items-center justify-center border border-white/40">
                                                {testimonial.icon}
                                            </div>
                                            <div className="relative backdrop-blur-xl">
                                                <p className="text-sm sm:text-base font-semibold">{testimonial.author}</p>
                                                <p className="text-gray-600 text-xs sm:text-sm">{testimonial.role}</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Services = () => {
    const services = [
        {
            icon: (
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            title: "Free Website Builder with AI",
            description: "Best free website builder in India with AI-powered tools. Create professional business websites with drag-and-drop editor."
        },
        {
            icon: (
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
            ),
            title: "Web Hosting & Free Domain",
            description: "Lightning-fast hosting with free domain registration. Perfect for small businesses in India with 99.9% uptime guarantee."
        },
        {
            icon: (
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            title: "Website Maintenance Services",
            description: "Affordable website maintenance packages starting ₹999/month. Keep your website secure, updated, and optimized."
        }
    ];

    return (
        <section id="services" className="py-24 bg-white relative">
            <div className="container-site">
                <div className="text-center mb-12 sm:mb-16 px-4 sm:px-0">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                        Our Services
                    </h2>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        From hosting to development, we provide comprehensive solutions to power your online success.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <ServiceCard {...service} />
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link to="/pricing" className="btn-primary">
                        Explore Hosting Plans
                    </Link>
                </div>
                
                {/* Structured Data for Services */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "serviceType": "Web Hosting Services",
                        "provider": {
                            "@type": "Organization",
                            "name": "WebHaze",
                            "url": "https://webhaze.com"
                        },
                        "hasOfferCatalog": {
                            "@type": "OfferCatalog",
                            "name": "Web Hosting Plans",
                            "itemListElement": [
                                {
                                    "@type": "Offer",
                                    "itemOffered": {
                                        "@type": "Service",
                                        "name": "Shared Hosting",
                                        "description": "Lightning-fast, secure hosting with 99.9% uptime guarantee"
                                    }
                                },
                                {
                                    "@type": "Offer",
                                    "itemOffered": {
                                        "@type": "Service",
                                        "name": "Website Development",
                                        "description": "Custom websites that convert visitors into customers"
                                    }
                                },
                                {
                                    "@type": "Offer",
                                    "itemOffered": {
                                        "@type": "Service",
                                        "name": "Mobile App Development",
                                        "description": "High-performance mobile and web apps that scale"
                                    }
                                }
                            ]
                        }
                    })}
                </script>
            </div>
        </section>
    );
};

const HostingPlans = () => {
    const plans = [
        {
            name: "Shared Hosting",
            price: "$2",
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
            ],
            popular: false
        },
        {
            name: "E-commerce Hosting",
            price: "$4.8",
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
            price: "$3",
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
            ],
            popular: false
        }
    ];

    return (
        <section id="hosting-plans" className="py-12 sm:py-16 lg:py-24 bg-white">
            <div className="container-site">
                <div className="text-center mb-12 sm:mb-16 px-4 sm:px-0">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                        Choose Your Plan
                    </h2>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
                        Simple, transparent pricing that grows with you. Try any plan free for 30 days.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            className={`relative p-4 sm:p-6 lg:p-8 rounded-3xl border transition-all duration-300 ${
                                plan.popular 
                                    ? 'border-primary bg-primary/5 shadow-2xl scale-105' 
                                    : 'border-gray-200 bg-white shadow-lg hover:shadow-xl'
                            }`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <span className="bg-primary text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                                        Most Popular
                                    </span>
                                </div>
                            )}
                            
                            <div className="text-center mb-6">
                                <h3 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900">{plan.name}</h3>
                                <p className="text-lg sm:text-xl font-bold text-primary mb-2">Starting from {plan.price}</p>
                                <p className="text-gray-600 text-sm leading-relaxed">{plan.description}</p>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center text-gray-700">
                                        <svg className="w-5 h-5 text-primary mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link to="/contact" className={`block w-full py-4 px-6 rounded-xl font-semibold transition-all duration-200 text-center ${
                                plan.popular
                                    ? 'bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-xl'
                                    : 'bg-gray-900 text-white hover:bg-gray-800'
                            }`}>
                                Contact Us
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <p className="text-gray-500 text-sm">
                        Custom pricing available • Contact us for detailed quotes • Flexible payment options
                    </p>
                </div>
            </div>
        </section>
    );
};

const LearnMore = () => {
    return (
        <section id="learn-more" className="py-12 sm:py-16 lg:py-24 bg-white">
            <div className="container-site">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-0">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                        Why Choose WebHaze?
                    </h2>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-8 sm:mb-12">
                        We're not just another hosting provider. We're your digital growth partner.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 text-left">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                <h3 className="text-lg sm:text-xl font-semibold">Lightning Fast Performance</h3>
                            </div>
                            <p className="text-sm sm:text-base text-gray-600 mb-6">
                                Our optimized servers and CDN ensure your website loads in under 2 seconds, 
                                keeping your visitors engaged and improving your search rankings.
                            </p>
                            
                            <div className="flex items-center gap-3 mb-4">
                                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                <h3 className="text-lg sm:text-xl font-semibold">Enterprise-Grade Security</h3>
                            </div>
                            <p className="text-sm sm:text-base text-gray-600">
                                Advanced security measures including SSL certificates, DDoS protection, 
                                and regular security updates keep your website and data safe.
                            </p>
                        </div>
                        
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                                </svg>
                                <h3 className="text-lg sm:text-xl font-semibold">Scalable Solutions</h3>
                            </div>
                            <p className="text-sm sm:text-base text-gray-600 mb-6">
                                Start small and grow big. Our infrastructure scales with your business, 
                                handling traffic spikes without breaking a sweat.
                            </p>
                            
                            <div className="flex items-center gap-3 mb-4">
                                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                                </svg>
                                <h3 className="text-lg sm:text-xl font-semibold">Expert Support</h3>
                            </div>
                            <p className="text-sm sm:text-base text-gray-600">
                                Our team of experts is available 24/7 to help you succeed. 
                                From technical issues to growth strategies, we've got you covered.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const GetStarted = () => {
    const { user } = useAuth();
    
    return (
        <section id="get-started" className="py-12 sm:py-16 lg:py-24 bg-gradient-to-r from-primary to-secondary text-white">
            <div className="container-site text-center px-4 sm:px-0">
                <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                    Ready to Get Started?
                </h2>
                <p className="text-base sm:text-lg lg:text-xl mb-8 opacity-90">
                    Join thousands of businesses that trust WebHaze for their online presence.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to={user ? "/contact" : "/signup"} className="bg-white text-primary px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm sm:text-base">
                        Get Started
                    </Link>
                    <Link to="/contact" className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors text-sm sm:text-base">
                        Talk to Sales
                    </Link>
                </div>
            </div>
        </section>
    );
};

const Features = () => {
    const features = [
        {
            icon: (
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            title: "99.9% Uptime Guarantee",
            description: "Your site stays online, all the time performance you can trust."
        },
        {
            icon: (
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            ),
            title: "Free SSL Certificate",
            description: "Protect your visitors and boost trust with built-in SSL encryption."
        },
        {
            icon: (
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                </svg>
            ),
            title: "24/7 Expert Support",
            description: "Our friendly team is here for you anytime, day or night."
        },
        {
            icon: (
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            title: "Lightning-Fast SSD Storage",
            description: "We deliver lightning-fast load times with SSD storage."
        }
    ];

    return (
        <section className="py-12 sm:py-16 lg:py-24 bg-gray-50">
            <div className="container-site">
                <div className="text-center mb-12 sm:mb-16 px-4 sm:px-0">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                        Secure, scalable, and reliable hosting services
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="text-center p-6 bg-white rounded-xl shadow-sm">
                            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">{feature.icon}</div>
                            <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                            <p className="text-gray-600 text-sm">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
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
        <section className="py-12 sm:py-16 lg:py-24 bg-white">
            <div className="container-site">
                <div className="text-center mb-12 sm:mb-16 px-4 sm:px-0">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                        How it works
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
                        From choosing a package to ongoing support, our streamlined process makes launching your custom website simple, fast, and stress-free.
                    </p>
                </div>
                
                <div className="max-w-4xl mx-auto relative overflow-hidden">
                    {/* Continuous line behind all steps */}
                    <div className="hidden md:block absolute top-8 left-1/6 right-1/6 h-0.5 overflow-hidden rounded-full">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-primary/40 to-primary/30 rounded-full" />
                        <motion.div 
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary via-blue-500 to-transparent w-1/4 rounded-full shadow-sm"
                            animate={{ x: ['-100%', '400%'] }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                    </div>
                    
                    {/* Blurry animated background */}
                    <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/8 to-transparent blur-3xl opacity-40 rounded-full w-[150%] h-32 top-1/2 -translate-y-1/2 -left-1/4"
                        animate={{ x: ['-20%', '20%'] }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut"
                        }}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                className="text-center relative"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="relative mb-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto shadow-lg relative z-10">
                                        {step.number}
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold mb-3 text-gray-900">{step.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const WebsiteMaintenance = () => {
    const maintenanceServices = [
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
        <section className="py-12 sm:py-16 lg:py-24 bg-white">
            <div className="container-site">
                <div className="text-center mb-12 sm:mb-16 px-4 sm:px-0">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                        Website Maintenance Services in India
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
                        Affordable website maintenance packages with transparent pricing. Keep your website secure, updated, and performing at its best.
                    </p>
                </div>
                
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                        {maintenanceServices.map((service, index) => (
                            <motion.div
                                key={index}
                                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                            >
                                <div className="text-center mb-6">
                                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                                    <div className="text-2xl font-bold text-primary mb-4">{service.price}</div>
                                </div>
                                <ul className="space-y-3">
                                    {service.features.map((feature, i) => (
                                        <li key={i} className="flex items-center text-gray-700">
                                            <svg className="w-5 h-5 text-primary mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-6">
                                    <Link to="/contact" className="block w-full py-3 px-6 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors text-center">
                                        Get Started
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const Benefits = () => {
    const benefits = [
        {
            icon: (
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
            ),
            title: "Build professional trust",
            description: "Establish credibility with professional templates, a custom domain, and GDPR compliance for legal peace of mind."
        },
        {
            icon: (
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
            ),
            title: "Build your brand",
            description: "Personalise your website, add your images, content, and make it remarkably yours."
        },
        {
            icon: (
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            ),
            title: "Be found online",
            description: "Boost visibility with SEO tools and automatic business listings, so people can find you or your service instantly."
        },
        {
            icon: (
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            title: "Get your next customer",
            description: "Add forms, contact options, and engaging calls-to-action to turn visitors into real leads."
        },
        {
            icon: (
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
            ),
            title: "Sell more, sell faster",
            description: "Use booking tools or set up an online shop to get more sales."
        },
        {
            icon: (
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2l3 3" />
                </svg>
            ),
            title: "Safe and secure",
            description: "Built in India, Site Launch Kit ensures your website complies with India's highest privacy standards."
        }
    ];

    return (
        <section className="py-12 sm:py-16 lg:py-24 bg-gray-50">
            <div className="container-site">
                <div className="text-center mb-12 sm:mb-16 px-4 sm:px-0">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                        Why choose WebHaze?
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
                        Everything you need to build, grow, and succeed online.
                    </p>
                </div>
                
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                            >
                                <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                    {benefit.icon}
                                </div>
                                <h3 className="text-lg font-semibold mb-3 text-gray-900">{benefit.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const FAQ = () => {
    const [openIndex, setOpenIndex] = React.useState(null);
    
    const faqs = [
        {
            question: "Do you offer domain registration services?",
            answer: "Yes, we offer comprehensive domain registration services. You can register new domains, transfer existing ones, and manage all your domains through our user-friendly control panel. We support all major domain extensions including .com, .net, .org, and many country-specific domains."
        },
        {
            question: "Can I launch my site with your hosting?",
            answer: "Absolutely! Our hosting plans are designed to get your website online quickly. We offer one-click installations for popular platforms like WordPress, and our team can help you migrate existing websites. All plans include free SSL certificates and 24/7 support to ensure a smooth launch."
        },
        {
            question: "How do I get started with the Site Launch Kit?",
            answer: "Getting started is easy! Simply choose your hosting plan, register or transfer your domain, and our Site Launch Kit will guide you through the setup process. You'll get access to professional templates, drag-and-drop builders, and step-by-step tutorials to create your website in minutes."
        },
        {
            question: "Do you offer website design with hosting?",
            answer: "Yes, we provide complete website design services alongside our hosting packages. Our professional design team can create custom websites tailored to your brand and business needs. We also offer DIY website builders with professional templates for those who prefer to design their own sites."
        },
        {
            question: "Is domain management included?",
            answer: "Domain management is included with all our hosting plans. You can manage DNS settings, set up subdomains, configure email forwarding, and handle domain renewals all from your hosting control panel. We also provide free domain privacy protection to keep your personal information secure."
        },
        {
            question: "Can I contact support through WhatsApp?",
            answer: "Yes, we offer multiple support channels including WhatsApp for quick assistance. You can also reach our 24/7 support team via live chat, email, or phone. Our expert support staff is always ready to help with technical issues, account questions, or general guidance."
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-12 sm:py-16 lg:py-24 bg-gray-50">
            <div className="container-site">
                <div className="text-center mb-12 sm:mb-16 px-4 sm:px-0">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                        Your hosting queries answered
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
                        We understand that choosing the right hosting provider is a crucial decision for your online presence. To help you make an informed choice, we have compiled a list of common questions asked.
                    </p>
                </div>
                <div className="max-w-4xl mx-auto">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden border border-gray-100">
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                            >
                                <span className="font-semibold text-gray-800 pr-4">{faq.question}</span>
                                <svg
                                    className={`w-5 h-5 text-primary transition-transform duration-200 flex-shrink-0 ${
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
                                <div className="px-6 pb-5 pt-0">
                                    <div className="border-t border-gray-100 pt-4">
                                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};



const Home = () => {
    return (
        <div className="relative">
            <SEO 
                title="Best Free Website Builder with AI | WebHaze - Website Maintenance Services India"
                description="Free website builder with AI tools, free domain & affordable website maintenance packages. Create business websites in India. Maintenance cost starting ₹999/month."
                keywords="website builder free, best free website builder, website builder AI, website builder India, website maintenance cost, website maintenance services, website maintenance cost India, free website builder and domain, website builder for small business, WordPress website maintenance cost India"
                canonical="/"
            />
            <Hero />
            <Features />
            <Services />
            <HowItWorks />
            <WebsiteMaintenance />
            <Benefits />
            <Testimonials />
            <HostingPlans />
            <FAQ />
            <LearnMore />
            <GetStarted />
        </div>
    );
};

export default Home;
