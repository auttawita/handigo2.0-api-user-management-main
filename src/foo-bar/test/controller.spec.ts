import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { RDSModule } from 'artifacts/rds/rds.module';
import configuration from 'src/config/configuration';
import { FooRepository } from 'src/foo/repositories/repository';
import { BarRepository } from 'src/bar/repositories/repository';
import { FooBarBLL } from '../bll/bll';
import { FooBarSearchDTO } from '../dto/search.dto';
import { FooBarController } from '../controller';
import { FooBarService } from '../service';
import { FooBarRelationRepository } from '../repositories/relation.repository';
import { FooBarRepository, VIEW } from '../repositories/repository';

describe('FooBarController', () => {
  let fooBarController: FooBarController;
  let fooBarService: FooBarService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        RDSModule,
        ConfigModule.forRoot({
          load: [configuration],
          isGlobal: true,
        }),
      ],
      controllers: [FooBarController],
      providers: [
        FooBarBLL,
        FooBarService,
        FooBarRepository,
        FooBarRelationRepository,
        FooRepository,
        BarRepository,
      ],
    }).compile();

    fooBarController = app.get<FooBarController>(FooBarController);
    fooBarService = app.get<FooBarService>(FooBarService);
  });

  describe('search', () => {
    it('should return a response DTO', async () => {
      // jest.spyOn(fooService, 'search').mockImplementation(async () => result);
      const result = await fooBarController.search(
        VIEW.FOO_BAR,
        new FooBarSearchDTO(),
      );
      // console.log('result', result.data);
      expect(result.data).not.toBeNull();
    });
  });
});
