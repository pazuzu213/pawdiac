# Pawdiac — Product Requirements Document

**Version:** 1.3  
**Date:** August 19, 2026  
**Owner:** Sunny Dulay  
**Status:** Pre-build / Brand + MVP Definition

---

## 1. Mission

For thousands of years, humans have looked to the stars to understand themselves — their moods, their cycles, their energy, their nature. Ancient civilizations built entire philosophies around it. And it worked, because the same cosmic forces that move through the universe move through all living things.

Dogs dream. They have emotions. They have days where something feels off and days where their energy is boundless. They pick up on everything — the moon, the weather, the room, the unseen. They are as alive and feeling as we are.

As dog lovers, we asked ourselves a question:

**What if we fine-tuned the intelligence of the stars — ancient wisdom refined by AI — to understand the members of our family who can't tell us what they're feeling, but feel everything?**

That question is Pawdiac.

---

## 2. Vision

Pawdiac is not a dog horoscope app. It is the world's first cosmic intelligence system for understanding your dog.

We take seriously what dog owners already know in their hearts: that their dog has an inner life, a nature, a soul. We give that a language — the language of the stars — and use AI to make it as intelligent, personal, and profound as possible.

**Tagline:** "The stars speak to them too."

**What we are building:** A daily ritual of deep understanding between dog owners and their dogs, powered by the intersection of ancient astrological wisdom, modern AI, and animal behavioral science.

---

## 3. The Problem

Dog owners are deeply attuned to their dogs. They notice the moods, the energy shifts, the inexplicable behaviors. But they have no framework for understanding them — no language, no system, no guide.

Astrology has given humans that framework for millennia. Nobody has extended it seriously to dogs. The few attempts that exist treat it as a joke. We treat it as a mission.

---

## 4. The Opportunity

- 90M+ dog-owning households in the US
- Millennials and Gen Z treat dogs as family — "fur babies" who deserve everything humans have
- Astrology apps (Co-Star, The Pattern) generate $10M+ ARR proving the market believes in this
- The pet industry is $150B+ and premiumization is accelerating — owners spend freely on their dogs' wellbeing
- Zero serious competitors in cosmic pet intelligence — the category is completely unowned

---

## 5. V1 Scope — Dogs Only

Pawdiac V1 is exclusively for dogs. Full stop.

Cats are V2. The cosmic interpretation layer, personality model, and behavioral science framework must be built and validated for dogs first before extending to other animals. Launching with cats dilutes the focus and increases the interpretation work. Dogs first, done right.

---

## 6. The Cognitive Bias Challenge — And How We Beat It

This is important and we take it seriously.

**The problem:** Horoscopes benefit from a well-documented psychological phenomenon called the **Barnum/Forer Effect** — people tend to accept vague, generally applicable statements as personally meaningful. "Your dog may have more energy today" works for almost any dog on almost any day. That's not intelligence. That's a parlor trick.

We are not building a parlor trick.

**How Pawdiac beats the Barnum effect:**

1. **Specificity that can fail** — every reading must be specific enough that it could be WRONG. "With Mars squaring Saturn today, your Scorpio's intensity may tip into restlessness" is a falsifiable prediction. Generic language is banned.

2. **Personality traits onboarding** — at setup, owners tell us 3–5 real things about their dog. The reading engine uses these inputs to calibrate every reading. When a reading says "your food-motivated Taurus will be especially driven by rewards today" — the owner TOLD us their dog is food-motivated. That's not vague. It's tuned.

3. **The Observation Loop validates us** — when owners log what actually happened, we can measure whether our predictions are performing above the Barnum baseline. This is how we prove to ourselves (and eventually to users) that Pawdiac is genuinely intelligent, not just resonant.

4. **We write with integrity** — no manipulative language, no false certainty, no manufactured urgency. The tone is: "here is what the cosmos suggests, here is what to watch for" — not "this WILL happen."

5. **Positioning language is honest** — we are extending ancient wisdom + behavioral science + AI to a domain where it hasn't been applied. We are not claiming to predict the future. We are offering a framework for deeper understanding.

**The internal standard:** If a reading could apply to any dog, rewrite it.

---

## 7. Target User

**Primary:** Millennial and Gen Z dog owners (predominantly women, 25–40) who:
- Treat their dog as a full family member
- Already believe in or are open to astrology
- Are deeply curious about their dog's emotions and inner life
- Share dog content on social media regularly
- Spend on premium pet wellness products

