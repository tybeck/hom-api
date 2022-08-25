import {OnQueueActive, Process, Processor} from '@nestjs/bull';
import axios from 'axios';
import {Job} from 'bull';

import {FB_PULL, FB_QUEUE} from '../types';

@Processor(FB_QUEUE)
export class FbProcessor {
  @Process(FB_PULL)
  async pull(job: Job) {
    try {
      await axios.get(process.env.DO_FN_FB_PULL_URL, {
        headers: {
          'X-Require-Whisk-Auth': process.env.DO_FN_TOKEN,
        },
      });
      await job.moveToCompleted();
    } catch (e) {
      await job.moveToFailed({message: `Unexpected issue with job: ${FB_PULL}`});
    }
  }

  @OnQueueActive()
  onActive(job: Job) {
    console.log(`Processing job ${job.id} of type ${job.name} with data ${job.data}...`);
  }
}
