const swisseph = require('swisseph');
const path = require('path');

// Use bundled ephemeris data if available
try {
  swisseph.swe_set_ephe_path(path.join(__dirname, '../ephe'));
} catch (e) {
  // Use default path; non-fatal
}

// ────────────────────────────────────────────
// Static calculations
// ────────────────────────────────────────────

/**
 * Returns the Western zodiac sun sign from a birthdate string (YYYY-MM-DD or Date).
 */
function getSunSign(birthdate) {
  const d = new Date(birthdate);
  const month = d.getUTCMonth() + 1; // 1-12
  const day = d.getUTCDate();

  const signs = [
    { sign: 'Capricorn',  start: [1,  1],  end: [1,  19] },
    { sign: 'Aquarius',   start: [1,  20], end: [2,  18] },
    { sign: 'Pisces',     start: [2,  19], end: [3,  20] },
    { sign: 'Aries',      start: [3,  21], end: [4,  19] },
    { sign: 'Taurus',     start: [4,  20], end: [5,  20] },
    { sign: 'Gemini',     start: [5,  21], end: [6,  20] },
    { sign: 'Cancer',     start: [6,  21], end: [7,  22] },
    { sign: 'Leo',        start: [7,  23], end: [8,  22] },
    { sign: 'Virgo',      start: [8,  23], end: [9,  22] },
    { sign: 'Libra',      start: [9,  23], end: [10, 22] },
    { sign: 'Scorpio',    start: [10, 23], end: [11, 21] },
    { sign: 'Sagittarius',start: [11, 22], end: [12, 21] },
    { sign: 'Capricorn',  start: [12, 22], end: [12, 31] },
  ];

  for (const s of signs) {
    const afterStart = month > s.start[0] || (month === s.start[0] && day >= s.start[1]);
    const beforeEnd  = month < s.end[0]   || (month === s.end[0]   && day <= s.end[1]);
    if (afterStart && beforeEnd) return s.sign;
  }
  return 'Capricorn';
}

/**
 * Pythagorean numerology life path number from birthdate.
 */
function getLifePathNumber(birthdate) {
  const d = new Date(birthdate);
  const digits = `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, '0')}${String(d.getUTCDate()).padStart(2, '0')}`;
  return reduceToSingleDigit(digits.split('').reduce((sum, ch) => sum + parseInt(ch, 10), 0));
}

function reduceToSingleDigit(n) {
  while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
    n = String(n).split('').reduce((sum, ch) => sum + parseInt(ch, 10), 0);
  }
  return n;
}

/**
 * Chinese zodiac based on birth year.
 */
function getChineseZodiac(year) {
  const animals = [
    'Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake',
    'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig',
  ];
  return animals[(year - 1900) % 12];
}

/**
 * Pythagorean name numerology (sum of letter values, reduced).
 */
function getNameNumerology(name) {
  const map = {
    a:1, b:2, c:3, d:4, e:5, f:6, g:7, h:8, i:9,
    j:1, k:2, l:3, m:4, n:5, o:6, p:7, q:8, r:9,
    s:1, t:2, u:3, v:4, w:5, x:6, y:7, z:8,
  };
  const total = name.toLowerCase().replace(/[^a-z]/g, '').split('')
    .reduce((sum, ch) => sum + (map[ch] || 0), 0);
  return reduceToSingleDigit(total);
}

// ────────────────────────────────────────────
// Swisseph helpers
// ────────────────────────────────────────────

const ZODIAC_SIGNS = [
  'Aries','Taurus','Gemini','Cancer','Leo','Virgo',
  'Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces',
];

function signFromLongitude(lon) {
  return ZODIAC_SIGNS[Math.floor(((lon % 360) + 360) % 360 / 30)];
}

/**
 * Convert a JS Date to Julian Day Number (UT).
 */
function dateToJD(date) {
  const d = new Date(date);
  const year  = d.getUTCFullYear();
  const month = d.getUTCMonth() + 1;
  const day   = d.getUTCDate() + d.getUTCHours() / 24 + d.getUTCMinutes() / 1440;
  const result = swisseph.swe_julday(year, month, day, swisseph.SE_GREG_CAL);
  return result;
}

/**
 * Get longitude of a planet at a given JD.
 * Returns { longitude, sign } or null on error.
 */
