// "use client";

import Cookies from "js-cookie";
import React, { createContext, useContext, useEffect, useState } from "react";

type LocaleContextType = {
  locale: string;
  toggleLocale: (newLocale:string) => void;
};

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
};

export const LocaleProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [locale, setLocale] = useState(Cookies.get("lng"));

  useEffect(() => {
    const handleLocaleChange = () => {
      if (locale === "en") {
        document.dir = "ltr"; // Set direction to left-to-right for English
      } else if (locale === "ar") {
        document.dir = "rtl"; // Set direction to right-to-left for Arabic
      }
    };
    Cookies.set("lng", locale);


      handleLocaleChange();
    // Set initial direction on mount

    return () => {
      window.removeEventListener("beforeunload", handleLocaleChange);
    };
  }, [locale]);

  const toggleLocale = (newLocale: string) => {
    setLocale(newLocale);
    setTimeout(() => {
      window.location.reload(); // Reload the window on locale change
    }, 50);
  };
  return (
    <LocaleContext.Provider value={{ locale, toggleLocale }}>
      {children}
    </LocaleContext.Provider>
  );
};
