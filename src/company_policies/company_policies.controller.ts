import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common'
import { CompanyPoliciesService } from './company_policies.service'
import { CreateCompanyPolicyDto } from './dto/create-company_policy.dto'
import { UpdateCompanyPolicyDto } from './dto/update-company_policy.dto'
import { CompanyPolicy } from './entities/company_policy.entity'
import { Roles } from '../common/decorators/roles.decorator'
import { CompanyRole } from '../company_employees/enums/company-role.enum'
import { RolesGuard } from '../common/guards/roles.guard'
import { AuthGuard } from '@nestjs/passport'
import { User } from 'src/common/decorators/user.decorator'

@Controller('company-policies')
export class CompanyPoliciesController {
  constructor(
    private readonly companyPoliciesService: CompanyPoliciesService,
  ) {}

  /**
   * Create a new company policy
   * @param createCompanyPolicyDto - The company policy data
   * @returns The created company policy
   */
  @Post()
  @UseGuards(RolesGuard)
  @Roles(CompanyRole.OWNER)
  @UseGuards(AuthGuard('jwt'))
  create(
    @Body() createCompanyPolicyDto: CreateCompanyPolicyDto,
  ): Promise<CompanyPolicy> {
    return this.companyPoliciesService.create(createCompanyPolicyDto)
  }

  /**
   * Get all company policies, optionally filtered by company ID
   * @param companyId - Optional company ID to filter policies
   * @returns Array of company policies
   */
  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(@Query('companyId') companyId?: string): Promise<CompanyPolicy[]> {
    return this.companyPoliciesService.findAll(companyId)
  }

  /**
   * Get a specific company policy by ID
   * @param id - The company policy ID
   * @returns The company policy
   */
  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string): Promise<CompanyPolicy> {
    return this.companyPoliciesService.findOne(id)
  }

  /**
   * Update a company policy
   * @param id - The company policy ID
   * @param updateCompanyPolicyDto - The updated company policy data
   * @returns The updated company policy
   */
  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(CompanyRole.OWNER)
  @UseGuards(AuthGuard('jwt'))
  update(
    @User('userId') id: string,
    @Body() updateCompanyPolicyDto: UpdateCompanyPolicyDto,
  ): Promise<CompanyPolicy> {
    return this.companyPoliciesService.update(id, updateCompanyPolicyDto)
  }

  /**
   * Delete a company policy
   * @param id - The company policy ID
   */
  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(CompanyRole.OWNER)
  @UseGuards(AuthGuard('jwt'))
  remove(@User('userId') id: string): Promise<void> {
    return this.companyPoliciesService.remove(id)
  }
}
