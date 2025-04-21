import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkSessionDto } from './create-work_session.dto';

export class UpdateWorkSessionDto extends PartialType(CreateWorkSessionDto) {}
