import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { Roles } from 'src/common/decorators/roles.decorator'
import { CompanySettingsService } from './company_settings.service'
import { CreateCompanySettingDto } from 'src/company_settings/dto/create-company-setting.dto'
import { UpdateCompanySettingDto } from 'src/company_settings/dto/update-company-setting.dto'
import { AuthGuard } from '@nestjs/passport'
import { CompanyRole } from 'src/company_employees/enums/company-role.enum'

@Controller('company-settings')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class CompanySettingsController {
  constructor(
    private readonly companySettingsService: CompanySettingsService,
  ) {}

  @Post()
  @Roles(CompanyRole.OWNER)
  create(@Body() createCompanySettingDto: CreateCompanySettingDto) {
    return this.companySettingsService.create(createCompanySettingDto)
  }

  @Get()
  @Roles(CompanyRole.OWNER)
  findAll() {
    return this.companySettingsService.findAll()
  }

  @Get(':id')
  @Roles(CompanyRole.OWNER)
  findOne(@Param('id') id: string) {
    return this.companySettingsService.findOne(id)
  }

  @Patch(':id')
  @Roles(CompanyRole.OWNER)
  update(
    @Param('id') id: string,
    @Body() updateCompanySettingDto: UpdateCompanySettingDto,
  ) {
    return this.companySettingsService.update(id, updateCompanySettingDto)
  }

  @Delete(':id')
  @Roles(CompanyRole.OWNER)
  remove(@Param('id') id: string) {
    return this.companySettingsService.remove(id)
  }
}
