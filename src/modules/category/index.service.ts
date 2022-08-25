import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {LeanDocument, Model} from 'mongoose';

import {ICategory, Category, CategoryDocument} from '@hom-graphql/models';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category.name) private category: Model<CategoryDocument>) {}

  async getCategories(): Promise<LeanDocument<ICategory[]>> {
    return this.category.find().lean<ICategory[]>().exec();
  }
}
