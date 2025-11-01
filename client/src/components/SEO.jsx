import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = "WebHaze - Lightning-Fast Web Hosting & Website Development",
  description = "Build and scale your dream website with WebHaze. Lightning-fast hosting, custom development, mobile apps, and 24/7 expert support. 99.9% uptime guarantee.",
  keywords = "web hosting, website development, mobile app development, fast hosting, custom websites, SEO optimization",
  canonical,
  image = "/og-image.jpg",
  type = "website"
}) => {
  const siteUrl = "https://webhaze.com";
  const fullUrl = canonical ? `${siteUrl}${canonical}` : siteUrl;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      <link rel="canonical" href={fullUrl} />
      
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={`${siteUrl}${image}`} />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${image}`} />
      
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": title,
          "description": description,
          "url": fullUrl,
          "isPartOf": {
            "@type": "WebSite",
            "name": "WebHaze",
            "url": siteUrl
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEO;