import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, DataSource } from 'typeorm'
import { Company } from './entities/company.entity'
import { CreateCompanyDto } from './dto/create-company.dto'
import { User } from '../users/entities/user.entity'
import { CompanyEmployee } from '../company_employees/entities/company_employee.entity'
import { CompanyRole } from '../company_employees/enums/company-role.enum'
import { CompanyEmployeesService } from '../company_employees/company_employees.service'

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    @InjectRepository(CompanyEmployee)
    private readonly companyEmployeeRepository: Repository<CompanyEmployee>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly dataSource: DataSource,
    private readonly companyEmployeesService: CompanyEmployeesService, // Inject CompanyEmployeesService
  ) {}

  async create(
    createCompanyDto: CreateCompanyDto,
    creatorUserId: string,
  ): Promise<Company> {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      // 1. Fetch the creator User entity using creatorUserId
      const creatorUser = await queryRunner.manager.findOne(User, {
        where: { id: creatorUserId },
      })
      if (!creatorUser) {
        throw new InternalServerErrorException(
          `Creator user with ID ${creatorUserId} not found.`,
        )
      }

      // 2. Create the Company entity using createCompanyDto
      const newCompany = queryRunner.manager.create(Company, {
        name: createCompanyDto.name,
        // ... other company fields
      })
      const savedCompany = await queryRunner.manager.save(Company, newCompany)

      // 3. Create the CompanyEmployee record, linking creatorUser as OWNER
      const ownerAssociation = queryRunner.manager.create(CompanyEmployee, {
        company: savedCompany,
        user: creatorUser,
        role: CompanyRole.OWNER,
        // Add default required fields if necessary for CompanyEmployee
        // contractType: 'default', // Example
        // policyType: 'default', // Example
        // status: 'active', // Example
        // joinedAt: new Date(), // Example
      })
      await queryRunner.manager.save(CompanyEmployee, ownerAssociation)

      // 4. Commit the transaction
      await queryRunner.commitTransaction()

      return savedCompany
    } catch (error) {
      // 5. Rollback transaction on error
      await queryRunner.rollbackTransaction()
      console.error('Failed to create company and assign owner:', error)
      throw new InternalServerErrorException('Failed to create company.')
    } finally {
      // 6. Release the query runner
      await queryRunner.release()
    }
  }

  /**
   * Deletes a company.
   * Requires the actor to be an Owner of the company.
   * @param actorUserId - The ID of the user performing the action.
   * @param companyId - The ID of the company to delete.
   */
  async deleteCompany(actorUserId: string, companyId: string): Promise<void> {
    // 1. Authorization Check: Ensure the actor is an owner of this company.
    await this.companyEmployeesService.checkActorPermission(
      actorUserId,
      companyId,
      [CompanyRole.OWNER],
    )

    // 2. Perform Deletion
    // This command deletes the row in the 'companies' table.
    const deleteResult = await this.companyRepository.delete({ id: companyId })

    // 3. Check if the company was actually deleted
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Company with ID "${companyId}" not found.`)
    }
  }

  // ... other methods in CompaniesService (findAll, findOne, update, remove) ...
  // Update/Remove might also need permission checks via CompanyEmployeesService.checkActorPermission
}
