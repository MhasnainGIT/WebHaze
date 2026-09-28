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

export const formatPrice = (amount, currencyCode) => {
  const { symbol, locale } = CURRENCIES[currencyCode];
  const formatted = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(amount);
  // AED prefix, others prefix with symbol
  return currencyCode === 'AED' ? `AED ${formatted}` : `${symbol}${formatted}`;
};
