import {NextFunction, Request, Response} from 'express';
import {CreateDto} from './dto';
import {IItem} from './interface';
import Service from './service';
import {itemName} from "./config";


class Controller {
  public service = new Service();

  public getItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllItemsData: IItem[] = await this.service.findAllItem();

      res.status(200).json({data: findAllItemsData, message: 'findAll'});
    } catch (error) {
      next(error);
    }
  };

  public getItemById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cardId = Number(req.params.id);
      const findOneItemData: IItem = await this.service.findItemById(cardId);

      res.status(200).json({data: findOneItemData, message: 'findOne'});
    } catch (error) {
      next(error);
    }
  };

  public createItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cardData: CreateDto = req.body;
      const createUserData: IItem = await this.service.createItem(cardData);

      res.status(201).json({data: createUserData, message: `You have successfully added ${itemName}`});
    } catch (error) {
      next(error);
    }
  };

  public updateItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cardId = Number(req.params.id);
      const cardData: CreateDto = req.body;
      const updateItemData: IItem = await this.service.updateItem(cardId, cardData);

      res.status(200).json({data: updateItemData, message: `You have successfully updated ${itemName}`});
    } catch (error) {
      next(error);
    }
  };

  public deleteItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cardId = Number(req.params.id);
      const deleteItemData: IItem = await this.service.deleteItem(cardId);

      res.status(200).json({data: deleteItemData, message: `You have successfully deleted ${itemName}`});
    } catch (error) {
      next(error);
    }
  };
}

export default Controller;
