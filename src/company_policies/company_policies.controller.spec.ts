import { Test, TestingModule } from '@nestjs/testing';
import { CompanyPoliciesController } from './company_policies.controller';
import { CompanyPoliciesService } from './company_policies.service';

describe('CompanyPoliciesController', () => {
  let controller: CompanyPoliciesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyPoliciesController],
      providers: [CompanyPoliciesService],
    }).compile();

    controller = module.get<CompanyPoliciesController>(CompanyPoliciesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
