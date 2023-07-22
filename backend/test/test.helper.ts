import { createPool, Pool } from 'mysql2/promise';

export async function clearDB() {
  const pool: Pool = createPool({
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    connectionLimit: 10,
  });

  try {
    const tables = ['FRAME', 'PROJECT', 'TOKEN', 'USER'];
    await pool.execute(`SET FOREIGN_KEY_CHECKS=0;`);
    for (const table of tables) {
      await pool.execute(`TRUNCATE TABLE ${table};`);
    }
    await pool.execute(`SET FOREIGN_KEY_CHECKS=1;`);
  } catch (error) {
    console.log(error);
  }
}
