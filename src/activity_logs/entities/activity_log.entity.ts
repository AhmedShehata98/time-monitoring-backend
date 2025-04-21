import { CompanyEmployee } from 'src/company_employees/entities/company_employee.entity'
import { WorkSession } from 'src/work_sessions/entities/work_session.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('activity_logs')
export class ActivityLog {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => WorkSession, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'work_session_id' })
  workSession: WorkSession

  @ManyToOne(() => CompanyEmployee, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'employee_id' })
  employee: CompanyEmployee

  @Column()
  activityType: string

  @Column({ type: 'timestamp' })
  startedAt: Date

  @Column({ type: 'timestamp' })
  endedAt: Date

  @Column({ type: 'int', nullable: true })
  durationMinutes: number

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date
}
