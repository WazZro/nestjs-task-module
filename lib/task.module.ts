import { Module, Global, DynamicModule, Provider } from '@nestjs/common';
import { TaskModuleParam, TaskModuleParamAsync } from './interfaces/task-module';
import { TaskService } from './task.service';
import { TaskList } from './task-list.service';
import { APP_TASK_INSTANCEBLE } from '.';
import { TaskController } from './task.controller';

@Global()
@Module({})
export class TaskModule {
  public static register(params: TaskModuleParam): DynamicModule {
    const providers: Provider[] = [];
    const controllers = [];

    providers.push(
      TaskService,
      {
        provide: TaskList,
        useValue: new TaskList(params.tasks),
      },
    );

    if (params.instanceble) providers.push({
      provide: APP_TASK_INSTANCEBLE,
      useValue: params.instanceble,
    });

    if (params.controller) controllers.push(TaskController);

    return {
      module: this,
      providers,
      controllers,
      exports: [TaskService],
    };
  }

  public static registerAsync(params: TaskModuleParamAsync) {
    const providers: Provider[] = [];
    const controllers = [];

    providers.push(
      TaskService,
      {
        provide: TaskList,
        useValue: new TaskList(params.tasks),
      },
    );

    if (params.instanceble) providers.push({
      provide: APP_TASK_INSTANCEBLE,
      useFactory: async () => {
        const instance = await params.instanceble;
        return instance;
      },
    });

    if (params.controller) controllers.push(TaskController);

    return {
      module: this,
      providers,
      controllers,
      exports: [TaskService],
    };
  }
}
