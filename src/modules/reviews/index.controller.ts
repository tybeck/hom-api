import {Controller, forwardRef, Get, Inject, UseGuards} from '@nestjs/common';

import {HomAuthGuard} from '@hom-module/auth/guard';
import {ReviewService} from './index.service';

@Controller('reviews')
export class ReviewController {
  constructor(@Inject(forwardRef(() => ReviewService)) private review: ReviewService) {}

  @UseGuards(HomAuthGuard)
  @Get('/')
  getReviews() {
    return this.review.getReviews();
  }
}
