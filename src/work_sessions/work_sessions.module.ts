import { Module } from '@nestjs/common';
import { WorkSessionsService } from './work_sessions.service';
import { WorkSessionsController } from './work_sessions.controller';

@Module({
  controllers: [WorkSessionsController],
  providers: [WorkSessionsService],
})
export class WorkSessionsModule {}
