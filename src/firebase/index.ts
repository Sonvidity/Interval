// This barrel file is used to export all of the firebase functionality.
import { useAuth, useFirebase, useFirebaseApp, useFirestore } from "./provider";
import { useUser } from './auth/use-user';
import { FirebaseClientProvider } from "./client-provider";
import { FirebaseProvider } from "./provider";
import { useMemo } from 'react';
import { CollectionReference, DocumentReference, Query } from 'firebase/firestore';
import { initializeFirebase } from './init';


export function useMemoFirebase<T extends DocumentReference | CollectionReference | Query>(
  factory: () => T | null | undefined,
  deps: React.DependencyList
): T | null {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const ref = useMemo(factory, deps);
  return ref ?? null;
}

export {
    FirebaseClientProvider,
    FirebaseProvider,
    useAuth,
    useFirebase,
    useFirebaseApp,
    useFirestore,
    useUser,
    initializeFirebase,
};
