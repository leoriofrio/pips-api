import {DefaultCrudRepository} from '@loopback/repository';
import {Client, ClientRelations} from '../models';
import {PipsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ClientRepository extends DefaultCrudRepository<
  Client,
  typeof Client.prototype.id,
  ClientRelations
> {
  constructor(
    @inject('datasources.pips') dataSource: PipsDataSource,
  ) {
    super(Client, dataSource);
  }
}
