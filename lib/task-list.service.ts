import { CronJobParameter } from './interfaces/cron-job-parameter';

export class TaskList {
  private tasks: CronJobParameter[];

  constructor(tasks: CronJobParameter[]) {
    this.tasks = tasks;
  }

  public getTasks(): CronJobParameter[] {
    return this.tasks;
  }
}
