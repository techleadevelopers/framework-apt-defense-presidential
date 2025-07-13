// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
// Não precisamos mais importar CreateUserDto aqui, pois a entrada será mais específica
// import { CreateUserDto } from './dto/create-user.dto'; // Removido

/**
 * Interface que define a estrutura dos dados necessários para criar um usuário.
 * Inclui o hash da senha e o papel (role), que são definidos pelo AuthService.
 * Esta interface é usada internamente entre AuthService e UsersService.
 */
interface UserCreationData {
  username: string;
  passwordHash: string; // A senha já hashed
  email?: string;
  role: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  /**
   * Cria um novo usuário no banco de dados.
   * Recebe um objeto com a senha já hashed e o papel do usuário.
   * @param userData Dados do usuário a serem criados.
   * @returns O usuário criado.
   */
  async create(userData: UserCreationData): Promise<User> {
    const newUser = this.usersRepository.create(userData); // Cria a entidade com os dados fornecidos
    return this.usersRepository.save(newUser); // Salva no banco de dados
  }

  /**
   * Encontra um usuário pelo nome de usuário.
   * @param username O nome de usuário a ser buscado.
   * @returns O usuário encontrado ou null.
   */
  async findByUsername(username: string): Promise<User | null> { // Corrigido para 'User | null'
    return this.usersRepository.findOne({ where: { username } });
  }

  /**
   * Encontra um usuário pelo ID.
   * @param id O ID do usuário a ser buscado.
   * @returns O usuário encontrado ou null.
   */
  async findById(id: string): Promise<User | null> { // Corrigido para 'User | null'
    return this.usersRepository.findOne({ where: { id } });
  }
}
