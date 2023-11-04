export const READ_PLANT_DETAIL = {
  API_OPERATION: {
    summary: '식물 상세 조회 API',
    description: '식물 카드 상세 정보를 조회합니다.',
  },
  API_PARAM: {
    type: Number,
    name: 'id',
    required: true,
    description: 'userPlant id',
  },
  DTO_DESCRIPTION: {
    RESPONSE: {
      ID: 'userPlant id',
      NICKNAME: '식물 닉네임',
      DURATION: '함께한 날',
      INSTAGRAM: '인스타그램 id',
      D_DAY: '물 주기 D-Day',
      PLANT_ID: 'plant id',
      PLANT_IMAGE: '식물 이미지 url',
      PLANT_NAME: '식물 이름',
      LEVEL_NAME: '식물 레벨 이름',
      STATUS_MESSAGE: '식물 상태 메시지',
      STATUS_GAGUE: '식물 상태 게이지',
    },
  },
  ERROR_DESCRIPTION: {
    BAD_REQUEST: 'Bad Request - 요청 id 가 없거나, number가 아닌 경우 등',
    NOT_FOUND: 'Not Found - 요청한 id에 해당하는 식물 자원이 없는 경우',
  },
};

export const READ_PLANT_INFORMATION = {
  API_OPERATION: {
    summary: '식물 정보 조회 API',
    description: '식물 단계별 정보를 조회합니다.',
  },
  API_PARAM: {
    type: Number,
    name: 'id',
    required: true,
    description: 'plant id',
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

export const READ_PLANT_WATER_LOG = {
  API_OPERATION: {
    summary: '식물 물주기 조회 API',
    description: '식물별 물주기 기록을 조회합니다.',
  },
  API_PARAM: {
    type: Number,
    name: 'id',
    required: true,
    description: 'user_plant_id',
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

export const READ_PLANTS = {
  API_OPERATION: {
    summary: '메인 식물 리스트 조회 API',
    description: '유저의 전체 식물 리스트를 조회합니다.',
  },
  DTO_DESCRIPTION: {
    RESPONSE: {
      PLANTS: {
        ID: 'userPlant id',
        PLANT_TYPE: '식물 종류 -   rose, sun, stuki, min, blue, ojya',
        D_DAY: '물주기까지 남은 일수',
        NICKNAME: '식물 닉네임',
        DESCRIPTION: '식물 묘사 - ex) 바짝바짝 목이 마른',
        LEVEL_NAME: '식물 레벨 이름',
        CIRCLE_IMAGE: '식물 원형 이미지 url',
        MAIN_IMAGE: '식물 메인 이미지 url',
        LOVE_GAUGE: '식물 애정도',
        IS_WATERED: '오늘 식물에게 물을 준 적 있는지 여부'
      },
      PLANT_COUNT: '식물 총 갯수'
    },
  },
  ERROR_DESCRIPTION: {

  }
};
