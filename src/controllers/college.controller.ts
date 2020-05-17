// Uncomment these imports to begin using these cool features!

import {BindingKey, inject} from '@loopback/context';
import {get, getModelSchemaRef, param} from '@loopback/rest';
import {College} from '../models';
import {CollegeService} from '../services';


export class CollegeController {
  constructor(
    @inject(BindingKey.create<CollegeService>('services.college'))
    public collegeService: CollegeService,
  ) {}

  @get('/college/{region}', {
    responses: {
      '200': {
        description: 'College model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(College)},
        },
      },
    },
  })
  async findByRegion(@param.path.string('region') region: string): Promise<College[] | null> {
    return this.collegeService.findByRegion(region);
  }
}
