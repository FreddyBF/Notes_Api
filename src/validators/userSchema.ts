import { error } from "console";
import { z } from "zod";

// Validação de e-mail com z.email() e preprocess para tratar undefined
const emailField = z.preprocess(
  (val) => typeof val === "string" ? val.trim() : "",
  z.email({error:"Por favor, insira um e-mail válido."})
);

export const createUserSchema = z.object({
  name: z.preprocess(
    (val) => typeof val === "string" ? val.trim() : "",
    z.string().min(1, "O campo 'nome' é obrigatório.")
  ),
  email: emailField,
  password: z.preprocess(
    (val) => typeof val === "string" ? val : "",
    z.string()
      .min(4,{ error: "A senha deve ter pelo menos 4 caracteres."})
      .regex(/[A-Z]/, {error: "A senha deve conter pelo menos uma letra maiúscula."})
      .regex(/[0-9]/, {error: "A senha deve conter pelo menos um número."})
  ),
});

export const loginSchema = z.object({
  email: emailField,
  password: z.preprocess(
    (val) => typeof val === "string" ? val : "",
    z.string()
      .min(4, {error: "A senha deve ter pelo menos 4 caracteres."})
      //.regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula.")
      .regex(/[0-9]/, "A senha deve conter pelo menos um número.")
  ),
});
