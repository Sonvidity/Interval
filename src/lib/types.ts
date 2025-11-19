

export type ServiceItem = {
  name: string;
  oemIntervalKm: number;
  oemIntervalMonths: number;
  type: 'Engine' | 'Chassis';
  transmission?: 'Automatic' | 'Manual'; // Can be specific to a transmission
};

export type WheelFitment = {
  pcd: string;
  studPattern: string;
  oemSize: {
    wheel: string;
    tyre: string;
    offset: string;
  };
  options: {
    wheel: string;
    minTyre: string;
    maxTyre: string;
    offset: string;
  }[];
};

export type ModGuide = {
  summary: string;
  powerLimit: string;
  stages: {
    name: string;
    description: string;
    common_mods: string;
    cost?: string;
    power?: string;
  }[];
  common_issues: {
    name: string;
    description: string;
  }[];
};

export type FluidsGuide = {
  engineOil: {
    daily: { viscosity: string; description: string };
    spirited: { viscosity: string; description: string };
    track: { viscosity: string; description: string };
  };
  oilFilter: {
    oem: string;
    ryco?: string;
    kn?: string;
    other?: { brand: string; partNumber: string }[];
  };
  notes?: string;
};

export type Vehicle = {
  id: string;
  make: string;
  model: string;
  variant: string;
  years: string;
  imageId: string;
  modGuideId?: string;
  fluidsGuideId?: string;
  serviceItems: ServiceItem[];
  specificVariants?: string[];
  fitment?: WheelFitment;
};

export type ModStage = 'Stock' | 'Stage 1' | 'Stage 2' | 'Stage 3';
export type DrivingStyle = 'Easy' | 'Spirited' | 'Hard';
export type TransmissionType = 'Automatic' | 'Manual';

export type EngineSwapDetails = {
  isReplaced: boolean;
  chassisKmsAtSwap: number;
  engineKmsAtSwap: number;
  wasServicedAtSwap: boolean;
};

export type UserCar = {
  id: string; // Document ID from Firestore or local UUID
  userId: string; // The user's ID or 'local-user'
  vehicleId: string; // Links to the Vehicle DB
  nickname: string;
  odometerReading: number;
  year: number;
  variant: string;
  modStage: ModStage;
  drivingStyle: DrivingStyle;
  transmission: TransmissionType; // Added transmission type
  engineSwapDetails?: EngineSwapDetails;
  serviceHistory: ServiceLog[];
  imageId: string; // The ID of the placeholder image
  customImageUrl?: string; // Optional URL for a user-provided image
};

export type ServiceLog = {
  id: string; // ISO timestamp to ensure uniqueness
  date: string; // ISO date string
  kms: number;
  serviceType: 'Engine' | 'Chassis' | 'General' | 'Repair' | 'Initial';
  cost?: number;
  notes?: string;
  itemsDone: string[]; // Now an array of strings
};

export type CalculatedService = {
  name: string; // Name of the specific service item
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
