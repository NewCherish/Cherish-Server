import { PrismaClient } from '@prisma/client';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      id: 1,
      email: 'ddd',
      createdAt: dayjs('2023-07-22 08:15:37.225Z').toDate(),
      fcmToken: 'dd',
      nickname: 'ddd',
      password: 'dd',
      phone: 'ddd',
      profileImageURL: 'dd',
      refreshToken: 'dd',
      socialType: 'kakao',
      title: 'dd',
      updatedAt: dayjs('2023-07-22 08:15:37.225Z').toDate(),
      uuid: 'dd',
      appleId: null,
      appleRefreshToken: null,
      kakaoId: 1,
    },
  });

  const plants = await prisma.plant.createMany({
    data: [
      {
        id: 1,
        name: '오렌지 자스민',
        cycle: 2,
        introduction: '붙임성이 좋은\n앙증맞은 오렌지 자스민',
        meaning: '당신을 향해',
        explanation:
          '1~2일에 한 번 물을 주는 것을 추천해요\n물을 좋아하는 자스민이 곧 귀여운 열매를 선물할거에요!',
        circleImageURL:
          'https://cherish-static-dev.s3.ap-northeast-2.amazonaws.com/circleImages/mindlere-circle.png',
        gifURL: 'aaa',
      },
      {
        id: 2,
        name: '로즈마리',
        cycle: 4,
        introduction: '당신의 하루를 치유하는\n향기로운 로즈마리',
        meaning: '기억해 주세요',
        explanation:
          '3~4일에 한 번 물을 주는 것을 추천해요\n자주 연락하고 많은 시간을 함께하며 추억을 쌓아가요!',
        circleImageURL:
          'https://cherish-static-dev.s3.ap-northeast-2.amazonaws.com/circleImages/rosemari-circle.png',
        gifURL: 'aaa',
      },
      {
        id: 3,
        name: '아메리칸 블루',
        cycle: 6,
        introduction: '매일매일 꽃이 피는\n푸른 빛의 아메리칸 블루',
        meaning: '두 사람의 인연',
        explanation:
          '일주일에 한 번 물을 주는 것을 추천해요\n종종 안부를 물으면서 오손도손 이야기를 나누어요!',
        circleImageURL:
          'https://cherish-static-dev.s3.ap-northeast-2.amazonaws.com/circleImages/americanblue-circle.png',
        gifURL: 'aaa',
      },
      {
        id: 4,
        name: '민들레',
        cycle: 13,
        introduction: '감사하는 마음을 가진\n따뜻한 민들레',
        meaning: '인연에서의 행복',
        explanation:
          '보름에 한 번 물을 주는 것을 추천해요\n당신의 연락이 홀씨가 되어 날아가 행복으로 피어날거에요!',
        circleImageURL:
          'https://cherish-static-dev.s3.ap-northeast-2.amazonaws.com/circleImages/mindlere-circle.png',
        gifURL: 'ㅁㅁ',
      },
      {
        id: 5,
        name: '스투키',
        cycle: 29,
        introduction: '언제나 당신을 지켜주는\n든든한 스투키',
        meaning: '너그러움',
        explanation:
          '한달에 한 번 물을 주는 것을 추천해요\n가끔씩 연락하더라도 오래 만날 수 있길 바라요!',
        circleImageURL:
          'https://cherish-static-dev.s3.ap-northeast-2.amazonaws.com/circleImages/stuki-circle.png',
        gifURL: 'ㅁㅁ',
      },
      {
        id: 6,
        name: '단모환',
        cycle: 90,
        introduction: '당신의 밤을 지켜주는\n씩씩한 단모환',
        meaning: '사랑과 열정',
        explanation:
          '세 달에 한 번 물을 주는 것을 추천해요\n자주 보지 못해도 분명 당신의 연락을 기다릴거에요!',
        circleImageURL:
          'https://cherish-static-dev.s3.ap-northeast-2.amazonaws.com/circleImages/danmohwan-circle.png',
        gifURL: 'ㅁㅁㅁ',
      },
    ],
    skipDuplicates: true,
  });

  const plantLevels = await prisma.plantLevel.createMany({
    data: [
      {
        id: 1,
        plantId: 1,
        level: 0,
        levelName: '어린 나무',
        description: '무럭무럭 자랄 준비를 하고 있어요!',
        imageURL:
          'https://cherish-static-dev.s3.ap-northeast-2.amazonaws.com/plantLevel/mindlere-1.png',
      },
      {
        id: 2,
        plantId: 1,
        level: 1,
        levelName: '개화',
        description: '하얀 꽃이 활짝 피어났어요!',
        imageURL:
          'https://cherish-static-dev.s3.ap-northeast-2.amazonaws.com/plantLevel/mindlere-2.png',
      },
      {
        id: 3,
        plantId: 1,
        level: 2,
        levelName: '열매',
        description: '꽃이 머물다간 자리에 앙증맞은 열매가 열렸네요!',
        imageURL:
          'https://cherish-static-dev.s3.ap-northeast-2.amazonaws.com/plantLevel/mindlere-complete.png',
      },
      {
        id: 4,
        plantId: 2,
        level: 0,
        levelName: '새싹',
        description: '새싹이 쏘옥 얼굴을 내밀었어요!',
        imageURL:
          'https://cherish-static-dev.s3.ap-northeast-2.amazonaws.com/plantLevel/rosemari-1.png',
      },
      {
        id: 5,
        plantId: 2,
        level: 1,
        levelName: '꽃망울',
        description: '꽃망울이 방울방울 맺혔어요!',
        imageURL:
          'https://cherish-static-dev.s3.ap-northeast-2.amazonaws.com/plantLevel/rosemari-2.png',
      },
      {
        id: 6,
        plantId: 2,
        level: 2,
        levelName: '개화',
        description: '예쁜 꽃이 활짝 피어났어요!',
        imageURL:
          'https://cherish-static-dev.s3.ap-northeast-2.amazonaws.com/plantLevel/rosemari-complete.png',
      },
      {
        id: 7,
        plantId: 3,
        level: 0,
        levelName: '새싹',
        description: '새싹이 쏘옥 얼굴을 내밀었어요!',
        imageURL:
          'https://cherish-static-dev.s3.ap-northeast-2.amazonaws.com/plantLevel/americanblue-1.png',
      },
      {
        id: 8,
        plantId: 3,
        level: 1,
        levelName: '꽃망울',
        description: '꽃망울이 방울방울 맺혔어요!',
        imageURL:
          'https://cherish-static-dev.s3.ap-northeast-2.amazonaws.com/plantLevel/americanblue-2.png',
      },
      {
        id: 9,
        plantId: 3,
        level: 2,
        levelName: '개화',
        description: '예쁜 꽃이 활짝 피어났어요!',
        imageURL:
          'https://cherish-static-dev.s3.ap-northeast-2.amazonaws.com/plantLevel/americanblue-complete.png',
      },
      {
        id: 10,
        plantId: 4,
        level: 0,
        levelName: '새싹',
        description: '새싹이 쏘옥 얼굴을 내밀었어요!',
        imageURL:
          'https://cherish-static-dev.s3.ap-northeast-2.amazonaws.com/plantLevel/mindlere-1.png',
      },
    ],
    skipDuplicates: true,
  });

  const userPlant = await prisma.userPlant.create({
    data: {
      id: 1,
      userId: 1,
      nickname: 'test',
      instagram: null,
      phone: null,
      waterCycle: 14,
      waterCount: 0,
      isNotified: true,
      loveGauge: 0,
      createdAt: dayjs('2023-07-22 08:16:52.538Z').toDate(),
      updatedAt: dayjs('2023-07-22 08:16:52.538Z').toDate(),
      waterTime: null,
      plantId: 4,
    },
  });

  const water = await prisma.water.createMany({
    data: [
      {
        id: 1,
        userPlantId: 1,
        review: '리뷰1',
        wateringDate: dayjs('2023-07-22 08:55:31.799Z').toDate(),
        updatedAt: dayjs('2023-07-22 08:55:31.799Z').toDate(),
      },
      {
        id: 3,
        userPlantId: 1,
        review: '리뷰2',
        wateringDate: dayjs('2023-07-22 18:16:53Z').toDate(),
        updatedAt: dayjs('2023-07-22 09:16:54.635Z').toDate(),
      },
    ],
    skipDuplicates: true,
  });

  const waterKeword = await prisma.waterKeyword.createMany({
    data: [
      {
        id: 1,
        waterId: 4,
        keyword: 'keyword1',
        createdAt: dayjs('2023-07-22 12:20:11.257Z').toDate(),
        updatedAt: dayjs('2023-07-22 12:20:11.257Z').toDate(),
      },
      {
        id: 2,
        waterId: 4,
        keyword: 'keyword2',
        createdAt: dayjs('2023-07-22 12:20:11.257Z').toDate(),
        updatedAt: dayjs('2023-07-22 12:20:11.257Z').toDate(),
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
