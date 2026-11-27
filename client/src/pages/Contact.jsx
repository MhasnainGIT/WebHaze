import React, { useState } from 'react';
import SEO from '../components/SEO';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import {
  SpotlightCard,
  WavyText,
  TextGenerateEffect,
  BackgroundBeams,
  BackgroundLines,
  BackgroundBoxes,
  GlowingStarsBackground,
  LampContainer,
} from '../components/ui/aceternity';

const f = {
  h: "'Inter',sans-serif",
  b: "'Hanken Grotesk',sans-serif",
  l: "'Geist Mono','monospace'",
};

const inputClass =
  'w-full bg-transparent border-b border-white/10 py-4 text-white placeholder:text-white/30 focus:border-white outline-none transition-colors font-medium tracking-widest text-sm';
const labelClass =
  'text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-2 block';

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: '', email: '', phone: '', preferredDate: '', preferredTime: '', subject: '', message: '',
  });

  const [activeTab, setActiveTab] = useState('meet');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleBookingChange = (e) => setBookingData({ ...bookingData, [e.target.name]: e.target.value });

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
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      const errorMsg = error.response?.data?.error || error.response?.data?.message || 'Signal interference. Please try again.';
      toast.error(errorMsg, { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!bookingData.name || !bookingData.email || !bookingData.phone || !bookingData.preferredDate || !bookingData.preferredTime || !bookingData.subject || !bookingData.message) {
      toast.error('All protocols must be initialized (All fields required).');
      return;
    }
    setBookingLoading(true);
    const loadingToast = toast.loading('Initializing uplink...');
    try {
      const response = await axios.post('/api/booking/submit', bookingData);
      toast.success(response.data.message || 'Meeting booked successfully. Check your email for the Google Meet link.', { id: loadingToast });
      setBookingData({ name: '', email: '', phone: '', preferredDate: '', preferredTime: '', subject: '', message: '' });
    } catch (error) {
      const errorMsg = error.response?.data?.error || error.response?.data?.message || 'Signal interference. Please try again.';
      toast.error(errorMsg, { id: loadingToast });
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 relative overflow-hidden">
      <SEO
        title="Contact Us | #1 Website Development Company Hyderabad | WebHaze"
        description="Connect with WebHaze Studios in Hyderabad. Get a free quote for your web development project or support for your existing Nexus site."
        keywords="Contact web agency Hyderabad, website developer phone number Hyderabad, WebHaze location, hire web designer Hyderabad"
        breadcrumb={[
          { name: 'Home', url: 'https://www.webhaze.in/' },
          { name: 'Contact', url: 'https://www.webhaze.in/contact' },
        ]}
      />

      {/* Aceternity: BackgroundBeams behind entire page */}
      <BackgroundBeams className="opacity-40" />
      {/* Aceternity: BackgroundLines — SVG wave paths */}
      <BackgroundLines className="absolute inset-0 opacity-50" />
      {/* Aceternity: GlowingStarsBackground subtle overlay */}
      <GlowingStarsBackground className="fixed inset-0 pointer-events-none opacity-30" />

      <div className="container-site relative z-10">
        {/* ─── HERO ─── */}
        <div className="max-w-4xl mb-24">
          <ScrollReveal>
            <span
              className="text-[11px] font-medium tracking-[0.15em] text-white/40 uppercase block mb-6"
              style={{ fontFamily: f.l }}
            >
              GET IN TOUCH
            </span>
            <h1
              className="text-[52px] md:text-[100px] lg:text-[130px] font-black leading-[0.9] mb-10 tracking-[-0.04em] uppercase"
              style={{ fontFamily: f.h }}
            >
              <WavyText text="THE" />
              <br />
              <WavyText text="UPLINK." delay={0.2} />
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <TextGenerateEffect
              words="Direct access to Hyderabad's elite engineering nexus. Let's build your future together."
              className="text-xl md:text-2xl text-white/60 max-w-2xl font-medium"
            />
          </ScrollReveal>
        </div>

        {/* ─── Tab Switcher ─── */}
        <ScrollReveal delay={0.2}>
          <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-12">
            {[
              { key: 'meet', label: 'Book Google Meet' },
              { key: 'project', label: 'Initialize Project' },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`w-full md:w-auto px-8 py-4 font-black tracking-[0.15em] uppercase text-xs border transition-all duration-500 ${
                  activeTab === tab.key
                    ? 'bg-white text-black border-white'
                    : 'bg-white/[0.03] text-white border-white/[0.08] hover:border-white/30'
                }`}
                style={{ borderRadius: 0, fontFamily: f.l }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* ─── Forms (Aceternity SpotlightCard) ─── */}
        <AnimatePresence mode="wait">
          {activeTab === 'meet' && (
            <motion.div
              key="meet"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <SpotlightCard
                className="border border-white/[0.08] bg-white/[0.02] hover:border-white/15 transition-all duration-700 max-w-4xl"
                spotlightColor="rgba(255,255,255,0.05)"
              >
                <div className="p-8 md:p-12">
                  <span
                    className="text-[10px] font-black mb-10 uppercase tracking-[0.3em] text-white/40 block"
                    style={{ fontFamily: f.l }}
                  >
                    Book Google Meet
                  </span>
                  <form className="space-y-8" onSubmit={handleBookingSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className={labelClass}>Full Name</label>
                        <input type="text" name="name" placeholder="Your full name" value={bookingData.name} onChange={handleBookingChange} className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Email Address</label>
                        <input type="email" name="email" placeholder="email@example.com" value={bookingData.email} onChange={handleBookingChange} className={inputClass} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className={labelClass}>Phone Number</label>
                        <input type="tel" name="phone" placeholder="+91 00000 00000" value={bookingData.phone} onChange={handleBookingChange} className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Meeting Subject</label>
                        <input type="text" name="subject" placeholder="What is this meeting about?" value={bookingData.subject} onChange={handleBookingChange} className={inputClass} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className={labelClass}>Preferred Date</label>
                        <input type="date" name="preferredDate" value={bookingData.preferredDate} onChange={handleBookingChange} className={`${inputClass} [color-scheme:dark]`} />
                      </div>
                      <div>
                        <label className={labelClass}>Preferred Time</label>
                        <input type="time" name="preferredTime" value={bookingData.preferredTime} onChange={handleBookingChange} className={`${inputClass} [color-scheme:dark]`} />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Brief Description</label>
                      <textarea name="message" rows="4" placeholder="Tell us about your project..." value={bookingData.message} onChange={handleBookingChange} className={`${inputClass} resize-none`} />
                    </div>
                    <button
                      type="submit"
                      disabled={bookingLoading}
                      className={`w-full py-6 bg-white font-black tracking-[0.3em] uppercase text-xs border border-white transition-all duration-500 mt-10 ${bookingLoading ? 'opacity-50 cursor-wait' : 'hover:bg-white/90'}`}
                      style={{ borderRadius: 0, fontFamily: f.l, color: '#000000' }}
                    >
                      {bookingLoading ? 'Initializing...' : 'Book Meeting'}
                    </button>
                  </form>
                </div>
              </SpotlightCard>
            </motion.div>
          )}

          {activeTab === 'project' && (
            <motion.div
              key="project"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <SpotlightCard
                className="border border-white/[0.08] bg-white/[0.02] hover:border-white/15 transition-all duration-700 max-w-4xl"
                spotlightColor="rgba(255,255,255,0.05)"
              >
                <div className="p-8 md:p-12">
                  <span
                    className="text-[10px] font-black mb-10 uppercase tracking-[0.3em] text-white/40 block"
                    style={{ fontFamily: f.l }}
                  >
                    Initialize Project
                  </span>
                  <form className="space-y-8" onSubmit={handleSubmit}>
                    <div>
                      <label className={labelClass}>Full Name</label>
                      <input type="text" name="name" placeholder="Your full name" value={formData.name} onChange={handleChange} className={inputClass} disabled={loading} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className={labelClass}>Email Address</label>
                        <input type="email" name="email" placeholder="email@example.com" value={formData.email} onChange={handleChange} className={inputClass} disabled={loading} />
                      </div>
                      <div>
                        <label className={labelClass}>Phone Number</label>
                        <input type="tel" name="phone" placeholder="+91 00000 00000" value={formData.phone} onChange={handleChange} className={inputClass} disabled={loading} />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Subject</label>
                      <input type="text" name="subject" placeholder="What do you need?" value={formData.subject} onChange={handleChange} className={inputClass} disabled={loading} />
                    </div>
                    <div>
                      <label className={labelClass}>Message</label>
                      <textarea name="message" rows="4" placeholder="Tell us about your project goals..." value={formData.message} onChange={handleChange} className={`${inputClass} resize-none`} disabled={loading} />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-full py-6 bg-white font-black tracking-[0.3em] uppercase text-xs border border-white transition-all duration-500 mt-10 ${loading ? 'opacity-50 cursor-wait' : 'hover:bg-white/90'}`}
                      style={{ borderRadius: 0, fontFamily: f.l, color: '#000000' }}
                    >
                      {loading ? 'Transmitting...' : 'Transmit Signal'}
                    </button>
                  </form>
                </div>
              </SpotlightCard>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── Contact Info Cards with BackgroundBoxes ripple ─── */}
        <div className="relative mt-32 overflow-hidden">
          {/* Aceternity: BackgroundBoxes ripple grid fills behind cards */}
          <BackgroundBoxes className="absolute inset-0 w-full h-[280px] opacity-60" />
          <div className="absolute inset-0 h-[280px] bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
          <ScrollReveal delay={0.1}>
            <SpotlightCard
              className="border border-white/[0.08] bg-white/[0.02] hover:border-white/20 transition-all duration-500 h-full"
              spotlightColor="rgba(255,255,255,0.05)"
            >
              <div className="p-8 md:p-10">
                <span
                  className="text-[10px] font-black mb-6 uppercase tracking-[0.3em] text-white/40 block"
                  style={{ fontFamily: f.l }}
                >
                  Location
                </span>
                <p className="text-2xl md:text-3xl font-black text-white mb-2 uppercase tracking-tight" style={{ fontFamily: f.h }}>
                  Hyderabad, India
                </p>
                <p className="text-white/60 font-medium text-base leading-relaxed" style={{ fontFamily: f.b }}>
                  Innovation Hub, Financial District<br />Telangana, 500032
                </p>
              </div>
            </SpotlightCard>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <SpotlightCard
              className="border border-white/[0.08] bg-white/[0.02] hover:border-white/20 transition-all duration-500 h-full"
              spotlightColor="rgba(255,255,255,0.05)"
            >
              <div className="p-8 md:p-10">
                <span
                  className="text-[10px] font-black mb-6 uppercase tracking-[0.3em] text-white/40 block"
                  style={{ fontFamily: f.l }}
                >
                  Direct Lines
                </span>
                <p className="text-2xl md:text-3xl font-black text-white mb-4 tracking-tight uppercase" style={{ fontFamily: f.h }}>
                  +91 8919019679
                </p>
                <p className="text-white/60 font-medium text-base" style={{ fontFamily: f.b }}>
                  info.webhaze@gmail.com
                </p>
              </div>
            </SpotlightCard>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <SpotlightCard
              className="border border-white/[0.08] bg-white/[0.02] hover:border-white/20 transition-all duration-500 h-full"
              spotlightColor="rgba(255,255,255,0.05)"
            >
              <div className="p-8 md:p-10">
                <span
                  className="text-[10px] font-black mb-6 uppercase tracking-[0.3em] text-white/40 block"
                  style={{ fontFamily: f.l }}
                >
                  Response Time
                </span>
                <p className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight uppercase" style={{ fontFamily: f.h }}>
                  &lt; 5 Minutes
                </p>
                <p className="text-white/60 font-medium text-base" style={{ fontFamily: f.b }}>
                  Average first-response time for all inbound enquiries.
                </p>
              </div>
            </SpotlightCard>
          </ScrollReveal>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
