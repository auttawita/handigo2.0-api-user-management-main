import { Type } from 'class-transformer';
import { SearchDTO } from 'src/common/dto/search.dto';

export class FooBarSearchDTO extends SearchDTO {
  @Type(() => String)
  status = '';

  @Type(() => Number)
  id: number;
}
