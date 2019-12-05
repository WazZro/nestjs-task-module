import { Logger } from '@nestjs/common';
import { CronJob } from 'cron';
import { CronJobParameter } from '../interfaces/cron-job-parameter';

export class Task extends CronJob {
  public name: string;
  public cronTime: any;

  get isRunning(): boolean {
    return !!this.running;
  }

  get cronSourceTime(): string {
    return this.cronTime.source;
  }

  get cronTimeZone(): string {
    return this.cronTime.zone;
  }

  get nextRunDate(): Date {
    return this.nextDate().toDate();
  }

  get lastRunDate(): Date {
    return this.lastDate() || null;
  }

  constructor(task: CronJobParameter) {
    super(task);
    this.name = task.name;
  }

  start() {
    super.start();
    Logger.log(`${this.name} is started`, 'TASKS');
  }

  stop() {
    super.stop();
    Logger.log(`${this.name} is stopped`, 'TASKS');
  }
}
