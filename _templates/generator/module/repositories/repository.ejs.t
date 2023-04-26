---
# to: <%= action || 'app' %>/<%= name %>/repositories/<%= name %>.repository.ts
to: <%= action || 'app' %>/<%= name %>/repositories/repository.ts
---

import { Injectable } from '@nestjs/common';
import { DataTypes, Model, ModelStatic } from 'sequelize';
import { RDSService } from 'artifacts/rds/rds.service';
import { BaseRepository } from 'artifacts/rds/core/base.repository';

@Injectable()
export class <%= Name %>Repository extends BaseRepository {
  private <%= name %>Model: ModelStatic<Model>;

  constructor(private readonly rdsService: RDSService) {
    super();
  }

  protected init() {
    this.<%= name %>Model = this.rdsService
      .getRDSClient()
      .getModelBuilder()
      .define(
        '<%= name %>',
        {
          <%= Name %>Id: {
            type: DataTypes.NUMBER,
          },
          createdAt: {
            type: DataTypes.DATE,
            defaultValue: Date.now,
          },
          updatedAt: {
            type: DataTypes.DATE,
            defaultValue: Date.now,
          },
        },
        '<%= name %>s',
        true,
      );
    return this.<%= name %>Model;
  }
}
