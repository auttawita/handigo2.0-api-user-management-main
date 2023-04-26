import { BaseRepository } from 'artifacts/rds/core/base.repository';
import { ICRUDService } from 'artifacts/rds/core/common/interfaces/interface.crud.service';
import { Op, Model } from 'sequelize';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { SearchDTO } from 'src/common/dto/search.dto';

export class BaseService<T> implements ICRUDService<T, void> {
  constructor(private readonly repository: BaseRepository) {}

  newEntity(data?: any): any {
    if (data instanceof Model) {
      return Object.assign({}, data.toJSON());
    }
    return Object.assign({}, data);
  }

  async create(dto: T): Promise<T> {
    const data = await this.repository.insert(dto);
    return this.newEntity(data);
  }

  async read(id: string): Promise<T> {
    const data = await this.repository.where({ id: id }, 'id').findOne();
    return this.newEntity(data);
  }

  async search(searchDTO: SearchDTO): Promise<ResponseDTO<T[]>> {
    this.repository.page(searchDTO.page, searchDTO.limit);

    if (searchDTO.query) {
      this.repository.where({
        name: { [Op.iLike]: `%${searchDTO.query}%` },
      });
    }
    if (searchDTO.orderBy) {
      if (searchDTO.orderType === 'asc') {
        this.repository.order(searchDTO.orderBy, 'ASC');
      } else {
        this.repository.order(searchDTO.orderBy, 'DESC');
      }
    }
    if (searchDTO.between && searchDTO.betweenDate) {
      const betweenCondition = {};
      betweenCondition[searchDTO.between] = {
        [Op.between]: [
          new Date(searchDTO.getStartDate()).toUTCString(),
          new Date(searchDTO.getEndDate()).toUTCString(),
        ],
      };
      this.repository.where(betweenCondition);
    }

    const fooDTOs: T[] = [];
    const responseDTO = new ResponseDTO<T[]>();

    if (searchDTO.count) {
      const { count, rows } = await this.repository.findAndCountAll({
        distinct: true,
      });
      responseDTO.totalItems = count;
      responseDTO.data = Object.assign(fooDTOs, rows);
    } else {
      responseDTO.data = Object.assign(
        fooDTOs,
        await this.repository.findAll(),
      );
    }
    return responseDTO;
  }

  async update(updateDTO: any): Promise<T> {
    updateDTO.updatedAt = new Date();
    const dataUpdated = await this.repository.update(updateDTO, {
      where: { id: updateDTO.id },
      returning: true,
    });
    return this.newEntity(dataUpdated[1][0]);
  }

  async delete(id: string): Promise<any> {
    return {
      deleteCount: await this.repository.where({ id: id }).delete(),
    };
  }
}
