import { Router } from 'express';
import AuthController from '@/modules/login/auth.controller';
import { CreateUserDto } from '@/modules/users/users.dto';
import { Routes } from '@/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import {LoginDto} from "@/modules/login/login.dto";

class AuthRoute implements Routes {
  public path = '/';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}signup`, validationMiddleware(CreateUserDto, 'body'), this.authController.signUp);
    this.router.post(`${this.path}login`, validationMiddleware(LoginDto, 'body'), this.authController.logIn);
    this.router.post(`${this.path}logout`, authMiddleware, this.authController.logOut);
    this.router.get(`${this.path}isLogin`, this.authController.isLogin );
  }
}

export default AuthRoute;
