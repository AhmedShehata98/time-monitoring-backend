import { Test, TestingModule } from '@nestjs/testing';
import { CompanyPoliciesService } from './company_policies.service';

describe('CompanyPoliciesService', () => {
  let service: CompanyPoliciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyPoliciesService],
    }).compile();

    service = module.get<CompanyPoliciesService>(CompanyPoliciesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
