import {Entity, hasMany, model, property} from '@loopback/repository';
import {ProformDetail, ProformDetailRelations} from './proformdetail.model';

@model({
  name: 'product',
  settings: {},
})
export class Product extends Entity {

  constructor(data?: Partial<Product>) {
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
      columnName: 'cod',
    },
  })
  cod: string;

  @property({
    type: 'string',
    required: true,
    mysql: {
      columnName: 'subline',
    },
  })
  subline: string;

  @property({
    type: 'string',
    required: true,
    mysql: {
      columnName: 'description',
    },
  })
  description: string;

  @property({
    type: 'string',
    required: true,
    mysql: {
      columnName: 'serie',
    },
  })
  serie: string;

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
      columnName: 'degree',
    },
  })
  degree: string;

  @property({
    type: 'string',
    required: true,
    mysql: {
      columnName: 'businessLine',
    },
  })
  businessLine: string;

  @property({
    type: 'string',
    required: true,
    mysql: {
      columnName: 'isbn',
    },
  })
  isbn: string;

  @property({
    type: 'string',
    required: true,
    mysql: {
      columnName: 'region',
    },
  })
  region: string;

  @hasMany(() => ProformDetail, {
    keyTo: 'product_id'
  })
  proformDetail?: ProformDetail[];

}

export interface ProductRelations {
  // describe navigational properties here
  proformDetail?: ProformDetailRelations[];
}

export type ProductWithRelations = Product & ProductRelations;
