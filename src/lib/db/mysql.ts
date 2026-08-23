import mysql, { Pool, PoolOptions } from "mysql2/promise";

let pool: Pool | null = null;

export function getDbConfig(): PoolOptions {
  const host = process.env.DB_HOST || "db.us-losa1.bengt.wasmernet.com";
  const port = parseInt(process.env.DB_PORT || "16751", 10);
  const database = process.env.DB_NAME || "db_5322d8a7";
  const user = process.env.DB_USER || "user_76e4995e";
  const password = process.env.DB_PASSWORD || "pw_Vo1mIe0AaeFgkelyxiTAVQFkr7B2zYXh";
  const useSsl = process.env.DB_SSL !== "false";

  return {
    host,
    port,
    database,
    user,
    password,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: useSsl ? { rejectUnauthorized: false } : undefined,
  };
}

export function getDbPool(): Pool {
  if (!pool) {
    pool = mysql.createPool(getDbConfig());
  }
  return pool;
}

export async function query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
  const db = getDbPool();
  const [rows] = await db.query(sql, params);
  return rows as T[];
}

export async function execute(sql: string, params: any[] = []): Promise<any> {
  const db = getDbPool();
  const [result] = await db.execute(sql, params);
  return result;
}

export async function testConnection(): Promise<boolean> {
  try {
    const db = getDbPool();
    const [rows]: any = await db.query("SELECT 1 as connected");
    return rows && rows.length > 0 && rows[0].connected === 1;
  } catch (error) {
    console.error("Wasmer MySQL Connection Failed:", error);
    return false;
  }
}
