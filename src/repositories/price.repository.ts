import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PipsDataSource} from '../datasources';
import {Price, PriceRelations} from '../models';

export class PriceRepository extends DefaultCrudRepository<
  Price,
  typeof Price.prototype.id,
  PriceRelations
  > {
  constructor(
    @inject('datasources.pips') dataSource: PipsDataSource,
  ) {
    super(Price, dataSource);
  }
}
