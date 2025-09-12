import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../utils/response';
import { ZodType, z } from 'zod';

type RequestPart = 'body' | 'query' | 'params';

// Função genérica de validação para Express usando Zod.
// <T extends ZodType> → T é um tipo genérico que representa o schema do Zod passado como parâmetro.
// Isso permite inferir automaticamente o tipo validado (via z.infer<T>) e aplicá-lo no req[part].
// 'part' indica qual parte da requisição será validada: 'body', 'query' ou 'params' (padrão: 'body').
export const validate = <T extends ZodType>(schema: T, part: RequestPart = 'body') =>

  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[part]);
    if (!result.success) {
      const errors = result.error.issues.map(e => ({
        path: e.path.join('.'),
        message: e.message,
      }));
      res.json(ApiResponse.error(`Erro de validação`, 400, 'Bad Request', 'VALIDATION_ERROR',errors));
    }

    // Sobrescreve a parte da requisição (body, query ou params) com os dados já validados e tipados.
    // O cast para `any` é necessário porque o tipo padrão de `Request` do Express não sabe que
    // esses dados foram validados. Em seguida, usamos `z.infer<T>` para garantir que o TypeScript
    // reconheça o formato exato definido pelo schema do Zod.
    (req as any)[part] = result.data as z.infer<T>;
    next();
  };
