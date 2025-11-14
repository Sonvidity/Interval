import type { ModStage, DrivingStyle } from './types';

export const MOD_FACTORS: Record<ModStage, number> = {
  'Stock': 1.0,
  'Stage 1': 0.8,
  'Stage 2': 0.6,
  'Stage 3': 0.4,
};

export const DRIVE_FACTORS: Record<DrivingStyle, number> = {
  'Easy': 1.0,
  'Spirited': 0.85,
  'Hard': 0.6,
};
