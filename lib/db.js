import fs from 'node:fs';
import path from 'node:path';
import { neon } from '@neondatabase/serverless';

function loadLocalEnv() {
  const envPath = path.join(process.cwd(), '.env.local');
  if (!fs.existsSync(envPath)) return;

  const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    if (!line || line.trim().startsWith('#')) continue;

    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match) continue;

    const [, key, rawValue] = match;
    const value = rawValue.trim();
    const cleaned = value.startsWith('"') && value.endsWith('"')
      ? value.slice(1, -1)
      : value.startsWith("'") && value.endsWith("'")
        ? value.slice(1, -1)
        : value;

    if (!process.env[key]) {
      process.env[key] = cleaned;
    }
  }
}

loadLocalEnv();

export const sql = neon(process.env.DATABASE_URL || '');
