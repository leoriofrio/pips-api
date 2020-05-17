import {Entity, model, property} from '@loopback/repository';

@model({
  name: 'user',
  settings: {},
})
export class User extends Entity {

  constructor(data?: Partial<User>) {
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
      columnName: 'codUser',
    },
  })
  codUser: string;

  @property({
    type: 'string',
    required: true,
    mysql: {
      columnName: 'region',
    },
  })
  region: string;

  @property({
    type: 'string',
    required: true,
    mysql: {
      columnName: 'name',
    },
  })
  name: string;

  @property({
    type: 'string',
    required: true,
    mysql: {
      columnName: 'userName',
    },
  })
  userName: string;

  @property({
    type: 'string',
    required: true,
    mysql: {
      columnName: 'password',
    },
  })
  password: string;

  @property({
    type: 'string',
    required: true,
    mysql: {
      columnName: 'zone',
    },
  })
  zone: string;

  @property({
    type: 'string',
    required: true,
    mysql: {
      columnName: 'phone',
    },
  })
  phone: string;

  @property({
    type: 'string',
    required: true,
    mysql: {
      columnName: 'mail',
    },
  })
  mail: string;

  @property({
    type: 'string',
    required: true,
    mysql: {
      columnName: 'position',
    },
  })
  position: string;

  @property({
    type: 'string',
    required: true,
    mysql: {
      columnName: 'status',
    },
  })
  status: string;


}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
