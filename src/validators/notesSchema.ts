import * as z from "zod"; 

export const CreateNoteSchema = z.object({
  title: z.preprocess(
    (val) => typeof val === 'string' ? val.trim() : '',
    z.string()
      .min(4, 'O título deve ter pelo menos 4 caracteres.')
      .max(50, 'O título não pode ultrapassar 100 caracteres.')
  ),
  content: z.preprocess(
    (val) => typeof val === 'string' ? val.trim() : '',
    z.string()
      .min(5, 'O conteúdo deve ter pelo menos 5 caracteres.')
      .max(1000, 'O conteúdo não pode ultrapassar 1000 caracteres.')
  ),
});
