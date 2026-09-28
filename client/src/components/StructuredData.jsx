import React from 'react';
import JsonLd from './JsonLd';

const StructuredData = () => {
    const organizationData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "WebHaze",
        "url": "https://www.webhaze.in",
        "logo": {
            "@type": "ImageObject",
            "url": "https://www.webhaze.in/favicon.png",
            "width": 512,
            "height": 512
        },
        "description": "WebHaze is a premier digital agency providing professional web design, high-performance cloud servers, dedicated hosting, and enterprise-grade mobile app development for businesses worldwide.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Innovation Hub, Financial District",
            "addressLocality": "Hyderabad",
            "addressRegion": "Telangana",
            "postalCode": "500032",
            "addressCountry": "IN"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-8919019679",
            "contactType": "customer service",
            "email": "webhaze.in@gmail.com",
            "availableLanguage": ["English", "Hindi"],
            "areaServed": "Worldwide"
        },
        "sameAs": [
            "https://www.linkedin.com/company/webhaze",
            "https://github.com/webhaze"
        ],
        "foundingDate": "2024",
        "numberOfEmployees": "2-10",
        "knowsAbout": [
            "Web Development",
            "Cloud Hosting",
            "VPS Hosting",
            "Dedicated Servers",
            "Mobile App Development",
            "SEO Optimization",
            "E-commerce Development"
        ]
    };

    const websiteData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "WebHaze",
        "url": "https://www.webhaze.in",
        "description": "WebHaze offers professional website development, cloud hosting, dedicated servers, and mobile app development services for startups and businesses.",
        "publisher": {
            "@type": "Organization",
            "name": "WebHaze",
            "logo": {
                "@type": "ImageObject",
                "url": "https://www.webhaze.in/favicon.png"
            }
        },
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://www.webhaze.in/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
        },
        "inLanguage": "en-IN"
    };

    const serviceData = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Web Development & Cloud Hosting Services",
        "provider": {
            "@type": "Organization",
            "name": "WebHaze",
            "url": "https://www.webhaze.in"
        },
        "areaServed": {
            "@type": "Country",
            "name": "Worldwide"
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Web Development Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Website Development",
                        "description": "Professional web development services worldwide for USA, Canada, UK, Germany, Australia, and India. Custom responsive websites built with modern technologies."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Web Hosting",
                        "description": "Lightning-fast web hosting with 99.9% uptime guarantee, SSD storage, free SSL, CDN integration, and 24/7 expert support."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Cloud Servers & VPS",
                        "description": "Enterprise-grade managed VPS, dedicated servers, and cloud infrastructure with 99.999% SLA. Linux and Windows options available."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Mobile App Development",
                        "description": "High-performance iOS, Android, and cross-platform mobile applications with native-like experience and cloud integration."
                    }
                }
            ]
        }
    };

    return (
        <>
            <JsonLd data={organizationData} />
            <JsonLd data={websiteData} />
            <JsonLd data={serviceData} />
        </>
    );
};

export default StructuredData;
