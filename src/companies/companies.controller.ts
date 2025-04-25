import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common'
import { CompaniesService } from './companies.service'
import { CreateCompanyDto } from './dto/create-company.dto'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { Roles } from 'src/common/decorators/roles.decorator'
import { CompanyRole } from 'src/company_employees/enums/company-role.enum'

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.createCompany(createCompanyDto)
  }

  @UseGuards(RolesGuard)
  @Roles(CompanyRole.OWNER)
  @Delete(':companyId')
  remove(@Param('companyId') companyId: string) {
    return this.companiesService.deleteCompany(companyId)
  }
}
