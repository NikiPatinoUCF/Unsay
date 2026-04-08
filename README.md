# Ribs / Water Surface

*An ambient P5.js electronic poetry piece*

**Niki Patino | Texts & Technology — Exercise Eleven: Narrative**

---

## Concept

A water surface holds light the way memory holds language — unstable, reflective, never fixed.

This piece renders a shimmering vertical spine of light at the center of the screen, modeled on the sun's reflection on water. From that spine, horizontal lines extend outward like ribs. Each rib carries a fragment of language: short phrases from *Start Here*, a memoir-in-progress. The words sink slowly downward, rotating gently as water resistance would slow them, fading as they descend into depth.

The text corpus consists entirely of lines that were spoken and cannot be taken back — or lines that were never spoken at all, and live in the body instead. Both categories disappear the same way.

---

## Visual Logic

**The spine** — a central, oscillating band of warm white-gold light. It pulses gently, never still. This is the water surface catching the sun. It is also the sternum. It is also the moment before and after speech.

**The ribs** — horizontal lines that emerge from the spine and carry text. They do not fall straight down; they drift at slight angles, rotate fractionally, behave like objects in water. They move at different speeds — some fragments sink faster than others, weighted by something the viewer cannot name.

**Color by depth** (Werner/Schorr palette — *The Color of Water*, 2019-2020):
- Surface zone: warm whites, pale gold, tin white (`#F5F0E8`, `#EDE8D8`)
- Shallow: pale blue-green, verdigris, celadon (`#B8D4C8`, `#9FC4B4`)
- Mid-depth: deeper teal, cool gray-blue, iron (`#6A9FAF`, `#5A8A98`)
- Deep: near-black with blue undertone, blackish green (`#1A3040`, `#0D2030`)

**The spine itself** shifts slowly across the warm spectrum — tin white to pale gold to almost silver — never settling on one color, as sun on water never does.

---

## Text Corpus

Lines are grouped by type. Both types fall. Both disappear.

### Said — and cannot be unsaid

```
Don't touch me like that.
I'll be quick.
Come on, chubby.
If you leave me, I'll do it.
It's a stupid piece of wood.
You know this is over, right?
I can't do this anymore.
My heart's not in us.
I want to be loved right by a man.
Get back inside that house.
Don't worry about it.
We'll be back.
```

### Never said — held in the body instead

```
Don't let me come here anymore.
I was sexually abused.
I don't want to get married.
I'm fine.
I'm fine.
```

### Said by others — arrived and stayed

```
It will mean many things.
Close your eyes and pretend.
I already had the best part of you.
Are you a lesbian?
He filed for divorce.
```

---

## Interaction

**No click required.** The piece runs ambient — the viewer watches, not operates. This is intentional. You cannot intervene in what has already happened.

Optional enhancement (Phase 2): hovering near the spine briefly illuminates a passing fragment before it continues sinking.

---

## Influences

- **Algorithmic Sea** (Schorr / Pereira / Vamoss) — color as flow, not fixed variable; the Werner mineral palette
- **Strange Rain** (Jason Edward Lewis) — ambient text as weather, falling language as atmosphere
- **Mood_01** by Dru (OpenProcessing) — the central spine structure, horizontal lines as data/body

---

## Technical Notes (P5.js)

**Starter:** Falling Text particle system (from course demo)

**Key modifications to attempt:**
1. Central spine as oscillating brightness band (sine wave on x-position + alpha)
2. Text particles spawn from spine x-position, not random x
3. Particles have: slight horizontal drift (±2-4px/frame), slow rotation (±0.002 rad/frame), speed variation (0.4–1.2)
4. Color mapped to y-position (surface → deep)
5. Text drawn at particle's rotation angle using `push()`/`pop()` + `translate()`/`rotate()`
6. Particles fade alpha based on y (full opacity at surface, 0 at bottom)

**Text cycling:** Lines drawn in order from corpus array, cycling. Each particle holds its text string on creation.

---

## File Structure

```
/
├── README.md          ← this document
├── index.html         ← P5.js sketch (GitHub Pages entry point)
├── sketch.js          ← main sketch logic
└── corpus.js          ← text array (all lines)
```

---

## Part of a Larger Work

*Start Here* is a memoir-in-progress in five parts: Slurry, Pavement, Footprint, Detour, Finish Line. The text corpus for this piece is drawn from Parts I and II. Lines appear without attribution or chapter markers — they arrive the way they arrived in life: without warning, carrying more weight than their length suggests.

---

*"Color as a flow, as opposed to a fixed variable."*
— The Color of Water: Algorithmic Sea
