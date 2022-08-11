import { Router } from 'express';
import CardsController from '@/modules/cards/cards.controller';
import { CreateCardDto } from '@/modules/cards/cards.dto';
import { Routes } from '@/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@middlewares/auth.middleware';

class CardsRoute implements Routes {
  public path = '/cards';
  public router = Router();
  public cardsController = new CardsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.cardsController.getCards);
    this.router.get(`${this.path}/:id(\\d+)`, this.cardsController.getCardById);
    this.router.post(`${this.path}`, validationMiddleware(CreateCardDto, 'body'), this.cardsController.createCard);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateCardDto, 'body', true), this.cardsController.updateCard);
    this.router.delete(`${this.path}/:id(\\d+)`, this.cardsController.deleteCard);
  }
}

export default CardsRoute;
