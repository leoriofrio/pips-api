import {bind, /* inject, */ BindingScope} from '@loopback/core';
import {IsolationLevel, repository} from '@loopback/repository';
import {Proform, ProformDetail} from '../models';
import {ProformDetailRepository, ProformRepository} from '../repositories';

@bind({scope: BindingScope.TRANSIENT})
export class ProformdetailService {
  constructor(
    @repository(ProformDetailRepository)
    public proformDetailRepository: ProformDetailRepository,
    @repository(ProformRepository)
    public proformRepository: ProformRepository,
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

  async updateById(
    id: number,
    proformDetail: any
  ): Promise<void> {

    return this.updateByIdBase(id, proformDetail, `updateById Proform`);
  }

  async updateByIdBase(
    id: number,
    proformDetail: ProformDetail[],
    transaction: string
  ): Promise<void> {
    const trProform = await this.proformRepository.findOne({where: {id: id}})
    if (!this.proformDetailRepository.dataSource.connected) {
      await this.proformDetailRepository.dataSource.connect();
    }
    const tr = await this.proformDetailRepository.dataSource.beginTransaction(IsolationLevel.READ_COMMITTED);
    try {
      const objProform = new Proform();
      const numberVersion = Number(trProform?.state_number) + 1;
      objProform.state_number = numberVersion as any;
      //objProform.number_proform = trProform?.number_proform.toString() + 'C' as any;

      await this.proformRepository.updateById(id, objProform, {transaction: tr});


      for (const row of proformDetail) {
        await this.proformDetailRepository.updateById(row.id, row, {transaction: tr});
      }

      await tr.commit();
    } catch (err) {
      await tr.rollback();
      throw err;
    }

  }

  async deleteById(id: number): Promise<void> {
    if (!this.proformDetailRepository.dataSource.connected) {
      await this.proformDetailRepository.dataSource.connect();
    }
    const tr = await this.proformDetailRepository.dataSource.beginTransaction(IsolationLevel.READ_COMMITTED);
    try {
      await this.proformDetailRepository.deleteById(id, {transaction: tr});
      await tr.commit();
    } catch (err) {
      await tr.rollback();
      throw err;
    }
  }


}
