// Uncomment these imports to begin using these cool features!

import {BindingKey, inject} from '@loopback/core';
import {getModelSchemaRef, param, post, requestBody} from '@loopback/rest';
import {ProformDetail} from '../models';
import {ProformdetailService} from '../services';

// import {inject} from '@loopback/context';


export class ProformdetailController {
  constructor(
    @inject(BindingKey.create<ProformdetailService>('services.proformDetail'))
    public proformDetailService: ProformdetailService,
  ) {}

  @post('proform/{id}/proformDetail', {
    responses: {
      '200': {
        description: 'Proform model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(ProformDetail)},
        },
      },
    },
  })
  async create(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProformDetail, {exclude: ['id']}),
        },
      },
    })
    proformDetail: Omit<ProformDetail, 'id'>,
  ): Promise<ProformDetail> {
    return this.proformDetailService.create(Number(id), proformDetail);
  }
}
