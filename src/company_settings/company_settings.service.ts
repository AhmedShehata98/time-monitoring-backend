import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateCompanySettingDto } from 'src/company_settings/dto/create-company-setting.dto'
import { UpdateCompanySettingDto } from 'src/company_settings/dto/update-company-setting.dto'
import { CompanySettings } from 'src/company_settings/entities/company_setting.entity'
import { Company } from 'src/companies/entities/company.entity'

@Injectable()
export class CompanySettingsService {
  constructor(
    @InjectRepository(CompanySettings)
    private companySettingRepository: Repository<CompanySettings>,
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async create(
    createCompanySettingDto: CreateCompanySettingDto,
  ): Promise<CompanySettings> {
    try {
      const companyExists = await this.companyRepository.exists({
        where: { id: createCompanySettingDto.companyId },
      })

      if (!companyExists) {
        throw new NotFoundException(
          `Company with ID ${createCompanySettingDto.companyId} not found`,
        )
      }

      const newSetting = this.companySettingRepository.create(
        createCompanySettingDto,
      )
      return await this.companySettingRepository.save(newSetting)
    } catch (error) {
      throw new BadRequestException({
        message: 'Failed to create company setting',
        error: error?.message,
      })
    }
  }

  async findAll(): Promise<CompanySettings[]> {
    try {
      return await this.companySettingRepository.find()
    } catch (error) {
      throw new BadRequestException({
        message: 'Failed to fetch company settings',
        error: error?.message,
      })
    }
  }

  async findOne(id: string): Promise<CompanySettings> {
    const setting = await this.companySettingRepository.findOne({
      where: { id },
    })
    if (!setting) {
      throw new NotFoundException(`Company setting with ID ${id} not found`)
    }
    return setting
  }

  async update(
    id: string,
    updateCompanySettingDto: UpdateCompanySettingDto,
  ): Promise<CompanySettings> {
    const setting = await this.findOne(id)
    try {
      Object.assign(setting, updateCompanySettingDto)
      return await this.companySettingRepository.save(setting)
    } catch (error) {
      throw new BadRequestException('Failed to update company setting')
    }
  }

  async remove(id: string): Promise<void> {
    const setting = await this.findOne(id)
    try {
      await this.companySettingRepository.remove(setting)
    } catch (error) {
      throw new BadRequestException('Failed to delete company setting')
    }
  }
}
