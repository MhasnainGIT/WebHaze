import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    const team = [
        {
            name: "Sarah Johnson",
            role: "CEO & Founder",
            image: (
                <svg className="w-12 h-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            ),
            bio: "10+ years in web development and business strategy"
        },
        {
            name: "Mike Chen",
            role: "CTO",
            image: (
                <svg className="w-12 h-12 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
            ),
            bio: "Expert in scalable infrastructure and cloud architecture"
        },
        {
            name: "Emily Davis",
            role: "Head of Design",
            image: (
                <svg className="w-12 h-12 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4 4 4 0 004-4V5z" />
                </svg>
            ),
            bio: "Award-winning designer with focus on user experience"
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
            description: "We constantly push the boundaries of what's possible in web hosting and development."
        },
        {
            icon: (
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            title: "Partnership",
            description: "Your success is our success. We're here to support your growth every step of the way."
        },
        {
            icon: (
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            ),
            title: "Security",
            description: "We prioritize the security and privacy of your data with enterprise-grade protection."
        },
        {
            icon: (
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
            title: "Performance",
            description: "Lightning-fast loading times and 99.9% uptime guarantee for optimal user experience."
        }
    ];

    return (
        <div className="min-h-screen bg-white pt-24">
            <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
                <div className="container-site text-center">
                    <motion.h1 
                        className="text-4xl font-bold mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        About WebHaze
                    </motion.h1>
                    <motion.p 
                        className="text-xl text-gray-600 max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        We're on a mission to make professional web presence accessible to everyone. 
                        From small businesses to large enterprises, we provide the tools and support you need to succeed online.
                    </motion.p>
                </div>
            </section>

            <section className="py-16">
                <div className="container-site">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">
                                Our Story
                            </h2>
                            <p className="text-gray-600 mb-4">
                                Founded in 2020, WebHaze started with a simple idea: web hosting and development 
                                shouldn't be complicated or expensive. We saw too many businesses struggling with technical barriers 
                                that prevented them from establishing a strong online presence.
                            </p>
                            <p className="text-gray-600 mb-4">
                                Today, we've helped thousands of businesses launch and grow their websites with our 
                                user-friendly platform, reliable hosting, and expert support team.
                            </p>
                            <p className="text-gray-600">
                                We're not just a hosting provider – we're your digital growth partner, 
                                committed to your success every step of the way.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 backdrop-blur-sm">
                            <div className="grid grid-cols-2 gap-6 text-center">
                                <div>
                                    <div className="text-3xl font-bold text-primary">10K+</div>
                                    <div className="text-gray-600">Websites Hosted</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-primary">99.9%</div>
                                    <div className="text-gray-600">Uptime</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-primary">24/7</div>
                                    <div className="text-gray-600">Support</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-primary">5K+</div>
                                    <div className="text-gray-600">Happy Clients</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gray-50/50 backdrop-blur-sm">
                <div className="container-site">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">
                            Our Values
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            These core values guide everything we do and shape how we serve our customers.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                className="text-center p-8 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5, scale: 1.02 }}
                            >
                                <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                                <p className="text-gray-600">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16">
                <div className="container-site">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">
                            Meet Our Team
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            The passionate people behind WebHaze who work tirelessly to make your success possible.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {team.map((member, index) => (
                            <motion.div
                                key={index}
                                className="text-center p-8 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5, scale: 1.02 }}
                            >
                                <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                                    {member.image}
                                </div>
                                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                                <p className="text-primary font-medium mb-3">{member.role}</p>
                                <p className="text-gray-600">{member.bio}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
                <div className="container-site text-center">
                    <h2 className="text-3xl font-bold mb-6">
                        Ready to Join Our Community?
                    </h2>
                    <p className="text-xl mb-8 opacity-90">
                        Let's build something amazing together.
                    </p>
                    <a href="/contact" className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                        Get Started Today
                    </a>
                </div>
            </section>
        </div>
    );
};

export default About;