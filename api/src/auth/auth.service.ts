// src/auth/auth.service.ts
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto'; // Iremos criar este DTO
import { LoginDto } from './dto/login.dto';     // Iremos criar este DTO
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<{ user: User; accessToken: string }> {
    // Verificar se o username já existe
    const existingUser = await this.usersService.findByUsername(registerDto.username);
    if (existingUser) {
      throw new BadRequestException('Username already taken.');
    }

    // Hash da senha
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(registerDto.password, salt);

    // Criar o usuário no banco de dados
    const newUser = await this.usersService.create({
      username: registerDto.username,
      passwordHash: passwordHash,
      email: registerDto.email,
      role: 'user', // Role padrão para novos registros
    });

    // Gerar token JWT
    const payload = { username: newUser.username, sub: newUser.id, role: newUser.role };
    return {
      user: newUser,
      accessToken: this.jwtService.sign(payload),
    };
  }

  async login(loginDto: LoginDto): Promise<{ user: User; accessToken: string }> {
    const user = await this.usersService.findByUsername(loginDto.username);

    // Se o usuário não existir ou a senha não coincidir
    if (!user || !(await bcrypt.compare(loginDto.password, user.passwordHash))) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    // Gerar token JWT
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      user: user,
      accessToken: this.jwtService.sign(payload),
    };
  }
}