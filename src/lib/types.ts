export type ServiceItem = {
  name: string;
  oemIntervalKm: number;
  oemIntervalMonths: number;
  type: 'Engine' | 'Chassis';
};

export type Vehicle = {
  id: string;
  make: string;
  model: string;
  variant: string;
  years: string;
  imageId: string;
  serviceItems: ServiceItem[];
};

export type ModStage = 'Stock' | 'Stage 1' | 'Stage 2' | 'Stage 3';
export type DrivingStyle = 'Easy' | 'Spirited' | 'Hard';

export type EngineSwapDetails = {
  isReplaced: boolean;
  chassisKmsAtSwap: number;
  engineKmsAtSwap: number;
  wasServicedAtSwap: boolean;
};

export type UserCar = {
  id: string; // Internal ID for the user's car
  vehicleId: string; // Links to the Vehicle DB
  nickname: string;
  odometerReading: number;
  modStage: ModStage;
  drivingStyle: DrivingStyle;
  lastServiceEngineKms: number;
  lastServiceEngineDate: string; // ISO date string
  lastServiceChassisKms: number;
  lastServiceChassisDate: string; // ISO date string
  engineSwapDetails?: EngineSwapDetails;
  serviceHistory: ServiceLog[];
};

export type ServiceLog = {
  id: string;
  date: string; // ISO date string
  kms: number;
  serviceType: 'Engine' | 'Chassis' | 'General' | 'Repair';
  cost?: number;
  notes?: string;
  itemsDone: string;
};

export type CalculatedService = {
  type: 'Engine' | 'Chassis';
  baseIntervalKm: number;
  baseIntervalMonths: number;
  modFactor: number;
  driveFactor: number;
  adjustedIntervalKm: number;
  adjustedIntervalMonths: number;
  recommendedIntervalKm: number;
  lastServiceKm: number;
  lastServiceDate: string;
  nextServiceKm: number;
  nextServiceDate: string;
  dueInKm: number;
  dueInDays: number;
  progress: number;
  status: 'ok' | 'due' | 'overdue';
};
