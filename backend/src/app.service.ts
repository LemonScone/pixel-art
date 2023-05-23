import { Inject, Injectable } from '@nestjs/common';
import { DB_CONNECTION } from './constants';
import { Pool, PoolConnection } from 'mysql2/promise';

@Injectable()
export class AppService {
  constructor(
    @Inject(DB_CONNECTION)
    private readonly connectionPool: Pool,
  ) {}

  async test(): Promise<void> {
    const connection: PoolConnection =
      await this.connectionPool.getConnection();

    try {
      const results = await connection.query('SELECT * FROM USER');
      console.log(results[0]);
    } catch (error) {
    } finally {
      connection.release();
    }
  }

  getHello(): string {
    return 'Hello World!';
  }
}
