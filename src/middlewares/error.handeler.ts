import { Request, Response, NextFunction } from 'express';
import { 
  DomainError,
  NoteConflictError,
  NotFoundError, 
  EmailAlreadyInUseError, 
  InvalidCredentialsError, 
  TokenExpiredException,
  InvalidTokenException
} from '../exceptions/domain/index';

import { ApiResponse } from '../utils/response';

type MappedError = {
  status: number;
  error: string;
  errorCode: string;
};

function mapDomainError(error: DomainError): MappedError {
  if (error instanceof NoteConflictError) {
    return {
      status: 409,
      error: 'Conflict',
      errorCode: 'NOTE_CONFLICT'
    };
  }

  if (error instanceof NotFoundError) {
    return {
      status: 404,
      error: 'Not Found',
      errorCode: 'RESOURCE_NOT_FOUND'
    };
  }

  if (error instanceof EmailAlreadyInUseError) {
    return {
      status: 409,
      error: 'Conflict',
      errorCode: 'EMAIL_ALREADY_EXISTS'
    };
  }

  if (error instanceof InvalidCredentialsError) {
    return {
      status: 400,
      error: 'Bad Request',
      errorCode: 'INVALID_CREDENTIALS'
    };
  }

  if ( error instanceof InvalidTokenException ) {
    return {
      status: 401,
      error: 'Unauthorized',
      errorCode: 'INVALID_TOKEN'
    };
  }

  if (error instanceof TokenExpiredException) {
    return {
      status: 401,
      error: 'Unauthorized',
      errorCode: 'TOKEN_EXPIRED'
    };
  }

  return {
    status: 500,
    error: 'Internal Server Error',
    errorCode: 'INTERNAL_ERROR'
  };
}

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof DomainError) {
    const { status, error, errorCode } = mapDomainError(err);
    res.status(status).json(
      ApiResponse.error(err.message, status, error, errorCode)
    );
  } else {
    res.status(500).json(
      ApiResponse.error(
        'Internal Server Error', 
        500, 'INTERNAL_ERROR', 
        'INTERNAL_ERROR'
      ),
    );
  }
}

