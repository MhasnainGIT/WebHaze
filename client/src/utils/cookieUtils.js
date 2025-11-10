// Cookie consent utility functions
export const checkCookieConsent = () => {
  const consent = localStorage.getItem('cookieConsent');
  const expiry = localStorage.getItem('cookieConsentExpiry');
  
  if (!consent || !expiry) {
    return null;
  }
  
  // Check if consent has expired
  const expiryDate = new Date(expiry);
  const now = new Date();
  
  if (now > expiryDate) {
    // Consent expired, remove it
    localStorage.removeItem('cookieConsent');
    localStorage.removeItem('cookieConsentExpiry');
    return null;
  }
  
  return consent;
};

export const hasAcceptedCookies = () => {
  return checkCookieConsent() === 'accepted';
};

export const initializeTracking = () => {
  if (!hasAcceptedCookies()) {
    return;
  }
  
  // Initialize your tracking scripts here
  // Example implementations:
  
  // Google Analytics 4
  // if (window.gtag) {
  //   window.gtag('config', 'GA_MEASUREMENT_ID');
  // }
  
  // Facebook Pixel
  // if (window.fbq) {
  //   window.fbq('track', 'PageView');
  // }
  
  console.log('Tracking initialized - user has consented to cookies');
};

// Call this function on page loads to conditionally load tracking
export const conditionallyLoadTracking = () => {
  if (hasAcceptedCookies()) {
    initializeTracking();
  }
};