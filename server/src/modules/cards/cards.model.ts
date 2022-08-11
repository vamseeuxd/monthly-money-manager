import {Sequelize, DataTypes, Model, Optional} from 'sequelize';
import {Card} from '@/modules/cards/cards.interface';

export type CardCreationAttributes = Optional<Card, 'id' | 'name' | 'number'>;

export class CardModel extends Model<Card, CardCreationAttributes> implements Card {
  public id: number;
  public name: string;
  public number: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof CardModel {
  CardModel.init(
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

  return CardModel;
}
