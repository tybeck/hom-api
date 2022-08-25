import {StrategyType} from './stategy.type';

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  accessToken: string;
  type: StrategyType;
};
