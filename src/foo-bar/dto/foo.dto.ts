import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { FooDTO } from 'src/foo/dto/dto';
import { BarDTO } from 'src/bar/dto/dto';

export class FooBarDTO extends FooDTO {
  @IsArray()
  @ApiProperty({
    description: 'bar in foo',
    type: [],
    example: [],
  })
  bars: BarDTO[];
}
