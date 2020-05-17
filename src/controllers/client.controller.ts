// Uncomment these imports to begin using these cool features!

import {BindingKey, inject} from '@loopback/context';
import {get, getModelSchemaRef} from '@loopback/rest';
import {Client} from '../models';
import {ClientService} from '../services';


export class ClientController {
  constructor(
    @inject(BindingKey.create<ClientService>('services.client'))
    public userService: ClientService,
  ) {}

  @get('/client/all', {
    responses: {
      '200': {
        description: 'Client model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(Client)},
        },
      },
    },
  })
  async findAll(): Promise<Client[] | null> {
    return this.userService.findAllClient();
  }

  @get('/client/active', {
    responses: {
      '200': {
        description: 'Client model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(Client)},
        },
      },
    },
  })
  async findActiveClient(): Promise<Client[] | null> {
    return this.userService.findActiveClient();
  }
}
