const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

async function initSchema() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE EXTENSION IF NOT EXISTS pgcrypto;

      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS dogs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id),
        name TEXT NOT NULL,
        birthday DATE NOT NULL,
        breed TEXT,
        photo_url TEXT,
        -- 5 personality traits (1-10 scale)
        energy_level INTEGER DEFAULT 5,
        attachment_style INTEGER DEFAULT 5,
        food_motivation INTEGER DEFAULT 5,
        sociability INTEGER DEFAULT 5,
        sensitivity INTEGER DEFAULT 5,
        -- computed cosmic profile (stored at creation)
        sun_sign TEXT,
        life_path_number INTEGER,
        chinese_zodiac TEXT,
        name_numerology INTEGER,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS readings (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        dog_id UUID REFERENCES dogs(id),
        date DATE NOT NULL,
        cosmic_snapshot JSONB,
        reading_json JSONB,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(dog_id, date)
      );

      CREATE TABLE IF NOT EXISTS observations (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        dog_id UUID REFERENCES dogs(id),
        reading_id UUID REFERENCES readings(id),
        date DATE NOT NULL,
        accuracy_rating INTEGER,
        energy_level TEXT,
        mood TEXT,
        appetite TEXT,
        sociability TEXT,
        free_text TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS apn_tokens (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id),
        device_token TEXT UNIQUE NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    console.log('✅ Database schema initialized');
  } finally {
    client.release();
  }
}

module.exports = { pool, initSchema };
