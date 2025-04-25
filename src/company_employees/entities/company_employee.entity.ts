import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne, // Added OneToOne
  JoinColumn,
  Unique,
} from 'typeorm'
import { Company } from '../../companies/entities/company.entity'
import { User } from '../../users/entities/user.entity'
import { CompanyRole } from '../enums/company-role.enum'
import { Status } from '../enums/status'
import { CompanyPolicy } from '../../company_policies/entities/company_policy.entity' // Added CompanyPolicy import

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

  @Column({ default: CompanyRole.EMPLOYEE, enum: CompanyRole })
  role: CompanyRole

  @OneToOne(() => CompanyPolicy, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'policy_id' })
  policy: CompanyPolicy

  @Column({ name: 'policy_id', nullable: true })
  policyId: string

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  hourlyRate: number

  @Column({ default: Status.INVITED, enum: Status })
  status: Status

  @Column({ type: 'timestamp', nullable: true })
  invitedAt: Date

  @Column({ type: 'timestamp', nullable: true })
  joinedAt: Date
}
