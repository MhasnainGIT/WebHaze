import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
  title = "WebHaze - Lightning-Fast Web Hosting & Website Development",
  description = "Build and scale your dream website with WebHaze. Lightning-fast hosting, custom development, mobile apps, and 24/7 expert support. 99.9% uptime guarantee.",
  keywords = "web hosting, website development, mobile app development, fast hosting, custom websites, SEO optimization",
  canonical,
  image = "/og-image.svg",
  imageWidth = 1200,
  imageHeight = 630,
  type = "website",
  noindex = false,
  ogLocale = "en_IN",
  twitterSite = "@webhaze",
  publishedTime,
  modifiedTime,
  author = "WebHaze",
  faq,
  breadcrumb
}) => {
  const siteUrl = "https://www.webhaze.in";
  const fullUrl = canonical ? `${siteUrl}${canonical}` : siteUrl;
  const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`;

  const robotsContent = noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content={robotsContent} />
      {noindex && <meta name="googlebot" content="noindex, nofollow" />}

      <link rel="canonical" href={fullUrl} />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="preconnect" href="https://cdn.clarity.ms" />

      <meta property="og:locale" content={ogLocale} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content={String(imageWidth)} />
      <meta property="og:image:height" content={String(imageHeight)} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="WebHaze" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterSite} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:image:alt" content={title} />

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": type === "article" ? "Article" : "WebPage",
          "name": title,
          "description": description,
          "url": fullUrl,
          "image": fullImage,
          ...(publishedTime && { datePublished: publishedTime }),
          ...(modifiedTime && { dateModified: modifiedTime }),
          "author": {
            "@type": "Organization",
            "name": author
          },
          "isPartOf": {
            "@type": "WebSite",
            "name": "WebHaze",
            "url": siteUrl
          },
          ...(type === "article" && {
            "publisher": {
              "@type": "Organization",
              "name": "WebHaze",
              "logo": {
                "@type": "ImageObject",
                "url": `${siteUrl}/favicon.png`
              }
            }
          })
        })}
      </script>
      {faq && faq.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faq.map(item => ({
              "@type": "Question",
              "name": item.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
              }
            }))
          })}
        </script>
      )}
      {breadcrumb && breadcrumb.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumb.map((item, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": item.name,
              "item": item.url
            }))
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
