import {DefaultCrudRepository} from '@loopback/repository';
import {Proform, ProformRelations} from '../models';
import {PipsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ProformRepository extends DefaultCrudRepository<
  Proform,
  typeof Proform.prototype.id,
  ProformRelations
> {
  constructor(
    @inject('datasources.pips') dataSource: PipsDataSource,
  ) {
    super(Proform, dataSource);
  }
}
