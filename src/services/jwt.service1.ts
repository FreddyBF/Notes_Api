import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
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
    return jwt.sign(payload, config.ACCESS_SECRET, {
      expiresIn: config.ACCESS_TOKEN_EXPIRATION as SignOptions['expiresIn'],
    });
  }

  public generateRefreshToken(payload: TokenPayload): string {
    return jwt.sign(payload, config.REFRESH_SECRET, {
      expiresIn: config.REFRESH_TOKEN_EXPIRATION as SignOptions['expiresIn'],
    });
  }

  private checkExpiration(decoded: JwtPayload) {
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      throw new TokenExpiredException();
    }
  }

  private verify(token: string, secret: string, ignoreExpiration = false): TokenPayload {
    try {
      const decodedRaw = jwt.decode(token) as JwtPayload | null;
      if (!decodedRaw) throw new InvalidTokenException();

      if (!ignoreExpiration) {
        this.checkExpiration(decodedRaw);
      }

      const verified = jwt.verify(token, secret, { ignoreExpiration });
      if (typeof verified !== 'object') throw new InvalidTokenException();

      return verified as TokenPayload;
    } catch (error) {
      if (error instanceof TokenExpiredException) throw error;
      if (error instanceof Error && error.name === 'TokenExpiredError') {
        throw new TokenExpiredException();
      }
      throw new InvalidTokenException(error instanceof Error ? error.message : 'Token inválido');
    }
  }

  public verifyToken(token: string, ignoreExpiration = false): TokenPayload {
    return this.verify(token, config.ACCESS_SECRET, ignoreExpiration);
  }

  public verifyRefreshToken(token: string): TokenPayload {
    return this.verify(token, config.REFRESH_SECRET);
  }
}
