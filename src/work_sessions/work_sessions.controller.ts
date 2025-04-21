import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkSessionsService } from './work_sessions.service';
import { CreateWorkSessionDto } from './dto/create-work_session.dto';
import { UpdateWorkSessionDto } from './dto/update-work_session.dto';

@Controller('work-sessions')
export class WorkSessionsController {
  constructor(private readonly workSessionsService: WorkSessionsService) {}

  @Post()
  create(@Body() createWorkSessionDto: CreateWorkSessionDto) {
    return this.workSessionsService.create(createWorkSessionDto);
  }

  @Get()
  findAll() {
    return this.workSessionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workSessionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkSessionDto: UpdateWorkSessionDto) {
    return this.workSessionsService.update(+id, updateWorkSessionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workSessionsService.remove(+id);
  }
}
