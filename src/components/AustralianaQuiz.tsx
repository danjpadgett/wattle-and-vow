"use client";

import { useState } from "react";
import clsx from "clsx";
import type { AustralianaItem } from "@/lib/australiana";

const PRAISE = ["Spot on!", "Nice one!", "Beauty!", "You ripper!", "Onya!", "Top stuff!"];

export default function AustralianaQuiz({ items }: { items: AustralianaItem[] }) {
  return (
    <ol className="space-y-4">
      {items.map((item, i) => (
        <li key={`${item.id}-${i}`}>
          <ItemCard item={item} index={i} />
        </li>
      ))}
    </ol>
  );
}

function ItemCard({ item, index }: { item: AustralianaItem; index: number }) {
  if (item.kind === "mcq") return <McqCard item={item} index={index} />;
  if (item.kind === "reveal") return <RevealCard item={item} index={index} />;
  return <ChallengeCard item={item} index={index} />;
}

function McqCard({
  item,
  index
}: {
  item: Extract<AustralianaItem, { kind: "mcq" }>;
  index: number;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const correct = picked === item.correctIndex;

  return (
    <div className="card">
      <Header index={index} tag="Multiple choice" tagClass="bg-eucalypt-100 text-eucalypt-700" />
      <p className="mt-1 font-medium text-slate-900">{item.prompt}</p>
      <ul className="mt-3 space-y-2">
        {item.choices.map((choice, ci) => {
          const chosen = picked === ci;
          const isRight = item.correctIndex === ci;
          let cls = "border-slate-200 hover:border-eucalypt-500 hover:bg-eucalypt-50";
          if (submitted) {
            if (isRight) cls = "border-emerald-500 bg-emerald-50 text-emerald-900";
            else if (chosen) cls = "border-red-500 bg-red-50 text-red-900";
            else cls = "border-slate-200 opacity-70";
          } else if (chosen) {
            cls = "border-eucalypt-600 bg-eucalypt-50";
          }
          return (
            <li key={ci}>
              <label
                className={clsx(
                  "flex cursor-pointer items-start gap-3 rounded-xl border px-3 py-2 transition",
                  cls
                )}
              >
                <input
                  type="radio"
                  name={`aus-${item.id}`}
                  disabled={submitted}
                  checked={chosen}
                  onChange={() => setPicked(ci)}
                  className="mt-1"
                />
                <span className="flex-1">{choice}</span>
                {submitted && isRight && (
                  <span className="font-bold text-emerald-700">✓</span>
                )}
                {submitted && chosen && !isRight && (
                  <span className="font-bold text-red-700">✗</span>
                )}
              </label>
            </li>
          );
        })}
      </ul>
      {!submitted ? (
        <button
          onClick={() => picked !== null && setSubmitted(true)}
          disabled={picked === null}
          className={clsx("btn-primary mt-3", picked === null && "opacity-50")}
        >
          Check
        </button>
      ) : (
        <div
          className={clsx(
            "mt-3 rounded-xl px-3 py-2 text-sm",
            correct ? "bg-emerald-50 text-emerald-900" : "bg-red-50 text-red-900"
          )}
        >
          {correct ? (
            <strong>{PRAISE[index % PRAISE.length]} </strong>
          ) : (
            <>
              <strong>Correct answer:</strong> {item.choices[item.correctIndex]}.{" "}
            </>
          )}
          {item.explanation}
        </div>
      )}
    </div>
  );
}

function RevealCard({
  item,
  index
}: {
  item: Extract<AustralianaItem, { kind: "reveal" }>;
  index: number;
}) {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className="card">
      <Header
        index={index}
        tag="Tap to reveal"
        tagClass="bg-wattle-200 text-slate-900"
      />
      <p className="mt-1 font-medium text-slate-900">{item.prompt}</p>
      {!revealed ? (
        <button onClick={() => setRevealed(true)} className="btn-secondary mt-3">
          Show me the answer
        </button>
      ) : (
        <div className="mt-3 space-y-2">
          <div className="rounded-xl bg-eucalypt-50 px-3 py-2 text-sm text-slate-800">
            {item.answer}
          </div>
          {item.note && (
            <p className="text-xs text-slate-500 italic">{item.note}</p>
          )}
        </div>
      )}
    </div>
  );
}

function ChallengeCard({
  item,
  index
}: {
  item: Extract<AustralianaItem, { kind: "challenge" }>;
  index: number;
}) {
  const [done, setDone] = useState(false);
  return (
    <div className="card border-l-4 border-l-red-300">
      <Header
        index={index}
        tag="Challenge"
        tagClass="bg-red-100 text-red-800"
      />
      <p className="mt-2 text-xs uppercase tracking-wide text-red-700/80">
        Real-world dare — no right answer, just have a crack.
      </p>
      <p className="mt-2 font-medium text-slate-900">{item.prompt}</p>
      {item.note && (
        <p className="mt-1 text-xs text-slate-500 italic">{item.note}</p>
      )}
      <button
        type="button"
        onClick={() => setDone((d) => !d)}
        className={clsx(
          "mt-4 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition",
          done
            ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
            : "bg-red-100 text-red-800 hover:bg-red-200"
        )}
      >
        {done ? "✓ Done — had a crack" : "Mark as done"}
      </button>
      {done && (
        <p className="mt-2 text-sm text-emerald-700 font-medium">
          {PRAISE[index % PRAISE.length]} 🇦🇺
        </p>
      )}
    </div>
  );
}

function Header({
  index,
  tag,
  tagClass
}: {
  index: number;
  tag: string;
  tagClass: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-semibold text-eucalypt-700">Q{index + 1}</span>
      <span className={clsx("rounded-full px-2 py-0.5 text-xs font-medium", tagClass)}>
        {tag}
      </span>
    </div>
  );
}
