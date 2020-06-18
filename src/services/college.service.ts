import {bind, /* inject, */ BindingScope} from '@loopback/core';
import {IsolationLevel, repository} from '@loopback/repository';
import {College} from '../models';
import {CollegeRepository} from '../repositories';

@bind({scope: BindingScope.TRANSIENT})
export class CollegeService {
  constructor(
    @repository(CollegeRepository)
    public collegeRepository: CollegeRepository,
  ) {}

  /**
   * @description Gets the list of the colleges
   * @returns {Promise<College | null>}
   * @public
   */
  public async findByRegion(region: string): Promise<College[] | null> {
    return this.collegeRepository.find({where: {region: region}});
  }

  async create(college: College | any): Promise<College> {
    if (!this.collegeRepository.dataSource.connected) {
      await this.collegeRepository.dataSource.connect();
    }
    const tr = await this.collegeRepository.dataSource.beginTransaction(IsolationLevel.READ_COMMITTED);

    try {

      for (const row of college) {
        row['region'] = 'Sierra';
        const result = await this.collegeRepository.create(row, {
          transaction: tr,
        });
      }

      await tr.commit();
      return college;
    } catch (error) {
      await tr.rollback();
      throw error;
    }
  }

  async updateById(
    college: any
  ): Promise<void> {

    return this.updateByIdBase(college, `updateById College`);
  }

  async updateByIdBase(
    college: College[],
    transaction: string
  ): Promise<void> {
    if (!this.collegeRepository.dataSource.connected) {
      await this.collegeRepository.dataSource.connect();
    }
    const tr = await this.collegeRepository.dataSource.beginTransaction(IsolationLevel.READ_COMMITTED);
    try {

      for (const row of college) {
        await this.collegeRepository.updateById(row.id, row, {transaction: tr});
      }

      await tr.commit();
    } catch (err) {
      await tr.rollback();
      throw err;
    }

  }

  async deleteById(id: number): Promise<void> {
    if (!this.collegeRepository.dataSource.connected) {
      await this.collegeRepository.dataSource.connect();
    }
    const tr = await this.collegeRepository.dataSource.beginTransaction(IsolationLevel.READ_COMMITTED);
    try {
      await this.collegeRepository.deleteById(id, {transaction: tr});
      await tr.commit();
    } catch (err) {
      await tr.rollback();
      throw err;
    }
  }
}
