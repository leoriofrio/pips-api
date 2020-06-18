import {bind, /* inject, */ BindingScope} from '@loopback/core';
import {IsolationLevel, repository} from '@loopback/repository';
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

  async create(client: Client | any): Promise<Client> {
    if (!this.clientRepository.dataSource.connected) {
      await this.clientRepository.dataSource.connect();
    }
    const tr = await this.clientRepository.dataSource.beginTransaction(IsolationLevel.READ_COMMITTED);

    try {

      for (const row of client) {
        const result = await this.clientRepository.create(row, {
          transaction: tr,
        });
      }

      await tr.commit();
      return client;
    } catch (error) {
      await tr.rollback();
      throw error;
    }
  }

  async updateById(
    client: any
  ): Promise<void> {

    return this.updateByIdBase(client, `updateById Client`);
  }

  async updateByIdBase(
    client: Client[],
    transaction: string
  ): Promise<void> {
    if (!this.clientRepository.dataSource.connected) {
      await this.clientRepository.dataSource.connect();
    }
    const tr = await this.clientRepository.dataSource.beginTransaction(IsolationLevel.READ_COMMITTED);
    try {

      for (const row of client) {
        await this.clientRepository.updateById(row.id, row, {transaction: tr});
      }

      await tr.commit();
    } catch (err) {
      await tr.rollback();
      throw err;
    }

  }

  async deleteById(id: number): Promise<void> {
    if (!this.clientRepository.dataSource.connected) {
      await this.clientRepository.dataSource.connect();
    }
    const tr = await this.clientRepository.dataSource.beginTransaction(IsolationLevel.READ_COMMITTED);
    try {
      await this.clientRepository.deleteById(id, {transaction: tr});
      await tr.commit();
    } catch (err) {
      await tr.rollback();
      throw err;
    }
  }
}
