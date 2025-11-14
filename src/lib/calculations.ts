import { UserCar, Vehicle, CalculatedService, ServiceItem } from './types';
import { MOD_FACTORS, DRIVE_FACTORS } from './constants';
import { addMonths, differenceInDays, format, isAfter } from 'date-fns';

function getAggregatedServiceItem(items: ServiceItem[]): ServiceItem {
  if (items.length === 0) {
    return { name: 'Service', oemIntervalKm: 30000, oemIntervalMonths: 24, type: 'Chassis' };
  }
  // Find the item with the shortest interval in kilometers
  return items.reduce((prev, current) => 
    (prev.oemIntervalKm < current.oemIntervalKm ? prev : current)
  );
}

export function calculateService(car: UserCar, vehicle: Vehicle, type: 'Engine' | 'Chassis'): CalculatedService {
  const serviceItems = vehicle.serviceItems.filter(item => item.type === type);
  const representativeItem = getAggregatedServiceItem(serviceItems);

  const baseIntervalKm = representativeItem.oemIntervalKm;
  const baseIntervalMonths = representativeItem.oemIntervalMonths;

  const driveFactor = DRIVE_FACTORS[car.drivingStyle];
  const modFactor = type === 'Engine' ? MOD_FACTORS[car.modStage] : 1.0;

  const adjustedIntervalKm = baseIntervalKm * modFactor * driveFactor;
  const adjustedIntervalMonths = baseIntervalMonths * modFactor * driveFactor;

  // Round to a sensible number for recommendation
  const recommendedIntervalKm = Math.round(adjustedIntervalKm / 500) * 500;
  
  const lastServiceKm = type === 'Engine' ? car.lastServiceEngineKms : car.lastServiceChassisKms;
  const lastServiceDate = type === 'Engine' ? car.lastServiceEngineDate : car.lastServiceChassisDate;

  // Engine KMs calculation for swapped engines
  let currentOdometerForCalc = car.odometerReading;
  if (type === 'Engine' && car.engineSwapDetails?.isReplaced) {
    const chassisKmsSinceSwap = car.odometerReading - car.engineSwapDetails.chassisKmsAtSwap;
    currentOdometerForCalc = car.engineSwapDetails.engineKmsAtSwap + chassisKmsSinceSwap;
  }

  const nextServiceKm = lastServiceKm + adjustedIntervalKm;
  const nextServiceDate = addMonths(new Date(lastServiceDate), adjustedIntervalMonths);

  const dueInKm = nextServiceKm - currentOdometerForCalc;
  const dueInDays = differenceInDays(nextServiceDate, new Date());
  
  const kmProgress = ((currentOdometerForCalc - lastServiceKm) / adjustedIntervalKm) * 100;
  const dateProgress = ((baseIntervalMonths * 30.44 - dueInDays) / (baseIntervalMonths * 30.44)) * 100;
  
  const progress = Math.max(kmProgress, dateProgress);

  let status: 'ok' | 'due' | 'overdue' = 'ok';
  if (dueInKm <= 0 || dueInDays <= 0) {
    status = 'overdue';
  } else if (dueInKm <= recommendedIntervalKm * 0.1 || dueInDays <= 30) {
    status = 'due';
  }

  return {
    type,
    baseIntervalKm,
    baseIntervalMonths,
    modFactor,
    driveFactor,
    adjustedIntervalKm,
    adjustedIntervalMonths,
    recommendedIntervalKm,
    lastServiceKm,
    lastServiceDate,
    nextServiceKm,
    nextServiceDate: format(nextServiceDate, 'yyyy-MM-dd'),
    dueInKm,
    dueInDays,
    progress: Math.min(100, Math.max(0, progress)),
    status,
  };
}

export function getEngineKms(car: UserCar): number | null {
  if (!car.engineSwapDetails?.isReplaced) {
    return null;
  }
  const chassisKmsSinceSwap = car.odometerReading - car.engineSwapDetails.chassisKmsAtSwap;
  return car.engineSwapDetails.engineKmsAtSwap + chassisKmsSinceSwap;
}
