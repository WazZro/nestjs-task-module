import { CronJobParameters } from 'cron';

export interface CronJobParameter extends CronJobParameters {
  name: string;
}
