import {Queue} from 'bull';

export const FB_QUEUE = 'fb';

export interface Queues {
  [FB_QUEUE]: Queue;
}
