import { Instanceble } from './instanceble';
import { CronJobParameter } from './cron-job-parameter';

export interface TaskModuleParam {
  instanceble?: Instanceble;
  controller?: boolean;
  tasks: CronJobParameter[];
}

export interface TaskModuleParamAsync {
  instanceble?: Promise<Instanceble>;
  controller?: boolean;
  tasks: CronJobParameter[];
}
