import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { JwtPayload } from 'src/authentication/types/jwt-payload'

export const User = createParamDecorator(
  (data: keyof JwtPayload | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request & { user: JwtPayload }>()
    const user = request?.user ?? {}
    return data ? user?.[data] : user
  },
)
