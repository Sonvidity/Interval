"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import type { UserCar, ServiceLog } from '@/lib/types';
import { useUser, useFirestore } from '@/firebase';
import { collection, doc, onSnapshot, setDoc, addDoc, query, orderBy, deleteDoc } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { VEHICLE_DATABASE } from '@/lib/vehicles';

interface GarageContextType {
  cars: UserCar[];
  loading: boolean;
  addCar: (carData: Omit<UserCar, 'id' | 'serviceHistory' | 'userId'> & { serviceHistory: ServiceLog[] }) => Promise<void>;
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
      const q = query(collection(firestore, 'users', user.uid, 'user_vehicles'));
      const unsubscribe = onSnapshot(q, 
        (querySnapshot) => {
          const userCars: UserCar[] = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            // Ensure serviceHistory is initialized
            if (!data.serviceHistory) {
              data.serviceHistory = [];
            }
            userCars.push({ id: doc.id, ...data } as UserCar);
          });
          setCars(userCars);
          setLoading(false);
        },
        async (err) => {
          const permissionError = new FirestorePermissionError({
            path: `users/${user.uid}/user_vehicles`,
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

  const addCar = useCallback(async (carData: Omit<UserCar, 'id' | 'userId'>) => {
    if (!firestore || !user) return;
    const newCar = { ...carData, userId: user.uid };
    const carRef = collection(firestore, 'users', user.uid, 'user_vehicles');
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
    const carRef = doc(firestore, 'users', user.uid, 'user_vehicles', id);
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

    const carRef = doc(firestore, 'users', user.uid, 'user_vehicles', carId);
    
    // Create the new log with a unique ID (timestamp)
    const newLog: ServiceLog = {
        ...serviceLogData,
        id: new Date().toISOString(),
    };

    // Prepend the new log to the history
    const updatedHistory = [newLog, ...(car.serviceHistory || [])];

    // Update odometer and the service history in one go
    const updatedFields = {
      odometerReading: serviceLogData.kms,
      serviceHistory: updatedHistory,
    };

    setDoc(carRef, updatedFields, { merge: true }).catch(async (serverError) => {
        const permissionError = new FirestorePermissionError({
            path: carRef.path,
            operation: 'update',
            requestResourceData: updatedFields,
        });
        errorEmitter.emit('permission-error', permissionError);
    });

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
