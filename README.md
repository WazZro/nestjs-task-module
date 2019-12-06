## Description

Task Module for [NestJS](https://github.com/nestjs/nest) using Cron

## Installation

```bash
$ npm install nest-task-module
```

Import task module to AppModule

```ts
import { Module } from '@nestjs/common';
import { TaskModule } from 'nest-task-module';
import { TaskName } from './tasks';

@Module({
  imports: [
    TaskModule.register({
      controller: true,
      tasks: [ TaskName ],
    }),
  ],
})
export class AppModule {}
```

API
==

### TaskModule
* `register`
  * `controller` - enable controller
  * `tasks` - [REQUIRED] array of tasks implementing `CronJobParameter`
  * `instanceble` - provider to determine the master instance
* `registerAsync`
  * `controller` - enable controller
  * `tasks` - [REQUIRED] array of tasks implementing `CronJobParameter`
  * `instanceble` - [PROMISE] provider to determine the master instance

### CronJobParameter
```ts
import { CronJobParameters } from 'cron';

interface CronJobParameter extends CronJobParameters {
  name: string;
}
```

### Task
```ts
class Task extends CronJob {
  public name: string;

  get isRunning(): boolean;
  get cronSourceTime(): string;
  get cronTimeZone(): string;
  get nextRunDate(): Date;
  get lastRunDate(): Date;

  constructor(task: CronJobParameter);
}
```