**Their belief we're meeting:** "My dog has a soul. I want to understand it."

---

## 8. The Pawdiac System — Core Concept

### The 12 Pawdiac Signs
Every dog is born under a sign. That sign is the foundation of their cosmic identity — not a cute label, but a genuine personality framework derived from the intersection of zodiac archetypes and documented canine behavioral patterns.

| Sign | Date Range | Core Nature |
|---|---|---|
| Aries | Mar 21 – Apr 19 | Fearless, first, fire energy |
| Taurus | Apr 20 – May 20 | Grounded, comfort-seeking, stubborn in love |
| Gemini | May 21 – Jun 20 | Dual-natured, curious, socially electric |
| Cancer | Jun 21 – Jul 22 | Deeply bonded, protective, emotionally sensitive |
| Leo | Jul 23 – Aug 22 | Radiant, dramatic, born to be seen |
| Virgo | Aug 23 – Sep 22 | Perceptive, routine-driven, quietly devoted |
| Libra | Sep 23 – Oct 22 | Social, harmony-seeking, lover of peace |
| Scorpio | Oct 23 – Nov 21 | Intense, intuitive, fiercely loyal |
| Sagittarius | Nov 22 – Dec 21 | Wild, freedom-loving, forever curious |
| Capricorn | Dec 22 – Jan 19 | Dignified, steady, old soul energy |
| Aquarius | Jan 20 – Feb 18 | Eccentric, independent, marches alone |
| Pisces | Feb 19 – Mar 20 | Dreamy, empathic, feels everything |

---

## 9. Core Features — MVP

### 9.1 Dog Profile + Personality Onboarding

At setup, the owner provides two types of information:

**Cosmic data (auto-calculated):**
- Dog's name
- Dog's birthday (month + day + year) → auto-calculates sun sign, life path number, Chinese zodiac year, name numerology
- Dog's photo
- Birth location (optional, for moon sign precision)
- Breed (optional but encouraged)

**Personality traits (owner-selected — 5 dimensions):**

Owner picks where their dog falls on each of these 5 scales at onboarding. These inputs are stored permanently in the dog's profile and injected into every reading:

| Trait | Low end | High end |
|---|---|---|
| **Energy Level** | Low, couch dog | High, always ready |
| **Attachment Style** | Independent | Velcro, never leaves your side |
| **Food Motivation** | Take it or leave it | Completely food-obsessed |
| **Sociability** | Shy, selective | Everyone's best friend |
| **Sensitivity** | Stoic, unfazed | Picks up everything, highly emotional |

Why this matters: the personality traits do two things simultaneously —
1. They make readings more specific and calibrated (anti-Barnum)
2. They give the AI a behavioral baseline to contrast against what the cosmos is doing today ("your normally high-energy Lab is reading low today — Mars is pulling inward")

Over time, the Observation Loop may reveal that the traits the owner selected are wrong — and the system can suggest corrections based on actual behavior patterns logged.

### 9.2 Daily Pawdiac Reading

**Voice and tone:** The cosmic intelligence speaks ABOUT the dog TO the owner. Not in the dog's voice. Not as the dog. The reading is from the perspective of a wise, deeply knowledgeable guide who has studied this dog's cosmic profile and today's conditions — and is sharing genuine insight.

**Structure:**
- **Today's Energy** — what cosmic forces are active today and how they interact with this dog's specific sign, life path, and personality traits
- **What to Watch** — specific, falsifiable behaviors or moods to observe. Must be calibrated to this dog's known traits + today's conditions. Cannot be generic.
- **A Moment of Connection** — one concrete suggested action for the owner based on what this dog needs today according to their cosmic profile

**The non-negotiable standard:** Every reading must be specific enough that it could be wrong. If it couldn't be wrong, rewrite it.

### 9.3 Push Notification — The Viral Hook

- **Delivery:** 8am user local time daily
- **Icon:** The dog's own photo — fully personalized per dog
- **Sender name:** The dog's name ("Baxter" — not "Pawdiac")
- **Message:** Customized, personalized opening line from that day's reading — calibrated to the dog's sign, personality traits, and today's cosmic conditions
- **Design rule:** Every notification must be worth screenshotting. The combination of the dog's own photo as the sender icon + a specific, resonant first line is the viral mechanic.

**Example (Scorpio, high attachment, food-motivated, Mercury retrograde day):**
> Baxter: The cosmic static is thick today. Commands you know cold might not land the way you expect — this isn't you. Give it space.

