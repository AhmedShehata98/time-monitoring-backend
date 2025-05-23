import { Injectable } from '@nestjs/common';
import { CreateActivityLogDto } from './dto/create-activity_log.dto';
import { UpdateActivityLogDto } from './dto/update-activity_log.dto';

@Injectable()
export class ActivityLogsService {
  create(createActivityLogDto: CreateActivityLogDto) {
    return 'This action adds a new activityLog';
  }

  findAll() {
    return `This action returns all activityLogs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} activityLog`;
  }

  update(id: number, updateActivityLogDto: UpdateActivityLogDto) {
    return `This action updates a #${id} activityLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} activityLog`;
  }
}
