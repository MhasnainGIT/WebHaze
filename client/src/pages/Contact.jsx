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

  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    subject: '',
    message: ''
  });

  const [activeTab, setActiveTab] = useState('meet');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBookingChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
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
      setBookingData({
        name: '',
        email: '',
        phone: '',
        preferredDate: '',
        preferredTime: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Booking submission error:', error);
      const errorMsg = error.response?.data?.error || error.response?.data?.message || 'Signal interference. Please try again.';
      toast.error(errorMsg, { id: loadingToast });
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      <SEO
        title="Contact Us | #1 Website Development Company Hyderabad | WebHaze"
        description="Connect with WebHaze Studios in Hyderabad. Get a free quote for your web development project or support for your existing Nexus site."
        keywords="Contact web agency Hyderabad, website developer phone number Hyderabad, WebHaze location, hire web designer Hyderabad"
        breadcrumb={[
          { name: "Home", url: "https://www.webhaze.in/" },
          { name: "Contact", url: "https://www.webhaze.in/contact" }
        ]}
      />

      <div className="container-site">
        <div className="max-w-4xl mb-32">
          <ScrollReveal>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-10 tracking-tighter leading-[0.8] uppercase">
              THE <span className="text-white">UPLINK.</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-xl md:text-2xl text-white max-w-2xl font-medium px-4 md:px-0">
              Direct access to Hyderabad's elite engineering nexus. Let's build your future.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.2}>
          <div className="flex gap-4 mb-12">
            <button
              type="button"
              onClick={() => setActiveTab('meet')}
              className={`px-8 py-4 rounded-full font-black tracking-[0.3em] uppercase text-xs border transition-all duration-500 ${
                activeTab === 'meet'
                  ? 'bg-white text-black border-white'
                  : 'bg-transparent text-white border-white/20 hover:border-white/50'
              }`}
            >
              Book Google Meet
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('project')}
              className={`px-8 py-4 rounded-full font-black tracking-[0.3em] uppercase text-xs border transition-all duration-500 ${
                activeTab === 'project'
                  ? 'bg-white text-black border-white'
                  : 'bg-transparent text-white border-white/20 hover:border-white/50'
              }`}
            >
              Initialize Project
            </button>
          </div>
        </ScrollReveal>

        {activeTab === 'meet' && (
          <ScrollReveal delay={0.3}>
            <div className="glass-card border-white/5 p-8 md:p-12 max-w-4xl">
              <h3 className="text-[10px] font-black mb-10 uppercase tracking-[0.3em] text-white">Book Google Meet</h3>
              <form className="space-y-8" onSubmit={handleBookingSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="NAME"
                      value={bookingData.name}
                      onChange={handleBookingChange}
                      className="w-full bg-transparent border-b border-white/10 py-4 text-white placeholder:text-white focus:border-white outline-none transition-colors font-black tracking-widest text-xs"
                      disabled={bookingLoading}
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="EMAIL"
                      value={bookingData.email}
                      onChange={handleBookingChange}
                      className="w-full bg-transparent border-b border-white/10 py-4 text-white placeholder:text-white focus:border-white outline-none transition-colors font-black tracking-widest text-xs"
                      disabled={bookingLoading}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="PHONE"
                      value={bookingData.phone}
                      onChange={handleBookingChange}
                      className="w-full bg-transparent border-b border-white/10 py-4 text-white placeholder:text-white focus:border-white outline-none transition-colors font-black tracking-widest text-xs"
                      disabled={bookingLoading}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="subject"
                      placeholder="MEETING SUBJECT"
                      value={bookingData.subject}
                      onChange={handleBookingChange}
                      className="w-full bg-transparent border-b border-white/10 py-4 text-white placeholder:text-white focus:border-white outline-none transition-colors font-black tracking-widest text-xs"
                      disabled={bookingLoading}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white mb-2 block">Preferred Date</label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={bookingData.preferredDate}
                      onChange={handleBookingChange}
                      className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:border-white outline-none transition-colors font-black tracking-widest text-xs [color-scheme:dark]"
                      disabled={bookingLoading}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white mb-2 block">Preferred Time</label>
                    <input
                      type="time"
                      name="preferredTime"
                      value={bookingData.preferredTime}
                      onChange={handleBookingChange}
                      className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:border-white outline-none transition-colors font-black tracking-widest text-xs [color-scheme:dark]"
                      disabled={bookingLoading}
                    />
                  </div>
                </div>
                <div>
                  <textarea
                    name="message"
                    rows="4"
                    placeholder="BRIEF DESCRIPTION"
                    value={bookingData.message}
                    onChange={handleBookingChange}
                    className="w-full bg-transparent border-b border-white/10 py-4 text-white placeholder:text-white focus:border-white outline-none transition-colors font-black tracking-widest text-xs resize-none"
                    disabled={bookingLoading}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={bookingLoading}
                  className={`w-full py-6 bg-white !text-black font-black tracking-[0.3em] uppercase text-xs border border-white transition-all duration-500 rounded-full mt-10 ${bookingLoading ? 'opacity-50 cursor-wait' : 'hover:bg-white/90'}`}
                >
                  {bookingLoading ? 'Initializing...' : 'Book Meeting'}
                </button>
              </form>
            </div>
          </ScrollReveal>
        )}

        {activeTab === 'project' && (
          <ScrollReveal delay={0.3}>
            <div className="glass-card border-white/5 p-8 md:p-12 max-w-4xl">
              <h3 className="text-[10px] font-black mb-10 uppercase tracking-[0.3em] text-white">Initialize Project</h3>
              <form className="space-y-8" onSubmit={handleSubmit}>
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="NAME"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/10 py-4 text-white placeholder:text-white focus:border-white outline-none transition-colors font-black tracking-widest text-xs"
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
                      className="w-full bg-transparent border-b border-white/10 py-4 text-white placeholder:text-white focus:border-white outline-none transition-colors font-black tracking-widest text-xs"
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
                      className="w-full bg-transparent border-b border-white/10 py-4 text-white placeholder:text-white focus:border-white outline-none transition-colors font-black tracking-widest text-xs"
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
                    className="w-full bg-transparent border-b border-white/10 py-4 text-white placeholder:text-white focus:border-white outline-none transition-colors font-black tracking-widest text-xs"
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
                    className="w-full bg-transparent border-b border-white/10 py-4 text-white placeholder:text-white focus:border-white outline-none transition-colors font-black tracking-widest text-xs resize-none"
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
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mt-32">
          <ScrollReveal direction="up" delay={0.1}>
             <div className="glass-card border-white/5 p-8 md:p-12">
               <h3 className="text-[10px] font-black mb-6 uppercase tracking-[0.3em] text-white">Location</h3>
               <p className="text-2xl md:text-3xl font-black text-white mb-2 uppercase tracking-tight">Hyderabad, India</p>
               <p className="text-white font-medium text-lg leading-relaxed">
                 Innovation Hub, Financial District<br />
                 Telangana, 500032
               </p>
             </div>
           </ScrollReveal>

           <ScrollReveal direction="up" delay={0.2}>
             <div className="glass-card border-white/5 p-8 md:p-12">
               <h3 className="text-[10px] font-black mb-6 uppercase tracking-[0.3em] text-white">Direct Lines</h3>
               <p className="text-2xl md:text-3xl font-black text-white mb-4 tracking-tight uppercase">+91 8919019679</p>
               <p className="text-white font-medium text-lg">info.webhaze@gmail.com</p>
             </div>
           </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default Contact;
