import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const TemplateLibrary = () => {
    const [selectedIndustry, setSelectedIndustry] = useState('all');
    const navigate = useNavigate();

    const industries = [
        {
            id: 'restaurant',
            name: 'Restaurants & Cafes',
            icon: '🍽️',
            description: 'Beautiful websites for restaurants, cafes, and food businesses'
        },
        {
            id: 'retail',
            name: 'Retail & E-commerce',
            icon: '🛍️',
            description: 'Professional online stores with secure payment processing'
        },
        {
            id: 'professional',
            name: 'Professional Services',
            icon: '💼',
            description: 'Elegant websites for consultants, lawyers, and service providers'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Choose Your Industry</h1>
                    <p className="text-xl text-gray-600">
                        Get started with a professionally designed template tailored for your business
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {industries.map((industry) => (
                        <motion.div
                            key={industry.id}
                            className={`p-6 rounded-lg cursor-pointer transition-all ${selectedIndustry === industry.id
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white hover:bg-gray-50'
                                }`}
                            onClick={() => setSelectedIndustry(industry.id)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="text-4xl mb-4">{industry.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{industry.name}</h3>
                            <p className={selectedIndustry === industry.id ? 'text-blue-100' : 'text-gray-600'}>
                                {industry.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <div className="space-y-12">
                    {selectedIndustry !== 'all' && (
                        <section>
                            <h2 className="text-2xl font-bold mb-8">Recommended Templates</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <TemplateCard
                                    title="Professional Template"
                                    description="A clean, modern design perfect for established businesses"
                                    features={[
                                        'Mobile-Optimized Design',
                                        'Easy Content Management',
                                        'SEO-Friendly Structure',
                                        'Built-in Analytics'
                                    ]}
                                    image="/templates/professional.jpg"
                                    onSelect={() => navigate('/editor/new?template=professional')}
                                />
                                <TemplateCard
                                    title="Growth Template"
                                    description="Conversion-focused design to help grow your business"
                                    features={[
                                        'Lead Generation Forms',
                                        'Social Media Integration',
                                        'Marketing Tools',
                                        'A/B Testing Ready'
                                    ]}
                                    image="/templates/growth.jpg"
                                    onSelect={() => navigate('/editor/new?template=growth')}
                                />
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

const TemplateCard = ({ title, description, features, image, onSelect }) => (
    <motion.div
        className="bg-white rounded-lg shadow-lg overflow-hidden"
        whileHover={{ y: -5 }}
    >
        <img src={image} alt={title} className="w-full h-64 object-cover" />
        <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600 mb-4">{description}</p>
            <ul className="space-y-2 mb-6">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                        <svg
                            className="w-5 h-5 text-green-500 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                        {feature}
                    </li>
                ))}
            </ul>
            <div className="flex space-x-4">
                <button
                    onClick={onSelect}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                >
                    Use This Template
                </button>
                <button className="px-4 py-2 border rounded hover:bg-gray-50 transition-colors">
                    Preview
                </button>
            </div>
        </div>
    </motion.div>
);

export default TemplateLibrary;