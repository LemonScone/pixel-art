import { createPool, Pool, PoolConnection } from 'mysql2/promise';
import { DbQueryResult } from '../src/db/types';

export async function clearDB() {
  const pool: Pool = createPool({
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    connectionLimit: 10,
  });

  async function query<T>(
    sql: string,
    options?: unknown,
  ): Promise<DbQueryResult<T[]>> {
    const [result] = await pool.execute<DbQueryResult<T[]>>(sql, options);
    return result;
  }

  const connectionPool: PoolConnection = await pool.getConnection();
  try {
    const tables = ['FRAME', 'PROJECT', 'TOKEN', 'USER'];
    await query(`SET FOREIGN_KEY_CHECKS=0;`);
    for (const table of tables) {
      await query(`TRUNCATE TABLE ${table};`);
    }
    await query(`SET FOREIGN_KEY_CHECKS=1;`);
  } catch (error) {
  } finally {
    connectionPool.release();
  }
}
