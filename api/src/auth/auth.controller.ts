// src/auth/auth.controller.ts
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '../users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED) // Retorna 201 Created
  async register(@Body() registerDto: RegisterDto): Promise<{ user: User; accessToken: string }> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK) // Retorna 200 OK
  async login(@Body() loginDto: LoginDto): Promise<{ user: User; accessToken: string }> {
    return this.authService.login(loginDto);
  }
}