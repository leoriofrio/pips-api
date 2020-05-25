import {bind, /* inject, */ BindingScope} from '@loopback/core';
import {IsolationLevel, repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import * as _ from 'lodash';
import {AppStatusForm} from '../appKeys';
import {Client, College, Proform, User} from '../models';
import {ProformRepository} from '../repositories';

@bind({scope: BindingScope.TRANSIENT})
export class ProformService {
  constructor(
    @repository(ProformRepository)
    public proformRepository: ProformRepository,
  ) {}

  /**
   * @description Gets the list of the products
   * @returns {Promise<ProformRepository | null>}
   * @public
   */
  public async findActiveAll(): Promise<Proform[] | null> {
    return this.proformRepository.find({where: {status: AppStatusForm.active}});
  }

  /**
   * @description Gets a project by Id
   * @returns {Promise<ProformRepository | null>}
   * @public
   */
  public async findById(id: number): Promise<Proform[] | null> {
    return this.proformRepository.find({where: {id: id}, include: [{relation: 'proformDetail'}]});
  }

  /**
   * @Description Create a Proform
   * @param {proform}
   * @returns {Promise<Proform>}
   * @public
   */
  async create(proform: Proform | any): Promise<Proform> {
    /*
    if (await this.proformRepository.findOne({where: {id: proform.id}})) {
      throw new HttpErrors.UnprocessableEntity('The project Id is inserted');
    }
    */

    if (!this.proformRepository.dataSource.connected) {
      await this.proformRepository.dataSource.connect();
    }
    const tr = await this.proformRepository.dataSource.beginTransaction(IsolationLevel.READ_COMMITTED);

    try {

      const result = await this.proformRepository.create(proform, {
        transaction: tr,
      });
      await tr.commit();
      return result;
    } catch (error) {
      await tr.rollback();
      throw error;
    }
  }

  /**
   * @Description Create a Proform Detail
   * @param {proform}
   * @returns {Promise<Proform>}
   * @public
   */
  async createDetail(proform: Proform | any, data: any): Promise<Proform> {
    if (await this.proformRepository.findOne({where: {id: proform.id}})) {
      throw new HttpErrors.UnprocessableEntity('The project Id is inserted');
    }

    if (!this.proformRepository.dataSource.connected) {
      await this.proformRepository.dataSource.connect();
    }
    const tr = await this.proformRepository.dataSource.beginTransaction(IsolationLevel.READ_COMMITTED);

    try {
      const result = await this.proformRepository.create(proform, {transaction: tr, });
      for (const row of data) {
        console.log(row);
      }
      await tr.commit();
      return result;
    } catch (error) {
      await tr.rollback();
      throw error;
    }
  }

  matchUser(userName: string, user: User[]): User | undefined {
    let userSel = _.find(user, (x) => x.name === userName);
    if (_.isNil(userSel)) {
      userSel = _.find(user, (x) => x.id === 1);
    }
    return userSel;

  }

  matchCollege(collegeName: string, college: College[]): College | undefined {
    let collegeSel = _.find(college, (x) => x.name === collegeName);
    if (_.isNil(collegeSel)) {
      collegeSel = _.find(college, (x) => x.id === 1);
    }
    return collegeSel;

  }

  matchClient(clientName: string, client: Client[]): Client | undefined {
    let clientSel = _.find(client, (x) => x.name === clientName);
    if (_.isNil(clientSel)) {
      clientSel = _.find(client, (x) => x.id === 1);
    }
    return clientSel;

  }

  createProform(row: any) {
    const proform = new Proform();

    console.log(row);

    /*
        proformDetail.price =

        project.applId = row[QVRCuratedColumns.APPL_ID];

        project.pcc = row[QVRCuratedColumns.PCC];


        project.recCutTotD = 0;
        project.recCutTotP = 0;
        project.awdAmt = 0;
    */
    return proform;
  }


}
