import { createPool, Pool } from 'mysql2/promise';
import { DB_CONNECTION } from 'src/constants';

export const dbProvider = {
  provide: DB_CONNECTION,
  useFactory: async (): Promise<Pool> => {
    const pool: Pool = createPool({
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      connectionLimit: 10,
    });

    return pool;
  },
};
