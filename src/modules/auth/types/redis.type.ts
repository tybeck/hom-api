import {RedisClient as Client} from 'redis';

export type RedisAsync = {
  getAsync: (key: string) => Promise<string | null>;
  setAsync: (key: string, value: string, mode: string, duration: number) => Promise<boolean | null>;
  delAsync: (key: string) => Promise<boolean | null>;
};
export type RedisClient = Client & RedisAsync;
