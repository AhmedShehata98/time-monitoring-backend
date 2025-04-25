import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './src/users/entities/user.entity'
import { Company } from './src/companies/entities/company.entity'
import { CompanyEmployee } from './src/company_employees/entities/company_employee.entity'
import { CompanySettings } from './src/company_settings/entities/company_setting.entity'
import { CompanyPolicy } from './src/company_policies/entities/company_policy.entity'
import { WorkSession } from './src/work_sessions/entities/work_session.entity'
import { EmployeePolicy } from './src/employee_policies/entities/employee_policy.entity'
import { ActivityLog } from './src/activity_logs/entities/activity_log.entity'
import { Invitation } from './src/invitations/entities/invitation.entity'

export const typeOrmModule = TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'employees-monitoring',
  entities: [
    User,
    Company,
    CompanyEmployee,
    CompanySettings,
    CompanyPolicy,
    WorkSession,
    EmployeePolicy,
    ActivityLog,
    Invitation,
  ],
  synchronize: true,
})
