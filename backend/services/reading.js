const OpenAI = require('openai');

let openai;
function getClient() {
  if (!openai) {
    openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return openai;
}

/**
 * Build the GPT-4o prompt for a Pawdiac daily reading.
 */
function buildPrompt(dog, cosmicProfile) {
  const { sunSign, lifePathNumber, chineseZodiac, nameNumerology, traits, today } = cosmicProfile;

  return `You are Pawdiac — a cosmic intelligence system that helps dog owners understand their dogs through the ancient wisdom of astrology, combined with modern AI.

Your readings are written for the dog's owner. You speak ABOUT the dog TO the owner. You are warm, wise, and deeply specific. Every reading must reference the dog's actual personality traits. Generic readings that could apply to any dog are unacceptable.

The reading must be specific enough that it could be WRONG — that's how we know it's real intelligence, not a horoscope platitude.

Dog profile:
- Name: ${dog.name}
- Breed: ${dog.breed || 'Mixed breed'}
- Sun Sign: ${sunSign}
- Life Path Number: ${lifePathNumber}
- Chinese Zodiac: ${chineseZodiac}
- Name Numerology: ${nameNumerology}
- Personality traits (scale 1-10): Energy ${traits.energyLevel}/10, Attachment ${traits.attachmentStyle}/10, Food Motivation ${traits.foodMotivation}/10, Sociability ${traits.sociability}/10, Sensitivity ${traits.sensitivity}/10

Today's cosmic conditions:
- Date: ${today.date || new Date().toISOString().split('T')[0]}
- Moon phase: ${today.moonPhase}
- Moon sign: ${today.moonSign}
- Sun in: ${today.sunSign}
- Mercury: ${today.mercuryStatus}
- Mars in: ${today.marsSign}
- Venus in: ${today.venusSign}
- Day of week: ${today.dayOfWeek} (ruled by ${today.dayRuler})

Generate a Pawdiac daily reading in JSON format:
{
  "title": "2-5 word evocative reading title",
  "todaysEnergy": "2-3 sentences. What cosmic forces are active today and how they specifically interact with THIS dog's sign and personality traits.",
  "whatToWatch": "2-3 sentences. Specific, observable behaviors or moods to watch for today. Must reference the dog's actual trait levels.",
  "connectionMoment": "1-2 sentences. One concrete thing the owner can do to connect with their dog today based on their cosmic profile.",
  "snapshot": "1 sentence. The cosmic headline for this dog today."
}

Return ONLY valid JSON. No markdown code fences, no extra text.`;
}

/**
 * Generate a Pawdiac reading for a dog using GPT-4o.
 * Returns parsed JSON: { title, todaysEnergy, whatToWatch, connectionMoment, snapshot }
 */
async function generateReading(dog, cosmicProfile) {
  const client = getClient();
  const prompt = buildPrompt(dog, cosmicProfile);

  const response = await client.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: 'You are Pawdiac, a cosmic intelligence for dog owners. Always respond with valid JSON only.' },
      { role: 'user',   content: prompt },
    ],
    temperature: 0.85,
    max_tokens: 600,
    response_format: { type: 'json_object' },
  });

  const raw = response.choices[0].message.content;

  try {
    return JSON.parse(raw);
  } catch (e) {
    // Fallback: attempt to extract JSON from the raw string
    const match = raw.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    throw new Error(`Failed to parse GPT-4o response: ${raw}`);
  }
}

module.exports = { generateReading };
