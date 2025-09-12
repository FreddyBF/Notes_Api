import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { CreateUserDTO } from '../dtos/auth-response.dto';
import { ApiResponse } from '../utils/response';

export class AuthController {
  constructor(private readonly authService: AuthService) {}
  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userDto: CreateUserDTO = req.body;
      await this.authService.register(userDto);
      res.status(201).json(ApiResponse.success<{}>({}, 201, 'Utilizador registrado com sucesso'));
    } catch (error) {
      next(error)
    }
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const token = await this.authService.login(email, password);
      return res.status(200).json(ApiResponse.success(token, 200, 'Login realizado com sucesso'));
    } catch (error) {
      next(error);
    }
  }
}


