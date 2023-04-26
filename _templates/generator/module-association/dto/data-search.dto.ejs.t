---
# to: <%= action || 'app' %>/<%= name %>/dto/<%= main %>-<%= sub %>-search.dto.ts
to: <%= action || 'app' %>/<%= name %>/dto/search.dto.ts
---

import { Type } from 'class-transformer';
import { SearchDTO } from 'src/common/dto/search.dto';

export class <%= main %><%= sub %>SearchDTO extends SearchDTO {
  @Type(() => String)
  status = '';

  @Type(() => Number)
  id: number;
}
