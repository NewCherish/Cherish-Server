export const PLANT_INFORMATION = {
  API_OPERATION: {
    SUMMARY: '식물 정보 조회 API',
    DESCRIPTION: '식물 단계별 정보를 조회합니다.',
  },
  API_PARAM: {
    NAME: 'id',
    DESCRIPTION: 'plant id',
  },
  DTO_DESCRIPTION: {
    RESPONSE: {
      INTRODUCTION: '이름 앞에 붙는 형용사',
      NAME: '식물 이름',
      MEANING: '식물 꽃말',
      EXPLANATION: '설명',
      PLANT_LEVEL: {
        LEVEL_NAME: '레벨 이름',
        DESCRIPTION: '레벨 설명',
        IMAGE_URL: '레벨 별 이미지',
      },
      CIRCLE_IMAGE_URL: '전체 식물 이미지',
    },
  },
  ERROR_DESCRIPTION: {
    BAD_REQUEST: 'Bad Request - 요청 id 가 없거나, number가 아닌 경우 등',
    NOT_FOUND: 'Not Found - 요청한 id에 해당하는 식물 자원이 없는 경우',
  },
};

export const GET_PLANT_WATER_LOG = {
  API_OPERATION: {
    SUMMARY: '식물 물주기 조회 API',
    DESCRIPTION: '식물별 물주기 기록을 조회합니다.',
  },
  API_PARAM: {
    NAME: 'id',
    DESCRIPTION: 'user_plant_id',
  },
  DTO_DESCRIPTION: {
    RESPONSE: {
      REVIEWS: {
        ID: '물주기 id',
        CREATEDAT: '물주기 날짜',
        REVIEW: '물주기 리뷰',
      },
    },
  },
  ERROR_DESCRIPTION: {
    BAD_REQUEST: 'Bad Request - 요청 id 가 없거나, number가 아닌 경우 등',
  },
};

export const CREATE_PLANT_WATER = {
  API_OPERATION: {
    SUMMARY: '식물 물주기 생성 API',
    DESCRIPTION: '식물별 물주기를 생성합니다.',
  },
  API_PARAM: {
    NAME: 'id',
    DESCRIPTION: 'user_plant_id',
  },
  DTO_DESCRIPTION: {
    RESPONSE: {
      ID: 'water id',
      else: '더 작성해야 함',
    },
  },
  ERROR_DESCRIPTION: {
    BAD_REQUEST: 'Bad Request - 해당 날짜에 이미 물 준 경우',
  },
};
