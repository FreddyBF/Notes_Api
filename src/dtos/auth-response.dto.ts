export interface AuthResponseDTO {
  accessToken: string;
  tokenType: 'Bearer';
  expiresIn?: number;
}


export interface CreateUserDTO {
    name: string;
    email: string;
    password: string;
}