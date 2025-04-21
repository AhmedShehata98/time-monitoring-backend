import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeePoliciesService } from './employee_policies.service';
import { CreateEmployeePolicyDto } from './dto/create-employee_policy.dto';
import { UpdateEmployeePolicyDto } from './dto/update-employee_policy.dto';

@Controller('employee-policies')
export class EmployeePoliciesController {
  constructor(private readonly employeePoliciesService: EmployeePoliciesService) {}

  @Post()
  create(@Body() createEmployeePolicyDto: CreateEmployeePolicyDto) {
    return this.employeePoliciesService.create(createEmployeePolicyDto);
  }

  @Get()
  findAll() {
    return this.employeePoliciesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeePoliciesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeePolicyDto: UpdateEmployeePolicyDto) {
    return this.employeePoliciesService.update(+id, updateEmployeePolicyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeePoliciesService.remove(+id);
  }
}
