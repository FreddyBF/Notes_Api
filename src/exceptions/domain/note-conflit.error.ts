import { DomainError } from './domain.error';

export class NoteConflictError extends DomainError {
  constructor(title: string) {
    super(`Já existe uma nota com o título ${title}`);
  }
}
