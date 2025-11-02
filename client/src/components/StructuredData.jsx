import React from 'react';

const StructuredData = () => {
    const organizationData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "WebHaze",
        "url": "https://www.webhaze.in",
        "logo": "https://www.webhaze.in/favicon.png",
        "description": "WebHaze offers professional website development, landing pages, and portfolio sites for startups and businesses. Contact us to get your online presence built fast.",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "IN",
            "addressRegion": "India"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-8919019679",
            "contactType": "customer service",
            "email": "webhaze.in@gmail.com",
            "availableLanguage": ["English", "Hindi"]
        },
        "sameAs": [
            "https://www.linkedin.com/company/webhaze",
            "https://github.com/webhaze"
        ],
        "foundingDate": "2024",
        "numberOfEmployees": "2-10",
        "slogan": "Professional Web Development & Design Services"
    };

    const websiteData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "WebHaze",
        "url": "https://www.webhaze.in",
        "description": "WebHaze offers professional website development, landing pages, and portfolio sites for startups and businesses.",
        "publisher": {
            "@type": "Organization",
            "name": "WebHaze"
        },
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.webhaze.in/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    };

    const serviceData = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Web Development Services",
        "provider": {
            "@type": "Organization",
            "name": "WebHaze",
            "url": "https://www.webhaze.in"
        },
        "areaServed": ["Worldwide", "USA", "Canada", "UK", "Germany", "Australia", "India"],
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Web Development Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Website Development",
                        "description": "Professional web development services worldwide for USA, Canada, UK, Germany, Australia"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Portfolio Website Creation",
                        "description": "Custom portfolio websites for professionals and businesses"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Website Maintenance",
                        "description": "Affordable website maintenance services for global clients with competitive pricing"
                    }
                }
            ]
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceData) }}
            />
        </>
    );
};

export default StructuredData;