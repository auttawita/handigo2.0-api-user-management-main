---
# to: <%= action || 'app' %>/<%= name %>/test/<%= name %>.e2e.spec.ts
to: <%= action || 'app' %>/<%= name %>/test/e2e.spec.ts
---

import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { CanActivate, INestApplication } from '@nestjs/common';
import { JWTAuthGuard } from 'artifacts/auth/jwt/jwt.auth.guard';
import { RDSModule } from 'artifacts/rds/rds.module';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/config/configuration';
import { <%= Name %>Controller } from '../<%= name %>.controller';
import { <%= Name %>Service } from '../<%= name %>.service';
import { <%= Name %>Repository } from '../repositories/<%= name %>.repository';

describe('<%= Name %>s', () => {
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
      controllers: [<%= Name %>Controller],
      providers: [<%= Name %>Service, <%= Name %>Repository],
    })
      .overrideGuard(JWTAuthGuard)
      .useValue(mockGuard)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET <%= name %>`, () => {
    return request(app.getHttpServer()).get('/v1/<%= name %>').expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
