import { Injectable } from '@nestjs/common';
import { DbQueryResult } from './types';
import { Pool, PoolConnection, createPool } from 'mysql2/promise';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DbService {
  pool: Pool;
  constructor(private configService: ConfigService) {
    this.pool = createPool({
      host: this.configService.get<string>('DATABASE_HOST'),
      port: parseInt(this.configService.get<string>('DATABASE_PORT'), 10),
      user: this.configService.get<string>('DATABASE_USER'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
      database: this.configService.get<string>('DATABASE_NAME'),
      connectionLimit: 10,
      namedPlaceholders: true,
    });
  }

  async query<T>(sql: string, values?: unknown): Promise<DbQueryResult<T[]>> {
    const [result] = await this.pool.query<DbQueryResult<T[]>>(sql, values);
    return result;
  }

  async execute<T>(sql: string, values?: unknown): Promise<DbQueryResult<T[]>> {
    const [result] = await this.pool.execute<DbQueryResult<T[]>>(sql, values);
    return result;
  }

  async beginTransaction() {
    const conn = await this.pool.getConnection();
    await conn.beginTransaction();
    return conn;
  }

  async commit(connection: PoolConnection): Promise<void> {
    await connection.commit();
    connection.release();
  }

  async rollback(connection: PoolConnection): Promise<void> {
    await connection.rollback();
    connection.release();
  }
}
