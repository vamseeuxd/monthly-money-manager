import {NextFunction, Request, Response} from 'express';
import {CreateUserDto} from '@dtos/users.dto';
import {User} from '@interfaces/users.interface';
import {DataStoredInToken, RequestWithUser} from '@interfaces/auth.interface';
import AuthService from '@services/auth.service';
import {SECRET_KEY} from "@config";
import {verify} from "jsonwebtoken";
import DB from "@databases";
import {HttpException} from "@exceptions/HttpException";

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const signUpUserData: User = await this.authService.signup(userData);

      res.status(201).json({data: signUpUserData, message: 'signup'});
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const {cookie, findUser} = await this.authService.login(userData);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({data: findUser, message: `Welcome ${findUser.firstName} ${findUser.lastName}, You are successfully logged-in`});
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.authService.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({data: logOutUserData, message: 'logout'});
    } catch (error) {
      next(error);
    }
  };

  public isLogin = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const Authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);
    if (Authorization) {
      const secretKey: string = SECRET_KEY;
      const verificationResponse = verify(Authorization, secretKey) as DataStoredInToken;
      const userId = verificationResponse.id;
      const findUser = await DB.Users.findByPk(userId);

      if (findUser) {
        req.user = findUser;
        res.status(200).json({data: findUser, message: `Welcome Back ${findUser.firstName} ${findUser.lastName}`});
      } else {
        res.status(200).json({data: null, message: 'Please Login'});
      }
    } else {
      res.status(200).json({data: null, message: 'Please Login'});
    }
  };
}

export default AuthController;
