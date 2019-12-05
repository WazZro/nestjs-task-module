import { Injectable, Optional, OnModuleInit, Inject, Logger } from '@nestjs/common';
import { TaskList } from './task-list.service';
import { Task } from './common/task';
import { Instanceble } from './interfaces/instanceble';
import { APP_TASK_INSTANCEBLE } from '.';
import { Observable } from 'rxjs';

@Injectable()
export class TaskService implements OnModuleInit {
  private tasks: Map<string, Task> = new Map();

  constructor(
    private taskListService: TaskList,
    @Optional() @Inject(APP_TASK_INSTANCEBLE) private instanceService: Instanceble,
  ) {}

  public async onModuleInit() {
    for (const taskParam of this.taskListService.getTasks()) {
      this.tasks.set(taskParam.name, new Task(taskParam));
    }

    this.startTasks();
  }

  public getTasks(): Task[] {
    return Array.from(this.tasks.values());
  }

  public startTask(name: string) {
    const task = this.tasks.get(name);
    if (!task) return;
    task.start();
  }

  public stopTask(name: string) {
    const task = this.tasks.get(name);
    if (!task) return;
    task.stop();
  }

  private async isMaster(): Promise<boolean> {
    if (!this.instanceService) return true;

    const isMaster = this.instanceService.isMaster();
    if (isMaster instanceof Promise) {
      return await isMaster;
    } else if (isMaster instanceof Observable) {
      return await isMaster.toPromise();
    } else {
      return isMaster;
    }
  }

  public async startTasks() {
    Logger.log('Tasks are starting', TaskService.name);
    const isMaster = await this.isMaster();
    if (isMaster)
      Logger.log('This instance is master', TaskService.name);

    for (const task of this.tasks.values()) {
      if (isMaster) task.start();

      this.instanceService?.on('master', () => task.start());

      this.instanceService?.on('slave', () => task.stop());
    }

    Logger.log('Tasks are started', TaskService.name);
  }

  public stopTasks(): void {
    for (const task of this.tasks.values()) {
      task.stop();
    }
  }
}
