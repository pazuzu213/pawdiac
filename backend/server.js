require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const cron    = require('node-cron');

const { pool, initSchema } = require('./services/db');
const cosmic  = require('./services/cosmic');
const reading = require('./services/reading');

const app  = express();
const PORT = process.env.PORT || 3001;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── Auth helpers ─────────────────────────────────────────────────────────────
const JWT_SECRET = process.env.JWT_SECRET || 'change-me-in-production';

function signToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '90d' });
}

function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' });
  }
  try {
    const payload = jwt.verify(header.slice(7), JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// ─── Health ───────────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'pawdiac-backend', ts: new Date().toISOString() });
});

// ─── Auth routes ──────────────────────────────────────────────────────────────

// POST /api/auth/register
app.post('/api/auth/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });

  try {
    const hash = await bcrypt.hash(password, 12);
    const result = await pool.query(
      'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email, created_at',
      [email.toLowerCase().trim(), hash],
    );
    const user  = result.rows[0];
    const token = signToken(user.id);
    return res.status(201).json({ user, token });
  } catch (err) {
    if (err.code === '23505') return res.status(409).json({ error: 'Email already registered' });
    console.error('register error', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email.toLowerCase().trim()]);
    const user = result.rows[0];
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

    const token = signToken(user.id);
    return res.json({ user: { id: user.id, email: user.email, created_at: user.created_at }, token });
  } catch (err) {
    console.error('login error', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// ─── Dog routes ───────────────────────────────────────────────────────────────

// POST /api/dogs — create dog profile
app.post('/api/dogs', authMiddleware, async (req, res) => {
  const {
    name, birthday, breed, photo_url,
    energy_level = 5, attachment_style = 5,
    food_motivation = 5, sociability = 5, sensitivity = 5,
  } = req.body;

  if (!name || !birthday) return res.status(400).json({ error: 'name and birthday required' });

  try {
    // Compute static cosmic values at creation
    const sunSign        = cosmic.getSunSign(birthday);
    const lifePathNumber = cosmic.getLifePathNumber(birthday);
    const bYear          = new Date(birthday).getUTCFullYear();
    const chineseZodiac  = cosmic.getChineseZodiac(bYear);
    const nameNumerology = cosmic.getNameNumerology(name);

    const result = await pool.query(
      `INSERT INTO dogs
        (user_id, name, birthday, breed, photo_url,
         energy_level, attachment_style, food_motivation, sociability, sensitivity,
         sun_sign, life_path_number, chinese_zodiac, name_numerology)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
       RETURNING *`,
      [
        req.userId, name, birthday, breed, photo_url,
        energy_level, attachment_style, food_motivation, sociability, sensitivity,
        sunSign, lifePathNumber, chineseZodiac, nameNumerology,
      ],
    );
    return res.status(201).json({ dog: result.rows[0] });
  } catch (err) {
    console.error('create dog error', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/dogs/:id — get dog with cosmic profile
app.get('/api/dogs/:id', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM dogs WHERE id = $1 AND user_id = $2', [req.params.id, req.userId]);
    const dog = result.rows[0];
    if (!dog) return res.status(404).json({ error: 'Dog not found' });

    const cosmicProfile = await cosmic.buildCosmicProfile(dog);
    return res.json({ dog, cosmicProfile });
  } catch (err) {
    console.error('get dog error', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/dogs/:id/reading — get today's reading (generates if not cached)
app.get('/api/dogs/:id/reading', authMiddleware, async (req, res) => {
  const today = new Date().toISOString().split('T')[0];

  try {
    const dogResult = await pool.query('SELECT * FROM dogs WHERE id = $1 AND user_id = $2', [req.params.id, req.userId]);
    const dog = dogResult.rows[0];
    if (!dog) return res.status(404).json({ error: 'Dog not found' });

    // Check cache
    const cached = await pool.query(
      'SELECT * FROM readings WHERE dog_id = $1 AND date = $2',
      [dog.id, today],
    );

    if (cached.rows.length > 0) {
      return res.json({ reading: cached.rows[0].reading_json, cosmic: cached.rows[0].cosmic_snapshot, cached: true });
    }

    // Build profile + generate
    const cosmicProfile = await cosmic.buildCosmicProfile(dog);
    cosmicProfile.today.date = today;

    const readingData = await reading.generateReading(dog, cosmicProfile);

    // Cache in DB
    const insertResult = await pool.query(
      `INSERT INTO readings (dog_id, date, cosmic_snapshot, reading_json)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (dog_id, date) DO UPDATE SET reading_json = EXCLUDED.reading_json
       RETURNING *`,
      [dog.id, today, JSON.stringify(cosmicProfile), JSON.stringify(readingData)],
    );

    return res.json({ reading: readingData, cosmic: cosmicProfile, cached: false });
  } catch (err) {
    console.error('get reading error', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
});

// POST /api/dogs/:id/observations — log observation
app.post('/api/dogs/:id/observations', authMiddleware, async (req, res) => {
  const {
    reading_id, accuracy_rating,
    energy_level, mood, appetite, sociability: obs_sociability, free_text,
  } = req.body;

  const today = new Date().toISOString().split('T')[0];

  try {
    const dogResult = await pool.query('SELECT id FROM dogs WHERE id = $1 AND user_id = $2', [req.params.id, req.userId]);
    if (!dogResult.rows.length) return res.status(404).json({ error: 'Dog not found' });

    const result = await pool.query(
      `INSERT INTO observations
        (dog_id, reading_id, date, accuracy_rating, energy_level, mood, appetite, sociability, free_text)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
       RETURNING *`,
      [req.params.id, reading_id || null, today, accuracy_rating, energy_level, mood, appetite, obs_sociability, free_text],
    );
    return res.status(201).json({ observation: result.rows[0] });
  } catch (err) {
    console.error('create observation error', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/users/:id/dogs — list user's dogs
app.get('/api/users/:id/dogs', authMiddleware, async (req, res) => {
  // Users can only list their own dogs
  if (req.params.id !== req.userId) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  try {
    const result = await pool.query('SELECT * FROM dogs WHERE user_id = $1 ORDER BY created_at DESC', [req.userId]);
    return res.json({ dogs: result.rows });
  } catch (err) {
    console.error('list dogs error', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/apn/register — register APN device token
app.post('/api/apn/register', authMiddleware, async (req, res) => {
  const { device_token } = req.body;
  if (!device_token) return res.status(400).json({ error: 'device_token required' });
  try {
    await pool.query(
      `INSERT INTO apn_tokens (user_id, device_token) VALUES ($1, $2)
       ON CONFLICT (device_token) DO UPDATE SET user_id = EXCLUDED.user_id`,
      [req.userId, device_token],
    );
    return res.json({ ok: true });
  } catch (err) {
    console.error('apn register error', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// ─── Daily reading cron (8am UTC) ────────────────────────────────────────────
cron.schedule('0 8 * * *', async () => {
  console.log('🌙 Daily reading generation starting…');
  try {
    const dogsResult = await pool.query('SELECT * FROM dogs');
    const today = new Date().toISOString().split('T')[0];
    for (const dog of dogsResult.rows) {
      const existing = await pool.query(
        'SELECT id FROM readings WHERE dog_id = $1 AND date = $2',
        [dog.id, today],
      );
      if (existing.rows.length > 0) continue;

      const cosmicProfile = await cosmic.buildCosmicProfile(dog);
      cosmicProfile.today.date = today;
      const readingData = await reading.generateReading(dog, cosmicProfile);
      await pool.query(
        `INSERT INTO readings (dog_id, date, cosmic_snapshot, reading_json)
         VALUES ($1,$2,$3,$4) ON CONFLICT (dog_id, date) DO NOTHING`,
        [dog.id, today, JSON.stringify(cosmicProfile), JSON.stringify(readingData)],
      );
      console.log(`  ✅ Generated reading for ${dog.name}`);
    }
    console.log('🌙 Daily readings complete');
  } catch (err) {
    console.error('Daily cron error:', err);
  }
});

// ─── Start ────────────────────────────────────────────────────────────────────
async function start() {
  try {
    if (process.env.DATABASE_URL) {
      await initSchema();
    } else {
      console.warn('⚠️  DATABASE_URL not set — skipping schema init');
    }
    app.listen(PORT, () => {
      console.log(`🚀 Pawdiac backend running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Startup error:', err);
    process.exit(1);
  }
}

start();
