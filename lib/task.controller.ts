import { Controller, Get, Param } from '@nestjs/common';
import { Task } from './common/task';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private service: TaskService) {}

  @Get()
  public getTasks(): Task[] {
    return this.service.getTasks();
  }

  @Get('/start/:taskName')
  public startTaskByName(@Param('taskName') taskName: string): Task {
    return this.service.startTask(taskName);
  }

  @Get('/stop/:taskName')
  public stopTaskByName(@Param('taskName') taskName: string): Task {
    return this.service.stopTask(taskName);
  }
}
