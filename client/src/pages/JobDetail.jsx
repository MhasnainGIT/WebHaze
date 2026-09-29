import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const f = { h: "'Inter',sans-serif", b: "'Hanken Grotesk',sans-serif", l: "'Geist Mono','monospace'" };

const Glass = ({ children, className = "" }) => (
  <div className={`bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] transition-all duration-700 relative ${className}`}>
    {children}
  </div>
);

const roles = [
  {
    title: "Frontend Developer",
    type: "Full-time · Remote",
    location: "Remote — Worldwide",
    desc: "Build stunning, performant UIs using React, Tailwind, and Framer Motion.",
    fullDescription: "Join our frontend team to build beautiful, high-performance user interfaces for web applications. You'll work with modern technologies like React, Tailwind CSS, and Framer Motion to create seamless user experiences.",
    skills: ["React", "Tailwind CSS", "Framer Motion", "TypeScript"],
    requirements: ["3+ years of React experience", "Strong CSS/Tailwind skills", "Experience with animation libraries", "TypeScript proficiency"],
    benefits: ["Competitive salary", "Remote work flexibility", "Health insurance", "Learning budget", "Flexible hours"]
  },
  {
    title: "Backend Developer",
    type: "Full-time · Remote",
    location: "Remote — Worldwide",
    desc: "Design and maintain scalable Node.js APIs, MongoDB schemas, and cloud infrastructure.",
    fullDescription: "Design and maintain scalable backend systems using Node.js, Express, and MongoDB. You'll build robust APIs and manage cloud infrastructure on AWS.",
    skills: ["Node.js", "MongoDB", "Express", "AWS"],
    requirements: ["3+ years of Node.js experience", "MongoDB database design", "RESTful API development", "AWS cloud experience"],
    benefits: ["Competitive salary", "Remote work flexibility", "Health insurance", "Learning budget", "Flexible hours"]
  },
  {
    title: "UI/UX Designer",
    type: "Full-time · Remote",
    location: "Remote — Worldwide",
    desc: "Create world-class design systems and user experiences for our clients and platform.",
    fullDescription: "Create beautiful, intuitive user interfaces and design systems. You'll work closely with the development team to ensure designs are implemented perfectly.",
    skills: ["Figma", "Design Systems", "Prototyping", "User Research"],
    requirements: ["3+ years of UI/UX experience", "Figma expertise", "Design system experience", "User research skills"],
    benefits: ["Competitive salary", "Remote work flexibility", "Health insurance", "Learning budget", "Flexible hours"]
  },
  {
    title: "Sales & Business Development",
    type: "Full-time · Remote",
    location: "Remote — Worldwide",
    desc: "Drive client acquisition and build long-term relationships with businesses across India.",
    fullDescription: "Drive business growth by acquiring new clients and building long-term relationships. You'll work with businesses across India and globally to understand their needs and propose solutions.",
    skills: ["B2B Sales", "CRM", "Communication", "Lead Generation"],
    requirements: ["2+ years of B2B sales experience", "CRM proficiency", "Excellent communication skills", "Lead generation experience"],
    benefits: ["Competitive salary", "Remote work flexibility", "Health insurance", "Learning budget", "Flexible hours"]
  },
];

