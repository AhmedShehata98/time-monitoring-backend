import {
  Controller,
  Post,
  Body,
  UseGuards,
  Param,
  Patch,
  Request,
} from '@nestjs/common'
import { CompanyEmployeesService } from './company_employees.service'
import { AssignEmployeeDto } from './dto/assign-employee.dto'
import { AuthGuard } from '@nestjs/passport'
import { User } from 'src/common/decorators/user.decorator'
import { CompanyRole } from './enums/company-role.enum'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { Roles } from 'src/common/decorators/roles.decorator'

@Controller('company-employees')
export class CompanyEmployeesController {
  constructor(
    private readonly companyEmployeesService: CompanyEmployeesService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @UseGuards(RolesGuard)
  @Roles(CompanyRole.ADMIN, CompanyRole.OWNER)
  @Post('companies/:companyId/employees')
  assignEmployeeToCompany(
    @Param('companyId') companyId: string,
    @Body() assignEmployeeDto: AssignEmployeeDto,
    @User('userId') userId: string,
  ) {
    return this.companyEmployeesService.assignEmployeeToCompany(
      userId,
      companyId,
      assignEmployeeDto,
    )
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('companies/:companyId/admins')
  @UseGuards(RolesGuard)
  @Roles(CompanyRole.OWNER)
  assignAdminToCompany(
    @Param('companyId') companyId: string,
    @Body() assignEmployeeDto: AssignEmployeeDto,
    @User('userId') userId: string,
  ) {
    return this.companyEmployeesService.assignAdminToCompany(
      userId,
      companyId,
      assignEmployeeDto,
    )
  }

  @Post('companies/:companyId/owner/:userId')
  assignOwnerToCompany(
    @Param('companyId') companyId: string,
    @Param('userId') userId: string,
  ) {
    return this.companyEmployeesService.assignOwnerToCompany(userId, companyId)
  }

  @UseGuards(AuthGuard('jwt'))
  @UseGuards(RolesGuard)
  @Roles(CompanyRole.ADMIN, CompanyRole.OWNER)
  @Patch('companies/:companyId/members/role')
  changeRole(
    @Param('companyId') companyId: string,
    @Body('role') role: CompanyRole,
    @User('userId') userId: string,
  ) {
    return this.companyEmployeesService.changeCompanyMemberRole(
      userId,
      companyId,
      role,
    )
  }
}
