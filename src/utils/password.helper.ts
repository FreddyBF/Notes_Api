import bcrypt from 'bcrypt';

const DEFAULT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || '12', 10);

export class PasswordUtils {

  static async hash(plain: string, rounds = DEFAULT_ROUNDS): Promise<string> {
    const salt = await bcrypt.genSalt(rounds);
    return bcrypt.hash(plain, salt);
  }

  static async verify(plain: string, hashed: string): Promise<boolean> {
    if (!plain || !hashed) return false;
    
    try {
      return await bcrypt.compare(plain, hashed);
    } catch {
      return false;
    }
  }
}

