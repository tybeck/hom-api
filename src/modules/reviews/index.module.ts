import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {FbReview, FbReviewSchema} from '@hoagiesonmain/shared-be';

import {ReviewResolver} from '@hom-graphql/resolvers';
import {getSharedCollectionName} from '@hom-module/utils';

import {ReviewController} from './index.controller';
import {ReviewService} from './index.service';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService, ReviewResolver],
  imports: [
    MongooseModule.forFeature([
      {
        name: FbReview.name,
        schema: FbReviewSchema,
        collection: getSharedCollectionName(FbReview.name),
      },
    ]),
  ],
})
export class ReviewModule {}
