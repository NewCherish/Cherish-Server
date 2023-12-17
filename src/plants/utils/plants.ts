import * as dayjs from 'dayjs';
import { PLANT_D_DAY, PLANT_STATUS } from '../constants/plant-status';

export const calculatePlantLevel = (loveGauge: number): number => {
  let level = 0;

  if (loveGauge > 3 && loveGauge <= 7) {
    level = 1;
  } else if (loveGauge > 7 && loveGauge <= 12) {
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
): { statusMessage: string; statusGauge: number } => {
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

export const makeRandomDescription = (
  dDay: number,
  waterCount: number,
): string => {
  const description = {
    1: ['살금살금 돋아나는', '당신이 궁금한', '아직 수줍은', '아직 낯가리는', '아직은 조금 어색한'],
    2: ['반짝반짝 빛이 나는', '뿜빠뿜빠 신이 난', '룰루랄라 즐거운', '생글생글 웃고있는', '한걸음 더 가까워진'],
    3: ['바짝바짝 목이 마른', '묵묵히 당신을 기다리는', '발 동동 구르는', '말 못하고 기다리는', '힐끔힐끔 바라보는'],
    4: ['휴... 기운없는', '살짝 서운한', '울먹울먹 서운한', '빙글빙글 어지러운', '꼬르륵 배가 고픈']
  }

  let level;

  if (waterCount == 0) {
    if (dDay == 0) {
      level = 3
    } else if (dDay >= 1) {
      level = 1
    } else if (dDay < 0) {
      level = 4
    }
  } else {
    if (dDay == 0) {
      level = 3
    } else if (dDay >= 1) {
      level = 2
    } else if (dDay < 0) {
      level = 4
    }
  }

  const randomDescription = description[level][Math.floor(Math.random() * 5)];

return randomDescription
}