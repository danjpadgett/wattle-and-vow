# CLAUDE.md — Wattle & Vow (Australian Citizenship Test Study App)

This file is the working plan and source of truth for Claude/Copilot when assisting on this project. Update it as decisions are made.

## 1. Purpose

A web-based study & trivia app with two sides:

1. **Citizen Test** — help my wife prepare for and pass the **Australian Citizenship Test** through focused chapter readings + a real-style 20-question practice test.
2. **Australiana** — a relaxed, fun quiz of everyday Aussie life (beers, footy, slang, bush, schoolyard) for anyone.

## 2. Users & Auth

- **No authentication.** The app is fully public and stateless.
- No accounts, no database, no progress saved server-side. Anyone can use it.
- (Future option: lightweight `localStorage` progress — not implemented yet.)

## 3. Design Principles

- **Intuitive** — obvious navigation, minimal chrome, mobile-first.
- **Rewarding** — correct answers feel good (green tick + short praise message).
- **Focused on what's important** — content stays tight to what the real test actually examines.
- **Information is correct** — all reading and questions are grounded in the official *Australian Citizenship: Our Common Bond* resource.

## 4. Core Experience

### 4.1 Landing page
- Public URL → immediate access. No sign-in.
- Landing hub presents three primary entry points:
  - **Citizen Test** — full 20-question practice test.
  - **Australiana** — fun trivia, categorised.
  - **Study chapters** — four reading + 10-question test chapters.

### 4.2 Learn in chapters
The app is organised around the four core themes of the Australian citizenship test:

1. **Australia and its people**
2. **Australia's democratic beliefs, rights and liberties**
3. **Government and the law in Australia**
4. **Australian values** (freedom, respect, equality)

Each chapter has two parts:

- **Reading** — a concise SparkNotes-style summary of what the user needs to know from that theme to pass the test. Scannable, with short sections, key terms highlighted, and a clear hierarchy.
- **Test me** button at the end of the reading.

### 4.3 Chapter "Test me"
- Clicking **Test me** opens a quiz page with **10 multiple-choice questions** drawn from that chapter's pool.
- The reading is **not accessible** from the quiz page — it's a real test of recall.
- Questions are real-test-style and grounded in the chapter content.
- The user can **retake** the chapter test any time.
- On retake, questions **refresh**: a new random subset is drawn from a larger chapter pool **and** the answer choices are shuffled.

### 4.4 Answering behaviour (applies to chapter tests and the full practice test)
- Selected answers are **not revealed as right/wrong until Submit is pressed**.
- On Submit:
  - Correct answers → **green with a tick**.
  - Incorrect answers → **red with a cross**, and the UI shows **what the correct answer was and a brief explanation of *why* it is correct**.
- A **Restart** action is always available.
- Reward feedback on correct answers: simple green tick + short praise message (e.g. "Spot on!", "Nice one!").

### 4.5 Progress & saving
- No persistence. Each session is fresh.
- Refresh / re-enter a quiz → new randomised subset and shuffled choices.

### 4.6 Full practice test ("Citizenship Test" mode)
- Separate entry point on the dashboard, outside the chapter flow.
- Mirrors the real Australian citizenship test:
  - **20 multiple-choice questions**, randomised each attempt.
  - Question distribution is **weighted to match the real test** (5 of the 20 are mandatory Australian Values questions; the remaining 15 are drawn from the other three themes in realistic proportions).
  - **Pass rule (enforced exactly like the real test):**
    - Must answer **all 5 Australian Values questions correctly**, AND
    - Must achieve **≥75% overall** (i.e. at least 15 of 20).
  - Result screen clearly states **PASS** or **FAIL**, the score, and which questions were missed with explanations.

### 4.7 Australiana mode
- Separate entry point on the landing page.
- Browseable by **category** (Food & Drink, Sport, Bush & Backyard, School & Kids, Slang & Sayings, Places & Icons) and a **Shuffle** option that mixes 10 random items from all categories.
- Items mix three formats:
  - **`mcq`** — multiple-choice with explanation on check.
  - **`reveal`** — open-ended question, tap-to-reveal the answer (e.g. "name all the sizes of beer in different states").
  - **`challenge`** — real-world prompt with no grading, just "I had a go" (e.g. "do an impression of a kookaburra").
- No pass/fail, no scoring. Just fun.

## 5. Visual Theme

