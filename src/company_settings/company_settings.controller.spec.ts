import { Test, TestingModule } from '@nestjs/testing';
import { CompanySettingsController } from './company_settings.controller';
import { CompanySettingsService } from './company_settings.service';

describe('CompanySettingsController', () => {
  let controller: CompanySettingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanySettingsController],
      providers: [CompanySettingsService],
    }).compile();

    controller = module.get<CompanySettingsController>(CompanySettingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
