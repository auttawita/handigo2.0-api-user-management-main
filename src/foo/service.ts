import { Injectable } from '@nestjs/common';
import { FooRepository } from './repositories/repository';
import { FooDTO } from './dto/dto';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { FooSearchDTO } from './dto/search.dto';
import { BaseService } from 'artifacts/api/service';

@Injectable()
export class FooService extends BaseService<FooDTO> {
  constructor(private readonly fooRepository: FooRepository) {
    super(fooRepository);
  }

  async search(fooSearchDTO: FooSearchDTO): Promise<ResponseDTO<FooDTO[]>> {
    if (fooSearchDTO.status && fooSearchDTO.status !== 'all') {
      this.fooRepository.where({
        status: fooSearchDTO.status,
      });
    }
    return super.search(fooSearchDTO);
  }
}
