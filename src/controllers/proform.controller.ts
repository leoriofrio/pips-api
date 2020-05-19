// Uncomment these imports to begin using these cool features!
import {BindingKey, inject} from '@loopback/context';
import {get, getModelSchemaRef, post, requestBody} from '@loopback/rest';
import {Proform} from '../models';
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

  @post('proform/{id}/proform', {
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

}
