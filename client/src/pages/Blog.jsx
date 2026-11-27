import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';
import {
  SpotlightCard,
  WavyText,
  TextGenerateEffect,
  BackgroundBeams,
  GlowingStarsBackground,
  ScrollVelocity,
} from '../components/ui/aceternity';

const f = {
  h: "'Inter',sans-serif",
  b: "'Hanken Grotesk',sans-serif",
  l: "'Geist Mono','monospace'",
};

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/blog').then(r => setPosts(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 relative overflow-hidden">
      <SEO
        title="Blog | WebHaze — Web Design & Digital Strategy"
        description="Insights on web design, SEO, and digital growth from the WebHaze team. Serving businesses in Hyderabad and beyond."
        canonical="/blog"
        keywords="web design Hyderabad, website development tips, SEO Hyderabad, digital marketing"
      />

      {/* Aceternity backgrounds */}
      <GlowingStarsBackground className="fixed inset-0 pointer-events-none opacity-25" />
      <BackgroundBeams className="opacity-30" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-20 relative z-10">
        {/* ─── HERO ─── */}
        <ScrollReveal className="mb-16 md:mb-24">
          <span
            className="text-[11px] font-medium tracking-[0.15em] text-white/40 uppercase block mb-6"
            style={{ fontFamily: f.l }}
          >
            INSIGHTS
          </span>
          <h1
            className="text-[52px] md:text-[100px] font-black leading-[0.9] tracking-[-0.04em] uppercase"
            style={{ fontFamily: f.h }}
          >
            <WavyText text="THE" />
            <br />
            <WavyText text="BLOG." delay={0.2} />
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.3} className="mb-20">
          <TextGenerateEffect
            words="Strategy, design, and engineering insights from the WebHaze team. Fresh perspectives on digital growth."
            className="text-lg md:text-xl text-white/60 max-w-2xl"
          />
        </ScrollReveal>

        {/* ─── Aceternity ScrollVelocity ─── */}
        <div className="mb-16 overflow-hidden border-t border-white/[0.06]">
          <ScrollVelocity text1="WEB DESIGN · SEO · DEVELOPMENT · STRATEGY ·" text2="WEBHAZE BLOG · INSIGHTS · HYDERABAD ·" />
        </div>

        {/* ─── Posts ─── */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-32 bg-white/[0.03] border border-white/[0.06] animate-pulse"
                style={{ borderRadius: 0 }}
              />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="py-32 text-center">
            <SpotlightCard
              className="border border-white/[0.08] bg-white/[0.02] max-w-lg mx-auto"
              spotlightColor="rgba(255,255,255,0.04)"
            >
              <div className="p-16">
                <span
                  className="text-[11px] font-medium tracking-[0.15em] text-white/30 uppercase block mb-6"
                  style={{ fontFamily: f.l }}
                >
                  COMING SOON
                </span>
                <p className="text-white/40 text-lg" style={{ fontFamily: f.b }}>
                  No posts published yet. Check back soon.
                </p>
              </div>
            </SpotlightCard>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post, i) => (
              <ScrollReveal key={post._id} delay={i * 0.06}>
                <SpotlightCard
                  className="border border-white/[0.08] bg-white/[0.02] hover:border-white/20 transition-all duration-500"
                  spotlightColor="rgba(255,255,255,0.04)"
                >
                  <Link
                    to={`/blog/${post.slug}`}
                    className="block p-8 md:p-10 group"
                    style={{ borderRadius: 0 }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12">
                      <span
                        className="text-[11px] text-white/30 tracking-[0.1em] uppercase md:w-32 flex-shrink-0"
                        style={{ fontFamily: f.l }}
                      >
                        {post.publishedAt
                          ? new Date(post.publishedAt).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })
                          : ''}
                      </span>
                      <div className="flex-1">
                        <h2
                          className="text-xl md:text-2xl font-black uppercase tracking-[-0.02em] group-hover:text-white/80 transition-colors mb-2"
                          style={{ fontFamily: f.h }}
                        >
                          {post.title}
                        </h2>
                        <p
                          className="text-white/50 text-sm leading-relaxed"
                          style={{ fontFamily: f.b }}
                        >
                          {post.excerpt}
                        </p>
                      </div>
                      <span className="text-white/20 group-hover:text-white/60 transition-colors text-2xl flex-shrink-0">
                        →
                      </span>
                    </div>
                  </Link>
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
