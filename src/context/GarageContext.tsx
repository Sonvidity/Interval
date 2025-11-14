"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import type { UserCar, ServiceLog } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';

// Mock 'uuid' since it might not be available in a browser-only context without a bundler
const v4 = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);


interface GarageContextType {
  cars: UserCar[];
  loading: boolean;
  addCar: (carData: Omit<UserCar, 'id' | 'userId'>) => void;
  updateCar: (updatedCar: UserCar) => void;
  logService: (carId: string, serviceLog: Omit<ServiceLog, 'id'>) => void;
  removeCar: (carId: string) => void;
  updateCarPhoto: (carId: string, photoData: { imageId: string; customImageUrl?: string }) => void;
  getCarById: (id: string) => UserCar | undefined;
}

const GarageContext = createContext<GarageContextType | undefined>(undefined);

export const GarageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cars, setCars] = useState<UserCar[]>([]);
  const [loading, setLoading] = useState(false); // No initial loading from a backend

  const addCar = useCallback((carData: Omit<UserCar, 'id' | 'userId'>) => {
    const newCar: UserCar = {
      ...carData,
      id: v4(), // Generate a unique local ID
      userId: 'local-user', // Assign a mock user ID
    };
    setCars(prevCars => [...prevCars, newCar]);
  }, []);

  const updateCar = useCallback((updatedCar: UserCar) => {
    setCars(prevCars => prevCars.map(car => car.id === updatedCar.id ? updatedCar : car));
  }, []);

  const removeCar = useCallback((carId: string) => {
    setCars(prevCars => prevCars.filter(car => car.id !== carId));
  }, []);

  const updateCarPhoto = useCallback((carId: string, photoData: { imageId: string; customImageUrl?: string }) => {
    setCars(prevCars =>
      prevCars.map(car => {
        if (car.id === carId) {
          return { ...car, imageId: photoData.imageId, customImageUrl: photoData.customImageUrl || '' };
        }
        return car;
      })
    );
  }, []);

  const logService = useCallback((carId: string, serviceLogData: Omit<ServiceLog, 'id'>) => {
    setCars(prevCars =>
      prevCars.map(car => {
        if (car.id === carId) {
          const newLog: ServiceLog = {
            ...serviceLogData,
            id: new Date().toISOString(),
          };
          const updatedHistory = [newLog, ...(car.serviceHistory || [])];
          return {
            ...car,
            odometerReading: serviceLogData.kms,
            serviceHistory: updatedHistory,
          };
        }
        return car;
      })
    );
  }, []);

  const getCarById = useCallback((id: string): UserCar | undefined => {
    return cars.find(car => car.id === id);
  }, [cars]);

  return (
    <GarageContext.Provider value={{ cars, loading, addCar, updateCar, logService, removeCar, updateCarPhoto, getCarById }}>
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
