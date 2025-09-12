import dotenv from 'dotenv';
dotenv.config();

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Variável de ambiente obrigatória não definida: ${key}`);
  return value;
}
export const env = {
  DATABASE_URL: requireEnv('DATABASE_URL'),
  PORT: parseInt(requireEnv('PORT'), 10),
  ACCESS_SECRET: requireEnv('JWT_ACCESS_SECRET'),
  REFRESH_SECRET: requireEnv('JWT_REFRESH_SECRET'),
  ACCESS_TOKEN_EXPIRATION: requireEnv('ACCESS_TOKEN_EXPIRATION').trim(),
  REFRESH_TOKEN_EXPIRATION: requireEnv('REFRESH_TOKEN_EXPIRATION').trim(),
  SALT_ROUNDS: parseInt(requireEnv('SALT_ROUNDS'), 10),
} as const;
