import {BootMixin} from '@loopback/boot';
import {ApplicationConfig, BindingKey} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {RestExplorerBindings, RestExplorerComponent} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';
import {ClientService, CollegeService, PriceService, ProductService, ProformdetailService, ProformService, UserService} from './services';

export class PipsApiApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    this.setUpBindings(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }

  setUpBindings(options: any): void {
    this.bind(BindingKey.create<ProductService>('services.product')).toClass(ProductService);
    this.bind(BindingKey.create<CollegeService>('services.college')).toClass(CollegeService);
    this.bind(BindingKey.create<UserService>('services.user')).toClass(UserService);
    this.bind(BindingKey.create<ClientService>('services.client')).toClass(ClientService);
    this.bind(BindingKey.create<ProformService>('services.proform')).toClass(ProformService);
    this.bind(BindingKey.create<ProformdetailService>('services.proformDetail')).toClass(ProformdetailService);
    this.bind(BindingKey.create<PriceService>('services.price')).toClass(PriceService);
  }
}
