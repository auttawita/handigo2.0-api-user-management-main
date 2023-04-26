import { IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { SearchDTO } from 'src/common/dto/search.dto';

export class FooSearchDTO extends SearchDTO {
  @IsString()
  @Type(() => String)
  status = '';
}
