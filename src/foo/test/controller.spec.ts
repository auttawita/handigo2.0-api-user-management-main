import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { RDSModule } from 'artifacts/rds/rds.module';
import configuration from 'src/config/configuration';
import { FooSearchDTO } from '../dto/search.dto';
import { FooController } from '../controller';
import { FooService } from '../service';
import { FooRepository } from '../repositories/repository';

describe('FooController', () => {
  let app: TestingModule;
  let fooController: FooController;
  let fooService: FooService;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [
        RDSModule,
        ConfigModule.forRoot({
          load: [configuration],
          isGlobal: true,
        }),
      ],
      controllers: [FooController],
      providers: [FooService, FooRepository],
    }).compile();

    fooController = app.get<FooController>(FooController);
    fooService = app.get<FooService>(FooService);

    await app.init();
  });

  describe('search', () => {
    it('should return a response DTO', async () => {
      // jest.spyOn(fooService, 'search').mockImplementation(async () => result);
      const result = await fooController.searchFoo(new FooSearchDTO());
      // console.log('result', result.data);
      expect(result.data).not.toBeNull();
    });
  });

  afterEach(async () => await app.close());
});