**Not this:**
> Baxter: Today might be an interesting day for your pup! ❌

### 9.4 Pawdiac Sign Profile
- Full archetype for the dog's sign, calibrated for canine experience
- Cross-referenced with behavioral science on canine temperament
- How this sign expresses love, handles stress, relates to other signs

### 9.5 Cosmic Calendar
- Monthly overview of major planetary events
- "Why is my dog acting weird?" — answered by the cosmos
- Key dates: full moons, retrogrades, season shifts

### 9.6 Multi-Dog Support
- Free: 1 dog. Pro: unlimited.
- Each dog has their own complete cosmic profile and receives their own personalized reading + push notification daily.

---

## 10. The AI — This Is Where We Win

The AI is the heart of Pawdiac. This is what separates us from a novelty app.

### 8.1 The Dog's Full Cosmic Profile

Every dog has a two-layer profile. See `COSMIC_PROFILE_MODEL.md` for full detail.

**Static layer** (collected once at setup, never changes):
| Input | Source | What it adds |
|---|---|---|
| Sun Sign | Birthday (month + day) | Core identity and fundamental nature |
| Moon Sign | Birthday + birth location | Emotional nature, instincts, bonding style |
| Rising Sign | Birth time + location (optional) | How the dog presents to the world |
| Life Path Number | Full birthday reduced numerologically | Soul purpose, the deeper thread of their life |
| Name Numerology | Dog's name, Pythagorean mapping | The energy carried in their identity |
| Chinese Zodiac Year | Birth year | 12-year cycle archetype and generational energy |
| Breed Profile | Owner-selected | Behavioral tendencies, energy level, working heritage |

**Dynamic layer** (recalculated every day):
| Input | Why it matters |
|---|---|
| Current moon phase | Governs instinct, emotion, sleep cycles in all living things |
| Current moon sign | Changes every 2.5 days — colors the emotional weather for everyone |
| Sun's current transit | Seasonal cosmic energy affecting all signs |
| Mercury position/retrograde | Communication and routine — retrograde disrupts both |
| Venus position | Affection, social bonding, pleasure drive |
| Mars position | Physical energy, play drive, reactivity |
| Key aspects today | Squares (friction), trines (flow), conjunctions (amplification) |
| Day of week | Each day ruled by a planet — Monday = Moon, Tuesday = Mars, etc. |
| Season | Real behavioral shift — especially in working/hunting heritage breeds |

The AI reading engine combines ALL of these inputs. A Scorpio sun / Cancer moon / Life Path 7 / Border Collie on a Full Moon in Pisces during Mercury retrograde in winter gets a reading no other dog gets that day. This is the precision standard.

### 8.2 Intelligence Layers
The daily reading is generated from multiple intelligence sources stacked together:

1. **Astrological layer** — actual planetary positions (sun, moon, Mercury, Venus, Mars), aspects, transits, retrograde periods — applied to the dog's natal chart via Swiss Ephemeris API
2. **Sign personality layer** — deep archetype knowledge for each of the 12 signs, calibrated for canine experience not human experience
3. **Breed behavioral layer** — breed-specific tendencies layered onto the sign archetype (a Scorpio Labrador is different from a Scorpio Chihuahua)
4. **Numerology layer** — life path number and name number add a second dimension of identity depth
5. **Chinese zodiac layer** — year-of-birth archetype adds a third overlay
6. **Seasonal/environmental layer** — time of year, seasonal energy shifts
7. **Owner observation layer** (v2+) — as owners log what their dog actually does, the AI learns this specific dog's patterns over time

### 8.3 Content Standards
- Every reading must be unique — no recycling, no templates, no generic language
- The dog's name must appear naturally in the reading
- References must be specific to dogs: sleep patterns, play energy, bonding behaviors, appetite, sensitivity to energy in the room
- The reading should make the owner feel genuinely seen — like the app truly knows their dog
- The cosmic intelligence speaks ABOUT the dog TO the owner — not as the dog, not in the dog's voice
- Never write a reading vague enough to apply to any dog

### 8.4 Prompt Architecture
- System prompt: cosmic intelligence engine with deep canine behavioral science calibration
- Dynamic inputs: full static profile + today's dynamic planetary conditions + any owner-logged observations
- Output format: structured JSON → rendered into reading cards
- Readings pre-generated nightly for all active dogs at 2am UTC → stored → pushed at 8am user local time

