import { Company } from 'src/companies/entities/company.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('company_settings')
export class CompanySettings {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @OneToOne(() => Company, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id' })
  company: Company

  @Column({ default: 8 })
  workHoursPerDay: number

  @Column({ default: 5 })
  workDaysPerWeek: number

  @Column({ default: 21 })
  annualLeaveDays: number

  @Column({ default: 7 })
  sickLeaveDays: number

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
