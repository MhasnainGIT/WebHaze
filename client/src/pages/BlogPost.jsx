import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import SEO from '../components/SEO';

const f = { h: "'Inter',sans-serif", b: "'Hanken Grotesk',sans-serif", l: "'Geist Mono','monospace'" };

const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    axios.get(`/api/blog/${slug}`)
      .then(r => setPost(r.data))
      .catch(err => { if (err.response?.status === 404) setNotFound(true); })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-6 md:px-20 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white" />
    </div>
  );

  if (notFound || !post) return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-6 md:px-20 text-center">
      <h1 className="text-4xl font-black text-white mb-6" style={{ fontFamily: f.h }}>Post not found</h1>
      <Link to="/blog" className="text-white/60 hover:text-white underline" style={{ fontFamily: f.b }}>← Back to Blog</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-6 md:px-20">
      <SEO title={`${post.title} | WebHaze Blog`} description={post.excerpt} canonical={`/blog/${post.slug}`} />
      <div className="max-w-3xl mx-auto">
        <Link to="/blog" className="text-[11px] text-white/40 hover:text-white tracking-[0.1em] uppercase transition-colors mb-12 block" style={{ fontFamily: f.l }}>← Blog</Link>
        <span className="text-[11px] text-white/30 tracking-[0.1em] uppercase block mb-4" style={{ fontFamily: f.l }}>
          {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : ''} · {post.author}
        </span>
        <h1 className="text-[40px] md:text-[64px] font-black leading-[0.95] tracking-[-0.03em] uppercase mb-12" style={{ fontFamily: f.h }}>{post.title}</h1>
        <div
          className="prose prose-invert prose-lg max-w-none"
          style={{ fontFamily: f.b }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        {post.tags?.length > 0 && (
          <div className="mt-12 flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span key={tag} className="px-3 py-1 border border-white/[0.08] text-[10px] text-white/40 uppercase tracking-[0.1em]" style={{ fontFamily: f.l, borderRadius: 0 }}>{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPostPage;
