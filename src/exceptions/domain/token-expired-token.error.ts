import { DomainError } from "./domain.error";

export class TokenExpiredException extends DomainError {
  constructor(message = 'Token expirado') {
    super(message);
  }
}


