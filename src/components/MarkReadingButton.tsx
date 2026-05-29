"use client";

import { useState } from "react";

export default function MarkReadingButton({
  chapterSlug,
  initiallyDone
}: {
  chapterSlug: string;
  initiallyDone: boolean;
}) {
  const [done, setDone] = useState(initiallyDone);
  const [busy, setBusy] = useState(false);

  async function toggle() {
    setBusy(true);
    const next = !done;
    setDone(next);
    try {
      await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chapterSlug, readingCompleted: next })
      });
    } catch {
      setDone(!next); // revert
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={busy}
      className={done ? "btn-secondary" : "btn-ghost"}
    >
      {done ? "✓ Reading done" : "Mark reading done"}
    </button>
  );
}
