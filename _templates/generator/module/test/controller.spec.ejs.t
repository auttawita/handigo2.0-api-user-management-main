---
# to: <%= action || 'app' %>/<%= name %>/test/<%= name %>.controller.spec.ts
to: <%= action || 'app' %>/<%= name %>/test/controller.spec.ts
---

import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { RDSModule } from 'artifacts/rds/rds.module';
import configuration from 'src/config/configuration';
import { <%= Name %>SearchDTO } from '../dto/<%= name %>-search.dto';
import { <%= Name %>Controller } from '../<%= name %>.controller';
import { <%= Name %>Service } from '../<%= name %>.service';
import { <%= Name %>Repository } from '../repositories/<%= name %>.repository';

describe('<%= Name %>Controller', () => {
  let app: TestingModule;
  let <%= name %>Controller: <%= Name %>Controller;
  let <%= name %>Service: <%= Name %>Service;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [
        RDSModule,
        ConfigModule.forRoot({
          load: [configuration],
          isGlobal: true,
        }),
      ],
      controllers: [<%= Name %>Controller],
      providers: [<%= Name %>Service, <%= Name %>Repository],
    }).compile();

    <%= name %>Controller = app.get<<%= Name %>Controller>(<%= Name %>Controller);
    <%= name %>Service = app.get<<%= Name %>Service>(<%= Name %>Service);

    await app.init();
  });

  describe('search', () => {
    it('should return a response DTO', async () => {
      // jest.spyOn(<%= name %>Service, 'search').mockImplementation(async () => result);
      const result = await <%= name %>Controller.search<%= Name %>(new <%= Name %>SearchDTO());
      // console.log('result', result.data);
      expect(result.data).not.toBeNull();
    });
  });

  afterEach(async () => await app.close());
});
