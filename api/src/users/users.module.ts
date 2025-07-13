// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Registra a entidade User para este módulo
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService], // Exporta UsersService para que outros módulos (AuthModule) possam usá-lo
})
export class UsersModule {}