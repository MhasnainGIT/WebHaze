import React from 'react';
import { useCurrency } from '../contexts/CurrencyContext';
import { CURRENCIES } from '../config/pricing';

const CurrencySelector = () => {
  const { currency, setCurrency, currencies } = useCurrency();

  return (
    <div className="flex items-center gap-2">
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="bg-white/5 border border-white/10 text-white text-xs font-bold tracking-widest uppercase rounded-full px-4 py-2 outline-none focus:border-white/50 transition-colors cursor-pointer"
      >
        {Object.entries(currencies).map(([code, { flag, name }]) => (
          <option key={code} value={code} className="bg-black text-white">
            {flag} {name} ({code})
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelector;
