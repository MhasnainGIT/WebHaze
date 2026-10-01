export const CURRENCIES = {
  INR: { symbol: '₹', name: 'Indian Rupee',   flag: '🇮🇳', locale: 'en-IN' },
  AED: { symbol: 'AED', name: 'UAE Dirham',   flag: '🇦🇪', locale: 'en-AE' },
  USD: { symbol: '$',  name: 'US Dollar',     flag: '🇺🇸', locale: 'en-US' },
  GBP: { symbol: '£',  name: 'British Pound', flag: '🇬🇧', locale: 'en-GB' },
  EUR: { symbol: '€',  name: 'Euro',          flag: '🇩🇪', locale: 'de-DE' },
};

// Country code → currency mapping
export const COUNTRY_CURRENCY = {
  IN: 'INR',
  AE: 'AED', SA: 'AED', QA: 'AED', KW: 'AED', BH: 'AED', OM: 'AED',
  US: 'USD', CA: 'USD', AU: 'USD', SG: 'USD',
  GB: 'GBP',
  DE: 'EUR', FR: 'EUR', IT: 'EUR', ES: 'EUR', NL: 'EUR',
};

export const PLANS = [
  {
    name: 'Nexus Core',
    description: 'Everything you need to launch a high-performance business presence.',
    features: ['AI Site Generator', 'Free SSL', '99.9% Uptime', 'Global CDN', 'Custom Domain (1yr)'],
    prices: { INR: 7999, AED: 349, USD: 99, GBP: 79, EUR: 89 },
  },
  {
    name: 'Nexus Elite',
    description: 'Scale your revenue with ultra-fast E-commerce and priority nexus support.',
    features: ['Priority Deployment', 'E-commerce Engine', 'Advanced SEO Tools', '24/7 Expert Support', 'Weekly Backups'],
    prices: { INR: 14999, AED: 649, USD: 199, GBP: 159, EUR: 179 },
    popular: true,
  },
  {
    name: 'Nexus Max',
    description: 'Custom enterprise architecture for industry leaders and high-scale platforms.',
    features: ['Custom API Integrations', 'Daily Shadow Backups', 'Unlimited Pages', 'Dedicated Manager', 'Elite Performance Tuning'],
    prices: { INR: 24999, AED: 1099, USD: 329, GBP: 269, EUR: 299 },
  },
];

export const SERVICE_PRICES = {
  'website-development': {
    'Custom Website Design': { INR: 999, USD: 999, AED: 349, GBP: 79, EUR: 89 },
    'E-commerce Development': { INR: 1999, USD: 1999, AED: 649, GBP: 159, EUR: 179 },
    'CMS Development': { INR: 1499, USD: 1499, AED: 449, GBP: 119, EUR: 139 },
    'Website Redesign': { INR: 799, USD: 799, AED: 249, GBP: 59, EUR: 69 },
  },
  'app-development': {
    'iOS App Development': { INR: 4999, USD: 4999, AED: 1649, GBP: 399, EUR: 459 },
    'Android App Development': { INR: 4999, USD: 4999, AED: 1649, GBP: 399, EUR: 459 },
    'Cross-Platform Apps': { INR: 6999, USD: 6999, AED: 2299, GBP: 549, EUR: 639 },
    'Web Applications': { INR: 2999, USD: 2999, AED: 999, GBP: 239, EUR: 279 },
  },
  'cloud-servers': {
    base: { INR: 1, USD: 1, AED: 1, GBP: 1, EUR: 1 },
  },
};

export const formatPrice = (amount, currencyCode) => {
  const { symbol, locale } = CURRENCIES[currencyCode];
  const formatted = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(amount);
  return currencyCode === 'AED' ? `AED ${formatted}` : `${symbol}${formatted}`;
};

export const formatPriceWithLabel = (amount, currencyCode, label = 'Starting at') => {
  return `${label} ${formatPrice(amount, currencyCode)}`;
};
