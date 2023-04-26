---
# to: <%= action || 'app' %>/<%= name %>/test/<%= main %>-<%= sub %>.e2e.spec.ts
to: <%= action || 'app' %>/<%= name %>/test/e2e.spec.ts
---

import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { CanActivate, INestApplication } from '@nestjs/common';
import { JWTAuthGuard } from 'artifacts/auth/jwt/jwt.auth.guard';
import { RDSModule } from 'artifacts/rds/rds.module';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/config/configuration';
import { <%= main %><%= sub %>Controller } from '../controller';
import { <%= main %><%= sub %>Service } from '../service';
import { <%= main %><%= sub %>Repository } from '../repositories/repository';

describe('<%= h.inflection.pluralize(Name) %>', () => {
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
      controllers: [<%= main %><%= sub %>Controller],
      providers: [<%= main %><%= sub %>Service, <%= main %><%= sub %>Repository],
    })
      .overrideGuard(JWTAuthGuard)
      .useValue(mockGuard)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET <%= main %>-<%= sub %>`, () => {
    return request(app.getHttpServer()).get('/v1/<%= h.inflection.pluralize(main) %>/<%= h.inflection.pluralize(sub) %>/<%= main %>-<%= sub %>').expect(200);
  });

  it(`/GET <%= sub %>-<%= main %>`, () => {
    return request(app.getHttpServer()).get('/v1/<%= h.inflection.pluralize(main) %>/<%= h.inflection.pluralize(sub) %>/<%= sub %>-<%= main %>').expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