### 8.5 Research Foundation
We ground the AI in real sources:
- **Astrological data:** Swiss Ephemeris API (the gold standard — same data used by professional astrologers)
- **Canine behavioral science:** AKC, ASPCA, veterinary behavioral research, ethology literature
- **Numerology system:** Pythagorean system for name + life path
- **Sign-to-canine mapping:** developed with astrologers who also have deep knowledge of animal behavior
- **Ongoing refinement:** owner feedback loop (see Section 16)

---

## 11. Data Strategy — Save Everything

Every data point is saved, permanently, from day one. No exceptions.

**What we store:**
- Full cosmic profile per dog (static: sign, life path, Chinese zodiac, name numerology, breed, personality traits)
- Full planetary conditions snapshot per day (moon phase, moon sign, sun position, Mercury/Venus/Mars positions, key aspects, retrograde status, day of week, season)
- Every reading generated (text, structure, timestamp, all inputs used)
- Every push notification sent (content, delivery time, open rate)
- Every observation logged by owner (accuracy rating, behavior tags, free text)
- Push open/tap-through events
- Time-in-app per reading

**Why this matters:**
This dataset is the long-term moat. The labeled corpus of [cosmic conditions + dog personality traits + breed + sign] → [reading] → [owner feedback on accuracy] becomes the training set for a Pawdiac-specific model that no competitor can replicate.

**Data schema (per reading record):**
```
reading_id
dog_id
date
cosmic_snapshot_json      ← all planetary conditions
static_profile_json       ← sign, life path, traits, breed
reading_text_json         ← today's energy, watch, connection
notification_sent_at
notification_opened (bool)
accuracy_rating           ← 3, 2, or 1 (spot on / somewhat / missed)
behavior_log_json         ← energy, mood, appetite, sociability tags
free_text_observation
model_version             ← which AI model/prompt generated this
```

---

## 12. Monetization

**Free Tier:**
- 1 dog profile
- Daily reading
- Sign profile

**Pawdiac Pro — $4.99/mo or $34.99/yr:**
- Unlimited dogs
- 30-day reading history
- Weekly + monthly forecasts
- Cosmic calendar
- Compatibility readings between dogs
- Breed-specific reading depth
- Exclusive sign art

**Future Revenue:**
- Pawdiac sign merch (prints, collar tags, tote bags)
- Gifting — "Send a Pawdiac reading to a friend's dog"
- Practitioner tier — dog trainers, vets, behaviorists who want to share Pawdiac with clients

---

## 13. Growth Mechanics

1. **Push notifications as product** — the notification IS the marketing. Dog's name + photo as sender = instant share.
2. **Sign reveal cards** — "My dog is a Scorpio Pawdiac" is social currency
3. **Compatibility** — "Are our dogs cosmically compatible?" drives multi-user loops
4. **Content format** — "Reading my dog's Pawdiac" is a TikTok/Reel native format
5. **Word of mouth** — accuracy and emotional resonance drive organic sharing

---

## 14. Tech Stack

**Builder:** Jarvis (AI). This is Sunny's side quest — built independently of the Breakthrough team.

| Layer | Technology | Notes |
|---|---|---|
| Frontend | **Swift / SwiftUI** (native iOS) | Native iOS only for V1. Premium feel, full APNs control, best-in-class push customization. |
| Backend | Node.js / Express on Railway | Lightweight API for reading generation + data storage |
| Database | PostgreSQL (Railway) | All cosmic profiles, readings, observations saved permanently |
| Push Notifications | APNs direct | Full control over notification icon (dog photo), sender name (dog name), message content |
| AI | OpenAI GPT-4o | Reading generation from full cosmic input stack |
| Astrology Data | Swiss Ephemeris API | Real planetary positions, aspects, retrograde data |
| Auth | Supabase Auth | Simple, fast to implement |
| Payments | RevenueCat | Handles App Store subscription billing natively |
| Analytics | Mixpanel | Funnel tracking, reading open rates, observation loop usage |
| Storage | Cloudflare R2 | Dog photos (used in push notifications as icon) |

