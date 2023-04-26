import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { CanActivate, INestApplication } from '@nestjs/common';
import { JWTAuthGuard } from 'artifacts/auth/jwt/jwt.auth.guard';
import { RDSModule } from 'artifacts/rds/rds.module';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/config/configuration';
import { BarController } from '../controller';
import { BarService } from '../service';
import { BarRepository } from '../repositories/repository';

describe('Bars', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const mockGuard: CanActivate = { canActivate: jest.fn(() => true) };
    const moduleRef = await Test.createTestingModule({
      imports: [
        RDSModule,
        ConfigModule.forRoot({
          load: [configuration],
          isGlobal: true,
        }),
      ],
      controllers: [BarController],
      providers: [BarService, BarRepository],
    })
      .overrideGuard(JWTAuthGuard)
      .useValue(mockGuard)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET bar`, () => {
    return request(app.getHttpServer()).get('/v1/bar').expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
