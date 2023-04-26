import { AssociateRepository } from 'artifacts/rds/core/associate.repository';
import { Op, Model } from 'sequelize';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { SearchDTO } from 'src/common/dto/search.dto';

export class AssociationBaseService<T> {
  constructor(private readonly repository: AssociateRepository) {}

  newEntity(data?: any): any {
    if (data instanceof Model) {
      return Object.assign({}, data.toJSON());
    }
    return Object.assign({}, data);
  }

  async create(view: string, dto: any): Promise<T> {
    const data = await this.repository.include(view).insert(dto);
    return this.newEntity(data);
  }

  async read(view: string, id: string): Promise<any> {
    const data = await this.repository
      .include(view)
      .where({ id: id }, 'id')
      .findOne();
    return this.newEntity(data);
  }

  async search(
    view: string,
    searchDTO: SearchDTO,
  ): Promise<ResponseDTO<any[]>> {
    this.repository.include(view);

    // pagination option
    this.repository.page(searchDTO.page, searchDTO.limit);

    // search text option
    if (searchDTO.query) {
      this.repository.where({
        name: { [Op.iLike]: `%${searchDTO.query}%` },
      });
    }
    // order by option
    if (searchDTO.orderBy) {
      if (searchDTO.orderType === 'asc') {
        this.repository.order(searchDTO.orderBy, 'ASC');
      } else {
        this.repository.order(searchDTO.orderBy, 'DESC');
      }
    }
    // date range filter option
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

    const searchDTOs: any[] = [];
    const responseDTO = new ResponseDTO<any[]>();

    if (searchDTO.count) {
      const { count, rows } = await this.repository.findAndCountAll({
        distinct: true,
      });
      responseDTO.totalItems = count;
      responseDTO.data = Object.assign(searchDTOs, rows);
    } else {
      responseDTO.data = Object.assign(
        searchDTOs,
        await this.repository.findAll(),
      );
    }
    return responseDTO;
  }

  async update(view: string, updateDTO: any): Promise<any> {
    updateDTO.updatedAt = new Date();
    const fooBarUpdated = await this.repository
      .include(view)
      .update(updateDTO, {
        where: { id: updateDTO.id },
        returning: true,
      });
    return fooBarUpdated;
  }
}
