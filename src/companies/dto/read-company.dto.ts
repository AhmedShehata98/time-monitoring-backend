import { Expose } from '@nestjs/class-transformer'

export class ReadCompanyDto {
  @Expose()
  id: string

  @Expose()
  name: string

  // We might expose createdBy ID or a nested User DTO later if needed
  // @Expose()
  // createdById: string;

  @Expose()
  createdAt: Date
}
