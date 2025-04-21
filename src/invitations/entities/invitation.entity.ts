import { Company } from 'src/companies/entities/company.entity'
import { User } from 'src/users/entities/user.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('invitations')
export class Invitation {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => Company, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id' })
  company: Company

  @Column()
  email: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'invited_by' })
  invitedBy: User

  @Column()
  token: string

  @Column({ default: 'pending' })
  status: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @Column({ type: 'timestamp', nullable: true })
  expiresAt: Date
}
