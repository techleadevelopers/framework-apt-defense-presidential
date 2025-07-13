// src/users/dto/create-user.dto.ts
import { IsString, IsEmail, MinLength, IsOptional } from 'class-validator';

/**
 * DTO (Data Transfer Object) para a criação de um novo usuário.
 * Define a estrutura e as regras de validação para os dados de entrada
 * ao registrar um usuário.
 */
export class CreateUserDto {
  /**
   * O nome de usuário do novo usuário.
   * Deve ser uma string e ter no mínimo 3 caracteres.
   */
  @IsString({ message: 'O nome de usuário deve ser uma string.' })
  @MinLength(3, { message: 'O nome de usuário deve ter no mínimo 3 caracteres.' })
  username: string;

  /**
   * A senha do novo usuário.
   * Deve ser uma string e ter no mínimo 6 caracteres.
   * Esta senha será hashed antes de ser armazenada no banco de dados.
   */
  @IsString({ message: 'A senha deve ser uma string.' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  password: string;

  /**
   * O email do novo usuário (opcional).
   * Se fornecido, deve ser um formato de email válido.
   */
  @IsOptional() // Indica que este campo é opcional
  @IsEmail({}, { message: 'Deve ser um endereço de email válido.' })
  email?: string; // O '?' indica que a propriedade é opcional
}