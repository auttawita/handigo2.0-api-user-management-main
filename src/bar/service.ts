import { Injectable } from '@nestjs/common';
import { BarRepository } from './repositories/repository';
import { BarDTO } from './dto/dto';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { BarSearchDTO } from './dto/search.dto';
import { BaseService } from 'artifacts/api/service';

@Injectable()
export class BarService extends BaseService<BarDTO> {
  constructor(private readonly barRepository: BarRepository) {
    super(barRepository);
  }

  async search(barSearchDTO: BarSearchDTO): Promise<ResponseDTO<BarDTO[]>> {
    if (barSearchDTO.status && barSearchDTO.status !== 'all') {
      this.barRepository.where({
        status: barSearchDTO.status,
      });
    }
    return super.search(barSearchDTO);
  }
}