const JobDetail = () => {
  const { slug } = useParams();
  const [form, setForm] = useState({ name: '', email: '', phone: '', role: '', about: '', resume: null });
  const [loading, setLoading] = useState(false);

  const role = roles.find(r => r.title.toLowerCase().replace(/\s+/g, '-') === slug) || roles[0];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm(prev => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.role || !form.about) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading('Submitting application...');

    try {
      const data = new FormData();
      Object.entries(form).forEach(([k, v]) => { if (v) data.append(k, v); });

      await axios.post(
        `${import.meta.env.VITE_API_URL || 'https://webhaze.onrender.com'}/api/careers/apply`,
        data,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      toast.success('Application submitted! We\'ll be in touch soon.', { id: loadingToast });
      setForm({ name: '', email: '', phone: '', role: '', about: '', resume: null });
    } catch (err) {
      toast.error(err.response?.data?.error || 'Submission failed. Please try again.', { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-6 md:px-20">
      <SEO
        title={`${role.title} — Careers | WebHaze`}
        description={role.desc}
        breadcrumb={[
          { name: "Home", url: "https://www.webhaze.in/" },
          { name: "Careers", url: "https://www.webhaze.in/careers" },
          { name: role.title, url: `https://www.webhaze.in/careers/${slug}` }
        ]}
      />

      <div className="max-w-[1440px] mx-auto">
        <Link to="/careers" className="text-[10px] font-black uppercase tracking-[0.2em] text-white hover:text-white transition-colors mb-8 inline-block" style={{ fontFamily: f.l }}>
          ← Back to Careers
        </Link>

        <div className="mb-24">
          <ScrollReveal>
            <span className="text-[11px] font-medium tracking-[0.15em] text-white uppercase block mb-6" style={{ fontFamily: f.l }}>OPEN ROLE</span>
            <h1 className="text-[52px] md:text-[100px] lg:text-[130px] font-black leading-[0.9] mb-8 tracking-[-0.04em] uppercase" style={{ fontFamily: f.h }}>
              {role.title.toUpperCase()}
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="flex flex-wrap gap-4 mb-8">
              <span className="text-[11px] text-white tracking-[0.1em] uppercase border border-white/[0.08] px-4 py-2" style={{ fontFamily: f.l }}>{role.type}</span>
              <span className="text-[11px] text-white tracking-[0.1em] uppercase border border-white/[0.08] px-4 py-2" style={{ fontFamily: f.l }}>{role.location}</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <p className="text-lg md:text-xl text-white max-w-2xl leading-relaxed mb-12" style={{ fontFamily: f.b }}>
              {role.fullDescription}
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-32">
          <Glass className="p-8 md:p-12">
            <h3 className="text-[10px] font-black mb-8 uppercase tracking-[0.3em] text-white" style={{ fontFamily: f.l }}>Requirements</h3>
            <ul className="space-y-4">
              {role.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-4 text-white text-sm md:text-base" style={{ fontFamily: f.b }}>
                  <div className="w-1 h-1 bg-white/30 flex-shrink-0 mt-2" />
                  {req}
                </li>
              ))}
            </ul>
          </Glass>

          <Glass className="p-8 md:p-12">
            <h3 className="text-[10px] font-black mb-8 uppercase tracking-[0.3em] text-white" style={{ fontFamily: f.l }}>Benefits</h3>
            <ul className="space-y-4">
              {role.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-4 text-white text-sm md:text-base" style={{ fontFamily: f.b }}>
                  <div className="w-1 h-1 bg-white/30 flex-shrink-0 mt-2" />
                  {benefit}
                </li>
              ))}
            </ul>
          </Glass>
        </div>

        <div className="mb-24">
          <ScrollReveal>
            <span className="text-[11px] font-medium tracking-[0.15em] text-white uppercase block mb-6" style={{ fontFamily: f.l }}>APPLICATION</span>
            <h2 className="text-[40px] md:text-[72px] font-black tracking-[-0.03em] uppercase leading-[0.95]" style={{ fontFamily: f.h }}>
              APPLY FOR<br /><span className="text-white">THIS ROLE.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <Glass className="mt-12 p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <input
                    name="name" value={form.name} onChange={handleChange}
                    placeholder="FULL NAME *"
                    className="bg-transparent border-b border-white/10 py-4 text-white placeholder:text-white focus:border-white outline-none transition-colors font-black tracking-widest text-xs w-full"
                    style={{ fontFamily: f.l }} disabled={loading}
                  />
                  <input
                    name="email" value={form.email} onChange={handleChange}
                    type="email" placeholder="EMAIL ADDRESS *"
                    className="bg-transparent border-b border-white/10 py-4 text-white placeholder:text-white focus:border-white outline-none transition-colors font-black tracking-widest text-xs w-full"
                    style={{ fontFamily: f.l }} disabled={loading}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <input
                    name="phone" value={form.phone} onChange={handleChange}
                    type="tel" placeholder="PHONE NUMBER *"
                    className="bg-transparent border-b border-white/10 py-4 text-white placeholder:text-white focus:border-white outline-none transition-colors font-black tracking-widest text-xs w-full"
                    style={{ fontFamily: f.l }} disabled={loading}
                  />
                  <input
                    name="role" value={form.role} onChange={handleChange}
                    placeholder="ROLE *"
                    className="bg-transparent border-b border-white/10 py-4 text-white placeholder:text-white focus:border-white outline-none transition-colors font-black tracking-widest text-xs w-full"
                    style={{ fontFamily: f.l }} disabled={loading}
                    readOnly
                  />
                </div>
                <textarea
                  name="about" value={form.about} onChange={handleChange}
                  rows="5" placeholder="TELL US ABOUT YOURSELF — your experience, why you want to join, what you'll bring *"
                  className="bg-transparent border-b border-white/10 py-4 text-white placeholder:text-white focus:border-white outline-none transition-colors font-black tracking-widest text-xs resize-none w-full"
                  style={{ fontFamily: f.l }} disabled={loading}
                />
                <div>
                  <label className="text-[11px] text-white uppercase tracking-[0.15em] block mb-3" style={{ fontFamily: f.l }}>Resume / CV (PDF, DOC — optional)</label>
                  <input
                    name="resume" type="file" accept=".pdf,.doc,.docx"
                    onChange={handleChange}
                    className="text-white text-xs file:mr-4 file:py-2 file:px-4 file:border file:border-white/20 file:bg-transparent file:text-white file:text-[10px] file:uppercase file:tracking-widest file:cursor-pointer hover:file:border-white/50 transition-all"
                    style={{ fontFamily: f.l }} disabled={loading}
                  />
                </div>
                <button
                  type="submit" disabled={loading}
                  className={`w-full py-5 bg-white !text-black font-black tracking-[0.2em] uppercase text-xs transition-all ${loading ? 'opacity-50 cursor-wait' : 'hover:bg-white/90'}`}
                  style={{ fontFamily: f.l, color: '#000000' }}
                >
                  {loading ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>
            </Glass>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
