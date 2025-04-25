import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateCompanyPolicyDto } from './dto/create-company_policy.dto'
import { UpdateCompanyPolicyDto } from './dto/update-company_policy.dto'
import { CompanyPolicy } from './entities/company_policy.entity'
import { Company } from 'src/companies/entities/company.entity'

@Injectable()
export class CompanyPoliciesService {
  constructor(
    @InjectRepository(CompanyPolicy)
    private companyPolicyRepository: Repository<CompanyPolicy>,
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async create(
    createCompanyPolicyDto: CreateCompanyPolicyDto,
  ): Promise<CompanyPolicy> {
    try {
      const existCompany = await this.companyRepository.exists({
        where: { id: createCompanyPolicyDto.companyId },
      })

      if (!existCompany) {
        throw new NotFoundException(
          `Company with ID ${createCompanyPolicyDto.companyId} not found`,
        )
      }
      const newPolicy = this.companyPolicyRepository.create(
        createCompanyPolicyDto,
      )
      return await this.companyPolicyRepository.save(newPolicy)
    } catch (error) {
      console.error('Failed to create company policy:', error)
      throw new BadRequestException({
        message: 'Failed to create company policy',
        error: error?.message,
      })
    }
  }

  async findAll(companyId?: string): Promise<CompanyPolicy[]> {
    const query = this.companyPolicyRepository.createQueryBuilder('policy')

    if (companyId) {
      query.where('policy.companyId = :companyId', { companyId })
    }

    return await query.getMany()
  }

  async findOne(id: string): Promise<CompanyPolicy> {
    const policy = await this.companyPolicyRepository.findOne({ where: { id } })

    if (!policy) {
      throw new NotFoundException(`Company policy with ID ${id} not found`)
    }

    return policy
  }

  async update(
    id: string,
    updateCompanyPolicyDto: UpdateCompanyPolicyDto,
  ): Promise<CompanyPolicy> {
    const policy = await this.findOne(id)

    try {
      Object.assign(policy, updateCompanyPolicyDto)
      return await this.companyPolicyRepository.save(policy)
    } catch (error) {
      throw new BadRequestException('Failed to update company policy')
    }
  }

  async remove(id: string): Promise<void> {
    const policy = await this.findOne(id)

    try {
      await this.companyPolicyRepository.remove(policy)
    } catch (error) {
      throw new BadRequestException('Failed to delete company policy')
    }
  }
}
