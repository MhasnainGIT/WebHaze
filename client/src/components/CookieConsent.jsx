import React, { useState, useEffect } from 'react';
import { checkCookieConsent, initializeTracking } from '../utils/cookieUtils';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already given consent
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    // Set consent cookie for 6 months
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 6);
    
    localStorage.setItem('cookieConsent', 'accepted');
    localStorage.setItem('cookieConsentExpiry', expiryDate.toISOString());
    
    // Enable tracking scripts here
    enableTracking();
    
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShowBanner(false);
  };

  const enableTracking = () => {
    initializeTracking();
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-black/95 backdrop-blur-xl border-t border-white/10">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1 text-center md:text-left">
            <p className="text-white text-sm md:text-base">
              We use cookies to improve your experience and analyze traffic. By continuing to browse, you agree to our use of cookies.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleDecline}
              className="px-4 py-2 text-white/70 hover:text-white border border-white/20 rounded-lg hover:bg-white/10 transition-all duration-300 text-sm"
            >
              Decline
            </button>
            <button
              onClick={handleAccept}
              className="px-6 py-2 bg-white/10 text-white border border-white/20 rounded-lg hover:bg-white/20 backdrop-blur-sm transition-all duration-300 text-sm font-medium"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;