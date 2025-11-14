"use client";

import { GarageProvider } from "@/context/GarageContext";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return <GarageProvider>{children}</GarageProvider>;
}
