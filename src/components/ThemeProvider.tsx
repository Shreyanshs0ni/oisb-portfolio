"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface ThemeContextType {
  isLightMode: boolean;
  isOrangeMode: boolean;
  toggleLightMode: () => void;
  toggleOrangeMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isLightMode, setIsLightMode] = useState(false);
  const [isOrangeMode, setIsOrangeMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load saved preferences from localStorage
  useEffect(() => {
    setMounted(true);
    const savedLightMode = localStorage.getItem("lightMode") === "true";
    const savedOrangeMode = localStorage.getItem("orangeMode") === "true";
    setIsLightMode(savedLightMode);
    setIsOrangeMode(savedOrangeMode);
  }, []);

  // Apply classes to document
  useEffect(() => {
    if (!mounted) return;
    
    const root = document.documentElement;
    
    if (isLightMode) {
      root.classList.add("light-mode");
    } else {
      root.classList.remove("light-mode");
    }
    
    if (isOrangeMode) {
      root.classList.add("orange-mode");
    } else {
      root.classList.remove("orange-mode");
    }
    
    // Save to localStorage
    localStorage.setItem("lightMode", String(isLightMode));
    localStorage.setItem("orangeMode", String(isOrangeMode));
  }, [isLightMode, isOrangeMode, mounted]);

  const toggleLightMode = () => setIsLightMode((prev) => !prev);
  const toggleOrangeMode = () => setIsOrangeMode((prev) => !prev);

  // Prevent hydration mismatch
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider
      value={{ isLightMode, isOrangeMode, toggleLightMode, toggleOrangeMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  // Return default values during SSR or when outside provider
  if (context === undefined) {
    return {
      isLightMode: false,
      isOrangeMode: false,
      toggleLightMode: () => {},
      toggleOrangeMode: () => {},
    };
  }
  return context;
}

export default ThemeProvider;

