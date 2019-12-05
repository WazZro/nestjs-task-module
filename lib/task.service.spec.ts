import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { TaskList } from './task-list.service';
import { Logger } from '@nestjs/common';
import { Instanceble } from './interfaces/instanceble';
import { APP_TASK_INSTANCEBLE } from '.';

class Instance extends Instanceble {
  isMaster(): boolean {
    return true;
  }
}

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(async () => {
    const tasks = new TaskList([
      {
        name: 'test',
        cronTime: '*/5 * * * *',
        onTick: () => Logger.log('It works!'),
      },
    ]);

    const instance = new Instance();
    const getInstance = async () => {
      return new Instance();
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: TaskList,
          useValue: tasks,
        },
        {
          provide: APP_TASK_INSTANCEBLE,
          useFactory: async () => {
            const ins = await getInstance();
            return ins;
          },
        },
      ],
    }).compile();

    await module.init();
    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have tasks', () => {
    const tasks = service.getTasks();
    expect(tasks).toHaveLength(1);
  });

  it('should instaceble be defined', () => {
    const ins = (service as any).instanceService;
    expect(ins).toBeDefined();
  });
});
