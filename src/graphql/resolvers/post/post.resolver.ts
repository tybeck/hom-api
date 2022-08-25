import {Query, Resolver} from '@nestjs/graphql';
import {forwardRef, Inject} from '@nestjs/common';

import {FbPost, FbPostDocument} from '@hoagiesonmain/shared-be';

import {PostService} from '@hom-module/posts-service';

@Resolver(() => FbPost)
export class PostResolver {
  constructor(@Inject(forwardRef(() => PostService)) private posts: PostService) {}

  @Query(() => [FbPost])
  async getPosts(): Promise<Pick<FbPostDocument[], keyof Array<FbPostDocument>>> {
    return this.posts.getPosts();
  }
}
