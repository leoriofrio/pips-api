// Uncomment these imports to begin using these cool features!

import {BindingKey, inject} from '@loopback/context';
import {del, get, getModelSchemaRef, param, patch, post, requestBody} from '@loopback/rest';
import {Client} from '../models';
import {ClientService} from '../services';


export class ClientController {
  constructor(
    @inject(BindingKey.create<ClientService>('services.client'))
    public clientService: ClientService,
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
    return this.clientService.findAllClient();
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
    return this.clientService.findActiveClient();
  }

  @post('/client', {
    responses: {
      '200': {
        description: 'Client model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(Client)},
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Client, {exclude: ['id']}),
        },
      },
    })
    client: Omit<Client, 'id'>,
  ): Promise<Client> {
    return this.clientService.create(client);
  }

  @patch('/client/edit', {
    responses: {
      '204': {
        description: 'Client Detail PATCH success',
      },
    },
  })
  async updateById(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Client, {partial: true}),
        },
      },
    })
    client: Omit<Client, 'client_id'>,
  ): Promise<void> {
    await this.clientService.updateById(client);
  }

  @del('/client/{id}/delete', {
    responses: {
      '204': {
        description: 'Product Detail DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.clientService.deleteById(Number(id));
  }
}
