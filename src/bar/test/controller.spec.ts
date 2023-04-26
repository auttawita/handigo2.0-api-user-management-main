import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { RDSModule } from 'artifacts/rds/rds.module';
import configuration from 'src/config/configuration';
import { BarController } from '../controller';
import { BarService } from '../service';
import { BarSearchDTO } from '../dto/search.dto';
import { BarRepository } from '../repositories/repository';

describe('BarController', () => {
  let barController: BarController;
  let barService: BarService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        RDSModule,
        ConfigModule.forRoot({
          load: [configuration],
          isGlobal: true,
        }),
      ],
      controllers: [BarController],
      providers: [BarService, BarRepository],
    }).compile();

    barController = app.get<BarController>(BarController);
    barService = app.get<BarService>(BarService);
  });

  describe('search', () => {
    it('should return a response DTO', async () => {
      // jest.spyOn(fooService, 'search').mockImplementation(async () => result);
      const result = await barController.searchBar(new BarSearchDTO());
      // console.log('result', result.data);
      expect(result.data).not.toBeNull();
    });
  });
});
