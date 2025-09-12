import jwt, { 
  JwtPayload, 
  SignOptions 
} from 'jsonwebtoken';

import { env } from '../config/env';
import { InvalidTokenException } from '../exceptions/domain/invalid-token.error';
import { TokenExpiredException } from '../exceptions/domain/token-expired-token.error';


const config = {
  ACCESS_SECRET: env.ACCESS_SECRET as string,
  REFRESH_SECRET: env.REFRESH_SECRET as string,
  ACCESS_TOKEN_EXPIRATION: env.ACCESS_TOKEN_EXPIRATION,
  REFRESH_TOKEN_EXPIRATION: env.REFRESH_TOKEN_EXPIRATION,
} as const;


export interface TokenPayload extends JwtPayload {
  userId: number;
  email?: string;
}

export class JwtService {

  public generateToken(payload: TokenPayload): string {
    const { userId } = payload;
    return jwt.sign(
      { userId }, 
      config.ACCESS_SECRET, {
      expiresIn: config.ACCESS_TOKEN_EXPIRATION as SignOptions['expiresIn'],
    });
  }

  public generateRefreshToken(payload: TokenPayload): string {
    const { userId } = payload;
    return jwt.sign(
      { userId }, config.REFRESH_SECRET, {
      expiresIn: config.REFRESH_TOKEN_EXPIRATION as SignOptions['expiresIn'],
    });
  }

  private checkExpiration(decoded: JwtPayload) {
    //Converte o tempo de expiraçao em milisegundos, por issoo 1000
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      throw new TokenExpiredException();
    }
  }


  public verifyToken(token: string, ignoreExpiration = false): TokenPayload  {
    const decodedRaw = jwt.decode(token) as JwtPayload | null;
    //if (!decodedRaw) throw new InvalidTokenException();
    if (!ignoreExpiration) {
      this.checkExpiration(decodedRaw!);
    }
    const verified = jwt.verify(token, config.ACCESS_SECRET, { ignoreExpiration });
    if (typeof verified !== 'object') throw new InvalidTokenException();
    return verified as TokenPayload;
   
  }

  public verifyRefreshToken(token: string): TokenPayload {
    try {
      const decodedRaw = jwt.decode(token) as JwtPayload | null;
      if (!decodedRaw) throw new InvalidTokenException();

      this.checkExpiration(decodedRaw);

      const verified = jwt.verify(token, config.REFRESH_SECRET);
      if (typeof verified !== 'object') throw new InvalidTokenException();

      return verified as TokenPayload;
    } catch (error: any) {
      throw new InvalidTokenException(error.message);
    }
  }
}

