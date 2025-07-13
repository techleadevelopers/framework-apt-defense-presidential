// src/users/users.controller.ts
import { Controller, Get, Param, NotFoundException } from '@nestjs/common'; // Importe NotFoundException
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Encontra um usuário pelo nome de usuário.
   * Retorna o usuário ou lança uma exceção NotFoundException se o usuário não for encontrado.
   * @param username O nome de usuário a ser buscado.
   * @returns O usuário encontrado.
   */
  @Get(':username')
  async findOne(@Param('username') username: string): Promise<User> { // Tipo de retorno agora é User (sem undefined/null)
    const user = await this.usersService.findByUsername(username);

    if (!user) {
      throw new NotFoundException(`User with username "${username}" not found.`);
    }
    return user;
  }
}
