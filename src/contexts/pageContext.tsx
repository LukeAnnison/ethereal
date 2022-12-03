import React, { createContext, useState, useEffect } from "react";

export const PageContext = createContext({
  setPage: (page: string) => null,
  page: null,
});

export const PageProvider = ({ children }) => {
  const [page, setPage] = useState("earnings");
  const value = { page, setPage };

  useEffect(() => {}, [page]);

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
};

export const ToggleContext = createContext({
  setToggle: () => null,
  toggle: null,
});

export const ToggleProvider = ({ children }) => {
  const [toggle, setToggle] = useState(false);
  const value = { toggle, setToggle };

  return (
    <ToggleContext.Provider value={value}>{children}</ToggleContext.Provider>
  );
};
