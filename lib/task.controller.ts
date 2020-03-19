import { Controller, Get, Param } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private service: TaskService) {}

  @Get()
  getTasks() {
    return this.service.getTasks();
  }

  @Get('/start/:taskName')
  startTaskByName(@Param('taskName') taskName: string) {
    return this.service.startTask(taskName);
  }

  @Get('/stop/:taskName')
  stopTaskByName(@Param('taskName') taskName: string) {
    return this.service.startTask(taskName);
  }
}
