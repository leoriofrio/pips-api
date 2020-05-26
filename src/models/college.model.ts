import {Entity, hasMany, model, property} from '@loopback/repository';
import {Proform, ProformRelations} from './proform.model';

@model({
  name: 'college',
  settings: {},
})
export class College extends Entity {

  constructor(data?: Partial<College>) {
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
      columnName: 'codSantillana',
    },
  })
  codSantillana: string;

  @property({
    type: 'string',
    required: true,
    mysql: {
      columnName: 'codInstituto',
    },
  })
  codInstituto: string;

  @property({
    type: 'string',
    required: true,
    mysql: {
      columnName: 'status',
    },
  })
  status: string;

  @property({
    type: 'string',
    required: true,
    mysql: {
      columnName: 'delegateText',
    },
  })
  delegateText: string;

  @property({
    type: 'string',
    required: true,
    mysql: {
      columnName: 'delegateEnglish',
    },
  })
  delegateEnglish: string;

  @property({
    type: 'string',
    required: true,
    mysql: {
      columnName: 'delegateShared',
    },
  })
  delegateShared: string;

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
      columnName: 'canton',
    },
  })
  canton: string;

  @property({
    type: 'string',
    required: true,
    mysql: {
      columnName: 'parish',
    },
  })
  parish: string;

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
      columnName: 'address',
    },
  })
  address: string;

  @property({
    type: 'string',
    required: true,
    mysql: {
      columnName: 'nivel',
    },
  })
  nivel: string;

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
      columnName: 'schoolSystem',
    },
  })
  schoolSystem: string;

  @property({
    type: 'string',
    required: true,
    mysql: {
      columnName: 'modality',
    },
  })
  modality: string;

  @property({
    type: 'string',
    required: true,
    mysql: {
      columnName: 'schoolDay',
    },
  })
  schoolDay: string;

  @property({
    type: 'string',
    required: true,
    mysql: {
      columnName: 'region',
    },
  })
  region: string;

  @hasMany(() => Proform, {
    keyTo: 'college_id'
  })
  proform?: Proform[];


}

export interface CollegeRelations {
  // describe navigational properties here
  proform?: ProformRelations[];
}

export type CollegeWithRelations = College & CollegeRelations;


