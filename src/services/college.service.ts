import {bind, /* inject, */ BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
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
}
