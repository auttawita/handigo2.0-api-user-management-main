---
# to: <%= action || 'app' %>/<%= name %>/<%= main %>-<%= sub %>.controller.ts
to: <%= action || 'app' %>/<%= name %>/controller.ts
---

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
import { <%= main %><%= sub %>Service } from './service';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { RequestDTO } from 'src/common/dto/request.dto';
import { <%= main %><%= sub %>SearchDTO } from './dto/search.dto';
import { <%= main %><%= sub %>RelationDTO } from './dto/relation.dto';
import { ErrorInterceptor } from 'src/common/interceptor/error.interceptor';

@Controller('/v1/<%= h.inflection.pluralize(main) %>/<%= h.inflection.pluralize(sub) %>')
export class <%= main %><%= sub %>Controller {
  constructor(private readonly <%= main %><%= sub %>Service: <%= main %><%= sub %>Service) {}

  @Post('/:view')
  @UseInterceptors(new ErrorInterceptor())
  create(
    @Param('view') view: string,
    @Body() <%= main %><%= sub %>DTO: RequestDTO<any>,
  ): Promise<ResponseDTO<any>> {
    return this.<%= main %><%= sub %>Service.create(view, <%= main %><%= sub %>DTO.data).then((result) => {
      const response = new ResponseDTO<any>();
      response.data = result;
      return response;
    });
  }

  @Post('/relation')
  @UseInterceptors(new ErrorInterceptor())
  create<%= main %><%= sub %>Relation(
    @Body()
    <%= main %><%= sub %>RelationDTO: RequestDTO<<%= main %><%= sub %>RelationDTO>,
  ): Promise<ResponseDTO<<%= main %><%= sub %>RelationDTO>> {
    return this.<%= main %><%= sub %>Service
      .create<%= main %><%= sub %>Relation(<%= main %><%= sub %>RelationDTO.data)
      .then((result) => {
        const response = new ResponseDTO<<%= main %><%= sub %>RelationDTO>();
        response.data = result;
        return response;
      });
  }

  @Get('/:view')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(new ErrorInterceptor())
  search(
    @Param('view') view: string,
    @Query() <%= main %><%= sub %>SearchDTO: <%= main %><%= sub %>SearchDTO,
  ): Promise<ResponseDTO<any[]>> {
    return this.<%= main %><%= sub %>Service.search(view, <%= main %><%= sub %>SearchDTO).then((result) => {
      return result;
    });
  }

  @Get('/:view/:id')
  @UseInterceptors(new ErrorInterceptor())
  get(
    @Param('view') view: string,
    @Param('id') id: string,
  ): Promise<ResponseDTO<any>> {
    return this.<%= main %><%= sub %>Service.read(view, id).then((result) => {
      const response = new ResponseDTO<any>();
      response.data = result;
      return response;
    });
  }

  @Put('/:view')
  @UseInterceptors(new ErrorInterceptor())
  update(
    @Param('view') view: string,
    @Body() <%= main %><%= sub %>UpdateDTO: RequestDTO<any>,
  ): Promise<ResponseDTO<any>> {
    return this.<%= main %><%= sub %>Service
      .update(view, <%= main %><%= sub %>UpdateDTO.data)
      .then((result) => {
        const response = new ResponseDTO<any>();
        response.data = result;
        return response;
      });
  }

  @Delete('/:<%= main %>Id/:<%= sub %>Id')
  @UseInterceptors(new ErrorInterceptor())
  delete(
    @Param('<%= main %>Id') <%= main %>Id: string,
    @Param('<%= sub %>Id') <%= sub %>Id: string,
  ): Promise<ResponseDTO<any>> {
    return this.<%= main %><%= sub %>Service.delete(<%= main %>Id, <%= sub %>Id).then((result) => {
      const response = new ResponseDTO<any>();
      response.data = result;
      return response;
    });
  }
}
