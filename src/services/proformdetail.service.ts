import {bind, /* inject, */ BindingScope} from '@loopback/core';
import {IsolationLevel, repository} from '@loopback/repository';
import {ProformDetail} from '../models';
import {ProformDetailRepository} from '../repositories';

@bind({scope: BindingScope.TRANSIENT})
export class ProformdetailService {
  constructor(
    @repository(ProformDetailRepository)
    public proformDetailRepository: ProformDetailRepository,
  ) {}

  /**
   * @description Gets the list of the products
   * @returns {Promise<ProformDetailRepository | null>}
   * @public
   */
  public async findActiveAll(proform_id: number): Promise<ProformDetail[] | null> {
    return this.proformDetailRepository.find({where: {proform_id: proform_id}});
  }

  /**
   * @Description Create Detail from a Proform
   * @param {ProformDetail}
   * @param {id}
   * @returns {Promise<ProformDetail>}
   * @public
   */
  async create(id: number, proformDetail: ProformDetail[] | any): Promise<ProformDetail> {
    if (!this.proformDetailRepository.dataSource.connected) {
      await this.proformDetailRepository.dataSource.connect();
    }
    const tr = await this.proformDetailRepository.dataSource.beginTransaction(IsolationLevel.READ_COMMITTED);

    try {
      for (const row of proformDetail) {
        row.proform_id = id;
        await this.proformDetailRepository.create(row, {
          transaction: tr,
        });
      }
      await tr.commit();
      return proformDetail;
    } catch (error) {
      await tr.rollback();
      throw error;
    }
  }


}
