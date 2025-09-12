export class ApiResponse {
  static success<T>(data: T, statusCode: number = 200, message = 'OK') {
    return {
      success: true,
      statusCode,
      message,
      data,
    };
  }

  static error(
    message = 'Erro interno',
    status = 500,
    error: string,
    errorCode: string,
    errors?: Array<{ path: string; message: string }>
  ) {
    return {
      success: false,
      error: error,
      statusCode: status,
      message,
      errorCode: errorCode,
      ...(errors ? { errors } : {}),
    };
  }
}



