"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import type { UserCar, ServiceLog } from '@/lib/types';
import { useUser, useFirestore } from '@/firebase';
import { collection, doc, onSnapshot, setDoc, addDoc, query, orderBy, deleteDoc } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

interface GarageContextType {
  cars: UserCar[];
  loading: boolean;
  addCar: (carData: Omit<UserCar, 'id' | 'serviceHistory' | 'userId'>) => Promise<void>;
  updateCar: (updatedCar: UserCar) => Promise<void>;
  logService: (carId: string, serviceLog: Omit<ServiceLog, 'id'>) => Promise<void>;
  getCarById: (id: string) => UserCar | undefined;
}

const GarageContext = createContext<GarageContextType | undefined>(undefined);

export const GarageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cars, setCars] = useState<UserCar[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: userLoading } = useUser();
  const firestore = useFirestore();

  useEffect(() => {
    if (user && firestore) {
      setLoading(true);
      const q = query(collection(firestore, 'users', user.uid, 'cars'));
      const unsubscribe = onSnapshot(q, 
        (querySnapshot) => {
          const userCars: UserCar[] = [];
          querySnapshot.forEach((doc) => {
            userCars.push({ id: doc.id, ...doc.data() } as UserCar);
          });
          setCars(userCars);
          setLoading(false);
        },
        (err) => {
          const permissionError = new FirestorePermissionError({
            path: `users/${user.uid}/cars`,
            operation: 'list',
          });
          errorEmitter.emit('permission-error', permissionError);
          setLoading(false);
        });

      return () => unsubscribe();
    } else if (!userLoading) {
      setCars([]);
      setLoading(false);
    }
  }, [user, firestore, userLoading]);

  const addCar = useCallback(async (carData: Omit<UserCar, 'id' | 'serviceHistory' | 'userId'>) => {
    if (!firestore || !user) return;
    const newCar = { ...carData, userId: user.uid, serviceHistory: [] };
    const carRef = collection(firestore, 'users', user.uid, 'cars');
    addDoc(carRef, newCar).catch(async (serverError) => {
        const permissionError = new FirestorePermissionError({
            path: carRef.path,
            operation: 'create',
            requestResourceData: newCar,
        });
        errorEmitter.emit('permission-error', permissionError);
    });
  }, [firestore, user]);

  const updateCar = useCallback(async (updatedCar: UserCar) => {
    if (!firestore || !user) return;
    const { id, ...carData } = updatedCar;
    const carRef = doc(firestore, 'users', user.uid, 'cars', id);
    setDoc(carRef, carData, { merge: true }).catch(async (serverError) => {
        const permissionError = new FirestorePermissionError({
            path: carRef.path,
            operation: 'update',
            requestResourceData: carData,
        });
        errorEmitter.emit('permission-error', permissionError);
    });
  }, [firestore, user]);

  const logService = useCallback(async (carId: string, serviceLogData: Omit<ServiceLog, 'id'>) => {
    if (!firestore || !user) return;

    const car = cars.find(c => c.id === carId);
    if (!car) return;

    const historyRef = collection(firestore, 'users', user.uid, 'cars', carId, 'serviceHistory');
    addDoc(historyRef, serviceLogData).catch(async (serverError) => {
        const permissionError = new FirestorePermissionError({
            path: historyRef.path,
            operation: 'create',
            requestResourceData: serviceLogData,
        });
        errorEmitter.emit('permission-error', permissionError);
    });

    const carRef = doc(firestore, 'users', user.uid, 'cars', carId);
    const updatedFields: Partial<UserCar> = {};

    if (serviceLogData.serviceType === 'Engine' || serviceLogData.serviceType === 'General') {
        updatedFields.lastServiceEngineDate = serviceLogData.date;
        updatedFields.lastServiceEngineKms = serviceLogData.kms;
    }
    if (serviceLogData.serviceType === 'Chassis' || serviceLogData.serviceType === 'General') {
        updatedFields.lastServiceChassisDate = serviceLogData.date;
        updatedFields.lastServiceChassisKms = serviceLogData.kms;
    }
    
    if (Object.keys(updatedFields).length > 0) {
        setDoc(carRef, updatedFields, { merge: true }).catch(async (serverError) => {
            const permissionError = new FirestorePermissionError({
                path: carRef.path,
                operation: 'update',
                requestResourceData: updatedFields,
            });
            errorEmitter.emit('permission-error', permissionError);
        });
    }

  }, [firestore, user, cars]);

  const getCarById = useCallback((id: string): UserCar | undefined => {
    return cars.find(car => car.id === id);
  }, [cars]);


  return (
    <GarageContext.Provider value={{ cars, loading: loading || userLoading, addCar, updateCar, logService, getCarById }}>
      {children}
    </GarageContext.Provider>
  );
};

export const useGarage = (): GarageContextType => {
  const context = useContext(GarageContext);
  if (context === undefined) {
    throw new Error('useGarage must be used within a GarageProvider');
  }
  return context;
};
