import { UserCar, Vehicle, CalculatedService, ServiceItem, ServiceLog } from './types';
import { MOD_FACTORS, DRIVE_FACTORS } from './constants';
import { addMonths, differenceInDays, format, parseISO } from 'date-fns';

/**
 * Finds the most recent service log for a specific service item.
 * It searches the service history for any log that includes the item's name.
 */
function findLastServiceForItem(serviceHistory: ServiceLog[], itemName: string): ServiceLog | undefined {
  const relevantLogs = serviceHistory
    .filter(log => Array.isArray(log.itemsDone) && log.itemsDone.includes(itemName))
    .sort((a, b) => parseISO(b.date).getTime() - parseISO(a.date).getTime());
  return relevantLogs[0];
}

export function calculateAllServices(car: UserCar, vehicle: Vehicle): CalculatedService[] {
  return vehicle.serviceItems.map(item => calculateSingleService(car, vehicle, item));
}

export function calculateSingleService(car: UserCar, vehicle: Vehicle, serviceItem: ServiceItem): CalculatedService {
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
  
  // Find the last time *this specific item* was serviced from the history
  const lastServiceLog = findLastServiceForItem(car.serviceHistory, serviceItem.name);

  // If never serviced, use the car's initial "service" record, which should be its starting state.
  const effectiveLastService = lastServiceLog || car.serviceHistory.find(l => l.serviceType === 'Initial');
  
  const lastServiceKm = effectiveLastService ? effectiveLastService.kms : 0;
  const lastServiceDate = effectiveLastService ? effectiveLastService.date : new Date().toISOString();


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

  const totalDaysInInterval = differenceInDays(nextServiceDate, parseISO(lastServiceDate));
  const daysSinceService = differenceInDays(new Date(), parseISO(lastServiceDate));
  const dateProgress = totalDaysInInterval > 0 ? (daysSinceService / totalDaysInInterval) * 100 : 0;
  
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
  if (!car.engineSwapDetails?.isReplaced || car.engineSwapDetails.chassisKmsAtSwap > car.odometerReading) {
    return car.odometerReading;
  }
  const chassisKmsSinceSwap = car.odometerReading - car.engineSwapDetails.chassisKmsAtSwap;
  return car.engineSwapDetails.engineKmsAtSwap + chassisKmsSinceSwap;
}
