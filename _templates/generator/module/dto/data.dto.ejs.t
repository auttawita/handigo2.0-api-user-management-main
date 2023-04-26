---
# to: <%= action || 'app' %>/<%= name %>/dto/<%= name %>.dto.ts
to: <%= action || 'app' %>/<%= name %>/dto/dto.ts
---

import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsDate } from 'class-validator';
import { BaseDTO } from 'src/common/dto/base.dto';

export class <%= Name %>DTO extends BaseDTO {
  @IsNumber()
  @ApiProperty({
    description: 'id of <%= name %>',
    type: Number,
    example: 1,
  })
  id: number;

  @IsDate()
  @ApiProperty({
    description: 'Created date of <%= name %>',
    type: Date,
    example: '',
  })
  createdAt: Date;

  @IsDate()
  @ApiProperty({
    description: 'Updated date of <%= name %>',
    type: Date,
    example: '',
  })
  updatedAt: Date;
}
