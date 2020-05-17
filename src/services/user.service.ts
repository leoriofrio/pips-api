import {bind, /* inject, */ BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {AppLabels} from '../appKeys';
import {User} from '../models';
import {UserRepository} from '../repositories';

@bind({scope: BindingScope.TRANSIENT})
export class UserService {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) {}

  /**
   * @description Gets the list of the users
   * @returns {Promise<User | null>}
   * @public
   */
  public async findAll(): Promise<User[] | null> {
    return this.userRepository.find({where: {status: AppLabels.statusLabel}});
  }
}
