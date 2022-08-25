import {Queue} from 'bull';

import {FB_PULL, FB_QUEUE, Queues} from '../types';

export default async function (queues: Queues) {
  const queue: Queue = queues[FB_QUEUE];
  if (queue) {
    await queue.add(FB_PULL, null, {
      repeat: {
        cron: process.env.FB_PULL_CRON,
      },
    });
  }
}
