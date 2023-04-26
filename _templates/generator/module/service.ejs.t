---
# to: <%= action || 'app' %>/<%= name %>/<%= name %>.service.ts
to: <%= action || 'app' %>/<%= name %>/service.ts
---

import { Injectable } from '@nestjs/common';
import { <%= Name %>Repository } from './repositories/repository';
import { <%= Name %>DTO } from './dto/dto';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { <%= Name %>SearchDTO } from './dto/search.dto';
import { BaseService } from 'artifacts/api/service';

@Injectable()
export class <%= Name %>Service extends BaseService<<%= Name %>DTO> {
  constructor(private readonly <%= name %>Repository: <%= Name %>Repository) {
    super(<%= name %>Repository);
  }

  async search(<%= name %>SearchDTO: <%= Name %>SearchDTO): Promise<ResponseDTO<<%= Name %>DTO[]>> {
    if (<%= name %>SearchDTO.status && <%= name %>SearchDTO.status !== 'all') {
      this.<%= name %>Repository.where({
        status: <%= name %>SearchDTO.status,
      });
    }
    return super.search(<%= name %>SearchDTO);
  }
}
