import { BadRequestException, Injectable } from '@nestjs/common';
import { VIEW, FooBarRepository } from './repositories/repository';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { FooBarDTO } from './dto/foo.dto';
import { FooBarSearchDTO } from './dto/search.dto';
import { FooBarRelationDTO } from './dto/relation.dto';
import { AssociationBaseService } from 'artifacts/api/association.service';

@Injectable()
export class FooBarService extends AssociationBaseService<FooBarDTO> {
  constructor(private readonly fooBarRepository: FooBarRepository) {
    super(fooBarRepository);
  }

  async createFooBarRelation(
    fooBarRelationDTO: FooBarRelationDTO,
  ): Promise<FooBarRelationDTO> {
    const fooBarRelation = await this.fooBarRepository
      .getFooBarRelationRepository()
      .insert(fooBarRelationDTO);
    return new FooBarRelationDTO(fooBarRelation);
  }

  async read(view: string, id: string): Promise<any> {
    if (!Object.values(VIEW).includes(view as VIEW)) {
      throw new BadRequestException('view is not valid');
    }
    return super.read(view, id);
  }

  async search(
    view: string,
    fooBarSearchDTO: FooBarSearchDTO,
  ): Promise<ResponseDTO<any[]>> {
    if (fooBarSearchDTO.status && fooBarSearchDTO.status !== 'all') {
      this.fooBarRepository.where({
        status: fooBarSearchDTO.status,
      });
    }
    // filter with id
    if (fooBarSearchDTO.id) {
      this.fooBarRepository.where({
        id: fooBarSearchDTO.id,
      });
    }
    return super.search(view, fooBarSearchDTO);
  }

  async update(view: string, updateDTO: any): Promise<any> {
    if (!Object.values(VIEW).includes(view as VIEW)) {
      throw new BadRequestException('view is not valid');
    }
    return super.update(view, updateDTO);
  }

  async delete(fooId: string, barId: string): Promise<any> {
    return {
      deleteFooCount: await this.fooBarRepository
        .getFooRepository()
        .where({ id: fooId })
        .delete(),
      deleteFooBarRelationCount: await this.fooBarRepository
        .getFooBarRelationRepository()
        .where({ fooId: fooId })
        .delete(),
      deleteBarCount: await this.fooBarRepository
        .getBarRepository()
        .where({ id: barId })
        .delete(),
    };
  }
}