function getPlanetPosition(jd, planet) {
  return new Promise((resolve) => {
    swisseph.swe_calc_ut(jd, planet, swisseph.SEFLG_SPEED, (result) => {
      if (result.error) {
        resolve(null);
      } else {
        const lon = result.longitude;
        resolve({ longitude: lon, sign: signFromLongitude(lon), speed: result.longitudeSpeed || 0 });
      }
    });
  });
}

/**
 * Determine moon phase from sun/moon longitudes.
 */
function getMoonPhaseFromLongitudes(sunLon, moonLon) {
  const diff = ((moonLon - sunLon) % 360 + 360) % 360;
  if (diff < 45)        return 'New Moon';
  if (diff < 90)        return 'Waxing Crescent';
  if (diff < 135)       return 'First Quarter';
  if (diff < 180)       return 'Waxing Gibbous';
  if (diff < 225)       return 'Full Moon';
  if (diff < 270)       return 'Waning Gibbous';
  if (diff < 315)       return 'Last Quarter';
  return 'Waning Crescent';
}

/**
 * Returns moon phase string for a given date.
 */
async function getMoonPhase(date) {
  try {
    const jd = dateToJD(date);
    const [sun, moon] = await Promise.all([
      getPlanetPosition(jd, swisseph.SE_SUN),
      getPlanetPosition(jd, swisseph.SE_MOON),
    ]);
    if (!sun || !moon) return 'Unknown';
    return getMoonPhaseFromLongitudes(sun.longitude, moon.longitude);
  } catch (e) {
    return 'Unknown';
  }
}

const DAY_RULERS = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];
const DAY_NAMES  = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/**
 * Get full daily planetary conditions.
 */
async function getDailyPlanetaryConditions(date) {
  const d = new Date(date);
  // Use noon UTC for stable daily positions
  d.setUTCHours(12, 0, 0, 0);
  const jd = dateToJD(d);

  const [sun, moon, mercury, mars, venus] = await Promise.all([
    getPlanetPosition(jd, swisseph.SE_SUN),
    getPlanetPosition(jd, swisseph.SE_MOON),
    getPlanetPosition(jd, swisseph.SE_MERCURY),
    getPlanetPosition(jd, swisseph.SE_MARS),
    getPlanetPosition(jd, swisseph.SE_VENUS),
  ]);

  const dayIndex = new Date(date).getDay(); // 0=Sun
  const dayOfWeek = DAY_NAMES[dayIndex];
  const dayRuler  = DAY_RULERS[dayIndex];

  // Mercury retrograde: negative speed means retrograde
  const mercuryRetrograde = mercury && mercury.speed < 0;

  const moonPhase = (sun && moon)
    ? getMoonPhaseFromLongitudes(sun.longitude, moon.longitude)
    : 'Unknown';

  return {
    sunSign:          sun     ? sun.sign     : 'Unknown',
    moonPhase,
    moonSign:         moon    ? moon.sign    : 'Unknown',
    mercuryStatus:    mercuryRetrograde ? 'Retrograde' : 'Direct',
    marsSign:         mars    ? mars.sign    : 'Unknown',
    venusSign:        venus   ? venus.sign   : 'Unknown',
    dayOfWeek,
    dayRuler,
  };
}

// ────────────────────────────────────────────
// Composite builder
// ────────────────────────────────────────────

/**
 * Build the full cosmic profile for a dog.
 * dog: { name, birthday, breed, energy_level, attachment_style, food_motivation, sociability, sensitivity }
 */
async function buildCosmicProfile(dog) {
  const birthday = new Date(dog.birthday);
  const year     = birthday.getUTCFullYear();

  const sunSign        = getSunSign(dog.birthday);
  const lifePathNumber = getLifePathNumber(dog.birthday);
  const chineseZodiac  = getChineseZodiac(year);
  const nameNumerology = getNameNumerology(dog.name);
  const todayConditions = await getDailyPlanetaryConditions(new Date());

  return {
    // Static
    sunSign,
    lifePathNumber,
    chineseZodiac,
    nameNumerology,
    // Personality traits
    traits: {
      energyLevel:      dog.energy_level,
      attachmentStyle:  dog.attachment_style,
      foodMotivation:   dog.food_motivation,
      sociability:      dog.sociability,
      sensitivity:      dog.sensitivity,
    },
    // Dynamic (today)
    today: todayConditions,
  };
}

module.exports = {
  getSunSign,
  getLifePathNumber,
  getChineseZodiac,
  getNameNumerology,
  getDailyPlanetaryConditions,
  getMoonPhase,
  buildCosmicProfile,
};
