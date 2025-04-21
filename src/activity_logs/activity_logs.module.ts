import { Module } from '@nestjs/common';
import { ActivityLogsService } from './activity_logs.service';
import { ActivityLogsController } from './activity_logs.controller';

@Module({
  controllers: [ActivityLogsController],
  providers: [ActivityLogsService],
})
export class ActivityLogsModule {}
