import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

// Utility function to replace template variables.
// Supports both `{key}` and legacy `{{path.to.value}}` placeholders.
const replaceVariables = (content, businessData = {}) => {
    if (typeof content !== 'string') return content;

    // Replace legacy double-brace paths like {{site.name}}
    const replacedLegacy = content.replace(/\{\{([^}]+)\}\}/g, (match, path) => {
        const parts = path.trim().split('.');
        let value = businessData;
        for (const p of parts) {
            if (value && Object.prototype.hasOwnProperty.call(value, p)) {
                value = value[p];
            } else {
                value = undefined;
                break;
            }
        }
        return value !== undefined && value !== null ? String(value) : match;
    });

    // Replace simple {key} placeholders
    return replacedLegacy.replace(/\{(\w+)\}/g, (match, key) => businessData[key] || match);
};

// Convert legacy section format (layout.sections -> {type, props}) into the
// new normalized section format used by the renderer.
const convertLegacySection = (sec) => {
    const type = sec.type;
    const props = sec.props || {};
    switch (type) {
        case 'hero':
            return {
                id: props.id || 'hero',
                type: 'hero',
                settings: { style: props.style || 'fullscreen', overlay: props.overlay || 'none' },
                content: {
                    heading: props.title || props.heading || '',
                    subheading: props.subtitle || props.subheading || '',
                    backgroundImage: { desktop: props.backgroundImage || '' },
                    cta: props.cta ? (Array.isArray(props.cta) ? props.cta : [props.cta]) : []
                }
            };
        case 'menu':
            return {
                id: props.id || 'menu',
                type: 'menu',
                settings: { layout: 'grid', categories: true, prices: true },
                content: {
                    heading: props.title || 'Menu',
                    categories: [
                        {
                            name: props.categoryName || 'Menu',
                            items: (props.items || []).map((it) => ({
                                name: it.name,
                                description: it.description || '',
                                price: (it.price || '').replace(/\$/g, ''),
                                image: it.image || '',
                                tags: it.tags || []
                            }))
                        }
                    ]
                }
            };
        case 'contact':
            return {
                id: props.id || 'contact',
                type: 'contact',
                settings: { layout: props.layout || 'split', map: !!props.map },
                content: {
                    heading: props.title || 'Contact',
                    info: {
                        address: props.address || '',
                        phone: props.phone || '',
                        hours: props.hours || { weekdays: '', weekends: '' }
                    },
                    form: props.form || { title: 'Get in Touch', fields: [] }
                }
            };
        default:
            return { id: props.id || type, type, settings: {}, content: props };
    }
};

// Normalize incoming template shapes (support both legacy and new formats)
const normalizeTemplate = (template) => {
    if (!template) return { sections: [], theme: { colors: {}, fonts: {} } };

    const sections = template.sections
        ? template.sections
        : (template.layout && Array.isArray(template.layout.sections)
            ? template.layout.sections.map(convertLegacySection)
            : []);

    const theme = template.theme || {
        colors: template.defaults?.colors || template.defaults || {},
        fonts: template.theme?.fonts || {
            heading: { family: 'Playfair Display', weights: [600, 700] },
            body: { family: 'Inter', weights: [400, 500] }
        },
        spacing: template.theme?.spacing || {}
    };

    return { sections, theme };
};

