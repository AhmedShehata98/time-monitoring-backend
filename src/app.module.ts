import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { typeOrmModule } from 'typeorm.config'
import { CompaniesModule } from './companies/companies.module'
import { UsersModule } from './users/users.module'
import { InvitationsModule } from './invitations/invitations.module'
import { WorkSessionsModule } from './work_sessions/work_sessions.module'
import { CompanyPoliciesModule } from './company_policies/company_policies.module'
import { EmployeePoliciesModule } from './employee_policies/employee_policies.module'
import { CompanyEmployeesModule } from './company_employees/company_employees.module'
import { CompanySettingsModule } from './company_settings/company_settings.module'
import { ActivityLogsModule } from './activity_logs/activity_logs.module'
import { AuthenticationModule } from './authentication/authentication.module'
import { ConfigModule } from '@nestjs/config'
import configuration from './config/configuration'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true, // Make config globally available
      envFilePath: ['.env', '.env.development', '.env.production'],
      cache: true,
      expandVariables: true,
    }),
    typeOrmModule,
    UsersModule,
    CompanyEmployeesModule,
    CompaniesModule,
    CompanyPoliciesModule,
    // InvitationsModule,
    // WorkSessionsModule,
    // EmployeePoliciesModule,
    // CompanySettingsModule,
    // ActivityLogsModule,
    AuthenticationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
