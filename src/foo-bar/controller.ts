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
import { FooBarService } from './service';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { RequestDTO } from 'src/common/dto/request.dto';
import { FooBarSearchDTO } from './dto/search.dto';
import { FooBarBLL } from './bll/bll';
import { FooBarRelationDTO } from './dto/relation.dto';
import { ErrorInterceptor } from 'src/common/interceptor/error.interceptor';

@Controller('/v1/foo-bar')
export class FooBarController {
  constructor(
    private readonly fooBarService: FooBarService,
    private readonly fooBarBLL: FooBarBLL,
  ) {}

  @Post('/:view')
  @UseInterceptors(new ErrorInterceptor())
  create(
    @Param('view') view: string,
    @Body() fooBarDTO: RequestDTO<any>,
  ): Promise<ResponseDTO<any>> {
    return this.fooBarService.create(view, fooBarDTO.data).then((result) => {
      const response = new ResponseDTO<any>();
      response.data = result;
      return response;
    });
  }

  @Post('/relation')
  @UseInterceptors(new ErrorInterceptor())
  createFooBarRelation(
    @Body()
    fooBarRelationDTO: RequestDTO<FooBarRelationDTO>,
  ): Promise<ResponseDTO<FooBarRelationDTO>> {
    return this.fooBarService
      .createFooBarRelation(fooBarRelationDTO.data)
      .then((result) => {
        const response = new ResponseDTO<FooBarRelationDTO>();
        response.data = result;
        return response;
      });
  }

  @Get('/:view')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(new ErrorInterceptor())
  search(
    @Param('view') view: string,
    @Query() fooBarSearchDTO: FooBarSearchDTO,
  ): Promise<ResponseDTO<any[]>> {
    return this.fooBarService.search(view, fooBarSearchDTO).then((result) => {
      return result;
    });
  }

  @Get('/:view/:id')
  @UseInterceptors(new ErrorInterceptor())
  get(
    @Param('view') view: string,
    @Param('id') id: string,
  ): Promise<ResponseDTO<any>> {
    return this.fooBarService.read(view, id).then((result) => {
      const response = new ResponseDTO<any>();
      response.data = result;
      return response;
    });
  }

  @Put('/:view')
  @UseInterceptors(new ErrorInterceptor())
  update(
    @Param('view') view: string,
    @Body() fooBarUpdateDTO: RequestDTO<any>,
  ): Promise<ResponseDTO<any>> {
    return this.fooBarService
      .update(view, fooBarUpdateDTO.data)
      .then((result) => {
        const response = new ResponseDTO<any>();
        response.data = result;
        return response;
      });
  }

  @Delete('/:fooId/:barId')
  @UseInterceptors(new ErrorInterceptor())
  delete(
    @Param('fooId') fooId: string,
    @Param('barId') barId: string,
  ): Promise<ResponseDTO<any>> {
    return this.fooBarService.delete(fooId, barId).then((result) => {
      const response = new ResponseDTO<any>();
      response.data = result;
      return response;
    });
  }
}
