// Uncomment these imports to begin using these cool features!
import {BindingKey, inject} from '@loopback/context';
import {del, get, getModelSchemaRef, param, patch, post, requestBody} from '@loopback/rest';
import {Proform, ProformDetail} from '../models';
import {ProformService} from '../services';


export class ProformController {
  constructor(
    @inject(BindingKey.create<ProformService>('services.proform'))
    public proformService: ProformService,
  ) {}

  @get('/proform/all', {
    responses: {
      '200': {
        description: 'Proform model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(Proform)},
        },
      },
    },
  })
  async findActiveAll(): Promise<Proform[] | null> {
    return this.proformService.findActiveAll();
  }

  @get('/proform/{id}', {
    responses: {
      '200': {
        description: 'Proform model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(Proform)},
        },
      },
    },
  })
  async findProformByid(@param.path.number('id') id: number): Promise<Proform[] | null> {
    return this.proformService.findById(id);
  }

  @post('proform/create', {
    responses: {
      '200': {
        description: 'Proform model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(Proform)},
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proform, {exclude: ['id']}),
        },
      },
    })
    proform: Omit<Proform, 'id'>,
  ): Promise<Proform> {
    return this.proformService.create(proform);
  }


  @post('proform/proformDetail/', {
    responses: {
      '200': {
        description: 'Proform model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(Proform)},
        },
      },
    },
  })
  async createProformDetail(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProformDetail, {exclude: ['id']}),

        },
      },
    })
    proform: Omit<Proform, 'id'>,
    proformDetail: Omit<Proform, 'id'>[],
  ): Promise<Proform> {
    return this.proformService.createDetail(proform, proformDetail)
  }

  @patch('proform/{id}/edit', {
    responses: {
      '204': {
        description: 'Proform PATCH success',
      },
    },
  })
  async updateProformById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proform, {partial: true}),
        },
      },
    })
    proform: Omit<Proform, 'id'>,
  ): Promise<void> {
    await this.proformService.updateProformById(Number(id), proform);
  }

  @del('proform/{id}/delete', {
    responses: {
      '204': {
        description: 'Proform Detail DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.proformService.deleteById(Number(id));
  }

}