**Why Swift over React Native:** Full APNs access for custom notification icons (the dog's photo as the push sender avatar requires native implementation). Better performance. Premium native feel consistent with the brand.

---

## 15. MVP Scope — iOS v1.0

**In scope:**
- Dog profile setup (name, birthday, photo, breed, 5 personality traits)
- Auto-calculated cosmic profile (sun sign, life path, Chinese zodiac, name numerology)
- Pawdiac sign profile page
- Daily AI reading (generated from full input stack)
- Personalized push notification (dog photo as icon, dog name as sender)
- Paywall — 1 dog free / Pro for unlimited + history

**Out of scope V1:** Android, compatibility readings, cosmic calendar, reading history, breed-specific depth, merch, cats

**V2:** Cats. Then V3: full animal expansion.

---

## 16. Success Metrics

| Metric | 30 days | 90 days |
|---|---|---|
| Downloads | 1,000 | 10,000 |
| Day-7 retention | 40%+ | 50%+ |
| Day-30 retention | 20%+ | 30%+ |
| Conversion to Pro | 5% | 10% |
| MRR | $500 | $5,000 |
| NPS | 50+ | 65+ |

---

## 17. Bundle ID

`com.sunnydays.pawdiac`

---

## 18. Future Feature — The Observation Loop (Continuous Intelligence)

This is the long-term moat. Not the algorithm — the data.

### The Concept
After every daily reading, we prompt the owner with a simple question:
**"How did [Dog Name]'s day go?"**

Owners log what their dog actually did. The system compares it to what the reading predicted. Over time, the AI learns which cosmic inputs most accurately predict which behaviors for which sign/breed combinations — and gets smarter with every observation.

### How It Works

**Step 1 — Quick Accuracy Signal (after reading, daily)**
Three-tap feedback directly on the reading card:
- ⭐ Spot on — reading matched the dog's day
- 〰️ Somewhat — partially accurate
- ✗ Missed — today felt different

**Step 2 — Observation Log (optional, 30 seconds)**
Structured behavior tags the owner can tap:
- Energy: 🔥 High / ➡️ Normal / 💤 Low
- Mood: 😄 Playful / 😌 Calm / 😰 Anxious / 🫥 Withdrawn
- Appetite: Normal / Off / Extra hungry
- Sociability: 🐾 Clingy / Normal / 🚶 Independent
- Bonus: free-text observation field ("He had the zoomies at midnight" / "Wouldn't leave my side all day")

**Step 3 — Longitudinal Pattern Learning**
Over weeks and months, the system builds a behavioral fingerprint for each dog:
- Which cosmic conditions reliably correlate with high energy for THIS dog
- Which planetary positions trigger anxiety in THIS breed/sign combo
- What the full moon actually does to THIS dog's sleep and mood
- How accurate each input dimension (moon sign vs. life path vs. transit) is as a predictor

**Step 4 — Personalized Reading Calibration**
As patterns emerge, the reading engine:
- Weights the most predictive inputs more heavily for this dog
- Adjusts tone and focus based on what has resonated before
- Surfaces pattern insights to the owner ("Baxter consistently shows higher anxiety during Mercury retrograde — here's what we've learned about what helps")

### Why This Is the Moat

The cosmic data is publicly available. Anyone can read a Swiss Ephemeris. What no one else will have is:

**A labeled dataset of millions of real dog observations mapped to real astrological conditions.**

Every owner who logs an observation is contributing to a corpus that teaches the AI what the stars actually do to dogs in practice. This is proprietary data that compounds over time. The more users, the better the readings. The better the readings, the more users.

This is the flywheel:
```
More users → More observations → Better calibration
→ More accurate readings → More word of mouth → More users
```

### Future Vision: The Pawdiac Intelligence Model
Long-term goal: fine-tune a model specifically on this dataset — Pawdiac's own LLM layer, trained on the intersection of astrological conditions and real canine behavior. This becomes something no competitor can replicate because the data took years to build.

### Engineering Notes
- Observation data stored per dog, per day, per cosmic condition snapshot
- Accuracy signal stored alongside: reading ID, all input dimensions active that day
- Analytics dashboard (internal): accuracy by sign, by breed, by planetary condition, by season
- User-facing insights unlock at data thresholds: "Based on 30 days of observations, here's what we've learned about [Dog Name]"

---

## 19. Social Media Strategy — TikTok + IG (100% of Marketing)

Pawdiac is a TikTok and Instagram app. These are the only two marketing channels for V1. Zero paid search, zero app store optimization focus at launch — all energy goes into short-form video.

### Why This Works
The product IS shareable content. A push notification from your dog's name + photo + a specific cosmic reading is a screenshot. A Pawdiac sign reveal is a video. The signs, the readings, the cosmic events — every piece of the product maps naturally to a content format.

---

### Content Pillars

**PILLAR 1: Sign Reveal (Sunny's Core Idea)**
The foundation of the content strategy. Date-range posts that call out dog owners by their dog's sign.

Format:
> "If your dog was born between October 23 and November 21, they're a Pawdiac Scorpio."
> *Cut to: dog staring intensely, following owner everywhere, guarding their spot*
> "This is exactly what you'd expect."
> "Download Pawdiac to get [your dog's name]'s daily reading."

Why it works: Every dog owner immediately wants to check their dog's dates. It's personalized before they even tap. The comment section fills with owners tagging each other: "This is literally Baxter."

Content cadence: 12 sign reveal videos (one per sign). Each one runs as an ad targeted to dog owners. The best-performing signs get iterated.

---

**PILLAR 2: The Accuracy Test**
Creators and seed users film themselves checking the daily reading each morning, then filming their dog's actual day.

Format:
> "The app said my Scorpio dog would be clingy and low energy today because of the moon."
> *Cut to: dog literally sitting on owner's feet all day*
> "I'm not okay with how accurate this is."

Why it works: Proof content. Converts skeptics. "This is creepy" is the best comment you can get — means it's resonant and specific enough to feel real.

---

**PILLAR 3: Cosmic Event Hooks**
Timely content around real astronomical events that dog owners already feel.

Examples:
- "Mercury is in retrograde. Here's why your dog is acting weird right now."
- "Full moon tonight. Don't be surprised if your dog won't sleep."
- "It's Scorpio season. If you have a Scorpio dog, buckle up."

Why it works: Rides real cultural moments. Astrology content spikes around Mercury retrograde and full moons already. We show up with the dog angle.

---

**PILLAR 4: Sign vs. Sign**
Comparisons between signs that spark debate and tagging.

Format:
> "Scorpio dog vs. Leo dog — which one owns your house?"
> *Split screen: each breed/sign behavior*

Why it works: Comment section becomes a sign war. Every comment is a free impression. "Tag a friend whose dog is a Leo" is the CTA.

---

**PILLAR 5: Same Breed, Different Sign**
Shows how the sign matters more than the breed.

Format:
> "Two Golden Retrievers. Same breed. Totally different dogs."
> "One is a Cancer. One is an Aries. The cosmos explains everything."

Why it works: Challenges the idea that breed determines personality. Makes astrology feel like the missing variable dog owners didn't know they needed.

---

**PILLAR 6: Famous Dogs**
Reveal the Pawdiac signs of famous dogs (real and fictional).

Examples:
- Lassie (born on-screen date) — "Of course she's a Cancer."
- Marley (Marley & Me) — "Classic Sagittarius. No rules, pure chaos, total love."
- Air Bud — "A Capricorn dog. Works harder than anyone."

Why it works: Shareable, nostalgic, zero production cost. Taps pop culture.

---

### Ad Strategy
- Start organic. Seed with 12 sign reveal videos + 5 accuracy test videos
- Boost whichever organic posts break through naturally
- Paid ads: short (7–15 sec) sign reveal clips, direct to App Store
- Targeting: dog owners, astrology followers, aged 22–42, US first
- Retarget: anyone who engaged with a sign reveal but didn't install

### Creator Seeding (Pre-Launch)
- Identify 10–20 dog-owner creators on TikTok with 50K–500K followers
- Give them early access + their dog's full Pawdiac profile + reading
- Ask for honest "I tried this" content — no script
- The authenticity of their reaction IS the ad

---

## 20. Open Questions

- [ ] App Store account — Jarvis/Sunnydays account or new Pawdiac LLC entity?
- [ ] Trademark search on "Pawdiac" — do now before launch
- [ ] Astrologer consultant to validate sign framework and canine interpretation mapping?
- [ ] Swiss Ephemeris API — Jarvis integrates at build time
- [ ] Observation loop: V1 or V1.1?
- [ ] Paywall timing — hard wall at day 1 for second dog, or 7-day free trial for Pro?
- [ ] Free trial for Pro tier? (recommended: 7-day free trial to drive conversion)
- [ ] Notification time — fixed 8am or user-configurable?
- [ ] Reading length — short (150 words) or long-form (300+ words) with expandable card?
- [ ] Phoebe (Sunny's French bulldog) as the launch demo dog for content?
