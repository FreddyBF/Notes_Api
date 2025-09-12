import { DomainError } from './domain.error';

export class EmailAlreadyInUseError extends DomainError {
  constructor(email: string) {
    super(`O e-mail ${email} já está em uso.`);
  }
}
