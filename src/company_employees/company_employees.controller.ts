import { Controller, Post, Body, UseGuards, Param } from '@nestjs/common'
import { CompanyEmployeesService } from './company_employees.service'
import { AssignAdminDto } from './dto/assign-admin-dto'
import { AssignEmployeeDto } from './dto/assign-employee-dto'
import { AuthGuard } from '@nestjs/passport'
import { User } from 'src/common/decorators/user.decorator'

@Controller('company-employees')
export class CompanyEmployeesController {
  constructor(
    private readonly companyEmployeesService: CompanyEmployeesService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('add-admin/:companyId')
  create(
    @Body() assignAdminDto: AssignAdminDto,
    @User('userId') userId: string,
    @Param('companyId') companyId: string,
  ) {
    return this.companyEmployeesService.assignAdmin({
      userId,
      companyId,
      details: assignAdminDto,
    })
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('add-employee/:companyId')
  createEmployee(
    @Body() assignEmployeeDto: AssignEmployeeDto,
    @User('userId') userId: string,
    @Param('companyId') companyId: string,
  ) {
    return this.companyEmployeesService.assignEmployee({
      companyId,
      userId,
      details: assignEmployeeDto,
    })
  }
}
