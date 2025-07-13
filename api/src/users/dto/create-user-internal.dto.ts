// src/users/dto/create-user-internal.dto.ts
import { IsString, IsEmail, IsOptional } from 'class-validator';

/**
 * DTO (Data Transfer Object) para a criação interna de um novo usuário.
 * Usado para passar dados para o UsersService após a senha ter sido hashed.
 */
export class CreateUserInternalDto {
  /**
   * O nome de usuário do novo usuário.
   * Já validado pelo DTO de registro.
   */
  @IsString()
  username: string;

  /**
   * O hash da senha do novo usuário.
   * A senha já foi hashed pelo AuthService.
   */
  @IsString()
  passwordHash: string;

  /**
   * O email do novo usuário (opcional).
   * Já validado pelo DTO de registro.
   */
  @IsOptional()
  @IsEmail()
  email?: string;

  /**
   * O papel (role) do usuário.
   * Definido pelo AuthService.
   */
  @IsString()
  role: string;
}
