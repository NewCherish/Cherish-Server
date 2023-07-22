export const SIGNIN_DESCRIPTION = {
  API_OPERATION: {
    SUMMARY: '소셜 로그인 API',
    DESCRIPTION:
      '카카오/애플 로그인을 진행하고, access/refresh token을 발급합니다.',
  },
  DTO_DESCRIPTION: {
    CREATE: {
      SOCIAL_TYPE: 'kakao/apple',
      NICKNAME: 'nickname',
      FCM_TOKEN: 'push 알람 용 fcm token',
      KAKAO_ACCESS_TOKEN: 'kakao access toekn',
      ID_TOKEN: 'apple id token',
      CODE: 'apple authorization code',
    },
    RESPONSE: {
      ID: 'id',
      TOKEN: {
        ACCESS_TOKEN: 'cherish access token',
        REFRESH_TOKEN: 'cherish refresh token',
      },
    },
  },
  ERROR_DESCRIPTION: {
    BAD_REQUEST:
      'Bad Request - 소셜 로그인 토큰을 보내지 않거나 kakao, apple 둘 다 보낸 경우',
    UNAUTHORIZED: 'Unauthorized - 소셜 로그인 토큰이 없거나 유효하지 않은 경우',
    NOT_FOUND: 'Not Found - 소셜 로그인 토큰에 해당하는 유저 정보가 없는 경우',
  },
};
