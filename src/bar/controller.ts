import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BarDTO } from './dto/dto';
import { BarService } from './service';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { RequestDTO } from 'src/common/dto/request.dto';
import { BarSearchDTO } from './dto/search.dto';
import { ErrorInterceptor } from 'src/common/interceptor/error.interceptor';
import { ApiBearerAuth, ApiBody, ApiExtraModels, ApiOperation, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';

@ApiTags('Bar')
@ApiBearerAuth()
@Controller('/v1/bar')
export class BarController {
  constructor(private readonly barService: BarService) {}

  @Get('')
  @ApiOperation({ summary: 'Get bar' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [BarDTO]
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(new ErrorInterceptor())
  searchBar(
    @Query() barSearchDTO: BarSearchDTO,
  ): Promise<ResponseDTO<BarDTO[]>> {
    return this.barService.search(barSearchDTO).then((result) => {
      return result;
    });
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get bar by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: BarDTO,
  })
  @UseInterceptors(new ErrorInterceptor())
  getBar(@Param('id') id: string): Promise<ResponseDTO<BarDTO>> {
    return this.barService.read(id).then((result) => {
      const response = new ResponseDTO<BarDTO>();
      response.data = result;
      return response;
    });
  }

  @Post('')
  @ApiOperation({ summary: 'Create bar' })
  @ApiExtraModels(BarDTO)
  @ApiBody({
    schema: {
      properties: {
        data: {
          $ref: getSchemaPath(BarDTO)
        },
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: BarDTO,
  })
  @UseInterceptors(new ErrorInterceptor())
  createBar(@Body() barDTO: RequestDTO<BarDTO>): Promise<ResponseDTO<BarDTO>> {
    return this.barService.create(barDTO.data).then((result) => {
      const response = new ResponseDTO<BarDTO>();
      response.data = result;
      return response;
    });
  }

  @Put('')
  @ApiOperation({ summary: 'Update bar' })
  @ApiBody({
    schema: {
      properties: {
        data: {
          $ref: getSchemaPath(BarDTO)
        },
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: BarDTO,
  })
  @UseInterceptors(new ErrorInterceptor())
  updateBar(
    @Body() barUpdateDTO: RequestDTO<BarDTO>,
  ): Promise<ResponseDTO<BarDTO>> {
    return this.barService.update(barUpdateDTO.data).then((result) => {
      const response = new ResponseDTO<BarDTO>();
      response.data = result;
      return response;
    });
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete bar by id' })
  @UseInterceptors(new ErrorInterceptor())
  deleteBar(@Param('id') id: string): Promise<ResponseDTO<any>> {
    return this.barService.delete(id).then((result) => {
      const response = new ResponseDTO<any>();
      response.data = result;
      return response;
    });
  }
}
