import DB from '@databases';
import {HttpException} from '@exceptions/HttpException';
import {IItem} from './interface';
import {isEmpty} from '@utils/util';
import {CreateDto} from "./dto";
import {Op} from "sequelize";
import {itemName} from "./config";


class ItemService {
  public items = DB.Cards;

  public async findAllItem(): Promise<IItem[]> {
    const allItem: IItem[] = await this.items.findAll();
    return allItem;
  }

  public async findItemById(itemId: number): Promise<IItem> {
    if (isEmpty(itemId)) throw new HttpException(400, `${itemName} Id is empty`);

    const findItem: IItem = await this.items.findByPk(itemId);
    if (!findItem) throw new HttpException(409, `${itemName} doesn't exist`);

    return findItem;
  }

  public async createItem(itemData: CreateDto): Promise<IItem> {
    if (isEmpty(itemData)) throw new HttpException(400, `${itemName} Data is empty`);

    const findItem: IItem = await this.items.findOne({where: {number: itemData.number}});
    if (findItem) throw new HttpException(409, `This ${itemName} number ${itemData.number} already exists`);
    const createUserData: IItem = await this.items.create({...itemData});
    return createUserData;
  }

  public async updateItem(itemId: number, itemData: CreateDto): Promise<IItem> {
    if (isEmpty(itemData)) throw new HttpException(400, `${itemName} Data is empty`);
    const duplicateItem: IItem = await this.items.findOne({where: {number: itemData.number, id: {[Op.ne]: itemId}}});
    if (duplicateItem) throw new HttpException(409, `This ${itemName} number ${itemData.number} already exists`);

    const findItem: IItem = await this.items.findByPk(itemId);
    if (!findItem) throw new HttpException(409, `${itemName} doesn't exist`);

    await this.items.update({...itemData}, {where: {id: itemId}});

    const updateItem: IItem = await this.items.findByPk(itemId);
    return updateItem;
  }

  public async deleteItem(itemId: number): Promise<IItem> {
    if (isEmpty(itemId)) throw new HttpException(400, `${itemName} doesn't existId`);

    const findItem: IItem = await this.items.findByPk(itemId);
    if (!findItem) throw new HttpException(409, `${itemName} doesn't exist`);

    await this.items.destroy({where: {id: itemId}});

    return findItem;
  }
}

export default ItemService;
