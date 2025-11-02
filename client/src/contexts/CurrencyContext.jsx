import React, { createContext, useState, useContext } from 'react';

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('INR');
  
  const exchangeRate = 83; // 1 USD = 83 INR (approximate)
  
  const formatPrice = (usdPrice) => {
    if (currency === 'INR') {
      const inrPrice = Math.round(usdPrice * exchangeRate);
      return `₹${inrPrice}`;
    }
    return `$${usdPrice}`;
  };

  const toggleCurrency = () => {
    setCurrency(prev => prev === 'USD' ? 'INR' : 'USD');
  };

  return (
    <CurrencyContext.Provider value={{ 
      currency, 
      setCurrency, 
      formatPrice, 
      toggleCurrency 
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within CurrencyProvider');
  }
  return context;
};