import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {ClientRepository, CollegeRepository, ProformDetailRepository, UserRepository} from '.';
import {PipsDataSource} from '../datasources';
import {Client, College, Proform, ProformDetail, ProformRelations, User} from '../models';

export class ProformRepository extends DefaultCrudRepository<
  Proform,
  typeof Proform.prototype.id,
  ProformRelations
  > {
  public readonly proformDetail: HasManyRepositoryFactory<
    ProformDetail,
    typeof ProformDetail.prototype.id
  >;
  public readonly user: BelongsToAccessor<
    User,
    typeof User.prototype.id
  >;
  public readonly college: BelongsToAccessor<
    College,
    typeof College.prototype.id
  >;
  public readonly client: BelongsToAccessor<
    Client,
    typeof Client.prototype.id
  >;
  constructor(
    @inject('datasources.pips') dataSource: PipsDataSource,
    @repository.getter('ProformDetailRepository')
    protected proformDetailRepositoryGetter: Getter<ProformDetailRepository>,
    @repository.getter('UserRepository')
    protected userRepositoryGetter: Getter<UserRepository>,
    @repository.getter('CollegeRepository')
    protected collegeRepositoryGetter: Getter<CollegeRepository>,
    @repository.getter('ClientRepository')
    protected clientRepositoryGetter: Getter<ClientRepository>,
  ) {
    super(Proform, dataSource);
    this.proformDetail = this.createHasManyRepositoryFactoryFor(
      'proformDetail',
      proformDetailRepositoryGetter,
    );
    this.registerInclusionResolver('proformDetail', this.proformDetail.inclusionResolver);

    this.user = this.createBelongsToAccessorFor(
      'user',
      userRepositoryGetter,
    );
    this.registerInclusionResolver('user', this.user.inclusionResolver);

    this.college = this.createBelongsToAccessorFor(
      'college',
      collegeRepositoryGetter,
    );
    this.registerInclusionResolver('college', this.college.inclusionResolver);

    this.client = this.createBelongsToAccessorFor(
      'client',
      clientRepositoryGetter,
    );
    this.registerInclusionResolver('client', this.client.inclusionResolver);
  }
}
