import { Module } from '@nestjs/common';
import { RDSModule } from 'artifacts/rds/rds.module';
import { FooBarController } from './controller';
import { FooBarService } from './service';
import { FooBarRepository } from './repositories/repository';
import { FooBarBLL } from './bll/bll';
import { FooRepository } from '../foo/repositories/repository';
import { BarRepository } from '../bar/repositories/repository';
import { FooBarRelationRepository } from './repositories/relation.repository';

@Module({
  imports: [RDSModule],
  controllers: [FooBarController],
  providers: [
    FooBarBLL,
    FooBarService,
    FooBarRepository,
    FooBarRelationRepository,
    FooRepository,
    BarRepository,
  ],
})
export class FooBarModule {}
