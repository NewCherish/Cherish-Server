export const mockUserPlantResponse = {
  nickname: 'test',
  instagram: null,
  createdAt: new Date('2023-07-22T08:16:52.538Z'),
  plantId: 4,
  waterCycle: 14,
  loveGauge: 0,
  plant: {
    name: '민들레',
    circleImageURL:
      'https://cherish-static-dev.s3.ap-northeast-2.amazonaws.com/circleImages/mindlere-circle.png',
  },
  Water: [
    {
      wateringDate: new Date('2023-07-22T18:16:53.000Z'),
    },
  ],
};

export const mockUserPlantDetailData = {
  id: 1,
  nickname: 'test',
  instagram: null,
  duration: 22,
  dDay: -7,
  plantId: 4,
  plantName: '민들레',
  plantImage:
    'https://cherish-static-dev.s3.ap-northeast-2.amazonaws.com/circleImages/mindlere-circle.png',
  levelName: '새싹',
  statusMessage: '갈증나요',
  statusGauge: 0.5,
};

export const mockUserPlantDetailSuccessResponse = {
  statusCode: 200,
  success: true,
  message: '식물 상세 조회 성공',
  data: mockUserPlantDetailData,
};

export const mockPlantsInformationResponse = {
  success: true,
  statusCode: 200,
  message: '식물 단계 조회 성공',
  data: {
    introduction: '붙임성이 좋은\n앙증맞은 오렌지 자스민',
    name: '오렌지 자스민',
    meaning: '당신을 향해',
    explanation:
      '1~2일에 한 번 물을 주는 것을 추천해요\n물을 좋아하는 자스민이 곧 귀여운 열매를 선물할거에요!',
    circleImageURL:
      'https://cherish-static-dev.s3.ap-northeast-2.amazonaws.com/circleImages/mindlere-circle.png',
    plantLevel: [
      {
        levelName: '어린 나무',
        description: '무럭무럭 자랄 준비를 하고 있어요!',
        imageURL:
          'https://cherish-static-dev.s3.ap-northeast-2.amazonaws.com/plantLevel/mindlere-1.png',
      },
      {
        levelName: '개화',
        description: '하얀 꽃이 활짝 피어났어요!',
        imageURL:
          'https://cherish-static-dev.s3.ap-northeast-2.amazonaws.com/plantLevel/mindlere-2.png',
      },
      {
        levelName: '열매',
        description: '꽃이 머물다간 자리에 앙증맞은 열매가 열렸네요!',
        imageURL:
          'https://cherish-static-dev.s3.ap-northeast-2.amazonaws.com/plantLevel/mindlere-complete.png',
      },
    ],
  },
};

export const mockBadRequestResponse = {
  success: false,
  statusCode: 400,
  message: 'Bad Request Exception',
};

export const mockNotFoundResponse = {
  success: false,
  statusCode: 404,
  message: 'Not Found',
};

export const mockPlant = {
  name: '오렌지 자스민',
  introduction: '붙임성이 좋은\n앙증맞은 오렌지 자스민',
  meaning: '당신을 향해',
  explanation:
    '1~2일에 한 번 물을 주는 것을 추천해요\n물을 좋아하는 자스민이 곧 귀여운 열매를 선물할거에요!',
  circleImageURL: 'aaa',
};

export const mockPlantWaterLogsResponse = {
  success: true,
  statusCode: 200,
  message: '식물 물주기 기록 조회 성공',
  data: {
    reviews: [
      {
        id: 1,
        review: '리뷰1',
        wateringDate: '07/22',
      },
      {
        id: 3,
        review: '리뷰2',
        wateringDate: '07/23',
      },
    ],
  },
};
