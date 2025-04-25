import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthorizationService } from '../../authorization/authorization.service'
import { CompanyRole } from '../../company_employees/enums/company-role.enum'
import { JwtPayload } from 'src/authentication/types/jwt-payload'
import { ROLES_KEY } from '../decorators/roles.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authorizationService: AuthorizationService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<CompanyRole[]>(
      ROLES_KEY,
      context.getHandler(),
    )
    if (!roles) {
      return true
    }
    const request = context
      .switchToHttp()
      .getRequest<Request & { user: JwtPayload }>()
    const user = request.user
    return this.authorizationService.isAuthorized(user.userId, roles)
  }
}
