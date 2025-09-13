export class ApiResponse {
  /**
   * Resposta de sucesso
   * - Pode retornar um único objeto ou uma lista paginada
   * @param data Dados a serem retornados (objeto ou array)
   * @param statusCode Código HTTP (padrão: 200)
   * @param message Mensagem amigável (padrão: 'OK')
   * @param code Código interno opcional (ex.: 'LOGIN_SUCCESS')
   * @param meta Metadados opcionais (para paginação, etc.)
   */
  static success<T>(
    data: T | T[],
    statusCode: number = 200,
    message: string = 'OK',
    code?: string,
    meta?: { total: number; page: number; limit: number }
  ) {
    // Se for lista e meta existir, retorna no formato padronizado de listagem
    if (Array.isArray(data) && meta) {
      return {
        success: true,
        statusCode,
        message,
        ...(code ? { code } : {}),
        data: {
          items: data,
          meta
        }
      };
    }

    // Caso contrário, retorna formato simples
    return {
      success: true,
      statusCode,
      message,
      ...(code ? { code } : {}),
      data
    };
  }

  /**
   * Resposta de erro
   */
  static error(
    message: string = 'Erro interno',
    statusCode: number = 500,
    error?: string,
    errorCode?: string,
    errors?: Array<{ path: string; message: string }>
  ) {
    return {
      success: false,
      statusCode,
      message,
      ...(error ? { error } : {}),
      ...(errorCode ? { errorCode } : {}),
      ...(errors ? { errors: this.groupErrors(errors) } : {}),
      data: {}
    };
  }

  /**
   * Agrupa mensagens de erro por campo
   */
  private static groupErrors(
    errors: Array<{ path: string; message: string }>
  ): Record<string, string[]> {
    return errors.reduce((acc, { path, message }) => {
      if (!acc[path]) {
        acc[path] = [];
      }
      acc[path].push(message);
      return acc;
    }, {} as Record<string, string[]>);
  }
}



