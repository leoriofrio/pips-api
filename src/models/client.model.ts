import {Entity, model, property} from '@loopback/repository';

@model({
  name: 'client',
  settings: {},
})
export class Client extends Entity {

  constructor(data?: Partial<Client>) {
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
      columnName: 'codClient',
    },
  })
  codClient: string;

  @property({
    type: 'string',
    required: true,
    mysql: {
      columnName: 'province',
    },
  })
  province: string;

  @property({
    type: 'string',
    required: true,
    mysql: {
      columnName: 'city',
    },
  })
  city: string;

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
      columnName: 'nickName',
    },
  })
  nickName: string;

  @property({
    type: 'string',
    required: true,
    mysql: {
      columnName: 'type',
    },
  })
  type: string;


  @property({
    type: 'string',
    required: true,
    mysql: {
      columnName: 'status',
    },
  })
  status: string;
}

export interface ClientRelations {
  // describe navigational properties here
}

export type ClientWithRelations = Client & ClientRelations;
