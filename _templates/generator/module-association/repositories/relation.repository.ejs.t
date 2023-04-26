---
# to: <%= action || 'app' %>/<%= name %>/repositories/<%= main %>-<%= sub %>.relation.repository.ts
to: <%= action || 'app' %>/<%= name %>/repositories/relation.repository.ts
---

import { Injectable } from '@nestjs/common';
import { DataTypes, Model, ModelStatic } from 'sequelize';
import { RDSService } from 'artifacts/rds/rds.service';
import { BaseRepository } from 'artifacts/rds/core/base.repository';

@Injectable()
export class <%= main %><%= sub %>RelationRepository extends BaseRepository {
  private <%= main %><%= sub %>RelationModel: ModelStatic<Model>;

  constructor(private readonly rdsService: RDSService) {
    super();
  }

  protected init() {
    this.<%= main %><%= sub %>RelationModel = this.rdsService
      .getRDSClient()
      .getModelBuilder()
      .define(
        '<%= main %><%= sub %>Relation',
        {
          <%= main %>Id: {
            type: DataTypes.INTEGER,
          },
          <%= sub %>Id: {
            type: DataTypes.INTEGER,
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
        '<%= main %>_<%= sub %>_relations',
        true,
      );
    return this.<%= main %><%= sub %>RelationModel;
  }
}
