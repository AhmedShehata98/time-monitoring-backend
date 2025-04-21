import { Test, TestingModule } from '@nestjs/testing';
import { EmployeePoliciesController } from './employee_policies.controller';
import { EmployeePoliciesService } from './employee_policies.service';

describe('EmployeePoliciesController', () => {
  let controller: EmployeePoliciesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeePoliciesController],
      providers: [EmployeePoliciesService],
    }).compile();

    controller = module.get<EmployeePoliciesController>(EmployeePoliciesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
