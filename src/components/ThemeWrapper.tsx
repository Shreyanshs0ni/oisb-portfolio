"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";
import { ThemeControls } from "./ThemeControls";

interface ThemeWrapperProps {
  children: ReactNode;
}

export function ThemeWrapper({ children }: ThemeWrapperProps) {
  return (
    <ThemeProvider>
      <ThemeControls />
      {children}
    </ThemeProvider>
  );
}

export default ThemeWrapper;

