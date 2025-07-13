// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module'; // Importa UsersModule
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy'; // Iremos criar esta estratégia
import * as dotenv from 'dotenv';

dotenv.config(); // Carrega variáveis de ambiente do .env para JWT_SECRET

@Module({
  imports: [
    UsersModule, // Para acessar UsersService
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'superSecretKey', // Use uma variável de ambiente real em produção
      signOptions: { expiresIn: '60m' }, // Token expira em 60 minutos
    }),
  ],
  providers: [AuthService, JwtStrategy], // Adiciona JwtStrategy como provedor
  controllers: [AuthController],
})
export class AuthModule {}