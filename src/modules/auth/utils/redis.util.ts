import {createClient} from 'redis';

import {RedisClient} from '@hom-module/auth/types';

export function createRedisFactory() {
  return async (): Promise<RedisClient> => {
    const client = createClient({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    });
    Object.assign(client, {
      getAsync: (key: string): Promise<string | null> => {
        return new Promise((resolve, reject) => {
          client.get(key, (err, value) => {
            if (err) {
              return reject(err);
            }
            return resolve(value);
          });
        });
      },
      setAsync: (
        key: string,
        value: string,
        mode: string,
        duration: number,
      ): Promise<boolean | null> => {
        return new Promise((resolve, reject) => {
          client.set(key, value, mode, duration, (err) => {
            if (err) {
              return reject(err);
            }
            return resolve(true);
          });
        });
      },
      delAsync: (key: string): Promise<boolean | null> => {
        return new Promise((resolve, reject) => {
          client.del(key, (err) => {
            if (err) {
              return reject(err);
            }
            return resolve(true);
          });
        });
      },
    });
    return client as RedisClient;
  };
}
