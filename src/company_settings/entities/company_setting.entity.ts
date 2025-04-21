import { CompanyEmployee } from 'src/company_employees/entities/company_employee.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('employee_settings')
export class EmployeeSettings {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @OneToOne(() => CompanyEmployee, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'employee_id' })
  employee: CompanyEmployee

  @Column({ nullable: true })
  workHoursPerDay: number

  @Column({ nullable: true })
  annualLeaveDays: number

  @Column({ nullable: true })
  sickLeaveDays: number

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
