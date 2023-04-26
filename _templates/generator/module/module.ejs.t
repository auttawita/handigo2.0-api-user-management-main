---
# to: <%= action || 'app' %>//<%= name %>/<%= name %>.module.ts
to: <%= action || 'app' %>//<%= name %>/module.ts
---

import { Module } from '@nestjs/common';
import { RDSModule } from 'artifacts/rds/rds.module';
import { <%= Name %>Controller } from './controller';
import { <%= Name %>Service } from './service';
import { <%= Name %>Repository } from './repositories/repository';

@Module({
  imports: [RDSModule],
  controllers: [<%= Name %>Controller],
  providers: [<%= Name %>Service, <%= Name %>Repository],
})
export class <%= Name %>Module {}
