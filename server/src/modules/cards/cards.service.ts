import {hash} from 'bcrypt';
import DB from '@databases';
import {HttpException} from '@exceptions/HttpException';
import {Card} from '@/modules/cards/cards.interface';
import {isEmpty} from '@utils/util';
import {CreateCardDto} from "@/modules/cards/cards.dto";

class CardService {
  public cards = DB.Cards;

  public async findAllCard(): Promise<Card[]> {
    const allCard: Card[] = await this.cards.findAll();
    return allCard;
  }

  public async findCardById(cardId: number): Promise<Card> {
    if (isEmpty(cardId)) throw new HttpException(400, "CardId is empty");

    const findCard: Card = await this.cards.findByPk(cardId);
    if (!findCard) throw new HttpException(409, "Card doesn't exist");

    return findCard;
  }

  public async createCard(cardData: CreateCardDto): Promise<Card> {
    if (isEmpty(cardData)) throw new HttpException(400, "cardData is empty");

    const findCard: Card = await this.cards.findOne({where: {number: cardData.number}});
    if (findCard) throw new HttpException(409, `This card number ${cardData.number} already exists`);
    const createUserData: Card = await this.cards.create({...cardData});
    return createUserData;
  }

  public async updateCard(cardId: number, cardData: CreateCardDto): Promise<Card> {
    if (isEmpty(cardData)) throw new HttpException(400, "cardData is empty");

    const findCard: Card = await this.cards.findByPk(cardId);
    if (!findCard) throw new HttpException(409, "Card doesn't exist");

    await this.cards.update({...cardData}, {where: {id: cardId}});

    const updateCard: Card = await this.cards.findByPk(cardId);
    return updateCard;
  }

  public async deleteCard(cardId: number): Promise<Card> {
    if (isEmpty(cardId)) throw new HttpException(400, "Card doesn't existId");

    const findCard: Card = await this.cards.findByPk(cardId);
    if (!findCard) throw new HttpException(409, "Card doesn't exist");

    await this.cards.destroy({where: {id: cardId}});

    return findCard;
  }
}

export default CardService;
