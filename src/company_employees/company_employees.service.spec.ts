import { Test, TestingModule } from '@nestjs/testing';
import { CompanyEmployeesService } from './company_employees.service';

describe('CompanyEmployeesService', () => {
  let service: CompanyEmployeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyEmployeesService],
    }).compile();

    service = module.get<CompanyEmployeesService>(CompanyEmployeesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
