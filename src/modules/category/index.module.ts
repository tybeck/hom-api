import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {CategoryResolver} from '@hom-graphql/resolvers';
import {Category, CategorySchema} from '@hom-graphql/models';

import {CategoryService} from './index.service';

@Module({
  providers: [CategoryService, CategoryResolver],
  imports: [
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: CategorySchema,
        collection: Category.name.toLowerCase(),
      },
    ]),
  ],
  exports: [CategoryService],
})
export class CategoryModule {}
