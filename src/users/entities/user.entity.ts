import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  email: string

  @Column({ name: 'full_name', nullable: true })
  fullName: string

  @Column({ name: 'password_hash', nullable: true })
  passwordHash: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date
}
