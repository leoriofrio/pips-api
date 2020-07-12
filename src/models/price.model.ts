import {Entity, model, property} from '@loopback/repository';

@model({
  name: 'price',
  settings: {},
})
export class Price extends Entity {

  constructor(data?: Partial<Price>) {
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
      columnName: 'typePromotion',
    },
  })
  typePromotion: string;

  @property({
    type: 'string',
    required: true,
    mysql: {
      columnName: 'cod',
    },
  })
  cod: string;

  @property({
    type: 'number',
    required: true,
    mysql: {
      columnName: 'price',
    },
  })
  price: string;
}

export interface PriceRelations {
  // describe navigational properties here
}

export type PriceWithRelations = Price & PriceRelations;
