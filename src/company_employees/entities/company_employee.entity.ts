import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm'
import { Company } from '../../companies/entities/company.entity'
import { User } from '../../users/entities/user.entity'

@Entity('company_employees')
@Unique(['company', 'user'])
export class CompanyEmployee {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => Company, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id' })
  company: Company

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column({ default: 'employee' })
  role: string

  @Column()
  contractType: string

  @Column()
  policyType: string

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  hourlyRate: number

  @Column({ nullable: true })
  weeklyHours: number

  @Column({ default: 'active' })
  status: string

  @Column({ type: 'timestamp', nullable: true })
  invitedAt: Date

  @Column({ type: 'timestamp', nullable: true })
  joinedAt: Date
}
