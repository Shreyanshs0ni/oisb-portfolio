"use client";

import { useHoverSound } from "@/hooks/useHoverSound";

export function HoverSoundProvider() {
  useHoverSound("/clickSound.wav");
  return null;
}

export default HoverSoundProvider;

