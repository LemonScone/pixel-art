import { ConfigService } from '@nestjs/config';
import { createPool, Pool } from 'mysql2/promise';
import { DB_CONNECTION } from '../constants';

export const dbProvider = {
  provide: DB_CONNECTION,
  inject: [ConfigService],
  useFactory: async (config: ConfigService): Promise<Pool> => {
    const pool: Pool = createPool({
      host: config.get<string>('DATABASE_HOST'),
      port: parseInt(config.get<string>('DATABASE_PORT'), 10),
      user: config.get<string>('DATABASE_USER'),
      password: config.get<string>('DATABASE_PASSWORD'),
      database: config.get<string>('DATABASE_NAME'),
      connectionLimit: 10,
    });

    return pool;
  },
};
