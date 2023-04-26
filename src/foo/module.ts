import { Module } from '@nestjs/common';
import { RDSModule } from 'artifacts/rds/rds.module';
import { FooController } from './controller';
import { FooService } from './service';
import { FooRepository } from './repositories/repository';

@Module({
  imports: [RDSModule],
  controllers: [FooController],
  providers: [FooService, FooRepository],
})
export class FooModule {}
