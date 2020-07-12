import {bind, /* inject, */ BindingScope} from '@loopback/core';
import {IsolationLevel, repository} from '@loopback/repository';
import {Price} from '../models';
import {PriceRepository} from '../repositories/price.repository';

@bind({scope: BindingScope.TRANSIENT})
export class PriceService {
  constructor(
    @repository(PriceRepository)
    public priceRepository: PriceRepository,
  ) {}

  /**
   * @description Gets the list of the products
   * @returns {Promise<Product | null>}
   * @public
   */
  public async findByPromotion(promotion: string): Promise<Price[] | null> {
    return this.priceRepository.find({where: {typePromotion: promotion}});
  }

  async create(promotion: string, price: Price | any): Promise<Price> {
    if (!this.priceRepository.dataSource.connected) {
      await this.priceRepository.dataSource.connect();
    }
    const tr = await this.priceRepository.dataSource.beginTransaction(IsolationLevel.READ_COMMITTED);

    try {

      for (const row of price) {
        row.typePromotion = promotion;
        const result = await this.priceRepository.create(row, {
          transaction: tr,
        });
      }

      await tr.commit();
      return price;
    } catch (error) {
      await tr.rollback();
      throw error;
    }
  }

  async updateById(
    promotion: string,
    price: any
  ): Promise<void> {

    return this.updateByIdBase(promotion, price, `updateById Price`);
  }

  async updateByIdBase(
    promotion: string,
    price: Price[],
    transaction: string
  ): Promise<void> {
    if (!this.priceRepository.dataSource.connected) {
      await this.priceRepository.dataSource.connect();
    }
    const tr = await this.priceRepository.dataSource.beginTransaction(IsolationLevel.READ_COMMITTED);
    try {

      for (const row of price) {
        await this.priceRepository.updateById(row.id, row, {transaction: tr});
      }

      await tr.commit();
    } catch (err) {
      await tr.rollback();
      throw err;
    }

  }

  async deleteById(id: number): Promise<void> {
    if (!this.priceRepository.dataSource.connected) {
      await this.priceRepository.dataSource.connect();
    }
    const tr = await this.priceRepository.dataSource.beginTransaction(IsolationLevel.READ_COMMITTED);
    try {
      await this.priceRepository.deleteById(id, {transaction: tr});
      await tr.commit();
    } catch (err) {
      await tr.rollback();
      throw err;
    }
  }

}
