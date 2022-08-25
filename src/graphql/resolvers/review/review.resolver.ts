import {Query, Resolver} from '@nestjs/graphql';
import {forwardRef, Inject} from '@nestjs/common';

import {FbReview, FbReviewDocument} from '@hoagiesonmain/shared-be';

import {ReviewService} from '@hom-module/reviews-service';

@Resolver(() => FbReview)
export class ReviewResolver {
  constructor(@Inject(forwardRef(() => ReviewService)) private reviews: ReviewService) {}

  @Query(() => [FbReview])
  async getReviews(): Promise<Pick<FbReviewDocument[], keyof Array<FbReviewDocument>>> {
    return this.reviews.getReviews();
  }
}
