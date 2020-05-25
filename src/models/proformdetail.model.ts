import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Product, ProductWithRelations} from './product.model';
import {Proform, ProformWithRelations} from './proform.model';

@model({
  name: 'proform_detail',
  settings: {
    foreignKeys: {
      fk_project_proform: {
        name: 'FK_PROJECTS_RELATIONSHIP_PROFORM',
        entity: 'proform',
        entityKey: 'id',
        foreignKey: 'proform_id',
      },
      fk_project_product: {
        name: 'FK_PROJECTS_RELATIONSHIP_PRODUCT',
        entity: 'product',
        entityKey: 'id',
        foreignKey: 'product_id',
      }
    }
  },
})
export class ProformDetail extends Entity {

  constructor(data?: Partial<ProformDetail>) {
    super(data);
  }

  @property({
    type: 'number',
    id: true,
    generated: true,
    mysql: {
      columnName: 'id',
    },
  })
  id: number;

  @property({
    type: 'string',
    jsonSchema: {nullable: true},
    mysql: {
      columnName: 'degree',
    },
  })
  degree: string;

  @property({
    type: 'number',
    required: true,
    mysql: {
      columnName: 'quantity',
    },
  })
  quantity: string;

  @property({
    type: 'number',
    required: true,
    mysql: {
      columnName: 'price',
    },
  })
  price: string;

  @property({
    type: 'number',
    jsonSchema: {nullable: true},
    mysql: {
      columnName: 'sale_direct',
    },
  })
  sale_direct: string;

  @property({
    type: 'number',
    jsonSchema: {nullable: true},
    mysql: {
      columnName: 'sale_external_library',
    },
  })
  sale_external_library: string;

  @property({
    type: 'number',
    jsonSchema: {nullable: true},
    mysql: {
      columnName: 'sale_event',
    },
  })
  sale_event: string;

  @property({
    type: 'number',
    jsonSchema: {nullable: true},
    mysql: {
      columnName: 'sale_teacher',
    },
  })
  sale_teacher: string;

  @property({
    type: 'number',
    jsonSchema: {nullable: true},
    mysql: {
      columnName: 'sale_infrastructure',
    },
  })
  sale_infrastructure: string;

  @property({
    type: 'number',
    jsonSchema: {nullable: true},
    mysql: {
      columnName: 'sale_scholarships',
    },
  })
  sale_scholarships: string;

  @property({
    type: 'number',
    jsonSchema: {nullable: true},
    mysql: {
      columnName: 'sale_staff',
    },
  })
  sale_staff: string;

  @property({
    type: 'number',
    jsonSchema: {nullable: true},
    mysql: {
      columnName: 'sale_training',
    },
  })
  sale_training: string;

  @belongsTo(() => Proform,
    {keyTo: 'id', name: 'proform'},
    {
      type: 'number',
      required: true,
      mysql: {
        columnName: 'proform_id',
      },
    })
  proform_id: number;

  @belongsTo(() => Product,
    {keyTo: 'id', name: 'product'},
    {
      type: 'number',
      required: true,
      mysql: {
        columnName: 'product_id',
      },
    })
  product_id: number;

}

export interface ProformDetailRelations {
  // describe navigational properties here
  proform: ProformWithRelations;
  product: ProductWithRelations;
}

export type ProformDetailWithRelations = ProformDetail & ProformDetailRelations;
