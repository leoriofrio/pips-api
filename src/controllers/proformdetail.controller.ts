// Uncomment these imports to begin using these cool features!

import {BindingKey, inject} from '@loopback/core';
import {del, getModelSchemaRef, param, patch, post, requestBody} from '@loopback/rest';
import {ProformDetail} from '../models';
import {ProformdetailService} from '../services';

// import {inject} from '@loopback/context';


export class ProformdetailController {
  constructor(
    @inject(BindingKey.create<ProformdetailService>('services.proformDetail'))
    public proformDetailService: ProformdetailService,
  ) {}

  @post('/proform/{id}/proformDetail', {
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

  @patch('/proform/{id}/proformDetail/edit', {
    responses: {
      '204': {
        description: 'Proform Detail PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProformDetail, {partial: true}),
        },
      },
    })
    proformDetail: Omit<ProformDetail, 'proform_id'>,
  ): Promise<void> {
    await this.proformDetailService.updateById(Number(id), proformDetail);
  }

  @del('/proform/{proformId}/proformDetail/{id}/delete', {
    responses: {
      '204': {
        description: 'Proform Detail DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('proformId') proformId: string,
    @param.path.string('id') id: string): Promise<void> {
    await this.proformDetailService.deleteById(Number(id));
  }
}
