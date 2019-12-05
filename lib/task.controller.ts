import { Controller, Get } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private service: TaskService) {}

  @Get()
  getTasks() {
    return this.service.getTasks();
  }
}
