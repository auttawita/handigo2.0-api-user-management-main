---
# to: <%= action || 'app' %>/<%= name %>/repositories/<%= main %>-<%= sub %>.repository.ts
to: <%= action || 'app' %>/<%= name %>/repositories/repository.ts
---

import { Injectable } from '@nestjs/common';
import { AssociateRepository } from 'artifacts/rds/core/associate.repository';
import { <%= sub %>Repository } from 'src/<%= sub %>/repositories/repository';
import { <%= main %>Repository } from 'src/<%= main %>/repositories/repository';
import { <%= main %><%= sub %>RelationRepository } from './relation.repository';

export enum VIEW {
  <%= main.toUpperCase() %>_<%= sub.toUpperCase() %> = '<%= main %>-<%= sub %>',
  <%= sub.toUpperCase() %>_<%= main.toUpperCase() %> = '<%= sub %>-<%= main %>',
}

@Injectable()
export class <%= main %><%= sub %>Repository extends AssociateRepository {
  constructor(
    private readonly <%= main %>Repository: <%= main %>Repository,
    private readonly <%= sub %>Repository: <%= sub %>Repository,
    private readonly <%= main %><%= sub %>RelationRepository: <%= main %><%= sub %>RelationRepository,
  ) {
    super();
  }

  protected init() {
    return this.<%= main %>Repository.getModel();
  }

  // Override include method for model selection;
  include(view: string): AssociateRepository {
    if (view === VIEW.<%= main.toUpperCase() %>_<%= sub.toUpperCase() %>) {
      this.model = this.<%= main %>Repository.getModel();
    } else if (view === VIEW.<%= sub.toUpperCase() %>_<%= main.toUpperCase() %>) {
      this.model = this.<%= sub %>Repository.getModel();
    } else {
      this.model = this.init();
    }
    return super.include(view);
  }

  get<%= main %>Repository() {
    return this.<%= main %>Repository;
  }

  get<%= sub %>Repository() {
    return this.<%= sub %>Repository;
  }

  get<%= main %><%= sub %>RelationRepository() {
    return this.<%= main %><%= sub %>RelationRepository;
  }

  protected setupAssociation(associateFetch: Map<string, any>): void {
    // re init because need to wait until root repository init model
    // this.model = this.init();

    this.<%= main %>Repository.getModel().belongsToMany(this.<%= sub %>Repository.getModel(), {
      through: '<%= main %>_<%= sub %>_relations',
      as: '<%= h.inflection.pluralize(sub) %>',
    });

    this.<%= sub %>Repository.getModel().belongsToMany(this.<%= main %>Repository.getModel(), {
      through: '<%= main %>_<%= sub %>_relations',
    });

    associateFetch.set(VIEW.<%= main.toUpperCase() %>_<%= sub.toUpperCase() %>, [
      {
        model: this.<%= sub %>Repository.getModel(),
        as: '<%= h.inflection.pluralize(sub) %>',
        through: {
          // attributes: [], // without pivot table
          as: '<%= main %><%= sub %>Relations',
        },
      },
    ]);

    associateFetch.set(VIEW.<%= sub.toUpperCase() %>_<%= main.toUpperCase() %>, [
      {
        model: this.<%= main %>Repository.getModel(),
        as: '<%= h.inflection.pluralize(main) %>',
        through: {
          // attributes: [], // without pivot table
          as: '<%= main %><%= sub %>Relations',
        },
      },
    ]);
  }
}
