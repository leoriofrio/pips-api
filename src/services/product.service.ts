import {bind, /* inject, */ BindingScope} from '@loopback/core';
import {IsolationLevel, repository} from '@loopback/repository';
import {Product} from '../models';
import {ProductRepository} from '../repositories/product.repository';

@bind({scope: BindingScope.TRANSIENT})
export class ProductService {
  constructor(
    @repository(ProductRepository)
    public productRepository: ProductRepository,
  ) {}

  /**
   * @description Gets the list of the products
   * @returns {Promise<Product | null>}
   * @public
   */
  public async findByRegion(region: string): Promise<Product[] | null> {
    return this.productRepository.find({where: {region: region}});
  }

  async create(product: Product | any): Promise<Product> {
    if (!this.productRepository.dataSource.connected) {
      await this.productRepository.dataSource.connect();
    }
    const tr = await this.productRepository.dataSource.beginTransaction(IsolationLevel.READ_COMMITTED);

    try {

      for (const row of product) {
        row.region = 'Sierra'
        const result = await this.productRepository.create(row, {
          transaction: tr,
        });
      }

      await tr.commit();
      return product;
    } catch (error) {
      await tr.rollback();
      throw error;
    }
  }
}
