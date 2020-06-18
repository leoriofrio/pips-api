// Uncomment these imports to begin using these cool features!

import {BindingKey, inject} from '@loopback/context';
import {del, get, getModelSchemaRef, param, patch, post, requestBody} from '@loopback/rest';
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

  @post('college', {
    responses: {
      '200': {
        description: 'College model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(College)},
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(College, {exclude: ['id']}),
        },
      },
    })
    college: Omit<College, 'id'>,
  ): Promise<College> {
    return this.collegeService.create(college);
  }

  @patch('college/edit', {
    responses: {
      '204': {
        description: 'College Detail PATCH success',
      },
    },
  })
  async updateById(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(College, {partial: true}),
        },
      },
    })
    college: Omit<College, 'college_id'>,
  ): Promise<void> {
    await this.collegeService.updateById(college);
  }

  @del('college/{id}/delete', {
    responses: {
      '204': {
        description: 'College Detail DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.collegeService.deleteById(Number(id));
  }
}
