import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { Company } from '../../companies/entities/company.entity'
import { EmploymentMode } from '../enums/employment-mode.enum'
import { TimeTrackingMode } from '../enums/time-tracking-mode.enum'

@Entity('company_policies')
export class CompanyPolicy {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  description: string

  @Column({ default: true })
  isActive: boolean

  @Column({ type: 'enum', enum: EmploymentMode })
  employment_mode: EmploymentMode

  @Column({ type: 'enum', enum: TimeTrackingMode })
  time_tracking_mode: TimeTrackingMode

  @ManyToOne(() => Company, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id' })
  company: Company

  @Column({ name: 'company_id' })
  companyId: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
