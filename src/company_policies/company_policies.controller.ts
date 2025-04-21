import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompanyPoliciesService } from './company_policies.service';
import { CreateCompanyPolicyDto } from './dto/create-company_policy.dto';
import { UpdateCompanyPolicyDto } from './dto/update-company_policy.dto';

@Controller('company-policies')
export class CompanyPoliciesController {
  constructor(private readonly companyPoliciesService: CompanyPoliciesService) {}

  @Post()
  create(@Body() createCompanyPolicyDto: CreateCompanyPolicyDto) {
    return this.companyPoliciesService.create(createCompanyPolicyDto);
  }

  @Get()
  findAll() {
    return this.companyPoliciesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyPoliciesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyPolicyDto: UpdateCompanyPolicyDto) {
    return this.companyPoliciesService.update(+id, updateCompanyPolicyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyPoliciesService.remove(+id);
  }
}
