import React from "react";
import { ThemeProvider } from "../context/ThemeContext";

export const AppProvider = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};
