---
# to: <%= action || 'app' %>/<%= name %>/<%= main %>-<%= sub %>.module.ts
to: <%= action || 'app' %>/<%= name %>/module.ts
---

import { Module } from '@nestjs/common';
import { RDSModule } from 'artifacts/rds/rds.module';
import { <%= main %><%= sub %>Controller } from './controller';
import { <%= main %><%= sub %>Service } from './service';
import { <%= main %><%= sub %>Repository } from './repositories/repository';
import { <%= main %>Repository } from '../<%= main %>/repositories/repository';
import { <%= sub %>Repository } from '../<%= sub %>/repositories/repository';
import { <%= main %><%= sub %>RelationRepository } from './repositories/relation.repository';

@Module({
  imports: [RDSModule],
  controllers: [<%= main %><%= sub %>Controller],
  providers: [
    <%= main %><%= sub %>Service,
    <%= main %><%= sub %>Repository,
    <%= main %><%= sub %>RelationRepository,
    <%= main %>Repository,
    <%= sub %>Repository,
  ],
})
export class <%= main %><%= sub %>Module {}
