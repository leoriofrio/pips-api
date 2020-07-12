// Uncomment these imports to begin using these cool features!

import {BindingKey, inject} from '@loopback/context';
import {del, get, getModelSchemaRef, param, patch, post, requestBody} from '@loopback/rest';
import {Price} from '../models';
import {PriceService} from '../services';

// import {inject} from '@loopback/core';


export class PriceController {
  constructor(
    @inject(BindingKey.create<PriceService>('services.price'))
    public priceService: PriceService,
  ) {}

  @get('/price/{promotion}', {
    responses: {
      '200': {
        description: 'Price model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(Price)},
        },
      },
    },
  })
  async findByPromotion(
    @param.path.string('promotion') promotion: string
  ): Promise<Price[] | null> {
    return this.priceService.findByPromotion(promotion);
  }

  @post('/price/{promotion}', {
    responses: {
      '200': {
        description: 'Price model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(Price)},
        },
      },
    },
  })
  async create(
    @param.path.string('promotion') promotion: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Price, {exclude: ['id']}),
        },
      },
    })
    price: Omit<Price, 'id'>,
  ): Promise<Price> {
    return this.priceService.create(promotion, price);
  }

  @patch('/price/{promotion}', {
    responses: {
      '204': {
        description: 'Price Detail PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('promotion') promotion: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Price, {partial: true}),
        },
      },
    })
    price: Omit<Price, 'product_id'>,
  ): Promise<void> {
    await this.priceService.updateById(promotion, price);
  }

  @del('/price/{id}', {
    responses: {
      '204': {
        description: 'Price Detail DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.priceService.deleteById(Number(id));
  }

}
