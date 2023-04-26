---
# to: <%= action || 'app' %>/<%= name %>/<%= name %>.controller.ts
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
import { <%= Name %>DTO } from './dto/dto';
import { <%= Name %>Service } from './service';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { RequestDTO } from 'src/common/dto/request.dto';
import { <%= Name %>SearchDTO } from './dto/search.dto';
import { ErrorInterceptor } from 'src/common/interceptor/error.interceptor';

@Controller('/v1/<%= name %>')
export class <%= Name %>Controller {
  constructor(private readonly <%= name %>Service: <%= Name %>Service) {}

  @Get('')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(new ErrorInterceptor())
  search<%= Name %>(
    @Query() <%= name %>SearchDTO: <%= Name %>SearchDTO,
  ): Promise<ResponseDTO<<%= Name %>DTO[]>> {
    return this.<%= name %>Service.search(<%= name %>SearchDTO).then((result) => {
      return result;
    });
  }

  @Get('/:id')
  @UseInterceptors(new ErrorInterceptor())
  get<%= Name %>(@Param('id') id: string): Promise<ResponseDTO<<%= Name %>DTO>> {
    return this.<%= name %>Service.read(id).then((result) => {
      const response = new ResponseDTO<<%= Name %>DTO>();
      response.data = result;
      return response;
    });
  }

  @Post('')
  @UseInterceptors(new ErrorInterceptor())
  create<%= Name %>(@Body() <%= name %>DTO: RequestDTO<<%= Name %>DTO>): Promise<ResponseDTO<<%= Name %>DTO>> {
    return this.<%= name %>Service.create(<%= Name %>DTO.data).then((result) => {
      const response = new ResponseDTO<<%= Name %>DTO>();
      response.data = result;
      return response;
    });
  }

  @Put('')
  @UseInterceptors(new ErrorInterceptor())
  update<%= Name %>(
    @Body() <%= name %>UpdateDTO: RequestDTO<<%= Name %>DTO>,
  ): Promise<ResponseDTO<<%= Name %>DTO>> {
    return this.<%= name %>Service.update(<%= name %>UpdateDTO.data).then((result) => {
      const response = new ResponseDTO<<%= Name %>DTO>();
      response.data = result;
      return response;
    });
  }

  @Delete('/:id')
  @UseInterceptors(new ErrorInterceptor())
  delete<%= Name %>(@Param('id') id: string): Promise<ResponseDTO<any>> {
    return this.<%= name %>Service.delete(id).then((result) => {
      const response = new ResponseDTO<any>();
      response.data = result;
      return response;
    });
  }
}