const Section = ({ section, businessData }) => {
    const { type, settings, content } = section;

    switch (type) {
        case 'hero':
            return (
                <motion.section 
                    className={`hero ${settings.style} ${settings.overlay}`}
                    variants={sectionVariants}
                    initial="hidden"
                    animate="visible"
                    style={{
                        backgroundImage: `url(${content.backgroundImage.desktop})`,
                        minHeight: settings.style === 'fullscreen' ? '100vh' : '500px'
                    }}
                >
                    <div className="container mx-auto px-4 flex flex-col items-center justify-center h-full text-center">
                        <h1 className="text-5xl md:text-6xl font-heading mb-6">
                            {replaceVariables(content.heading, businessData)}
                        </h1>
                        <p className="text-xl md:text-2xl mb-8">
                            {replaceVariables(content.subheading, businessData)}
                        </p>
                        <div className="flex gap-4">
                            {content.cta.map((button, index) => (
                                <button
                                    key={index}
                                    className={`px-8 py-3 rounded-lg ${
                                        button.style === 'primary' 
                                            ? 'bg-primary text-white' 
                                            : 'bg-white text-primary'
                                    }`}
                                    onClick={() => {
                                        if (button.action.startsWith('scroll-to-')) {
                                            const target = button.action.replace('scroll-to-', '');
                                            document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }}
                                >
                                    {button.text}
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.section>
            );

        case 'features':
            return (
                <motion.section 
                    id="features"
                    className="py-20"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <div className="container mx-auto px-4">
                        <h2 className="text-4xl font-heading text-center mb-12">
                            {content.heading}
                        </h2>
                        <div className={`grid grid-cols-1 md:grid-cols-${settings.columns} gap-8`}>
                            {content.items.map((item, index) => (
                                <div key={index} className="text-center">
                                    <div className="w-16 h-16 mx-auto mb-4">
                                        <img src={`/icons/${item.icon}.svg`} alt={item.title} className="w-full h-full" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                    <p className="text-textLight">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.section>
            );

        case 'menu':
            return (
                <motion.section 
                    id="menu"
                    className="py-20 bg-background"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <div className="container mx-auto px-4">
                        <h2 className="text-4xl font-heading text-center mb-12">
                            {content.heading}
                        </h2>
                        <div className="grid gap-12">
                            {content.categories.map((category, index) => (
                                <div key={index}>
                                    <h3 className="text-2xl font-heading mb-6">{category.name}</h3>
                                    <div className={`grid grid-cols-1 ${
                                        settings.layout === 'grid' ? 'md:grid-cols-2' : ''
                                    } gap-6`}>
                                        {category.items.map((item, itemIndex) => (
                                            <div key={itemIndex} className="flex gap-4 bg-white p-4 rounded-lg">
                                                {item.image && (
                                                    <img 
                                                        src={item.image} 
                                                        alt={item.name}
                                                        className="w-24 h-24 object-cover rounded"
                                                    />
                                                )}
                                                <div>
                                                    <div className="flex justify-between mb-2">
                                                        <h4 className="font-bold">{item.name}</h4>
                                                        {settings.prices && (
                                                            <span className="text-accent">${item.price}</span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-textLight">{item.description}</p>
                                                    {item.tags?.length > 0 && (
                                                        <div className="flex gap-2 mt-2">
                                                            {item.tags.map((tag, tagIndex) => (
                                                                <span 
                                                                    key={tagIndex}
                                                                    className="text-xs px-2 py-1 bg-secondary/10 text-secondary rounded"
                                                                >
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.section>
            );

        case 'testimonials':
            return (
                <motion.section
                    className="py-20"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <div className="container mx-auto px-4">
                        <h2 className="text-4xl font-heading text-center mb-12">
                            {content.heading}
                        </h2>
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {content.items.map((item, index) => (
                                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                                    <div className="flex items-center gap-4 mb-4">
                                        {item.image && (
                                            <img 
                                                src={item.image} 
                                                alt={item.author} 
                                                className="w-12 h-12 rounded-full object-cover"
                                            />
                                        )}
                                        <div>
                                            <p className="font-bold">{item.author}</p>
                                            <div className="flex text-accent">
                                                {Array.from({ length: item.rating }).map((_, i) => (
                                                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                                                    </svg>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-textLight italic">{item.quote}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.section>
            );

        case 'contact':
            return (
                <motion.section
                    id="contact"
                    className="py-20"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <div className={`container mx-auto px-4 ${
                        settings.layout === 'split' ? 'grid md:grid-cols-2 gap-12' : ''
                    }`}>
                        <div>
                            <h2 className="text-4xl font-heading mb-8">{content.heading}</h2>
                            <div className="space-y-4">
                                <p>{replaceVariables(content.info.address, businessData)}</p>
                                <p>{replaceVariables(content.info.phone, businessData)}</p>
                                <div>
                                    <p className="font-bold mb-2">Hours:</p>
                                    <p>Weekdays: {content.info.hours.weekdays}</p>
                                    <p>Weekends: {content.info.hours.weekends}</p>
                                </div>
                            </div>
                            {settings.map && (
                                <div className="mt-8 h-64 bg-gray-100 rounded-lg">
                                    {/* Map integration will go here */}
                                </div>
                            )}
                        </div>
                        <div>
                            <h3 className="text-2xl font-heading mb-6">{content.form.title}</h3>
                            <form className="space-y-4">
                                {content.form.fields.map((field, index) => (
                                    <div key={index}>
                                        <label className="block mb-2">
                                            {field.label}
                                            {field.required && <span className="text-red-500">*</span>}
                                        </label>
                                        {field.type === 'textarea' ? (
                                            <textarea
                                                name={field.name}
                                                required={field.required}
                                                className="w-full p-3 border rounded-lg"
                                                rows={4}
                                            />
                                        ) : (
                                            <input
                                                type={field.type}
                                                name={field.name}
                                                required={field.required}
                                                className="w-full p-3 border rounded-lg"
                                            />
                                        )}
                                    </div>
                                ))}
                                <button type="submit" className="bg-primary text-white px-8 py-3 rounded-lg">
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </motion.section>
            );

        default:
            return null;
    }
};
const TemplateRenderer = ({ template, businessData = {} }) => {
    // Normalize template (handles legacy and new formats)
    const normalized = normalizeTemplate(template);

    useEffect(() => {
        if (!normalized || !normalized.theme) return;

        // Apply template theme
        const root = document.documentElement;
        Object.entries(normalized.theme.colors || {}).forEach(([key, value]) => {
            root.style.setProperty(`--color-${key}`, value);
        });

        // Load fonts safely
        const loadFont = (font) => {
            if (!font || !font.family) return;
            const link = document.createElement('link');
            link.href = `https://fonts.googleapis.com/css2?family=${font.family.replace(/\s+/g, '+')}:wght@${(font.weights || []).join(';')}&display=swap`;
            link.rel = 'stylesheet';
            document.head.appendChild(link);
        };
        loadFont(normalized.theme.fonts?.heading);
        loadFont(normalized.theme.fonts?.body);
    }, [normalized]);

    if (!template) return <div>No template provided</div>;

    const sections = normalized.sections || [];

    return (
        <div className="template-preview font-body">
            {sections.map((section, index) => (
                <Section 
                    key={section.id || index}
                    section={section}
                    businessData={businessData}
                />
            ))}
        </div>
    );
};

export default TemplateRenderer;
