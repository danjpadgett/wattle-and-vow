"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import type { PreparedQuestion } from "@/lib/selection";

type Props = {
  mode: "chapter" | "full_test";
  chapterSlug?: string;
  questions: PreparedQuestion[];
};

const PRAISE = [
  "Spot on!",
  "Nice one!",
  "Well done!",
  "Beauty!",
  "You ripper!",
  "Onya!"
];

export default function Quiz({ mode, chapterSlug, questions }: Props) {
  const router = useRouter();
  const [answers, setAnswers] = useState<(number | null)[]>(
    () => questions.map(() => null)
  );
  const [submitted, setSubmitted] = useState(false);

  const result = useMemo(() => {
    if (!submitted) return null;
    let score = 0;
    let valuesTotal = 0;
    let valuesCorrect = 0;
    questions.forEach((q, i) => {
      const isCorrect = answers[i] === q.correctIndex;
      if (isCorrect) score++;
      if (q.chapterSlug === "values") {
        valuesTotal++;
        if (isCorrect) valuesCorrect++;
      }
    });
    const passed =
      mode === "full_test"
        ? valuesCorrect === valuesTotal && score / questions.length >= 0.75
        : null;
    return { score, total: questions.length, valuesCorrect, valuesTotal, passed };
  }, [submitted, answers, questions, mode]);

  const allAnswered = answers.every((a) => a !== null);

  function submit() {
    if (!allAnswered) return;
    setSubmitted(true);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function restart() {
    if (mode === "chapter" && chapterSlug) {
      router.push(`/chapters/${chapterSlug}/test`);
    } else {
      router.push("/practice-test");
    }
    router.refresh();
  }

  return (
    <div className="space-y-4">
      <ol className="space-y-4">
        {questions.map((q, qi) => {
          const selected = answers[qi];
          return (
            <li key={`${q.id}-${qi}`} className="card">
              <div className="flex items-start justify-between gap-3">
                <p className="font-medium text-slate-900">
                  <span className="mr-2 text-eucalypt-700">Q{qi + 1}.</span>
                  {q.prompt}
                </p>
              </div>
              <ul className="mt-3 space-y-2">
                {q.choices.map((choice, ci) => {
                  const chosen = selected === ci;
                  const isCorrect = q.correctIndex === ci;
                  let stateClasses =
                    "border-slate-200 hover:border-eucalypt-500 hover:bg-eucalypt-50";
                  if (submitted) {
                    if (isCorrect) {
                      stateClasses =
                        "border-emerald-500 bg-emerald-50 text-emerald-900";
                    } else if (chosen && !isCorrect) {
                      stateClasses = "border-red-500 bg-red-50 text-red-900";
                    } else {
                      stateClasses = "border-slate-200 opacity-70";
                    }
                  } else if (chosen) {
                    stateClasses = "border-eucalypt-600 bg-eucalypt-50";
                  }
                  return (
                    <li key={ci}>
                      <label
                        className={clsx(
                          "flex cursor-pointer items-start gap-3 rounded-xl border px-3 py-2 transition",
                          stateClasses
                        )}
                      >
                        <input
                          type="radio"
                          name={`q-${qi}`}
                          value={ci}
                          disabled={submitted}
                          checked={chosen}
                          onChange={() => {
                            const next = [...answers];
                            next[qi] = ci;
                            setAnswers(next);
                          }}
                          className="mt-1"
                        />
                        <span className="flex-1">{choice}</span>
                        {submitted && isCorrect && (
                          <span aria-label="correct" className="font-bold text-emerald-700">
                            ✓
                          </span>
                        )}
                        {submitted && chosen && !isCorrect && (
                          <span aria-label="incorrect" className="font-bold text-red-700">
                            ✗
                          </span>
                        )}
                      </label>
                    </li>
                  );
                })}
              </ul>
              {submitted && (
                <div
                  className={clsx(
                    "mt-3 rounded-xl px-3 py-2 text-sm",
                    selected === q.correctIndex
                      ? "bg-emerald-50 text-emerald-900"
                      : "bg-red-50 text-red-900"
                  )}
                >
                  {selected === q.correctIndex ? (
                    <strong>{PRAISE[qi % PRAISE.length]}</strong>
                  ) : (
                    <>
                      <strong>Correct answer:</strong> {q.choices[q.correctIndex]}.{" "}
                    </>
                  )}{" "}
                  {q.explanation}
                </div>
              )}
            </li>
          );
        })}
      </ol>

      {!submitted ? (
        <div className="card flex items-center justify-between">
          <p className="text-sm text-slate-600">
            {answers.filter((a) => a !== null).length} of {questions.length} answered.
          </p>
          <div className="flex gap-2">
            <button onClick={restart} className="btn-ghost">
              Restart
            </button>
            <button
              onClick={submit}
              disabled={!allAnswered}
              className={clsx("btn-primary", !allAnswered && "opacity-50")}
            >
              Submit answers
            </button>
          </div>
        </div>
      ) : (
        <ResultCard mode={mode} result={result!} onRestart={restart} />
      )}
    </div>
  );
}

function ResultCard({
  mode,
  result,
  onRestart
}: {
  mode: "chapter" | "full_test";
  result: {
    score: number;
    total: number;
    valuesCorrect: number;
    valuesTotal: number;
    passed: boolean | null;
  };
  onRestart: () => void;
}) {
  const pct = Math.round((result.score / result.total) * 100);
  return (
    <div className="card">
      <h2 className="text-xl font-bold text-eucalypt-700">
        {mode === "full_test" ? "Practice test result" : "Chapter test result"}
      </h2>
      <p className="mt-2 text-slate-800">
        You scored <strong>{result.score} / {result.total}</strong> ({pct}%).
      </p>
      {mode === "full_test" && (
        <>
          <p className="mt-1 text-sm text-slate-700">
            Australian Values questions correct: {result.valuesCorrect} / {result.valuesTotal}
          </p>
          <p
            className={clsx(
              "mt-3 inline-block rounded-full px-3 py-1 text-sm font-semibold",
              result.passed
                ? "bg-emerald-100 text-emerald-800"
                : "bg-red-100 text-red-800"
            )}
          >
            {result.passed ? "PASS ✓" : "FAIL — try again"}
          </p>
          {!result.passed && result.valuesCorrect < result.valuesTotal && (
            <p className="mt-2 text-xs text-slate-600">
              Remember: you must answer all 5 Australian Values questions correctly to pass.
            </p>
          )}
        </>
      )}
      <div className="mt-4 flex gap-2">
        <button onClick={onRestart} className="btn-primary">
          Try again
        </button>
        <a href="/" className="btn-ghost">
          Back to home
        </a>
      </div>
    </div>
  );
}
