// src/auth/strategies/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service'; // Importa UsersService
import * as dotenv from 'dotenv';
import { User } from 'src/users/entities/user.entity';

dotenv.config(); // Carrega variáveis de ambiente do .env

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrai o token do header Authorization: Bearer <token>
      ignoreExpiration: false, // Não ignora a expiração do token
      secretOrKey: process.env.JWT_SECRET || 'superSecretKey', // A mesma chave secreta usada para assinar
    });
  }

  // Este método é chamado após o token ser validado (assinado e não expirado)
  // Ele retorna o "payload" do token e opcionalmente o usuário associado
  async validate(payload: any): Promise<User> {
    const user = await this.usersService.findById(payload.sub); // 'sub' é o ID do usuário
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}