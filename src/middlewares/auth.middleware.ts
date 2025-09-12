import { Request, Response, NextFunction } from 'express';
import { JwtService } from '../services/jwt.service';
import { InvalidTokenException } from '../exceptions/domain/index';
const jwtService = new JwtService();

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    //Captura o token vindo do client
    const authHeader = req.headers.authorization;   
    try {
      if (!authHeader || !authHeader.startsWith('Bearer ') || authHeader.split(' ').length !== 2) {
        throw new InvalidTokenException();
      }
      const [, token] = authHeader.split(' ');
      const decoded = jwtService.verifyToken(token)!;
      (req as any).userId = decoded.userId;
      next();
    } catch(error: any) {
      next(error);
    }
}