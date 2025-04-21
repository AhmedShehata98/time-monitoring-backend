import { Test, TestingModule } from '@nestjs/testing';
import { EmployeePoliciesService } from './employee_policies.service';

describe('EmployeePoliciesService', () => {
  let service: EmployeePoliciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeePoliciesService],
    }).compile();

    service = module.get<EmployeePoliciesService>(EmployeePoliciesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