- **Subtle Australian motifs on a clean, modern UI.**
  - Light/neutral base with accents inspired by **wattle (soft gold)** and a hint of **eucalyptus green**.
  - Optional decorative touches: **Southern Cross** marker, wattle sprig in empty states.
  - Generous whitespace, large readable type, mobile-first.
- Avoid flag-literal or kitsch styling.

## 6. Non-Functional Requirements

- **Hosting:** Railway (web service only — no database).
- **Always-on, low cost** — fully static-ish Next.js app, tiny footprint.
- **Mobile-first responsive UI.**
- **Fast load** — minimal JS framework overhead.
- **No persistent storage** of any user data.

## 7. Tech Stack

- **Framework:** Next.js 14 (App Router) + TypeScript.
- **Styling:** Tailwind CSS with a small custom theme for wattle/eucalyptus accents.
- **Database:** none.
- **Auth:** none.
- **Deployment:** Railway, auto-deploy from GitHub `main`.

## 8. Data Model

Nothing persisted. All content lives in version-controlled TypeScript modules:

- `src/lib/content.ts` — citizenship chapters (reading + question pool).
- `src/lib/australiana.ts` — Australiana categories with mixed-format items (`mcq` | `reveal` | `challenge`).
- `src/lib/selection.ts` — question selection + shuffling for chapter tests and the full practice test.

## 9. Question Selection Rules

### Chapter "Test me" (10 questions)
1. Restrict to that chapter's question pool (must be larger than 10 so retakes feel fresh).
2. Randomly select 10, lightly weighted toward questions the user has previously answered incorrectly.
3. Shuffle the answer choices for each selected question.

### Full practice test (20 questions)
1. Pick **5 questions** from the Australian Values pool (`isValuesQuestion = true`).
2. Pick **15 questions** from the other three themes, in proportions that mirror the real test's emphasis.
3. Randomise overall order (Values questions interleaved, not bunched).
4. Shuffle answer choices.
5. Apply pass logic: **all 5 Values correct AND ≥15/20 overall** → PASS, else FAIL.

## 10. Milestones

1. **M0 — Repo & plan** ← *current step.*
2. **M1 — Content seed:** chapter readings (SparkNotes-style) + question pools per chapter, in version-controlled files (JSON/MDX), sourced from *Our Common Bond*.
3. **M2 — App skeleton:** Next.js + Tailwind, chapter list, reading pages, "Test me" flow with submit/feedback (no DB yet).
4. **M3 — Auth + persistence:** Google sign-in with email allow-list, Postgres + Prisma, save progress and attempts.
5. **M4 — Full practice test mode** with weighted selection and real-test pass rules.
6. **M5 — Theme pass:** subtle Aussie motifs, reward micro-interactions, mobile polish.
7. **M6 — Deploy to Railway** (default subdomain), verify end-to-end with real Google login.

## 11. Open Questions

- Exact list of allow-listed Google email addresses (needed before deploy).
- Target pool size per chapter — suggested **≥20 questions per chapter** so retakes of a 10-question test feel meaningfully different.
- Exact weighting between the three non-Values themes in the full practice test (suggest roughly 5/5/5 unless you want to bias).
- Should results history be browsable (a "my past attempts" page), or just the latest best score per chapter?

## 12. Notes for Future Edits

- Keep this file updated whenever scope, stack, content structure, or data model changes.
- Append further instructions from the user to **Section 13** below.

## 13. Additional Instructions Log

- **Update 1:** Added Australian theme, design principles, full chapter-based learning experience (reading + "Test me"), submit-then-reveal answer behaviour with explanations on wrong answers, restart support, auto-saved progress, retake refresh (new subset + shuffled choices), and the standalone 20-question full practice test with real-test pass rules.
- **Update 1 — decisions captured:** small fixed account set; **Google sign-in** with email allow-list; **Next.js + Postgres** stack; subtle wattle/Southern-Cross theme; **10 questions per chapter** test; content sourced from *Our Common Bond*; full-test enforces both the **all-5-Values-correct** and **≥75% overall** rules; retake refresh = **new subset AND shuffled choices**; default Railway URL for now.
- **Update 2 (pivot):** Auth and database removed entirely. App is public and stateless. Added **Australiana** mode — a relaxed trivia experience with multiple-choice, tap-to-reveal, and silly real-world "challenge" items, browseable by category or shuffled. Landing page reorganised as a hub: Citizen Test, Australiana, and four study chapters.
