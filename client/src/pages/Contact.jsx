import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:4000/api/contact/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                alert('Thank you for your message! We\'ll get back to you soon.');
                setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
            } else {
                const error = await response.json();
                alert('Error: ' + (error.message || 'Failed to send message'));
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Error: Failed to send message. Please try again.');
        }
    };

    const contactInfo = [
        {
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            title: "Email Us",
            details: "support@webhaze.com",
            description: "Send us an email anytime"
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
            ),
            title: "Call Us",
            details: "+1 (555) 123-4567",
            description: "Mon-Fri 9AM-6PM EST"
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            ),
            title: "Live Chat",
            details: "Available 24/7",
            description: "Get instant support"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-24">
            <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
                <div className="container-site text-center">
                    <motion.h1 
                        className="text-4xl font-bold mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        Get in Touch
                    </motion.h1>
                    <motion.p 
                        className="text-xl text-gray-600 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </motion.p>
                </div>
            </section>

            <section className="py-16">
                <div className="container-site">
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        {contactInfo.map((info, index) => (
                            <motion.div
                                key={index}
                                className="text-center p-6 bg-white rounded-xl shadow-sm"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                                    {info.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{info.title}</h3>
                                <p className="text-primary font-medium mb-1">{info.details}</p>
                                <p className="text-gray-600 text-sm">{info.description}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                        >
                            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 px-8 py-6 border-b border-gray-100">
                                <h2 className="text-3xl font-bold text-center text-gray-900">Send us a Message</h2>
                                <p className="text-center text-gray-600 mt-2">We'd love to hear from you. Fill out the form below and we'll get back to you shortly.</p>
                            </div>
                            <div className="p-8 lg:p-12">
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="grid lg:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="block text-sm font-semibold text-gray-800 mb-3">
                                                Full Name *
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    required
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-gray-900 placeholder-gray-400 bg-gray-50 focus:bg-white"
                                                    placeholder="Enter your full name"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-3">
                                                Email Address *
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-gray-900 placeholder-gray-400 bg-gray-50 focus:bg-white"
                                                    placeholder="your@email.com"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="grid lg:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label htmlFor="phone" className="block text-sm font-semibold text-gray-800 mb-3">
                                                Phone Number *
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    id="phone"
                                                    required
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-gray-900 placeholder-gray-400 bg-gray-50 focus:bg-white"
                                                    placeholder="+1 (555) 123-4567"
                                                />
                                            </div>
                                        </div>
                                
                                        <div className="space-y-2">
                                            <label htmlFor="subject" className="block text-sm font-semibold text-gray-800 mb-3">
                                                Subject *
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    name="subject"
                                                    id="subject"
                                                    required
                                                    value={formData.subject}
                                                    onChange={handleChange}
                                                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-gray-900 placeholder-gray-400 bg-gray-50 focus:bg-white"
                                                    placeholder="What's this about?"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                
                                    <div className="space-y-2">
                                        <label htmlFor="message" className="block text-sm font-semibold text-gray-800 mb-3">
                                            Message *
                                        </label>
                                        <div className="relative">
                                            <textarea
                                                name="message"
                                                id="message"
                                                rows={6}
                                                required
                                                value={formData.message}
                                                onChange={handleChange}
                                                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-gray-900 placeholder-gray-400 bg-gray-50 focus:bg-white resize-none"
                                                placeholder="Tell us more about your project, requirements, or any questions you have. We're here to help!"
                                            />
                                        </div>
                                    </div>
                                
                                    <div className="pt-4">
                                        <button
                                            type="submit"
                                            className="w-full bg-gradient-to-r from-primary to-secondary text-white font-semibold py-4 px-8 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-200 text-lg flex items-center justify-center gap-3"
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                            </svg>
                                            Send Message
                                        </button>
                                        <p className="text-center text-sm text-gray-500 mt-4">
                                            We typically respond within 24 hours
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
