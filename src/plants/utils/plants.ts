import * as dayjs from 'dayjs';
import { PLANT_D_DAY, PLANT_STATUS } from '../constants/plant-status';

export const calculatePlantLevel = (loveGague: number): number => {
  let level = 0;

  if (loveGague > 3 && loveGague <= 7) {
    level = 1;
  } else if (loveGague > 7 && loveGague <= 12) {
    level = 2;
  }

  return level;
};

export const calculateNextWateringDate = (
  wateringDate: Date,
  waterCycle: number,
): Date => {
  const lastWateringDate = dayjs(wateringDate);
  const nextWateringDate = lastWateringDate.add(waterCycle, 'day');

  return new Date(nextWateringDate.format());
};

export const calculatePlantStatus = (
  plantId: number,
  dDay: number,
): { statusMessage: string; statusGague: number } => {
  let plantStatus: string = '';

  if (dDay < PLANT_D_DAY[plantId][0]) {
    plantStatus = 'healthy';
  } else if (dDay === PLANT_D_DAY[plantId][0]) {
    plantStatus = 'waterDay';
  } else if (
    dDay > PLANT_D_DAY[plantId][0] &&
    dDay <= PLANT_D_DAY[plantId][1]
  ) {
    plantStatus = 'happy';
  } else if (
    dDay > PLANT_D_DAY[plantId][1] &&
    dDay <= PLANT_D_DAY[plantId][2]
  ) {
    plantStatus = 'thirsty';
  } else if (dDay > PLANT_D_DAY[plantId][2]) {
    plantStatus = 'veryThirsty';
  }

  return PLANT_STATUS[plantStatus];
};
