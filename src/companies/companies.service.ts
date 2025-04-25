import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Company } from './entities/company.entity'
import { CreateCompanyDto } from './dto/create-company.dto'

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async createCompany(createCompanyDto: CreateCompanyDto): Promise<Company> {
    try {
      const exists = await this.companyRepository.findOne({
        where: { name: createCompanyDto.name },
      })
      if (exists) {
        throw new ConflictException('Company already exists')
      }
      // Create new company
      const company = this.companyRepository.create(createCompanyDto)
      const savedCompany = await this.companyRepository.save(company)

      return savedCompany
    } catch (error) {
      console.log('Failed to create company: ',error)
      throw new InternalServerErrorException({
        message: 'Failed to create company',
        error: error.message,
      })
    }
  }

  async deleteCompany(id: string): Promise<void> {
    try {
      const company = await this.companyRepository.findOne({
        where: { id },
        relations: ['employees'],
      })

      if (!company) {
        throw new NotFoundException('Company not found')
      }

      // Delete the company and its associated employees (cascade)
      await this.companyRepository.remove(company)
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error
      }
      throw new InternalServerErrorException('Failed to delete company')
    }
  }
}
