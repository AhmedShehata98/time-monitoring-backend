import { Controller, Post, Body, Param, Delete, Query } from '@nestjs/common'
import { CompaniesService } from './companies.service'
import { CreateCompanyDto } from './dto/create-company.dto'

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  create(
    @Body() createCompanyDto: CreateCompanyDto,
    @Query() query: { userId: string },
  ) {
    return this.companiesService.create(createCompanyDto, query.userId)
  }

  @Delete()
  remove(
    @Param('id') id: string,
    @Query() query: { userId: string; companyId: string },
  ) {
    return this.companiesService.deleteCompany(query.userId, query.companyId)
  }
}
