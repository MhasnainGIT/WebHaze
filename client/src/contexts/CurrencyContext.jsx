import React, { createContext, useState, useContext, useEffect } from 'react';
import { CURRENCIES, COUNTRY_CURRENCY, formatPrice as _formatPrice } from '../config/pricing';

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('INR');
  const [detected, setDetected] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem('wh_currency');
    if (saved && CURRENCIES[saved]) {
      setCurrency(saved);
      setDetected(true);
      return;
    }
    fetch('https://ipapi.co/json/')
      .then(r => r.json())
      .then(data => {
        const code = COUNTRY_CURRENCY[data.country_code] || 'INR';
        setCurrency(code);
        sessionStorage.setItem('wh_currency', code);
      })
      .catch(() => {}) // silently fall back to INR
      .finally(() => setDetected(true));
  }, []);

  const selectCurrency = (code) => {
    if (!CURRENCIES[code]) return;
    setCurrency(code);
    sessionStorage.setItem('wh_currency', code);
  };

  const formatPrice = (amount) => _formatPrice(amount, currency);

  return (
    <CurrencyContext.Provider value={{ currency, currencies: CURRENCIES, selectCurrency, formatPrice, detected }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error('useCurrency must be used within CurrencyProvider');
  return ctx;
};
