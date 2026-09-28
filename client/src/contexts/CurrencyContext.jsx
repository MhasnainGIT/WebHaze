import React, { createContext, useState, useContext, useEffect } from 'react';
import { CURRENCIES, COUNTRY_CURRENCY, formatPrice as _formatPrice } from '../config/pricing';

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('INR');
  const [detected, setDetected] = useState(false);

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(r => r.json())
      .then(data => {
        const code = COUNTRY_CURRENCY[data.country_code] || 'INR';
        setCurrency(code);
      })
      .catch(() => {})
      .finally(() => setDetected(true));
  }, []);

  const formatPrice = (amount) => _formatPrice(amount, currency);

  return (
    <CurrencyContext.Provider value={{ currency, currencies: CURRENCIES, formatPrice, detected }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error('useCurrency must be used within CurrencyProvider');
  return ctx;
};
