---
# to: <%= action || 'app' %>/<%= name %>/dto/<%= name %>-search.dto.ts
to: <%= action || 'app' %>/<%= name %>/dto/search.dto.ts
---

import { IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { SearchDTO } from 'src/common/dto/search.dto';

export class <%= Name %>SearchDTO extends SearchDTO {
  @IsString()
  @Type(() => String)
  status = '';
}
