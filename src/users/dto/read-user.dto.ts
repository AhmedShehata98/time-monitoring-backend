import { Exclude, Expose } from '@nestjs/class-transformer'

export class ReadUserDto {
  @Expose()
  id: string

  @Expose()
  email: string

  @Expose()
  fullName: string

  @Exclude() // Ensure password hash is never sent to the client
  passwordHash: string

  @Expose()
  createdAt: Date
}
