import { User } from 'src/users/entities/user.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  createdBy: User

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date
}
