import { Injectable } from '@nestjs/common';
import { CreateEmployeePolicyDto } from './dto/create-employee_policy.dto';
import { UpdateEmployeePolicyDto } from './dto/update-employee_policy.dto';

@Injectable()
export class EmployeePoliciesService {
  create(createEmployeePolicyDto: CreateEmployeePolicyDto) {
    return 'This action adds a new employeePolicy';
  }

  findAll() {
    return `This action returns all employeePolicies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} employeePolicy`;
  }

  update(id: number, updateEmployeePolicyDto: UpdateEmployeePolicyDto) {
    return `This action updates a #${id} employeePolicy`;
  }

  remove(id: number) {
    return `This action removes a #${id} employeePolicy`;
  }
}
