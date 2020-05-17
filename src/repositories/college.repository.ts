import {DefaultCrudRepository} from '@loopback/repository';
import {College, CollegeRelations} from '../models';
import {PipsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CollegeRepository extends DefaultCrudRepository<
  College,
  typeof College.prototype.id,
  CollegeRelations
> {
  constructor(
    @inject('datasources.pips') dataSource: PipsDataSource,
  ) {
    super(College, dataSource);
  }
}
