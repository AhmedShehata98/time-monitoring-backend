import { User } from '../../users/entities/user.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm'
import { CompanyEmployee } from '../../company_employees/entities/company_employee.entity'

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({nullable:true})
  bio: string

  @Column({nullable:true})
  specialty: string

  @Column({nullable:true})
  logo: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  createdBy: User

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  // Add the reverse relationship to CompanyEmployee
  @OneToMany(
    () => CompanyEmployee,
    (companyEmployee) => companyEmployee.company,
    {
      cascade: true, // This will cascade delete operations to company employees
    },
  )
  employees: CompanyEmployee[]
}
