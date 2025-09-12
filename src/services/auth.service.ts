import { UserRepository } from '../repositories/user.repository';
import { JwtService, TokenPayload } from './jwt.service';
import { PasswordUtils } from '../utils/password.helper';
import { InvalidCredentialsError } from '../exceptions/domain/invalid-credentials.error';
import { EmailAlreadyInUseError } from '../exceptions/domain/email-already-exist.error';
import { AuthResponseDTO, CreateUserDTO } from '../dtos/auth-response.dto';


export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) {}
  
  async register(data: CreateUserDTO): Promise<void> {
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new EmailAlreadyInUseError(data.email);
    }

    const hashedPassword = await PasswordUtils.hash(data.password);
    await this.userRepository.create({
      ...data,
      password: hashedPassword
    });
  }

  async login(email: string, password: string): Promise<AuthResponseDTO> {
    const user = await this.userRepository.findByEmail(email);
    const isValid = user && await PasswordUtils.verify(password, user.password);

    if (!isValid) {
      throw new InvalidCredentialsError();
    }

    const payload: TokenPayload = { userId: user.id };
    const token = this.jwtService.generateToken(payload);
    return {
      accessToken: token,
      tokenType: 'Bearer',
      //expiresIn: this.jwtService.getExpiration(), // se tiver método configurado
    };
  }
}

