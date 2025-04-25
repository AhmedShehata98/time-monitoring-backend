import { Module } from '@nestjs/common'
import { CompaniesService } from './companies.service'
import { CompaniesController } from './companies.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Company } from './entities/company.entity'
import { AuthorizationModule } from 'src/authorization/authorization.module'
import { RolesGuard } from 'src/common/guards/roles.guard'

@Module({
  imports: [TypeOrmModule.forFeature([Company]), AuthorizationModule],
  controllers: [CompaniesController],
  providers: [CompaniesService, RolesGuard],
  exports: [CompaniesService], // Export if other modules need to use this service
})
export class CompaniesModule {}
