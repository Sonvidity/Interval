"use client";

import type { ReactNode } from "react";
import { FirebaseProvider } from "./provider";
import { initializeFirebase } from "./init";

// Initialize Firebase on the client
const { firebaseApp, auth, firestore } = initializeFirebase();

export function FirebaseClientProvider({ children }: { children: ReactNode }) {
  if (!firebaseApp) {
    return <>{children}</>;
  }
  return (
    <FirebaseProvider value={{ firebaseApp, auth, firestore }}>
      {children}
    </FirebaseProvider>
  );
}
