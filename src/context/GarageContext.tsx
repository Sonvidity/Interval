"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { UserCar, ServiceLog } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';

interface GarageContextType {
  cars: UserCar[];
  loading: boolean;
  addCar: (carData: Omit<UserCar, 'id' | 'serviceHistory'>) => void;
  updateCar: (updatedCar: UserCar) => void;
  logService: (carId: string, serviceLog: Omit<ServiceLog, 'id'>) => void;
  getCarById: (id: string) => UserCar | undefined;
}

const GarageContext = createContext<GarageContextType | undefined>(undefined);

// A simple polyfill for environments where crypto is not available.
const getCrypto = () => {
    return (
      (typeof window !== 'undefined' && (window.crypto || (window as any).msCrypto)) ||
      (typeof self !== 'undefined' && (self.crypto || (self as any).msCrypto))
    );
  };
  
const simpleUuidV4 = () => {
    const crypto = getCrypto();
    if (crypto && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    // Fallback for older browsers or environments without crypto.randomUUID
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
};

export const GarageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cars, setCars] = useState<UserCar[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedCars = localStorage.getItem('userGarage');
      if (storedCars) {
        setCars(JSON.parse(storedCars));
      }
    } catch (error) {
      console.error("Failed to load cars from localStorage", error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if(!loading) {
      try {
        localStorage.setItem('userGarage', JSON.stringify(cars));
      } catch (error) {
        console.error("Failed to save cars to localStorage", error);
      }
    }
  }, [cars, loading]);

  const addCar = (carData: Omit<UserCar, 'id' | 'serviceHistory'>) => {
    const newCar: UserCar = {
      ...carData,
      id: simpleUuidV4(),
      serviceHistory: [],
    };
    setCars(prevCars => [...prevCars, newCar]);
  };

  const updateCar = (updatedCar: UserCar) => {
    setCars(prevCars => prevCars.map(car => (car.id === updatedCar.id ? updatedCar : car)));
  };

  const logService = (carId: string, serviceLogData: Omit<ServiceLog, 'id'>) => {
    const newServiceLog: ServiceLog = { ...serviceLogData, id: simpleUuidV4() };
    
    setCars(prevCars => prevCars.map(car => {
      if (car.id === carId) {
        const updatedCar = { ...car, serviceHistory: [newServiceLog, ...car.serviceHistory] };

        if (newServiceLog.serviceType === 'Engine' || newServiceLog.serviceType === 'General') {
            updatedCar.lastServiceEngineDate = newServiceLog.date;
            updatedCar.lastServiceEngineKms = newServiceLog.kms;
        }
        if (newServiceLog.serviceType === 'Chassis' || newServiceLog.serviceType === 'General') {
            updatedCar.lastServiceChassisDate = newServiceLog.date;
            updatedCar.lastServiceChassisKms = newServiceLog.kms;
        }
        
        return updatedCar;
      }
      return car;
    }));
  };

  const getCarById = (id: string): UserCar | undefined => {
    return cars.find(car => car.id === id);
  };


  return (
    <GarageContext.Provider value={{ cars, loading, addCar, updateCar, logService, getCarById }}>
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
