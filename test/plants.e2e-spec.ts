import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

import { AppModule } from '../src/app.module';
import { PlantsModule } from 'src/plants/plants.module';

import {
  mockBadRequestResponse,
  mockNotFoundResponse,
  mockPlantWaterLogsResponse,
  mockPlantsInformationResponse,
  mockUpdatePlantDetailDto,
  mockUpdatePlantDetailSuccessResponse,
  mockUserPlantDetailSuccessResponse,
} from './mock/plants.mock';

describe('Plants (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PlantsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ disableErrorMessages: false, transform: true }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('[GET] /plants/:id', () => {
    beforeAll(() => {
      jest.useFakeTimers({ doNotFake: ['nextTick', 'setImmediate'] });
      jest.setSystemTime(new Date('2023-08-13 18:00'));
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it('200 OK', () => {
      return request(app.getHttpServer())
        .get(`/plants/1`)
        .expect(200)
        .expect(mockUserPlantDetailSuccessResponse);
    });

    it('400 Bad Request', () => {
      return request(app.getHttpServer())
        .get(`/plants/hi`)
        .expect(400)
        .expect(mockBadRequestResponse);
    });

    it('404 Not Found', () => {
      return request(app.getHttpServer())
        .get(`/plants/100`)
        .expect(404)
        .expect(mockNotFoundResponse);
    });
  });

  describe('[PUT] /plants/:id', () => {
    it('200 OK', () => {
      return request(app.getHttpServer())
        .put(`/plants/1`)
        .send(mockUpdatePlantDetailDto)
        .expect(200)
        .expect(mockUpdatePlantDetailSuccessResponse);
    });

    it('400 Bad Request', () => {
      return request(app.getHttpServer())
        .put(`/plants/1`)
        .send({})
        .expect(400)
        .expect(mockBadRequestResponse);
    });

    it('404 Not Found', () => {
      return request(app.getHttpServer())
        .put(`/plants/2`)
        .send(mockUpdatePlantDetailDto)
        .expect(404);
    });
  });

  describe('[GET] /plants/:id/information', () => {
    it('200 OK', () => {
      return request(app.getHttpServer())
        .get(`/plants/1/information`)
        .expect(200)
        .expect(mockPlantsInformationResponse);
    });

    it('400 Bad Request', () => {
      return request(app.getHttpServer())
        .get(`/plants/hi/information`)
        .expect(400)
        .expect(mockBadRequestResponse);
    });

    it('404 Not Found', () => {
      return request(app.getHttpServer())
        .get(`/plants/100/information`)
        .expect(404)
        .expect(mockNotFoundResponse);
    });
  });

  describe('[GET] /plants/:id/water', () => {
    it('200 OK', () => {
      return request(app.getHttpServer())
        .get(`/plants/1/water`)
        .expect(200)
        .expect(mockPlantWaterLogsResponse);
    });

    it('400 Bad Request', () => {
      return request(app.getHttpServer())
        .get(`/plants/hi/water`)
        .expect(400)
        .expect(mockBadRequestResponse);
    });
  });
});
