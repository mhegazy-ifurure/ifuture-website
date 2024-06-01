"use client";

import React from "react";

import { AuthProvider } from "../_providers/Auth";
import { ThemeProvider } from "./Theme";
import { LocaleProvider } from "./Locale";

export const Providers: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <LocaleProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </LocaleProvider>
  );
};
