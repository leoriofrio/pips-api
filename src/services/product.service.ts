import {bind, /* inject, */ BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Product} from '../models';
import {ProductRepository} from '../repositories/product.repository';

@bind({scope: BindingScope.TRANSIENT})
export class ProductService {
  constructor(
    @repository(ProductRepository)
    public productRepository: ProductRepository,
  ) {}

  /**
   * @description Gets the current pay plan period
   * @returns {Promise<Product | null>}
   * @public
   */
  public async findByRegion(region: string): Promise<Product[] | null> {
    return this.productRepository.find({where: {region: region}});
  }
}
