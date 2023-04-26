---
# to: <%= action || 'app' %>/<%= name %>/<%= main %>-<%= sub %>.service.ts
to: <%= action || 'app' %>/<%= name %>/service.ts
---

import { BadRequestException, Injectable } from '@nestjs/common';
import { VIEW, <%= main %><%= sub %>Repository } from './repositories/repository';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { <%= main %><%= sub %>DTO } from './dto/dto';
import { <%= main %><%= sub %>SearchDTO } from './dto/search.dto';
import { <%= main %><%= sub %>RelationDTO } from './dto/relation.dto';
import { AssociationBaseService } from 'artifacts/api/association.service';

@Injectable()
export class <%= main %><%= sub %>Service extends AssociationBaseService<<%= main %><%= sub %>DTO> {
  constructor(private readonly <%= main %><%= sub %>Repository: <%= main %><%= sub %>Repository) {
    super(<%= main %><%= sub %>Repository);
  }

  async create<%= main %><%= sub %>Relation(
    <%= main %><%= sub %>RelationDTO: <%= main %><%= sub %>RelationDTO,
  ): Promise<<%= main %><%= sub %>RelationDTO> {
    const <%= main %><%= sub %>Relation = await this.<%= main %><%= sub %>Repository
      .get<%= main %><%= sub %>RelationRepository()
      .insert(<%= main %><%= sub %>RelationDTO);
    return new <%= main %><%= sub %>RelationDTO(<%= main %><%= sub %>Relation);
  }

  async read(view: string, id: string): Promise<any> {
    if (!Object.values(VIEW).includes(view as VIEW)) {
      throw new BadRequestException('view is not valid');
    }
    return super.read(view, id);
  }

  async search(
    view: string,
    <%= main %><%= sub %>SearchDTO: <%= main %><%= sub %>SearchDTO,
  ): Promise<ResponseDTO<any[]>> {
    if (<%= main %><%= sub %>SearchDTO.status && <%= main %><%= sub %>SearchDTO.status !== 'all') {
      this.<%= main %><%= sub %>Repository.where({
        status: <%= main %><%= sub %>SearchDTO.status,
      });
    }
    // filter with id
    if (<%= main %><%= sub %>SearchDTO.id) {
      this.<%= main %><%= sub %>Repository.where({
        id: <%= main %><%= sub %>SearchDTO.id,
      });
    }
    return super.search(view, <%= main %><%= sub %>SearchDTO);
  }

  async update(view: string, updateDTO: any): Promise<any> {
    if (!Object.values(VIEW).includes(view as VIEW)) {
      throw new BadRequestException('view is not valid');
    }
    return super.update(view, updateDTO);
  }

  async delete(<%= main %>Id: string, <%= sub %>Id: string): Promise<any> {
    return {
      delete<%= main %>Count: await this.<%= main %><%= sub %>Repository
        .get<%= main %>Repository()
        .where({ id: <%= main %>Id })
        .delete(),
      delete<%= main %><%= sub %>RelationCount: await this.<%= main %><%= sub %>Repository
        .get<%= main %><%= sub %>RelationRepository()
        .where({ <%= main %>Id: <%= main %>Id })
        .delete(),
      delete<%= sub %>Count: await this.<%= main %><%= sub %>Repository
        .get<%= sub %>Repository()
        .where({ id: <%= sub %>Id })
        .delete(),
    };
  }
}
