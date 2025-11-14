import { UserCar, Vehicle, CalculatedService, ServiceItem } from './types';
import { MOD_FACTORS, DRIVE_FACTORS } from './constants';
import { addMonths, differenceInDays, format } from 'date-fns';

export function calculateAllServices(car: UserCar, vehicle: Vehicle): CalculatedService[] {
  return vehicle.serviceItems.map(item => calculateSingleService(car, item));
}

export function calculateSingleService(car: UserCar, serviceItem: ServiceItem): CalculatedService {
  const baseIntervalKm = serviceItem.oemIntervalKm;
  const baseIntervalMonths = serviceItem.oemIntervalMonths;
  const type = serviceItem.type;

  const driveFactor = DRIVE_FACTORS[car.drivingStyle];
  // Mod factor only applies to engine components
  const modFactor = type === 'Engine' ? MOD_FACTORS[car.modStage] : 1.0;

  const adjustedIntervalKm = baseIntervalKm * modFactor * driveFactor;
  const adjustedIntervalMonths = baseIntervalMonths * modFactor * driveFactor;

  // Round to a sensible number for recommendation
  const recommendedIntervalKm = Math.round(adjustedIntervalKm / 500) * 500;
  
  // Use the correct last service data based on the item type
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
    name: serviceItem.name,
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
