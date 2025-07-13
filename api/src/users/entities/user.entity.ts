// src/users/entities/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users') // Nomeia a tabela como 'users' no banco de dados
export class User {
  @PrimaryGeneratedColumn('uuid') // Gera um UUID para a chave primária
  id: string;

  @Column({ unique: true }) // Garante que o username seja único
  username: string;

  @Column()
  passwordHash: string; // Armazenará o hash da senha

  @Column({ unique: true, nullable: true }) // Email pode ser único, mas opcional
  email: string;

  @Column({ default: 'user' }) // Role padrão: 'user'
  role: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}