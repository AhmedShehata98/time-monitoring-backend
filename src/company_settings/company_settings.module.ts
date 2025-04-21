import { Module } from '@nestjs/common';
import { CompanySettingsService } from './company_settings.service';
import { CompanySettingsController } from './company_settings.controller';

@Module({
  controllers: [CompanySettingsController],
  providers: [CompanySettingsService],
})
export class CompanySettingsModule {}
