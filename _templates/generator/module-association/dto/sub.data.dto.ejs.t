---
# to: <%= action || 'app' %>/<%= name %>/dto/<%= sub %>-<%= main %>.dto.ts
to: <%= action || 'app' %>/<%= name %>/dto/<%= sub %>.dto.ts
---

import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { <%= sub %>DTO } from 'src/<%= sub %>/dto/dto';
import { <%= main %>DTO } from 'src/<%= main %>/dto/dto';

export class <%= sub %><%= main %>DTO extends <%= sub %>DTO {
  @IsArray()
  @ApiProperty({
    description: '<%= main %> in <%= sub %>',
    type: [],
    example: [],
  })
  <%= main %>s: <%= main %>DTO[];
}
