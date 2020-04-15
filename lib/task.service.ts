import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
  Optional,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CronJobParameter } from '.';
import { Task } from './common/task';
import { Instanceble } from './interfaces/instanceble';
import { TaskList } from './task-list.service';

@Injectable()
export class TaskService implements OnModuleInit, OnModuleDestroy {
  private tasks: Map<string, Task> = new Map();

  constructor(
    private taskListService: TaskList,
    @Optional() private instanceService: Instanceble,
  ) {}

  public async onModuleInit(): Promise<void> {
    for (const taskParam of this.taskListService.getTasks()) {
      this.tasks.set(taskParam.name, new Task(taskParam));
    }

    this.startTasks();
  }

  public onModuleDestroy(): void {
    this.stopTasks();
  }

  public getTasks(): Task[] {
    return Array.from(this.tasks.values());
  }

  /**
   * Start task by name
   * @param name - task name
   */
  public startTask(name: string): Task {
    const task = this.tasks.get(name);
    if (!task) return;
    task.start();

    return task;
  }

  /**
   * Stop task by name
   * @param name - task name
   */
  public stopTask(name: string): Task {
    const task = this.tasks.get(name);
    if (!task) return;
    task.stop();

    return task;
  }

  /**
   * Add new task.
   *
   * If task with the given name already exists, it will be replaced
   * @param taskParam - params for new task
   */
  public addTask(taskParam: CronJobParameter): Task {
    const task = new Task(taskParam);
    this.tasks.set(task.name, task);

    return task;
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

  public async startTasks(): Promise<void> {
    Logger.log('Tasks are starting', TaskService.name);
    const isMaster = await this.isMaster();
    if (isMaster) Logger.log('This instance is master', TaskService.name);

    for (const task of this.tasks.values()) {
      if (isMaster) task.start();

      this.instanceService?.on('master', () => task.start());

      this.instanceService?.on('slave', () => task.stop());
    }

    Logger.log('Tasks have been started', TaskService.name);
  }

  public stopTasks(): void {
    for (const task of this.tasks.values()) {
      task.stop();
    }

    Logger.log('Tasks were stopped', TaskService.name);
  }
}
