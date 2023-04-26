import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { CanActivate, INestApplication } from '@nestjs/common';
import { JWTAuthGuard } from 'artifacts/auth/jwt/jwt.auth.guard';
import { RDSModule } from 'artifacts/rds/rds.module';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/config/configuration';
import { FooBarController } from '../controller';
import { FooBarService } from '../service';
import { FooBarRepository } from '../repositories/repository';

describe('FooBars', () => {
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
      controllers: [FooBarController],
      providers: [FooBarService, FooBarRepository],
    })
      .overrideGuard(JWTAuthGuard)
      .useValue(mockGuard)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET foobar`, () => {
    return request(app.getHttpServer()).get('/v1/foo-bar/foo-bar').expect(200);
  });

  it(`/GET barfoo`, () => {
    return request(app.getHttpServer()).get('/v1/foo-bar/bar-foo').expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
