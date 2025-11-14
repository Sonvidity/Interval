"use client";

import { GarageProvider } from "@/context/GarageContext";
import type { ReactNode } from "react";
import { FirebaseClientProvider } from "@/firebase/client-provider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <FirebaseClientProvider>
        <GarageProvider>{children}</GarageProvider>
    </FirebaseClientProvider>
  );
}
