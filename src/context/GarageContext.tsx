"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect, useMemo } from 'react';
import type { UserCar, ServiceLog, Vehicle } from '@/lib/types';
import { useCollection, useFirestore, useUser, useMemoFirebase } from '@/firebase';
import {
  addDocumentNonBlocking,
  updateDocumentNonBlocking,
  deleteDocumentNonBlocking,
  setDocumentNonBlocking,
} from '@/firebase/non-blocking-updates';
import { collection, doc, writeBatch } from 'firebase/firestore';

interface GarageContextType {
  cars: UserCar[];
  loading: boolean;
  addCar: (carData: Omit<UserCar, 'id' | 'userId'>) => Promise<void>;
  updateCar: (updatedCar: UserCar) => void;
  logService: (carId: string, serviceLogData: Omit<ServiceLog, 'id'>) => void;
  removeCar: (carId: string) => Promise<void>;
  updateCarPhoto: (carId: string, photoData: { imageId: string; customImageUrl?: string }) => Promise<void>;
  getCarById: (id: string) => UserCar | undefined;
}

const GarageContext = createContext<GarageContextType | undefined>(undefined);

export const GarageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useUser();
  const firestore = useFirestore();

  const userCarsCollectionRef = useMemoFirebase(() => {
    if (user && firestore) {
      return collection(firestore, `users/${user.uid}/user_vehicles`);
    }
    return null;
  }, [user, firestore]);

  const { data: cars, isLoading: loading } = useCollection<UserCar>(userCarsCollectionRef);

  const addCar = useCallback(async (carData: Omit<UserCar, 'id' | 'userId'>) => {
    if (!user || !firestore) {
      console.error("User or Firestore not available");
      return;
    }
    const carCollection = collection(firestore, `users/${user.uid}/user_vehicles`);
    // This returns a promise, but we don't await it here to keep the UI responsive.
    addDocumentNonBlocking(carCollection, { ...carData, userId: user.uid });
  }, [user, firestore]);

  const updateCar = useCallback((updatedCar: UserCar) => {
    if (!user || !firestore) return;
    const carDocRef = doc(firestore, `users/${user.uid}/user_vehicles`, updatedCar.id);
    updateDocumentNonBlocking(carDocRef, updatedCar);
  }, [user, firestore]);

  const removeCar = useCallback(async (carId: string) => {
    if (!user || !firestore) return;
    const carDocRef = doc(firestore, `users/${user.uid}/user_vehicles`, carId);
    deleteDocumentNonBlocking(carDocRef);
  }, [user, firestore]);

  const updateCarPhoto = useCallback(async (carId: string, photoData: { imageId: string; customImageUrl?: string }) => {
    if (!user || !firestore) return;
    const carDocRef = doc(firestore, `users/${user.uid}/user_vehicles`, carId);
    const dataToUpdate: any = { imageId: photoData.imageId };
    if (photoData.customImageUrl) {
        dataToUpdate.customImageUrl = photoData.customImageUrl;
    } else {
        dataToUpdate.customImageUrl = ''; // Explicitly clear it
    }
    updateDocumentNonBlocking(carDocRef, dataToUpdate);
  }, [user, firestore]);

  const logService = useCallback((carId: string, serviceLogData: Omit<ServiceLog, 'id'>) => {
    if (!user || !firestore || !cars) return;
    const car = cars.find(c => c.id === carId);
    if (!car) return;

    const carDocRef = doc(firestore, `users/${user.uid}/user_vehicles`, carId);
    
    const newLog: ServiceLog = {
      ...serviceLogData,
      id: new Date().toISOString(),
    };

    // Ensure serviceHistory is an array before trying to spread it
    const currentHistory = Array.isArray(car.serviceHistory) ? car.serviceHistory : [];
    const updatedHistory = [newLog, ...currentHistory];
    
    updateDocumentNonBlocking(carDocRef, {
      odometerReading: serviceLogData.kms,
      serviceHistory: updatedHistory,
    });
  }, [user, firestore, cars]);


  const getCarById = useCallback((id: string): UserCar | undefined => {
    return cars?.find(car => car.id === id);
  }, [cars]);

  const contextValue = useMemo(() => ({
    cars: cars || [],
    loading,
    addCar,
    updateCar,
    logService,
    removeCar,
    updateCarPhoto,
    getCarById,
  }), [cars, loading, addCar, updateCar, logService, removeCar, updateCarPhoto, getCarById]);


  return (
    <GarageContext.Provider value={contextValue}>
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
