import { Module } from '@nestjs/common';
import { RDSModule } from 'artifacts/rds/rds.module';
import { BarController } from './controller';
import { BarService } from './service';
import { BarRepository } from './repositories/repository';

@Module({
  imports: [RDSModule],
  controllers: [BarController],
  providers: [BarService, BarRepository],
})
export class BarModule {}
