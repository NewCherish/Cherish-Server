export const PLANT_STATUS: Record<
  string,
  { statusMessage: string; statusGauge: number }
> = {
  healthy: {
    statusMessage: '힘이 솟아요',
    statusGauge: 1,
  },
  waterDay: {
    statusMessage: '물 주는 날이에요!',
    statusGauge: 1,
  },
  happy: {
    statusMessage: '기분이 좋아요',
    statusGauge: 0.75,
  },
  thirsty: {
    statusMessage: '갈증나요',
    statusGauge: 0.5,
  },
  veryThirsty: {
    statusMessage: '물 주세요',
    statusGauge: 0.25,
  },
};

export const PLANT_D_DAY: Record<number, number[]> = {
  1: [0, 3, 7],
  2: [0, 4, 13],
  3: [0, 6, 13],
  4: [0, 3, 7],
  5: [0, 3, 7],
  6: [0, 3, 7],
};
