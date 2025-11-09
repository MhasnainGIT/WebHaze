import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const CreateWebsite = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [formData, setFormData] = useState({
    siteName: '',
    domain: '',
    category: ''
  });

  const templates = [
    { id: 1, name: 'Business', description: 'Professional business website' },
    { id: 2, name: 'Portfolio', description: 'Showcase your work and skills' },
    { id: 3, name: 'E-commerce', description: 'Online store and shopping cart' },
    { id: 4, name: 'Blog', description: 'Content-focused website' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Creating website:', { ...formData, template: selectedTemplate });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <SEO 
        title="Create Website - WebHaze"
        description="Create your professional website in minutes with WebHaze's easy-to-use website builder."
      />
      
      <div className="container-site py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black mb-6">
            Create Your
            <br />
            <span className="text-white/60">Website</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Build a professional website in minutes with our easy-to-use tools.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Website Details */}
            <div className="glass-morphism rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Website Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="form-label">Website Name</label>
                  <input
                    type="text"
                    name="siteName"
                    value={formData.siteName}
                    onChange={handleChange}
                    className="form-input glass-morphism"
                    placeholder="My Awesome Website"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Domain Name</label>
                  <input
                    type="text"
                    name="domain"
                    value={formData.domain}
                    onChange={handleChange}
                    className="form-input glass-morphism"
                    placeholder="mywebsite.com"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="form-label">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="form-input glass-morphism"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="business">Business</option>
                    <option value="portfolio">Portfolio</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="blog">Blog</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Template Selection */}
            <div className="glass-morphism rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Choose a Template</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`p-6 rounded-lg border-2 cursor-pointer transition-colors ${
                      selectedTemplate === template.id
                        ? 'border-white bg-white/10'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
                    <p className="text-gray-400">{template.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div className="text-center">
              <button
                type="submit"
                disabled={!selectedTemplate}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Website
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateWebsite;