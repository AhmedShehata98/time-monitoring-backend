import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CompanyEmployee } from '../company_employees/entities/company_employee.entity'
import { CompanyRole } from 'src/company_employees/enums/company-role.enum'

@Injectable()
export class AuthorizationService {
  constructor(
    @InjectRepository(CompanyEmployee)
    private readonly companyEmployeeRepository: Repository<CompanyEmployee>,
  ) {}

  /**
   * Checks if a user has the required role within their company.
   * @param userId The ID of the user to check.
   * @param requiredRole The role required for the action.
   * @returns True if the user has the required role, false otherwise.
   */
  async isAuthorized(
    userId: string,
    requiredRole: CompanyRole[],
  ): Promise<boolean> {
    try {
      const employee = await this.companyEmployeeRepository.findOne({
        where: {
          user: {
            id: userId,
          },
        },
      })

      if (!employee) {
        console.warn(
          `Authorization check failed: No CompanyEmployee record found for user ID: ${userId}`,
        )
        throw new NotFoundException(
          `Employee record not found for user ID: ${userId}`,
        )
      }

      // Check if the employee's role matches the required role
      return requiredRole.includes(employee.role)
    } catch (error) {
      console.error('Fetch employee failed while authorization:', error)
      throw new InternalServerErrorException(
        'Fetch employee failed while authorization',
      )
    }
  }
}
