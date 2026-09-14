import React, { useState } from 'react';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const f = { h: "'Inter',sans-serif", b: "'Hanken Grotesk',sans-serif", l: "'Geist Mono','monospace'" };

const Glass = ({ children, className = "" }) => (
  <div className={`bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:border-white/20 transition-all duration-700 overflow-hidden relative group ${className}`}>
    {children}
    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
  </div>
);

const roles = [
  {
    title: "Frontend Developer",
    type: "Full-time · Remote",
    desc: "Build stunning, performant UIs using React, Tailwind, and Framer Motion.",
    skills: ["React", "Tailwind CSS", "Framer Motion", "TypeScript"],
  },
  {
    title: "Backend Developer",
    type: "Full-time · Remote",
    desc: "Design and maintain scalable Node.js APIs, MongoDB schemas, and cloud infrastructure.",
    skills: ["Node.js", "MongoDB", "Express", "AWS"],
  },
  {
    title: "UI/UX Designer",
    type: "Full-time · Remote",
    desc: "Create world-class design systems and user experiences for our clients and platform.",
    skills: ["Figma", "Design Systems", "Prototyping", "User Research"],
  },
  {
    title: "Sales & Business Development",
    type: "Full-time · Hyderabad",
    desc: "Drive client acquisition and build long-term relationships with businesses across India.",
    skills: ["B2B Sales", "CRM", "Communication", "Lead Generation"],
  },
];

const INITIAL = { name: '', email: '', phone: '', role: '', about: '', resume: null };

