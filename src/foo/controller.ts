import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FooDTO } from './dto/dto';
import { FooService } from './service';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { RequestDTO } from 'src/common/dto/request.dto';
import { FooSearchDTO } from './dto/search.dto';
import { ErrorInterceptor } from 'src/common/interceptor/error.interceptor';

@Controller('/v1/foo')
export class FooController {
  constructor(private readonly fooService: FooService) {}

  @Get('')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(new ErrorInterceptor())
  searchFoo(
    @Query() fooSearchDTO: FooSearchDTO,
  ): Promise<ResponseDTO<FooDTO[]>> {
    return this.fooService.search(fooSearchDTO).then((result) => {
      return result;
    });
  }

  @Get('/:id')
  @UseInterceptors(new ErrorInterceptor())
  getFoo(@Param('id') id: string): Promise<ResponseDTO<FooDTO>> {
    return this.fooService.read(id).then((result) => {
      const response = new ResponseDTO<FooDTO>();
      response.data = result;
      return response;
    });
  }

  @Post('')
  @UseInterceptors(new ErrorInterceptor())
  createFoo(@Body() fooDTO: RequestDTO<FooDTO>): Promise<ResponseDTO<FooDTO>> {
    return this.fooService.create(fooDTO.data).then((result) => {
      const response = new ResponseDTO<FooDTO>();
      response.data = result;
      return response;
    });
  }

  @Put('')
  @UseInterceptors(new ErrorInterceptor())
  updateFoo(
    @Body() fooUpdateDTO: RequestDTO<FooDTO>,
  ): Promise<ResponseDTO<FooDTO>> {
    return this.fooService.update(fooUpdateDTO.data).then((result) => {
      const response = new ResponseDTO<FooDTO>();
      response.data = result;
      return response;
    });
  }

  @Delete('/:id')
  @UseInterceptors(new ErrorInterceptor())
  deleteFoo(@Param('id') id: string): Promise<ResponseDTO<any>> {
    return this.fooService.delete(id).then((result) => {
      const response = new ResponseDTO<any>();
      response.data = result;
      return response;
    });
  }
}
