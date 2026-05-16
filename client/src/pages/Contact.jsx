import React, { useState } from 'react';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.subject || !formData.message) {
      toast.error('All protocols must be initialized (All fields required).');
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading('Transmitting signal...');

    try {
      const response = await axios.post('/api/contact/submit', formData);
      toast.success(response.data.message || 'Signal received. We will uplink shortly.', { id: loadingToast });
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Submission error:', error);
      const errorMsg = error.response?.data?.error || error.response?.data?.message || 'Signal interference. Please try again.';
      toast.error(errorMsg, { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      <SEO 
        title="Contact Us | #1 Website Development Company Hyderabad | WebHaze"
        description="Connect with WebHaze Studios in Hyderabad. Get a free quote for your web development project or support for your existing Nexus site."
        keywords="Contact web agency Hyderabad, website developer phone number Hyderabad, WebHaze location, hire web designer Hyderabad"
      />
      
      <div className="container-site">
        <div className="max-w-4xl mb-32">
          <ScrollReveal>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-10 tracking-tighter leading-[0.8] uppercase">
              THE <span className="text-white/20">UPLINK.</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-xl md:text-2xl text-white/50 max-w-2xl font-medium px-4 md:px-0">
              Direct access to Hyderabad's elite engineering nexus. Let's build your future.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Contact Information */}
          <div className="space-y-12">
            <ScrollReveal direction="right" delay={0.1}>
              <div className="glass-card border-white/5 p-8 md:p-12">
                <h3 className="text-[10px] font-black mb-6 uppercase tracking-[0.3em] text-white/50">Location</h3>
                <p className="text-2xl md:text-3xl font-black text-white mb-2 uppercase tracking-tight">Hyderabad, India</p>
                <p className="text-white/40 font-medium text-lg leading-relaxed">
                  Innovation Hub, Financial District<br />
                  Telangana, 500032
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.2}>
              <div className="glass-card border-white/5 p-8 md:p-12">
                <h3 className="text-[10px] font-black mb-6 uppercase tracking-[0.3em] text-white/50">Direct Lines</h3>
                <p className="text-2xl md:text-3xl font-black text-white mb-4 tracking-tight uppercase">+91 8919019679</p>
                <p className="text-white/40 font-medium text-lg">webhaze.in@gmail.com</p>
              </div>
            </ScrollReveal>
          </div>

          {/* Minimalist Contact Form */}
          <ScrollReveal direction="left" delay={0.3}>
            <div className="glass-card border-white/5 p-8 md:p-12">
              <h3 className="text-[10px] font-black mb-10 uppercase tracking-[0.3em] text-white/50">Initialize Project</h3>
              <form className="space-y-8" onSubmit={handleSubmit}>
                <div>
                  <input 
                    type="text" 
                    name="name"
                    placeholder="NAME" 
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/10 py-4 text-white placeholder:text-white/20 focus:border-white outline-none transition-colors font-black tracking-widest text-xs"
                    disabled={loading}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <input 
                      type="email" 
                      name="email"
                      placeholder="EMAIL" 
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-white/10 py-4 text-white placeholder:text-white/20 focus:border-white outline-none transition-colors font-black tracking-widest text-xs"
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <input 
                      type="tel" 
                      name="phone"
                      placeholder="PHONE" 
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-white/10 py-4 text-white placeholder:text-white/20 focus:border-white outline-none transition-colors font-black tracking-widest text-xs"
                      disabled={loading}
                    />
                  </div>
                </div>
                <div>
                  <input 
                    type="text" 
                    name="subject"
                    placeholder="SUBJECT" 
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/10 py-4 text-white placeholder:text-white/20 focus:border-white outline-none transition-colors font-black tracking-widest text-xs"
                    disabled={loading}
                  />
                </div>
                <div>
                  <textarea 
                    name="message"
                    rows="4" 
                    placeholder="MESSAGE" 
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/10 py-4 text-white placeholder:text-white/20 focus:border-white outline-none transition-colors font-black tracking-widest text-xs resize-none"
                    disabled={loading}
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  disabled={loading}
                  className={`w-full py-6 bg-white !text-black font-black tracking-[0.3em] uppercase text-xs border border-white transition-all duration-500 rounded-full mt-10 ${loading ? 'opacity-50 cursor-wait' : 'hover:bg-white/90'}`}
                >
                  {loading ? 'Transmitting...' : 'Transmit Signal'}
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default Contact;
