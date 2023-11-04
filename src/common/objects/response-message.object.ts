export const RESPONSE_MESSAGE: {
  [key: string]: string;
} = {
  // common
  NULL_VALUE: '필요한 값이 없습니다.',
  FORBIDDEN: 'Access Denied',
  DUPLICATED: 'Duplicated',
  NOT_FOUND: 'Not Found',
  BAD_REQUEST: 'Bad Request',
  UNAUTHORIZED: 'Unauthorized',
  INTERNAL_SERVER_ERROR: 'Internal Server Error',
  NULL_VALUE_TOKEN: '토큰이 없습니다.',
  INVALID_TOKEN: '만료된 토큰입니다.',
  INVALID_PASSWORD: '비밀번호 오류',

  // auth
  SIGNIN_USER_SUCCESS: '로그인/회원가입 성공',
  ISSUED_TOKEN_SUCCESS: '토큰 발급 성공',
  REISSUED_TOKEN_SUCCESS: '토큰 재발급 성공',

  // plants
  READ_PLANT_DETAIL_SUCCESS: '식물 상세 조회 성공',
  READ_PLANT_INFORMATION_SUCCESS: '식물 단계 조회 성공',
  READ_PLANT_WATER_LOG_SUCCESS: '식물 물주기 기록 조회 성공',
  READ_PLANTS_SUCCESS: '메인 식물 리스트 조회 성공',
};
