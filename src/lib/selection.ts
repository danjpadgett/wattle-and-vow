import { CHAPTERS, type Chapter, type Question, getChapter } from "@/lib/content";

export type PreparedQuestion = {
  id: string;          // original question id
  chapterSlug: Chapter["slug"];
  prompt: string;
  choices: string[];   // shuffled
  correctIndex: number; // index into the shuffled choices
  explanation: string;
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function prepare(q: Question, chapterSlug: Chapter["slug"]): PreparedQuestion {
  const correctText = q.choices[q.correctIndex];
  const shuffled = shuffle(q.choices);
  return {
    id: q.id,
    chapterSlug,
    prompt: q.prompt,
    choices: shuffled,
    correctIndex: shuffled.indexOf(correctText),
    explanation: q.explanation
  };
}

// Pick N questions from a chapter, shuffling order and answer choices.
export function pickChapterQuestions(slug: string, n = 10): PreparedQuestion[] {
  const chapter = getChapter(slug);
  if (!chapter) return [];
  const pool = shuffle(chapter.questions).slice(0, Math.min(n, chapter.questions.length));
  return pool.map((q) => prepare(q, chapter.slug));
}

// Pick a full 20-question practice test:
//   - 5 from "values" (mandatory in the real test)
//   - 5 each from "people", "democracy", "government"
// Returns Values questions interleaved (not bunched), choices shuffled.
export function pickPracticeTest(): PreparedQuestion[] {
  const get = (slug: Chapter["slug"], n: number) => {
    const ch = CHAPTERS.find((c) => c.slug === slug)!;
    return shuffle(ch.questions).slice(0, n).map((q) => prepare(q, slug));
  };
  const values = get("values", 5);
  const others = [
    ...get("people", 5),
    ...get("democracy", 5),
    ...get("government", 5)
  ];
  return shuffle([...values, ...others]);
}

// Compute pass/fail using the real test rules:
//   - All 5 Values questions correct AND
//   - >= 75% overall (>= 15 of 20)
export function evaluatePracticeTest(
  questions: PreparedQuestion[],
  answers: number[]
): { score: number; total: number; passed: boolean; valuesAllCorrect: boolean } {
  let score = 0;
  let valuesAttempted = 0;
  let valuesCorrect = 0;
  questions.forEach((q, i) => {
    const isCorrect = answers[i] === q.correctIndex;
    if (isCorrect) score++;
    if (q.chapterSlug === "values") {
      valuesAttempted++;
      if (isCorrect) valuesCorrect++;
    }
  });
  const valuesAllCorrect = valuesAttempted > 0 && valuesCorrect === valuesAttempted;
  const passed = valuesAllCorrect && score / questions.length >= 0.75;
  return { score, total: questions.length, passed, valuesAllCorrect };
}
