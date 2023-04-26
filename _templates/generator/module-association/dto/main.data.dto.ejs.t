---
# to: <%= action || 'app' %>/<%= name %>/dto/<%= main %>-<%= sub %>.dto.ts
to: <%= action || 'app' %>/<%= name %>/dto/<%= main %>.dto.ts
---

import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { <%= main %>DTO } from 'src/<%= main %>/dto/dto';
import { <%= sub %>DTO } from 'src/<%= sub %>/dto/dto';

export class <%= main %><%= sub %>DTO extends <%= main %>DTO {
  @IsArray()
  @ApiProperty({
    description: '<%= sub %> in <%= main %>',
    type: [],
    example: [],
  })
  <%= sub %>s: <%= sub %>DTO[];
}
