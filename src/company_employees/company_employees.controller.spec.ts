import { Test, TestingModule } from '@nestjs/testing';
import { CompanyEmployeesController } from './company_employees.controller';
import { CompanyEmployeesService } from './company_employees.service';

describe('CompanyEmployeesController', () => {
  let controller: CompanyEmployeesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyEmployeesController],
      providers: [CompanyEmployeesService],
    }).compile();

    controller = module.get<CompanyEmployeesController>(CompanyEmployeesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
