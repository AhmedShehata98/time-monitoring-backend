import { SetMetadata } from '@nestjs/common';
import { CompanyRole } from '../../company_employees/enums/company-role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: CompanyRole[]) => SetMetadata(ROLES_KEY, roles);