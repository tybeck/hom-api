import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {LeanDocument, Model} from 'mongoose';

import {FbPost, FbPostDocument, IPost} from '@hoagiesonmain/shared-be';

@Injectable()
export class PostService {
  constructor(@InjectModel(FbPost.name) private posts: Model<FbPostDocument>) {}

  async getPosts(): Promise<LeanDocument<IPost[]>> {
    return this.posts.find().lean<IPost[]>().exec();
  }
}
