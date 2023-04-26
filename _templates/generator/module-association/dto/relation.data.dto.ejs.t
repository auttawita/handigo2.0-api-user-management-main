---
# to: <%= action || 'app' %>/<%= name %>/dto/<%= main %>-<%= sub %>-relation.dto.ts
to: <%= action || 'app' %>/<%= name %>/dto/relation.dto.ts
---

import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { BaseDTO } from 'src/common/dto/base.dto';

export class <%= main %><%= sub %>RelationDTO extends BaseDTO {
  @IsNumber()
  @ApiProperty({
    description: '<%= main %> id',
    type: Number,
    example: 1,
  })
  <%= main %>Id: number;

  @IsNumber()
  @ApiProperty({
    description: '<%= sub %> id',
    type: Number,
    example: 1,
  })
  <%= sub %>Id: number;
}
