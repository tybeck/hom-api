import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {FbPost, FbPostSchema} from '@hoagiesonmain/shared-be';

import {PostResolver} from '@hom-graphql/resolvers';
import {getSharedCollectionName} from '@hom-module/utils';

import {PostController} from './index.controller';
import {PostService} from './index.service';

@Module({
  controllers: [PostController],
  providers: [PostService, PostResolver],
  imports: [
    MongooseModule.forFeature([
      {
        name: FbPost.name,
        schema: FbPostSchema,
        collection: getSharedCollectionName(FbPost.name),
      },
    ]),
  ],
})
export class PostModule {}
