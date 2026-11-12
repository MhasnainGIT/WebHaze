import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';

const f = { h: "'Inter',sans-serif", b: "'Hanken Grotesk',sans-serif", l: "'Geist Mono','monospace'" };

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/blog').then(r => setPosts(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-6 md:px-20">
      <SEO
        title="Blog | WebHaze — Web Design & Digital Strategy"
        description="Insights on web design, SEO, and digital growth from the WebHaze team. Serving businesses in Hyderabad and beyond."
        canonical="/blog"
        keywords="web design Hyderabad, website development tips, SEO Hyderabad, digital marketing"
      />
      <div className="max-w-[1440px] mx-auto">
        <ScrollReveal className="mb-16 md:mb-24">
          <span className="text-[11px] font-medium tracking-[0.15em] text-white uppercase block mb-6" style={{ fontFamily: f.l }}>INSIGHTS</span>
          <h1 className="text-[52px] md:text-[100px] font-black leading-[0.9] tracking-[-0.04em] uppercase" style={{ fontFamily: f.h }}>
            THE<br /><span className="text-white">BLOG.</span>
          </h1>
        </ScrollReveal>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-white/[0.03] border border-white/[0.06] animate-pulse" style={{ borderRadius: 0 }} />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <p className="text-white/40 text-lg" style={{ fontFamily: f.b }}>No posts published yet. Check back soon.</p>
        ) : (
          <div className="space-y-4">
            {posts.map((post, i) => (
              <ScrollReveal key={post._id} delay={i * 0.06}>
                <Link to={`/blog/${post.slug}`} className="block border border-white/[0.08] bg-white/[0.02] p-8 md:p-10 hover:border-white/20 transition-all duration-500 group" style={{ borderRadius: 0 }}>
                  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12">
                    <span className="text-[11px] text-white/30 tracking-[0.1em] uppercase md:w-32 flex-shrink-0" style={{ fontFamily: f.l }}>
                      {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}
                    </span>
                    <div className="flex-1">
                      <h2 className="text-xl md:text-2xl font-black uppercase tracking-[-0.02em] group-hover:text-white/80 transition-colors" style={{ fontFamily: f.h }}>{post.title}</h2>
                      <p className="text-white/50 text-sm mt-2 leading-relaxed" style={{ fontFamily: f.b }}>{post.excerpt}</p>
                    </div>
                    <span className="text-white/20 group-hover:text-white/60 transition-colors text-2xl flex-shrink-0">→</span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
