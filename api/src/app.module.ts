// src/app.module.ts
import { Module, ValidationPipe } from '@nestjs/common'; // Importe ValidationPipe
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity'; // Certifique-se de que está importado
import { APP_PIPE } from '@nestjs/core'; // Para usar o ValidationPipe globalmente

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'better-sqlite3',
        database: 'soc_platform.db',
        entities: [User], // Adicione sua entidade User aqui
        synchronize: true, // Apenas para desenvolvimento! Use migrations em produção.
        autoLoadEntities: true,
      }),
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // Configura o ValidationPipe globalmente para DTOs
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}