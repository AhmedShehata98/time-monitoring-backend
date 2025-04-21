import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { JwtPayload } from 'src/authentication/types/jwt-payload'

export const User = createParamDecorator(
  (data: keyof JwtPayload | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<unknown>()
    const user = request as JwtPayload

    return data ? user?.[data] : user
  },
)
