
import { UserCar, Vehicle, CalculatedService, ServiceItem, ServiceLog } from './types';
import { MOD_FACTORS, DRIVE_FACTORS } from './constants';
import { addMonths, differenceInDays, format, parseISO } from 'date-fns';

/**
 * Finds the most recent service log for a specific service item.
 * It searches the service history for any log that includes the item's name.
 */
function findLastServiceForItem(serviceHistory: ServiceLog[], itemName: string): ServiceLog | undefined {
  if (!serviceHistory) {
    return undefined;
  }
  const relevantLogs = serviceHistory
    .filter(log => Array.isArray(log.itemsDone) && log.itemsDone.includes(itemName))
    .sort((a, b) => parseISO(b.date).getTime() - parseISO(a.date).getTime());
  return relevantLogs[0];
}


/**
 * Finds the most recent "General" service log, which is created when a user manually logs a service.
 * This should be prioritized over the "Initial" log for items not explicitly serviced.
 */
function findLastGeneralService(serviceHistory: ServiceLog[]): ServiceLog | undefined {
    if (!serviceHistory) {
        return undefined;
    }
    const generalLogs = serviceHistory
        .filter(log => log.serviceType === 'General')
        .sort((a, b) => parseISO(b.date).getTime() - parseISO(a.date).getTime());
    return generalLogs[0];
}


export function calculateAllServices(car: UserCar, vehicle: Vehicle): CalculatedService[] {
  // Filter service items based on the car's transmission type
  const relevantServiceItems = vehicle.serviceItems.filter(item => {
    // If the item doesn't have a transmission property, it's universal (like engine oil)
    if (!item.transmission) {
      return true;
    }
    // If it does, it must match the car's transmission type
    return item.transmission === car.transmission;
  });
  
  return relevantServiceItems.map(item => calculateSingleService(car, item));
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
  
  const lastServiceLogForItem = findLastServiceForItem(car.serviceHistory, serviceItem.name);
  const lastGeneralLog = findLastGeneralService(car.serviceHistory);
  const initialLog = car.serviceHistory.find(l => l.serviceType === 'Initial');

  // The effective last service is the specific one for the item,
  // or the most recent general service, or the initial state of the car.
  const effectiveLastService = lastServiceLogForItem || lastGeneralLog || initialLog;
  
  const lastServiceDate = effectiveLastService ? effectiveLastService.date : new Date().toISOString();

  let lastServiceKm: number;
  let currentOdometerForCalc: number;
  
  const hasEngineSwap = car.engineSwapDetails?.isReplaced;
  
  if (type === 'Engine' && hasEngineSwap) {
      const chassisKmsSinceSwap = car.odometerReading - car.engineSwapDetails.chassisKmsAtSwap;
      currentOdometerForCalc = car.engineSwapDetails.engineKmsAtSwap + chassisKmsSinceSwap;

      if (effectiveLastService && effectiveLastService.kms > car.engineSwapDetails.chassisKmsAtSwap) {
          // If a specific service was done *after* the swap, calculate its equivalent engine kms
          const chassisKmAtLastService = effectiveLastService.kms;
          const chassisKmsSinceSwapAtLastService = chassisKmAtLastService - car.engineSwapDetails.chassisKmsAtSwap;
          lastServiceKm = car.engineSwapDetails.engineKmsAtSwap + Math.max(0, chassisKmsSinceSwapAtLastService);
      } else {
          // If never serviced since swap, or if last service was before swap,
          // the last effective service point for the *engine* was at swap time.
          lastServiceKm = car.engineSwapDetails.engineKmsAtSwap;
      }
  } else {
      // For CHASSIS items on a swapped car, or ANY item on a non-swapped car.
      currentOdometerForCalc = car.odometerReading;
      // The last service mileage is taken directly from the relevant log.
      // If no specific log exists, fall back to the initial state odometer.
      lastServiceKm = effectiveLastService ? effectiveLastService.kms : 0;
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
