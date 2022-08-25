import {Injectable} from '@nestjs/common';
import {InjectQueue} from '@nestjs/bull';
import {Queue} from 'bull';
import {join} from 'path';
import glob from 'glob';

import {FB_QUEUE} from './types';

@Injectable()
export class JobService {
  constructor(@InjectQueue(FB_QUEUE) private fbQueue: Queue) {
    //
  }

  getQueues() {
    return {
      [FB_QUEUE]: this.fbQueue,
    };
  }

  /**
   * @method begin
   */
  begin() {
    glob(join(__dirname, 'registrar/**.js'), (err, files) => {
      for (const file of files) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const registree = require(file);
        if (registree && registree.default) {
          registree.default(this.getQueues());
        }
      }
    });
  }
}
