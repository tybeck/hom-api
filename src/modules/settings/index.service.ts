import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {LeanDocument, Model} from 'mongoose';

import {ISetting, Setting, SettingDocument} from '@hom-graphql/models';

@Injectable()
export class SettingService {
  constructor(@InjectModel(Setting.name) private setting: Model<SettingDocument>) {}

  async getSettings(): Promise<LeanDocument<ISetting[]>> {
    return this.setting.find().lean<ISetting[]>().exec();
  }
}
