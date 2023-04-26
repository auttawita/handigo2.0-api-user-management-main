---
# to: <%= action || 'app' %>/<%= name %>/test/<%= main %>-<%= sub %>.controller.spec.ts
to: <%= action || 'app' %>/<%= name %>/test/controller.spec.ts
---

import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { RDSModule } from 'artifacts/rds/rds.module';
import configuration from 'src/config/configuration';
import { <%= main %>Repository } from 'src/<%= main %>/repositories/repository';
import { <%= sub %>Repository } from 'src/<%= sub %>/repositories/repository';
import { <%= main %><%= sub %>SearchDTO } from '../dto/search.dto';
import { <%= main %><%= sub %>Controller } from '../controller';
import { <%= main %><%= sub %>Service } from '../service';
import { <%= main %><%= sub %>RelationRepository } from '../repositories/relation.repository';
import { <%= main %><%= sub %>Repository, VIEW } from '../repositories/repository';

describe('<%= main %><%= sub %>Controller', () => {
  let <%= main %><%= sub %>Controller: <%= main %><%= sub %>Controller;
  let <%= main %><%= sub %>Service: <%= main %><%= sub %>Service;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        RDSModule,
        ConfigModule.forRoot({
          load: [configuration],
          isGlobal: true,
        }),
      ],
      controllers: [<%= main %><%= sub %>Controller],
      providers: [
        <%= main %><%= sub %>Service,
        <%= main %><%= sub %>Repository,
        <%= main %><%= sub %>RelationRepository,
        <%= main %>Repository,
        <%= sub %>Repository,
      ],
    }).compile();

    <%= main %><%= sub %>Controller = app.get<<%= main %><%= sub %>Controller>(<%= main %><%= sub %>Controller);
    <%= main %><%= sub %>Service = app.get<<%= main %><%= sub %>Service>(<%= main %><%= sub %>Service);
  });

  describe('search', () => {
    it('should return a response DTO', async () => {
      const result = await <%= main %><%= sub %>Controller.search(
        VIEW.<%= main.toUpperCase() %>_<%= sub.toUpperCase() %>,
        new <%= main %><%= sub %>SearchDTO(),
      );
      // console.log('result', result.data);
      expect(result.data).not.toBeNull();
    });
  });
});
