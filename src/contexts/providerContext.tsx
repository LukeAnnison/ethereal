import React, { createContext, useState, useEffect } from 'react';

export const ProviderContext = createContext({
  setProvider: () => null,
  provider: null,
});

export const ProviderProvider = ({ children }) => {
  const [provider, setProvider] = useState<any>(null)
  const value = { provider , setProvider };


  return <ProviderContext.Provider value={value}>{children}</ProviderContext.Provider>;
};

