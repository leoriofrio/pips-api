// Uncomment these imports to begin using these cool features!

import {BindingKey, inject} from '@loopback/context';
import {get, getModelSchemaRef, param, post, requestBody} from '@loopback/rest';
import {Product} from '../models';
import {ProductService} from '../services/product.service';



export class ProductController {
  constructor(
    @inject(BindingKey.create<ProductService>('services.product'))
    public productService: ProductService,
  ) {}

  @get('/product/{region}', {
    responses: {
      '200': {
        description: 'Product model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(Product)},
        },
      },
    },
  })
  async findByRegion(@param.path.string('region') region: string): Promise<Product[] | null> {
    return this.productService.findByRegion(region);
  }

  @post('product/{id}', {
    responses: {
      '200': {
        description: 'Proform model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(Product)},
        },
      },
    },
  })
  async create(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Product, {exclude: ['id']}),
        },
      },
    })
    product: Omit<Product, 'id'>,
  ): Promise<Product> {
    return this.productService.create(product);
  }


}
