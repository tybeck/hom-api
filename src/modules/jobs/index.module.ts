import {forwardRef, Inject, Module, OnModuleInit} from '@nestjs/common';
import {BullModule} from '@nestjs/bull';

import {FbProcessor} from './processors/fb.processor';
import {JobService} from './index.service';
import {FB_QUEUE} from './types';

@Module({
  providers: [JobService, FbProcessor],
  imports: [
    BullModule.registerQueue({
      name: FB_QUEUE,
    }),
  ],
  exports: [],
})
export class JobModule implements OnModuleInit {
  constructor(@Inject(forwardRef(() => JobService)) private jobs: JobService) {}

  onModuleInit() {
    return this.jobs.begin();
  }
}
