// Uncomment these imports to begin using these cool features!

import {BindingKey, inject} from '@loopback/context';
import {get, getModelSchemaRef} from '@loopback/rest';
import {User} from '../models';
import {UserService} from '../services';


export class UserController {
  constructor(
    @inject(BindingKey.create<UserService>('services.user'))
    public userService: UserService,
  ) {}

  @get('/users', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(User)},
        },
      },
    },
  })
  async findAll(): Promise<User[] | null> {
    return this.userService.findAll();
  }
}
