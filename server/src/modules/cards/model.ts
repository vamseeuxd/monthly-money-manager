import {Sequelize, DataTypes, Model, Optional} from 'sequelize';
import {IItem} from './interface';

export type CreationAttributes = Optional<IItem, 'id' | 'name' | 'number'>;

export class ItemModel extends Model<IItem, CreationAttributes> implements IItem {
  public id: number;
  public name: string;
  public number: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof ItemModel {
  ItemModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      number: {
        allowNull: false,
        type: DataTypes.STRING(255),
      }
    },
    {
      tableName: 'cards',
      underscored: false,
      sequelize,
    },
  );

  return ItemModel;
}
