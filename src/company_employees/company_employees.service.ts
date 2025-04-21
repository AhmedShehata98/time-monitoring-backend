import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CompanyEmployee } from './entities/company_employee.entity'
import { User } from '../users/entities/user.entity'
import { Company } from '../companies/entities/company.entity'
import { CompanyRole } from './enums/company-role.enum' // Import the enum

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
   * Checks if the actor (user performing the action) has one of the allowed roles
   * within the specified company. Throws ForbiddenException if not authorized.
   * This is a private helper method called by public service methods requiring authorization.
   * @param actorUserId - The ID of the user performing the action.
   * @param companyId - The ID of the company context for the action.
   * @param allowedRoles - An array of CompanyRole enum values that grant permission. // Updated type hint
   * @throws {ForbiddenException} If the actor does not have the required permission.
   * @private
   */
  async checkActorPermission(
    actorUserId: string,
    companyId: string,
    allowedRoles: CompanyRole[],
  ): Promise<void> {
    // Use CompanyRole[] type
    // console.log(`Checking permission for actor ${actorUserId} in company ${companyId} for roles: ${allowedRoles.join(', ')}`);

    const actorAssociation = await this.companyEmployeeRepository.findOne({
      where: {
        user: { id: actorUserId },
        company: { id: companyId },
      },
    })

    // console.log('Found actor association:', actorAssociation);

    // If no association exists, or if the actor's role is not in the allowed list
    // Note: The role in the database is still a string ('owner', 'admin', etc.)
    // The enum values match these strings, so the .includes check works directly.
    if (
      !actorAssociation ||
      !allowedRoles.includes(actorAssociation.role as CompanyRole)
    ) {
      // Cast role to CompanyRole for includes check if needed, though direct string comparison works here
      // console.warn(`Permission denied for actor ${actorUserId} in company ${companyId}. Found role: ${actorAssociation?.role}, Allowed: ${allowedRoles.join(', ')}`);
      throw new ForbiddenException(
        `Actor does not have sufficient privileges (${allowedRoles.join('/')}) within the company.`,
      )
    }

    // console.log(`Permission granted for actor ${actorUserId} in company ${companyId}.`);
  }

  // --- Methods using the permission check ---

  // Example: assignOwner - requires the actor to be an OWNER
  async assignOwner(
    actorUserId: string,
    userId: string,
    companyId: string,
    details: Partial<CompanyEmployee>,
  ): Promise<CompanyEmployee> {
    // 1. Authorization Check: Ensure the actor is an owner of this company.
    await this.checkActorPermission(actorUserId, companyId, [CompanyRole.OWNER]) // Use enum value

    // 2. Proceed with validation and assignment logic
    return this.assignUserToCompany({
      companyId,
      userId,
      details,
    })
  }

  // Example: assignAdmin - requires the actor to be an OWNER or ADMIN
  async assignAdmin({
    companyId,
    userId,
    details,
  }: {
    userId: string
    companyId: string
    details: Omit<
      CompanyEmployee,
      'id' | 'company' | 'user' | 'invitedAt' | 'joinedAt' | 'role'
    >
  }): Promise<CompanyEmployee> {
    // 1. Authorization Check: Ensure the actor is an owner or admin of this company.
    // code ...
    //

    // 2. Proceed with validation and assignment logic
    return this.assignUserToCompany({
      companyId,
      userId,
      details: {
        ...details,
        role: CompanyRole.ADMIN,
      },
    })
  }

  /**
   * Private method to handle the core logic of validating and creating the association.
   * Called *after* permission checks in the public methods.
   */
  private async assignUserToCompany({
    companyId,
    userId,
    details,
  }: {
    userId: string
    companyId: string
    details: Partial<CompanyEmployee>
  }): Promise<CompanyEmployee> {
    // ... validation for user and company ...
    // 1. Validate User exists
    const user = await this.userRepository.findOne({ where: { id: userId } })
    if (!user) {
      throw new NotFoundException(`User with ID "${userId}" not found.`)
    }

    // 2. Validate Company exists
    const company = await this.companyRepository.findOne({
      where: { id: companyId },
    })
    if (!company) {
      throw new NotFoundException(`Company with ID "${companyId}" not found.`)
    }

    // 3. Check if association already exists
    const existingAssociation = await this.companyEmployeeRepository.findOne({
      where: { user: { id: userId }, company: { id: companyId } },
    })
    if (existingAssociation) {
      throw new ConflictException(
        `User "${userId}" is already associated with company "${companyId}".`,
      )
    }

    // 4. Create the CompanyEmployee record
    const newAssociation = this.companyEmployeeRepository.create({
      user: user,
      company: company,
      role: CompanyRole.EMPLOYEE,
      ...details,
    })

    // 5. Save the record
    try {
      return await this.companyEmployeeRepository.save(newAssociation)
    } catch (error) {
      console.error('Failed to save company employee association:', error)
      throw new InternalServerErrorException(
        'Could not assign user to company.',
      )
    }
  }

  async assignEmployee({
    companyId,
    userId,
    details,
  }: {
    userId: string
    companyId: string
    details: Partial<CompanyEmployee>
  }) {
    await this.checkActorPermission(userId, companyId, [
      CompanyRole.ADMIN,
      CompanyRole.OWNER,
    ])
    return this.assignUserToCompany({ userId, companyId, details })
  }
}
