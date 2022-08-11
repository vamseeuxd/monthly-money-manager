import {NextFunction, Request, Response} from 'express';
import {CreateCardDto} from '@/modules/cards/cards.dto';
import {Card} from '@/modules/cards/cards.interface';
import cardService from '@/modules/cards/cards.service';

class CardsController {
  public cardService = new cardService();

  public getCards = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllCardsData: Card[] = await this.cardService.findAllCard();

      res.status(200).json({data: findAllCardsData, message: 'findAll'});
    } catch (error) {
      next(error);
    }
  };

  public getCardById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cardId = Number(req.params.id);
      const findOneCardData: Card = await this.cardService.findCardById(cardId);

      res.status(200).json({data: findOneCardData, message: 'findOne'});
    } catch (error) {
      next(error);
    }
  };

  public createCard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cardData: CreateCardDto = req.body;
      const createUserData: Card = await this.cardService.createCard(cardData);

      res.status(201).json({data: createUserData, message: 'You have successfully added Card'});
    } catch (error) {
      next(error);
    }
  };

  public updateCard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cardId = Number(req.params.id);
      const cardData: CreateCardDto = req.body;
      const updateCardData: Card = await this.cardService.updateCard(cardId, cardData);

      res.status(200).json({data: updateCardData, message: 'You have successfully updated Card'});
    } catch (error) {
      next(error);
    }
  };

  public deleteCard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cardId = Number(req.params.id);
      const deleteCardData: Card = await this.cardService.deleteCard(cardId);

      res.status(200).json({data: deleteCardData, message: 'You have successfully deleted Card'});
    } catch (error) {
      next(error);
    }
  };
}

export default CardsController;
