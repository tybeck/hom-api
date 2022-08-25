import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {LeanDocument, Model} from 'mongoose';

import {FbReview, FbReviewDocument, IReview} from '@hoagiesonmain/shared-be';

@Injectable()
export class ReviewService {
  constructor(@InjectModel(FbReview.name) private reviews: Model<FbReviewDocument>) {}

  async getReviews(): Promise<LeanDocument<IReview[]>> {
    return this.reviews.find().lean<IReview[]>().exec();
  }
}