const Careers = () => {
  const [form, setForm] = useState(INITIAL);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm(prev => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const applyFor = (role) => {
    setSelected(role);
    setForm(prev => ({ ...prev, role: role.title }));
    document.getElementById('apply-form').scrollIntoView({ behavior: 'smooth' });
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
      setForm(INITIAL);
      setSelected(null);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Submission failed. Please try again.', { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-6 md:px-20">
      <SEO
        title="Careers | Join WebHaze | Build the Future of the Web"
        description="Join the WebHaze team. We're hiring developers, designers, and sales professionals to help build the future of digital experiences."
        keywords="WebHaze careers, web developer jobs Hyderabad, remote developer jobs India, join WebHaze"
      />

      <div className="max-w-[1440px] mx-auto">

        {/* Header */}
        <div className="mb-24">
          <ScrollReveal>
            <span className="text-[11px] font-medium tracking-[0.15em] text-white/25 uppercase block mb-6" style={{ fontFamily: f.l }}>JOIN THE TEAM</span>
            <h1 className="text-[52px] md:text-[100px] lg:text-[130px] font-black leading-[0.9] mb-8 tracking-[-0.04em] uppercase" style={{ fontFamily: f.h }}>
              BUILD WITH<br /><span className="text-white/20">US.</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-lg md:text-xl text-white/40 max-w-xl leading-relaxed" style={{ fontFamily: f.b }}>
              We're a small, ambitious team building the future of web services in India. If you're passionate about craft and want to grow fast — this is your place.
            </p>
          </ScrollReveal>
        </div>

        {/* Open Roles */}
        <ScrollReveal className="mb-6">
          <span className="text-[11px] font-medium tracking-[0.15em] text-white/25 uppercase" style={{ fontFamily: f.l }}>OPEN ROLES</span>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-32">
          {roles.map((role, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <Glass className="h-full">
                <div className="p-8 md:p-10 flex flex-col h-full min-h-[260px]">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-black uppercase tracking-[-0.02em] mb-1" style={{ fontFamily: f.h }}>{role.title}</h3>
                      <span className="text-[11px] text-white/30 tracking-[0.1em] uppercase" style={{ fontFamily: f.l }}>{role.type}</span>
                    </div>
                  </div>
                  <p className="text-white/40 text-sm leading-relaxed mb-6" style={{ fontFamily: f.b }}>{role.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {role.skills.map((s, j) => (
                      <span key={j} className="text-[10px] px-3 py-1 border border-white/[0.08] text-white/30 uppercase tracking-[0.1em]" style={{ fontFamily: f.l }}>{s}</span>
                    ))}
                  </div>
                  <button
                    onClick={() => applyFor(role)}
                    className="mt-auto px-6 py-3 bg-white text-black text-[11px] font-black tracking-[0.15em] uppercase hover:bg-white/90 transition-all w-fit"
                    style={{ fontFamily: f.l }}
                  >
                    Apply Now
                  </button>
                </div>
              </Glass>
            </ScrollReveal>
          ))}
        </div>

        {/* Application Form */}
        <div id="apply-form">
          <ScrollReveal className="mb-12">
            <span className="text-[11px] font-medium tracking-[0.15em] text-white/25 uppercase block mb-6" style={{ fontFamily: f.l }}>APPLICATION</span>
            <h2 className="text-[40px] md:text-[72px] font-black tracking-[-0.03em] uppercase leading-[0.95]" style={{ fontFamily: f.h }}>
              {selected ? <>{selected.title.toUpperCase()}<br /><span className="text-white/20">APPLICATION.</span></> : <>APPLY<br /><span className="text-white/20">NOW.</span></>}
            </h2>
          </ScrollReveal>

          <ScrollReveal>
            <Glass>
              <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <input
                    name="name" value={form.name} onChange={handleChange}
                    placeholder="FULL NAME *"
                    className="bg-transparent border-b border-white/10 py-4 text-white placeholder:text-white/20 focus:border-white outline-none transition-colors font-black tracking-widest text-xs w-full"
                    style={{ fontFamily: f.l }} disabled={loading}
                  />
                  <input
                    name="email" value={form.email} onChange={handleChange}
                    type="email" placeholder="EMAIL ADDRESS *"
                    className="bg-transparent border-b border-white/10 py-4 text-white placeholder:text-white/20 focus:border-white outline-none transition-colors font-black tracking-widest text-xs w-full"
                    style={{ fontFamily: f.l }} disabled={loading}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <input
                    name="phone" value={form.phone} onChange={handleChange}
                    type="tel" placeholder="PHONE NUMBER *"
                    className="bg-transparent border-b border-white/10 py-4 text-white placeholder:text-white/20 focus:border-white outline-none transition-colors font-black tracking-widest text-xs w-full"
                    style={{ fontFamily: f.l }} disabled={loading}
                  />
                  <select
                    name="role" value={form.role} onChange={handleChange}
                    className="bg-black border-b border-white/10 py-4 text-white focus:border-white outline-none transition-colors font-black tracking-widest text-xs w-full"
                    style={{ fontFamily: f.l }} disabled={loading}
                  >
                    <option value="" className="bg-black">SELECT ROLE *</option>
                    {roles.map((r, i) => <option key={i} value={r.title} className="bg-black">{r.title.toUpperCase()}</option>)}
                  </select>
                </div>
                <textarea
                  name="about" value={form.about} onChange={handleChange}
                  rows="5" placeholder="TELL US ABOUT YOURSELF — your experience, why you want to join, what you'll bring *"
                  className="bg-transparent border-b border-white/10 py-4 text-white placeholder:text-white/20 focus:border-white outline-none transition-colors font-black tracking-widest text-xs resize-none w-full"
                  style={{ fontFamily: f.l }} disabled={loading}
                />
                <div>
                  <label className="text-[11px] text-white/25 uppercase tracking-[0.15em] block mb-3" style={{ fontFamily: f.l }}>Resume / CV (PDF, DOC — optional)</label>
                  <input
                    name="resume" type="file" accept=".pdf,.doc,.docx"
                    onChange={handleChange}
                    className="text-white/40 text-xs file:mr-4 file:py-2 file:px-4 file:border file:border-white/20 file:bg-transparent file:text-white/50 file:text-[10px] file:uppercase file:tracking-widest file:cursor-pointer hover:file:border-white/50 transition-all"
                    style={{ fontFamily: f.l }} disabled={loading}
                  />
                </div>
                <button
                  type="submit" disabled={loading}
                  className={`w-full py-5 bg-white text-black font-black tracking-[0.2em] uppercase text-xs transition-all ${loading ? 'opacity-50 cursor-wait' : 'hover:bg-white/90'}`}
                  style={{ fontFamily: f.l }}
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

export default Careers;
