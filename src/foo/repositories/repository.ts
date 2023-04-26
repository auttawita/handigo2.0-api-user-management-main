import { Injectable } from '@nestjs/common';
import { DataTypes, Model, ModelStatic } from 'sequelize';
import { RDSService } from 'artifacts/rds/rds.service';
import { BaseRepository } from 'artifacts/rds/core/base.repository';

@Injectable()
export class FooRepository extends BaseRepository {
  private fooModel: ModelStatic<Model>;

  constructor(private readonly rdsService: RDSService) {
    super();
  }

  protected init() {
    this.fooModel = this.rdsService
      .getRDSClient()
      .getModelBuilder()
      .define(
        'foo',
        {
          someFooId: {
            type: DataTypes.NUMBER,
          },
          // value: {
          //   type: DataTypes.NUMBER,
          // },
          // unit: {
          //   type: DataTypes.STRING,
          // },
          // condition: {
          //   type: DataTypes.JSON,
          // },
          // createdAt: {
          //   type: DataTypes.DATE,
          //   defaultValue: Date.now,
          // },
          // updatedAt: {
          //   type: DataTypes.DATE,
          //   defaultValue: Date.now,
          // },
        },
        'foos',
        true,
      );
    return this.fooModel;
  }
}
