# Pawdiac — Dog Cosmic Profile Data Model

**Version:** 1.0  
**Date:** August 19, 2026

---

## Overview

Every dog in Pawdiac has a two-layer cosmic profile:
1. **Static layer** — collected once at setup, derived from birthday, name, breed
2. **Dynamic layer** — updated daily, derived from current planetary conditions

The AI reading engine combines both layers to generate a reading that is simultaneously timeless (rooted in who this dog is) and timely (tuned to what today's cosmos is doing).

---

## Layer 1 — Static Cosmic Profile (Collected at Setup)

### 1.1 Sun Sign
- **Source:** Birthday (month + day)
- **What it represents:** Core identity, fundamental nature, the dog's essential self
- **Example:** Dog born June 5 → Gemini. Dual-natured, curious, high social energy.
- **Required:** Yes

### 1.2 Moon Sign
- **Source:** Full birth date + birth location (city)
- **What it represents:** Emotional nature, instincts, how the dog feels and bonds
- **Calculation:** Moon moves through a sign every 2.5 days — birth date + location pinpoints exact sign
- **Example:** Moon in Cancer → deeply bonded, picks up all emotional energy in the room, hates being alone
- **Required:** No (optional at setup, adds depth to readings when present)
- **Fallback:** If birth time unknown, we use the most likely moon sign for that date and note uncertainty

### 1.3 Rising Sign (Ascendant)
- **Source:** Birth time (hour) + birth location
- **What it represents:** How the dog presents to the world, first impression, physical manner
- **Example:** Leo rising → commands the room even if they're a Cancer sun underneath
- **Required:** No (most owners won't know birth time — this is a power user feature)
- **Note:** For rescue dogs with unknown birthdays, we allow an approximate birth month instead

### 1.4 Life Path Number
- **Source:** Full birthdate (day + month + year), numerological reduction
- **Calculation:** Add all digits until single digit (or master numbers 11, 22, 33)
- **Example:** Dog born Feb 24, 2023 → 2+2+4+2+0+2+3 = 15 → 1+5 = **6** (Life Path 6: loving, loyal, devoted to family)
- **What it represents:** The dog's soul purpose, the deeper thread running through their life
- **Required:** Yes (auto-calculated from birthday)

**Life Path interpretations for dogs:**
| Number | Human meaning | Dog manifestation |
|---|---|---|
| 1 | Leader, independent | Alpha energy, first to explore, not a follower |
| 2 | Sensitive, peacekeeper | Hates conflict, attuned to owner's emotions, bonded deeply |
| 3 | Expressive, playful | Big personality, vocal, loves attention, theatrical |
| 4 | Stable, routine-loving | Needs structure, thrives on schedule, anxious without routine |
| 5 | Freedom, adventure | Cannot be caged, escape artist energy, lives for the walk |
| 6 | Nurturing, devoted | Family dog to the core, caretaker energy, gentle |
| 7 | Introspective, mystical | The dog that stares out windows, seems to be thinking, independent |
| 8 | Power, intensity | High drive, determined, needs a job or outlet |
| 9 | Old soul, compassionate | Wise beyond their years, gentle with all beings, deeply empathic |
| 11 | Highly sensitive, intuitive | Picks up everything, psychic-feeling, needs calm environments |
| 22 | Master builder energy | Unusually capable, learns commands fast, seems almost human |
| 33 | Pure love, healer | Deeply healing presence, therapy dog energy, unconditional |

### 1.5 Name Numerology
- **Source:** Dog's name, Pythagorean number mapping (A=1, B=2... Z=8)
- **Calculation:** Sum all letter values, reduce to single digit
- **What it represents:** The energy the dog carries in their identity — how others perceive them
- **Example:** "BAXTER" → 2+1+6+2+5+9 = 25 → 2+5 = **7** (introspective, mysterious quality)
- **Required:** Yes (auto-calculated from name entered at setup)

### 1.6 Chinese Zodiac Year Sign
- **Source:** Birth year
- **What it represents:** The 12-year cycle energy the dog was born into — their generational archetype
- **Example:** 2023 = Year of the Rabbit → gentle, intuitive, lucky, conflict-averse
- **Required:** Yes (auto-calculated from birthday year)

**Chinese Zodiac for dogs (recent years):**
| Year | Sign | Energy for dogs |
|---|---|---|
| 2020 | Rat | Clever, resourceful, quick learner |
| 2021 | Ox | Steadfast, strong, loyal, slow to warm but forever bonded |
| 2022 | Tiger | Wild energy, daring, does not back down |
| 2023 | Rabbit | Gentle, intuitive, peace-loving |
| 2024 | Dragon | Magnetic, powerful, commands presence |
| 2025 | Snake | Mysterious, wise, deeply intuitive |
| 2026 | Horse | Free-spirited, fast, loves to run |

### 1.7 Breed Profile
- **Source:** Owner selects from breed list (or "mixed breed")
- **What it adds:** Behavioral tendencies, energy levels, working heritage, prey drive, social nature
- **Example:** A Scorpio Husky reads very differently from a Scorpio Cavalier King Charles Spaniel — same sign, wildly different breed energy
- **Required:** No, but strongly encouraged

**Breed dimension categories:**
- Energy level (low / medium / high / working)
- Social orientation (velcro / independent / pack-oriented)
- Working heritage (herding / guarding / hunting / companion / sporting)
- Sensitivity level (highly sensitive / moderate / stoic)

---

## Layer 2 — Dynamic Daily Conditions

These are calculated fresh every day and combined with the static profile to generate the daily reading.

### 2.1 Current Moon Phase
- **Cycle:** New → Waxing Crescent → First Quarter → Waxing Gibbous → Full → Waning Gibbous → Last Quarter → Waning Crescent → New
- **Why it matters:** The moon governs instinct, emotion, sleep, and biological cycles — in all living things. This is measurable. Dogs (like humans) show behavioral differences around full moons.
- **Effect on readings:**
  - New Moon → fresh energy, good time for new behaviors/training
  - Full Moon → peak emotional intensity, heightened senses, potential restlessness
  - Waning → integration, rest, quieter energy

### 2.2 Current Moon Sign
- **Changes every:** ~2.5 days
- **Why it matters:** The moon's sign colors the emotional weather for everyone today
- **Example:** Moon in Virgo → all dogs may be more routine-sensitive today. Moon in Sagittarius → restless, wanting to move.

### 2.3 Sun's Current Position
- **Changes every:** ~30 days (the zodiac season)
- **Why it matters:** Seasonal energy affects everyone. We're all in Scorpio season right now — intense, internal, deep.

### 2.4 Mercury Position / Retrograde Status
- **Why it matters:** Mercury governs communication and routine. Retrograde periods (3x/year, ~3 weeks each) correlate with disrupted behavior, confusion, slower learning responses.
- **Dog effect:** Confusion with known commands, disrupted routine sensitivity, communication breakdown with owner

### 2.5 Venus Position
- **Why it matters:** Venus governs affection, pleasure, social bonding
- **Dog effect:** How affectionate and social the dog feels today; Venus in harmonious signs = snuggly, in tense signs = more independent

### 2.6 Mars Position
- **Why it matters:** Mars governs energy, drive, aggression, physical vitality
- **Dog effect:** Play drive, territorial behavior, energy level, reactivity

### 2.7 Key Aspects (Planetary Relationships Today)
- Squares (90°) → tension, friction, behavioral challenges
- Trines (120°) → flow, ease, good day for training or bonding
- Conjunctions → amplified energy of the planets involved
- Oppositions → push-pull energy, dog may seem conflicted

### 2.8 Day of Week (Planetary Rulership)
- Monday = Moon (emotional, instinctual)
- Tuesday = Mars (physical, driven)
- Wednesday = Mercury (alert, communicative)
- Thursday = Jupiter (expansive, playful)
- Friday = Venus (social, affectionate)
- Saturday = Saturn (structured, disciplined)
- Sunday = Sun (radiant, expressive)

### 2.9 Season
- Spring → awakening energy, high play drive, curiosity
- Summer → peak vitality, heat sensitivity, social
- Autumn → instinctual shift, some breeds get restless (hunting heritage activation)
- Winter → inward energy, rest, bonding, den-seeking

---

## How the AI Combines These Layers

Every daily reading is generated from this full stack:

```
STATIC PROFILE:
- Sun sign + interpretation (canine lens)
- Moon sign + interpretation (canine lens)
- Life path number + interpretation (canine lens)
- Name numerology + interpretation
- Chinese zodiac year + interpretation
- Breed behavioral profile

DYNAMIC CONDITIONS:
- Current moon phase + sign
- Sun's current transit
- Mercury/Venus/Mars positions
- Key aspects active today
- Day of week rulership
- Season

OUTPUT:
- Today's Energy (what's cosmically active for this specific dog today)
- What to Watch (specific behaviors to notice, rooted in sign + conditions)
- A Moment of Connection (how to deepen the bond with this dog today, based on what they need)
```

The AI never generates a generic reading. Every input dimension narrows the specificity. A Scorpio sun / Cancer moon / Life Path 7 / Border Collie mix on a Full Moon in Pisces during Mercury retrograde in winter — that is a specific, unique reading no other dog gets that day.

---

## Data Collection Flow (Onboarding)

**Required at setup (2 min):**
1. Dog's name
2. Dog's birthday (month + day + year)
3. Dog's photo

**Auto-calculated instantly:**
- Sun sign, Life Path Number, Chinese Zodiac Year, Name Numerology

**Optional (adds depth):**
4. Birth location (for moon sign)
5. Breed
6. Birth time (for rising sign — power user)

**The promise to the user:** The more you tell us, the more we know. Every detail deepens the intelligence.
