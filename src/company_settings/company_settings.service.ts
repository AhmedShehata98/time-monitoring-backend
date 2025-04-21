import { Injectable } from '@nestjs/common';
import { CreateCompanySettingDto } from './dto/create-company_setting.dto';
import { UpdateCompanySettingDto } from './dto/update-company_setting.dto';

@Injectable()
export class CompanySettingsService {
  create(createCompanySettingDto: CreateCompanySettingDto) {
    return 'This action adds a new companySetting';
  }

  findAll() {
    return `This action returns all companySettings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} companySetting`;
  }

  update(id: number, updateCompanySettingDto: UpdateCompanySettingDto) {
    return `This action updates a #${id} companySetting`;
  }

  remove(id: number) {
    return `This action removes a #${id} companySetting`;
  }
}
