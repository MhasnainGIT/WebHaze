import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const About = () => {
    const services = [
        {
            icon: (
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            title: "Custom Website Development",
            description: "Modern, responsive, SEO-friendly sites built with cutting-edge tech."
        },
        {
            icon: (
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4 4 4 0 004-4V5z" />
                </svg>
            ),
            title: "Landing Page Design",
            description: "High-converting pages that boost your brand visibility and customer engagement."
        },
        {
            icon: (
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6z" />
                </svg>
            ),
            title: "Portfolio & Business Websites",
            description: "Tailored for professionals, agencies, and small businesses."
        },
        {
            icon: (
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
            ),
            title: "Online Menu & QR Solutions",
            description: "Simple digital transformation tools for restaurants and offline businesses."
        }
    ];

    const values = [
        {
            icon: (
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            title: "Innovation",
            description: "We experiment, build, and improve every single day."
        },
        {
            icon: (
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            title: "Integrity",
            description: "We deliver what we promise — no shortcuts."
        },
        {
            icon: (
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            title: "Collaboration",
            description: "Your success is our priority; we grow together."
        },
        {
            icon: (
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
            title: "Performance",
            description: "Every project we ship is optimized for speed, security, and stability."
        }
    ];

    const whyChoose = [
        {
            icon: (
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            title: "Fast & Secure Hosting",
            description: "Optimized performance and uptime for your websites."
        },
        {
            icon: (
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            ),
            title: "Personalized Support",
            description: "We listen, build, and deliver what your business really needs."
        },
        {
            icon: (
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
            ),
            title: "Affordable Plans",
            description: "Transparent pricing with no hidden charges."
        },
        {
            icon: (
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            title: "Tech Expertise",
            description: "Our team uses the latest tools like React, Node.js, and MongoDB to build scalable solutions."
        }
    ];

    return (
        <div className="min-h-screen bg-white pt-24">
            <SEO 
                title="About WebHaze - Professional Web Development Team"
                description="Founded in 2025 by Mohammed Hasnain, WebHaze is a full-stack web servicing startup helping businesses worldwide with custom website development, landing pages, and digital solutions."
                keywords="about webhaze, mohammed hasnain, web development team, full stack developers, website development company"
                canonical="/about"
            />
            
            {/* Hero Section */}
            <section className="py-16 bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(11,97,255,0.1)_0%,transparent_50%)] pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,196,140,0.1)_0%,transparent_50%)] pointer-events-none" />
                
                <div className="container-site text-center relative">
                    <motion.h1 
                        className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        About WebHaze
                    </motion.h1>
                    <motion.div 
                        className="max-w-4xl mx-auto space-y-6 text-lg text-gray-700 leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <p>
                            Founded in <span className="font-semibold text-primary">2025</span> by <span className="font-semibold text-primary">Mohammed Hasnain</span>, WebHaze began as a small vision to simplify the web development process for startups, freelancers, and local businesses.
                        </p>
                        <p>
                            We noticed that many entrepreneurs wanted professional websites but didn't have access to affordable, reliable, or tech-savvy partners — and that's where WebHaze stepped in.
                        </p>
                        <p className="text-xl font-medium text-gray-800">
                            Today, we serve as a <span className="text-primary font-semibold">full-stack web servicing startup</span>, helping businesses of all sizes bring their digital ideas to life through innovative design, smart technology, and end-to-end support.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* What We Do Section */}
            <section className="py-20 bg-white">
                <div className="container-site">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
                            💼 What We Do
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            We specialize in creating digital solutions that drive business growth
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                className="group p-8 bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5, scale: 1.02 }}
                            >
                                <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-gray-900">{service.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{service.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose WebHaze Section */}
            <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
                <div className="container-site">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
                            🌟 Why Choose WebHaze?
                        </h2>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {whyChoose.map((item, index) => (
                            <motion.div
                                key={index}
                                className="p-6 bg-white/80 backdrop-blur-xl rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -3 }}
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 bg-primary/10 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                        {item.icon}
                                    </div>
                                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                                </div>
                                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Values Section */}
            <section className="py-20 bg-white">
                <div className="container-site">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
                            💚 Our Values
                        </h2>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                className="text-center p-8 bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-100 group"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5, scale: 1.02 }}
                            >
                                <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-gray-900">{value.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Meet the Founder Section */}
            <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
                <div className="container-site">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
                            👥 Meet the Founder
                        </h2>
                    </div>
                    
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-8 lg:p-12 text-center"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -5, scale: 1.02 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-12 h-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-2 text-gray-900">Mohammed Hasnain</h3>
                            <p className="text-primary font-semibold mb-4">Founder & Full Stack Developer</p>
                            <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
                                A Computer Science Engineer specializing in AI & ML, passionate about building scalable digital products and simplifying web solutions for businesses.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Vision Section */}
            <section className="py-20 bg-white">
                <div className="container-site text-center">
                    <motion.div
                        className="max-w-4xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                    >
                        <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900">
                            🌍 Our Vision
                        </h2>
                        <p className="text-xl text-gray-700 leading-relaxed mb-8">
                            To become one of the world's most trusted names in web servicing — empowering startups, creators, and businesses globally to go digital with confidence.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1)_0%,transparent_50%)] pointer-events-none" />
                <div className="container-site text-center relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                    >
                        <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                            💬 Ready to Grow with WebHaze?
                        </h2>
                        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                            Let's turn your vision into a beautiful, functional, and growth-ready website.
                        </p>
                        <Link 
                            to="/contact" 
                            className="inline-block bg-white text-primary px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            👉 Get Started Today
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default About;