// Import the necessary dependencies and the new DTO
import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CompanyEmployee } from './entities/company_employee.entity'
import { User } from '../users/entities/user.entity'
import { Company } from '../companies/entities/company.entity'
import { CompanyRole } from './enums/company-role.enum'
import { AssignEmployeeDto } from './dto/assign-employee.dto'
import { ContractType } from './enums/contract-type'
import { PolicyType } from './enums/policy-type'
import { Status } from './enums/status'

@Injectable()
export class CompanyEmployeesService {
  constructor(
    @InjectRepository(CompanyEmployee)
    private readonly companyEmployeeRepository: Repository<CompanyEmployee>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  /**
   * Assigns a user to a company as an employee
   * @param userId The ID of the user to assign
   * @param companyId The ID of the company
   * @param assignEmployeeDto The employee details
   * @returns The created company employee record
   */
  async assignEmployeeToCompany(
    userId: string,
    companyId: string,
    assignEmployeeDto: AssignEmployeeDto,
  ): Promise<CompanyEmployee> {
    // Find the user
    const user = await this.userRepository.findOne({ where: { id: userId } })
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`)
    }

    // Find the company
    const company = await this.companyRepository.findOne({
      where: { id: companyId },
    })
    if (!company) {
      throw new NotFoundException(`Company with ID ${companyId} not found`)
    }

    // Check if the user is already an employee of this company
    const existingEmployee = await this.companyEmployeeRepository.findOne({
      where: { user: { id: userId }, company: { id: companyId } },
    })

    if (existingEmployee) {
      throw new ConflictException(`User is already an employee of this company`)
    }

    // Create the company employee record
    const companyEmployee = this.companyEmployeeRepository.create({
      user,
      company,
      role: CompanyRole.EMPLOYEE,
      contractType: assignEmployeeDto.contractType,
      policyType: assignEmployeeDto.policyType,
      weeklyHours: assignEmployeeDto.weeklyHours,
      status: assignEmployeeDto.status,
      joinedAt: new Date(),
    })

    // Add hourlyRate only if provided (it's optional based on contractType)
    if (assignEmployeeDto.hourlyRate !== undefined) {
      companyEmployee.hourlyRate = assignEmployeeDto.hourlyRate
    }

    // Save and return the company employee record
    return this.companyEmployeeRepository.save(companyEmployee)
  }

  /**
   * Assigns a user to a company as an admin
   * @param userId The ID of the user to assign
   * @param companyId The ID of the company
   * @param assignEmployeeDto The employee details
   * @returns The created company employee record
   */
  async assignAdminToCompany(
    userId: string,
    companyId: string,
    assignEmployeeDto: AssignEmployeeDto,
  ): Promise<CompanyEmployee> {
    // Find the user
    const user = await this.userRepository.findOne({ where: { id: userId } })
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`)
    }

    // Find the company
    const company = await this.companyRepository.findOne({
      where: { id: companyId },
    })
    if (!company) {
      throw new NotFoundException(`Company with ID ${companyId} not found`)
    }

    // Check if the user is already associated with this company
    const existingEmployee = await this.companyEmployeeRepository.findOne({
      where: { user: { id: userId }, company: { id: companyId } },
    })

    if (existingEmployee) {
      throw new ConflictException(
        `User is already associated with this company`,
      )
    }

    // Create the company admin record
    const companyAdmin = this.companyEmployeeRepository.create({
      user,
      company,
      role: CompanyRole.ADMIN,
      contractType: assignEmployeeDto.contractType,
      policyType: assignEmployeeDto.policyType,
      weeklyHours: assignEmployeeDto.weeklyHours,
      status: assignEmployeeDto.status,
      joinedAt: new Date(),
    })

    // Add hourlyRate only if provided (it's optional based on contractType)
    if (assignEmployeeDto.hourlyRate !== undefined) {
      companyAdmin.hourlyRate = assignEmployeeDto.hourlyRate
    }

    // Save and return the company admin record
    return this.companyEmployeeRepository.save(companyAdmin)
  }

  /**
   * Assigns a user to a company as an OWNER
   * @param userId The ID of the user to assign
   * @param companyId The ID of the company
   * @returns The created company owner record
   */
  async assignOwnerToCompany(
    userId: string,
    companyId: string,
  ): Promise<CompanyEmployee> {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } })
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`)
      }
  
      // Find the company
      const company = await this.companyRepository.findOne({
        where: { id: companyId },
      })
      if (!company) {
        throw new NotFoundException(`Company with ID ${companyId} not found`)
      }
  
      // Check if the company already has an owner
      const existingOwner = await this.companyEmployeeRepository.findOne({
        where: {
          company: { id: companyId },
          role: CompanyRole.OWNER,
        },
      })
  
      if (existingOwner) {
        throw new ConflictException(`Company already has an owner`)
      }
  
      // Check if the user is already associated with this company
      const existingEmployee = await this.companyEmployeeRepository.findOne({
        where: { user: { id: userId }, company: { id: companyId } },
      })
  
      if (existingEmployee) {
        throw new ConflictException(
          `User is already associated with this company`,
        )
      }
  
      // Create the company owner record
      const companyOwner = this.companyEmployeeRepository.create({
        user,
        company,
        role: CompanyRole.OWNER,
        contractType: ContractType.FULL_TIME, // Default values for owner
        policyType: PolicyType.FLEXIBLE,
        weeklyHours: 40,
        status: Status.ACTIVE,
        joinedAt: new Date(),
      })
  
      // Save and return the company owner record
      return this.companyEmployeeRepository.save(companyOwner)
    } catch (error) {
      throw new InternalServerErrorException({
        message:`An error occurred while assigning the owner`,
        error: error.message,
      })  
    }
    
  
  }

  /**
   * Changes the role of an existing company member (between ADMIN and EMPLOYEE)
   * @param userId The ID of the user to update
   * @param companyId The ID of the company
   * @param newRole The new role to assign (ADMIN or EMPLOYEE)
   * @returns The updated company employee record
   *
   * TODO: Add authorization layer to ensure only OWNER role can perform this action
   */
  async changeCompanyMemberRole(
    userId: string,
    companyId: string,
    newRole: CompanyRole,
  ): Promise<CompanyEmployee> {
    // Validate that newRole is a valid role (ADMIN or EMPLOYEE)
    if (newRole !== CompanyRole.ADMIN && newRole !== CompanyRole.EMPLOYEE) {
      throw new BadRequestException(
        `Invalid role: ${newRole}. Role must be either ADMIN or EMPLOYEE.`,
      )
    }

    // Find the company employee record
    const companyEmployee = await this.companyEmployeeRepository.findOne({
      where: {
        user: { id: userId },
        company: { id: companyId },
      },
      relations: ['user', 'company'],
    })

    if (!companyEmployee) {
      throw new NotFoundException(
        `User with ID ${userId} is not a member of company with ID ${companyId}`,
      )
    }

    // Prevent changing role if the user is an OWNER
    if (companyEmployee.role !== CompanyRole.OWNER) {
      throw new ForbiddenException(
        'Cannot change the role of a company its for a owner',
      )
    }

    // Update the role
    companyEmployee.role = newRole

    // Save and return the updated record
    return this.companyEmployeeRepository.save(companyEmployee)
  }
}
