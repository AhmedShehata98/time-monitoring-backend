import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanySettingDto } from './create-company_setting.dto';

export class UpdateCompanySettingDto extends PartialType(CreateCompanySettingDto) {}
