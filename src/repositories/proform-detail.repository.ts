import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {ProductRepository} from '.';
import {PipsDataSource} from '../datasources';
import {Product, ProformDetail, ProformDetailRelations} from '../models';

export class ProformDetailRepository extends DefaultCrudRepository<
  ProformDetail,
  typeof ProformDetail.prototype.id,
  ProformDetailRelations
  > {
  public readonly product: BelongsToAccessor<
    Product,
    typeof Product.prototype.id
  >;
  constructor(
    @inject('datasources.pips') dataSource: PipsDataSource,
    @repository.getter('ProductRepository')
    protected productRepositoryGetter: Getter<ProductRepository>,
  ) {
    super(ProformDetail, dataSource);
    this.product = this.createBelongsToAccessorFor(
      'product',
      productRepositoryGetter,
    );
    this.registerInclusionResolver('product', this.product.inclusionResolver);

  }
}
