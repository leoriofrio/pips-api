import {DefaultCrudRepository} from '@loopback/repository';
import {ProformDetail, ProformDetailRelations} from '../models';
import {PipsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ProformDetailRepository extends DefaultCrudRepository<
  ProformDetail,
  typeof ProformDetail.prototype.id,
  ProformDetailRelations
> {
  constructor(
    @inject('datasources.pips') dataSource: PipsDataSource,
  ) {
    super(ProformDetail, dataSource);
  }
}
