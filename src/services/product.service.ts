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

  async updateById(
    id: number,
    product: any
  ): Promise<void> {

    return this.updateByIdBase(id, product, `updateById Product`);
  }

  async updateByIdBase(
    id: number,
    product: Product[],
    transaction: string
  ): Promise<void> {
    if (!this.productRepository.dataSource.connected) {
      await this.productRepository.dataSource.connect();
    }
    const tr = await this.productRepository.dataSource.beginTransaction(IsolationLevel.READ_COMMITTED);
    try {

      for (const row of product) {
        await this.productRepository.updateById(row.id, row, {transaction: tr});
      }

      await tr.commit();
    } catch (err) {
      await tr.rollback();
      throw err;
    }

  }

  async deleteById(id: number): Promise<void> {
    if (!this.productRepository.dataSource.connected) {
      await this.productRepository.dataSource.connect();
    }
    const tr = await this.productRepository.dataSource.beginTransaction(IsolationLevel.READ_COMMITTED);
    try {
      await this.productRepository.deleteById(id, {transaction: tr});
      await tr.commit();
    } catch (err) {
      await tr.rollback();
      throw err;
    }
  }
}
