import {bind, /* inject, */ BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {AppLabels} from '../appKeys';
import {Client} from '../models';
import {ClientRepository} from '../repositories';

@bind({scope: BindingScope.TRANSIENT})
export class ClientService {
  constructor(
    @repository(ClientRepository)
    public clientRepository: ClientRepository,
  ) {}

  /**
   * @description Gets the list of the client
   * @returns {Promise<Client | null>}
   * @public
   */
  public async findActiveClient(): Promise<Client[] | null> {
    return this.clientRepository.find({where: {status: AppLabels.statusLabel}});
  }

  /**
   * @description Gets the list of the client
   * @returns {Promise<Client | null>}
   * @public
   */
  public async findAllClient(): Promise<Client[] | null> {
    return this.clientRepository.find();
  }
}
