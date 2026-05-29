# CLAUDE.md — Wattle & Vow (Australian Citizenship Test Study App)

This file is the working plan and source of truth for Claude/Copilot when assisting on this project. Update it as decisions are made.

## 1. Purpose

A web-based study application to help my wife prepare for and pass the **Australian Citizenship Test**. The app focuses on **effective, repeated practice** of the known and commonly asked questions that appear on the official test.

## 2. Users & Auth

- **Small fixed set of accounts** (2–5), primarily for my wife, possibly me and close family.
- **Login via Google sign-in** (OAuth). No password management.
- Logging in unlocks the core benefit: **progress is saved** across sessions and devices.
- Access is gated by an allow-list of Google email addresses (configurable via env var).

## 3. Design Principles

- **Intuitive** — obvious navigation, minimal chrome, mobile-first.
- **Rewarding** — correct answers feel good (green tick + short praise message).
- **Focused on what's important** — content stays tight to what the real test actually examines.
- **Information is correct** — all reading and questions are grounded in the official *Australian Citizenship: Our Common Bond* resource.

## 4. Core Experience

### 4.1 Landing & login
- Open a public URL → "Sign in with Google" → land on a personal dashboard.
- Dashboard shows: chapters with progress indicators, a "Full Practice Test" entry point, and overall readiness.

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
- Progress saves automatically on every answered question and on test completion.
- The user can leave a chapter or test mid-way and resume later.
- Per-chapter progress shows: reading read (yes/no), best chapter-test score, last attempt date.

### 4.6 Full practice test ("Citizenship Test" mode)
- Separate entry point on the dashboard, outside the chapter flow.
- Mirrors the real Australian citizenship test:
  - **20 multiple-choice questions**, randomised each attempt.
  - Question distribution is **weighted to match the real test** (5 of the 20 are mandatory Australian Values questions; the remaining 15 are drawn from the other three themes in realistic proportions).
  - **Pass rule (enforced exactly like the real test):**
    - Must answer **all 5 Australian Values questions correctly**, AND
    - Must achieve **≥75% overall** (i.e. at least 15 of 20).
  - Result screen clearly states **PASS** or **FAIL**, the score, and which questions were missed with explanations.

## 5. Visual Theme

- **Subtle Australian motifs on a clean, modern UI.**
  - Light/neutral base with accents inspired by **wattle (soft gold)** and a hint of **eucalyptus green**.
  - Optional decorative touches: **Southern Cross** marker, wattle sprig in empty states.
  - Generous whitespace, large readable type, mobile-first.
- Avoid flag-literal or kitsch styling.

## 6. Non-Functional Requirements

- **Hosting:** Railway (web service + managed Postgres). Default `*.up.railway.app` URL to start — custom domain can come later.
- **Always-on, low cost** — small footprint, suitable for Railway's hobby tier.
- **Mobile-first responsive UI.**
- **Fast load** — minimal JS framework overhead.
- **Persistent progress** across sessions/devices, tied to Google account.

## 7. Tech Stack

Keep it as simple as possible to meet the requirements. Working assumption (single deployable, easy on Railway):

- **Framework:** Next.js (App Router) + TypeScript — one process serves both UI and API.
- **Styling:** Tailwind CSS with a small custom theme for wattle/eucalyptus accents.
- **Database:** PostgreSQL (Railway plugin).
- **ORM:** Prisma.
- **Auth:** NextAuth (Auth.js) with **Google provider**, restricted to an allow-list of emails (env var).
- **Deployment:** Railway, auto-deploy from GitHub `main`.

If during build a simpler stack proves clearly better, revisit — but default to the above.

## 8. Data Model (initial draft)

- `User` — id, googleSub, email, name, createdAt.
- `Chapter` — id, slug, title, order, readingMarkdown.
- `Question` — id, chapterId, prompt, choices[], correctIndex, explanation, source, isValuesQuestion (bool), weight.
- `ChapterProgress` — userId, chapterId, readingCompleted (bool), bestScore, lastAttemptAt.
- `Attempt` — id, userId, questionId, answeredIndex, isCorrect, answeredAt, sessionId.
- `Session` — id, userId, mode (`chapter` | `full_test`), chapterId (nullable), startedAt, completedAt, score, passed (nullable for chapter mode).

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
