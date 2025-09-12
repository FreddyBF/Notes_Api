
import { DomainError } from "./domain.error";
export class  InvalidTokenException extends DomainError {
  constructor(message = 'Token inválido') {
    super(message);
  }
}
