
// A single, uniquely identifiable service item with its OEM-recommended interval.
export type ServiceItem = {
  name: string;
  oemIntervalKm: number;
  oemIntervalMonths: number;
  type: 'Engine' | 'Chassis';
  transmission?: 'Automatic' | 'Manual';
};

// Defines the data structure for wheel and tire fitment information.
export type WheelFitment = {
  id: string; // Unique ID for this fitment guide, e.g., 'holden-commodore-ve-vf'
  pcd: string; // e.g., '5x120'
  studPattern: string; // e.g., 'M14 x 1.5'
  oemSize: {
    wheel: string; // e.g., '18x8'
    tyre: string; // e.g., '245/45R18'
    offset: string; // e.g., '+48'
  };
  options: {
    wheel: string;
    minTyre: string;
    maxTyre: string;
    offset: string;
  }[];
};

// Defines the data structure for a vehicle-specific modification guide.
export type ModGuide = {
  summary: string;
  powerLimit: string;
  stages: {
    name: string;
    description:string;
    common_mods: string;
    cost?: string;
    power?: string;
  }[];
  common_issues: {
    name: string;
    description: string;
  }[];
};

// Defines the data structure for vehicle-specific fluid and filter recommendations.
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

// Represents a single, unique vehicle model in the central database.
export type Vehicle = {
  id: string; // Unique identifier for this specific model/variant, e.g., 'holden-commodore-ve-v8'
  make: string;
  model: string;
  variant: string;
  years: string;
  imageId: string;
  modGuideId?: string;
  fluidsGuideId?: string;
  serviceItems: ServiceItem[];
  fitmentId?: string;
};

// User-defined types for a car in their garage.
export type ModStage = 'Stock' | 'Stage 1' | 'Stage 2' | 'Stage 3';
export type DrivingStyle = 'Easy' | 'Spirited' | 'Hard';
export type TransmissionType = 'Automatic' | 'Manual';

// Details for a car that has had an engine swap.
export type EngineSwapDetails = {
  isReplaced: boolean;
  chassisKmsAtSwap: number;
  engineKmsAtSwap: number;
  wasServicedAtSwap: boolean;
};

// Represents a vehicle owned by a user in their personal garage.
export type UserCar = {
  id: string; // Document ID from Firestore
  userId: string;
  vehicleId: string; // Links to the Vehicle DB
  nickname: string;
  odometerReading: number;
  year: number;
  variant: string; // User can specify their exact variant if available
  modStage: ModStage;
  drivingStyle: DrivingStyle;
  transmission: TransmissionType;
  engineSwapDetails?: EngineSwapDetails;
  serviceHistory: ServiceLog[];
  imageId: string; // The ID of the placeholder image
  customImageUrl?: string;
};

// Represents a single service record in a vehicle's history.
export type ServiceLog = {
  id: string; // ISO timestamp to ensure uniqueness
  date: string; // ISO date string
  kms: number;
  serviceType: 'Engine' | 'Chassis' | 'General' | 'Repair' | 'Initial';
  cost?: number;
  notes?: string;
  itemsDone: string[];
};

// The output of the service calculation engine.
export type CalculatedService = {
  name: string;
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
