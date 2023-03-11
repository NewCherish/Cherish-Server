export class ResponsePlantsData {
  plants: [plantData];
  plantsCount: number;
}

export class plantData {
  id: number;
  dDay: number;
  nickname: string;
  loveGauge: number;
  description: string;
  circleImage: string;
  mainImage: string;
  levelName: string;
  isWatered: boolean;
}
