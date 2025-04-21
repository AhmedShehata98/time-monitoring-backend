import { CompanyEmployee } from 'src/company_employees/entities/company_employee.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('work_sessions')
export class WorkSession {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => CompanyEmployee, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'employee_id' })
  employee: CompanyEmployee

  @Column({ type: 'timestamp' })
  startTime: Date

  @Column({ type: 'timestamp', nullable: true })
  endTime: Date

  @Column({ type: 'int', nullable: true })
  totalDurationMinutes: number

  @Column({ type: 'int', nullable: true })
  activeDurationMinutes: number

  @Column({ type: 'int', nullable: true })
  idleDurationMinutes: number

  @Column({ type: 'text', nullable: true })
  description: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date
}
