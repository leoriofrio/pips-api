import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {UserWithRelations} from '.';
import {Client, ClientWithRelations} from './client.model';
import {College, CollegeWithRelations} from './college.model';
import {ProformDetail, ProformDetailRelations} from './proformdetail.model';
import {User} from './user.model';

/**
 * alter table proform add constraint FK_PROJECTS_RELATIONSHIP_USER foreign key (user_id)
      references user (ID) on delete restrict on update restrict;

 */

@model({
  name: 'proform',
  settings: {
    foreignKeys: {
      fk_project_user: {
        name: 'FK_PROJECTS_RELATIONSHIP_USER',
        entity: 'user',
        entityKey: 'id',
        foreignKey: 'user_id',
      },
      fk_project_college: {
        name: 'FK_PROJECTS_RELATIONSHIP_COLLEGE',
        entity: 'college',
        entityKey: 'id',
        foreignKey: 'college_id',
      },
      fk_project_client: {
        name: 'FK_PROJECTS_RELATIONSHIP_CLIENT',
        entity: 'client',
        entityKey: 'id',
        foreignKey: 'client_id',
      }
    }
  },
})
export class Proform extends Entity {

  constructor(data?: Partial<Proform>) {
    super(data);
  }

  @property({
    type: 'number',
    id: true,
    generated: true,
    mysql: {
      columnName: 'id',
    },
  })
  id: number;

  @property({
    type: 'string',
    required: true,
    mysql: {
      columnName: 'number_proform',
    },
  })
  number_proform: string;

  @belongsTo(() => User,
    {keyTo: 'id', name: 'user'},
    {
      type: 'number',
      required: true,
      mysql: {
        columnName: 'user_id',
      },
    })
  user_id: number;

  @belongsTo(() => College,
    {keyTo: 'id', name: 'college'},
    {
      type: 'number',
      required: true,
      mysql: {
        columnName: 'college_id',
      },
    })
  college_id: number;

  @belongsTo(() => Client,
    {keyTo: 'id', name: 'client'},
    {
      type: 'number',
      required: true,
      mysql: {
        columnName: 'client_id',
      },
    })
  client_id: number;

  @property({
    type: 'date',
    required: true,
    mysql: {
      columnName: 'date_proform',
    },
  })
  date_proform: Date;

  @property({
    type: 'date',
    required: true,
    mysql: {
      columnName: 'date_delivery',
    },
  })
  date_delivery: Date;

  @property({
    type: 'string',
    required: true,
    mysql: {
      columnName: 'type_client_sale',
    },
  })
  type_client_sale: string;

  @property({
    type: 'string',
    required: true,
    mysql: {
      columnName: 'agreement',
    },
  })
  agreement: string;

  @property({
    type: 'string',
    required: true,
    mysql: {
      columnName: 'status',
    },
  })
  status: string;

  @property({
    type: 'number',
    required: true,
    mysql: {
      columnName: 'state_number',
    },
  })
  state_number: string;

  @hasMany(() => ProformDetail, {
    keyTo: 'proform_id'
  })
  proformDetail?: ProformDetail[];

}

export interface ProformRelations {
  user: UserWithRelations;
  college: CollegeWithRelations;
  client: ClientWithRelations;
  proformDetail?: ProformDetailRelations[];
}

export type ProformWithRelations = Proform & ProformRelations;
