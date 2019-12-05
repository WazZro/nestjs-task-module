import { CronJobParameter } from '../lib';

export const TestTask: CronJobParameter = {
  name: 'TestTask',
  cronTime: '0 * * * * *',
  onTick: () => {
    // tslint:disable-next-line: no-console
    console.log('Test task is working');
  },
};
