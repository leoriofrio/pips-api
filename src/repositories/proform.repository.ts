import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {ProformDetailRepository} from '.';
import {PipsDataSource} from '../datasources';
import {Proform, ProformDetail, ProformRelations} from '../models';

export class ProformRepository extends DefaultCrudRepository<
  Proform,
  typeof Proform.prototype.id,
  ProformRelations
  > {
  public readonly proformDetail: HasManyRepositoryFactory<
    ProformDetail,
    typeof ProformDetail.prototype.id
  >;
  constructor(
    @inject('datasources.pips') dataSource: PipsDataSource,
    @repository.getter('ProformDetailRepository')
    protected proformDetailRepositoryGetter: Getter<ProformDetailRepository>,
  ) {
    super(Proform, dataSource);
    this.proformDetail = this.createHasManyRepositoryFactoryFor(
      'proformDetail',
      proformDetailRepositoryGetter,
    );
    this.registerInclusionResolver('proformDetail', this.proformDetail.inclusionResolver);
  }
}
