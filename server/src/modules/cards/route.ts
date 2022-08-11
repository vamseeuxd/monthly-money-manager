import { Router } from 'express';
import Controller from './controller';
import { CreateDto } from './dto';
import { Routes } from '@/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@middlewares/auth.middleware';

class Route implements Routes {
  public path = '/cards';
  public router = Router();
  public controller = new Controller();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.controller.getItems);
    this.router.get(`${this.path}/:id(\\d+)`, this.controller.getItemById);
    this.router.post(`${this.path}`, validationMiddleware(CreateDto, 'body'), this.controller.createItem);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateDto, 'body', true), this.controller.updateItem);
    this.router.delete(`${this.path}/:id(\\d+)`, this.controller.deleteItem);
  }
}

export default Route;
