import Link from "next/link";
import { CHAPTERS } from "@/lib/content";
import { AUSTRALIANA_CATEGORIES } from "@/lib/australiana";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="card text-center">
        <h1 className="text-3xl font-bold text-eucalypt-700">G&apos;day!</h1>
        <p className="mt-3 text-slate-700">
          Have a crack at the official-style citizenship test, work through the four study
          chapters, or take it easy with a bit of Australiana.
        </p>
      </section>

      {/* Top: the two big test entry points */}
      <section className="grid gap-4 md:grid-cols-2">
        <Link
          href="/practice-test"
          className="card group flex flex-col gap-3 transition hover:shadow-md hover:ring-eucalypt-500"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-eucalypt-700">Citizen Test</h2>
            <span className="rounded-full bg-eucalypt-600 px-3 py-1 text-xs font-semibold text-white">
              20 questions
            </span>
          </div>
          <p className="text-sm text-slate-600">
            The real-deal practice test. To pass: all 5 Australian Values questions correct AND
            at least 75% overall.
          </p>
          <span className="mt-auto text-sm font-medium text-eucalypt-700 group-hover:underline">
            Start the test →
          </span>
        </Link>

        <Link
          href="/australiana"
          className="card group flex flex-col gap-3 transition hover:shadow-md hover:ring-wattle-400"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-eucalypt-700">Australiana</h2>
            <span className="rounded-full bg-wattle-400 px-3 py-1 text-xs font-semibold text-slate-900">
              Just for fun
            </span>
          </div>
          <p className="text-sm text-slate-600">
            Footy, beers, slang, bush and backyard. Mix of quick-fire questions, tap-to-reveal
            cards, and silly challenges.
          </p>
          <span className="mt-auto text-sm font-medium text-eucalypt-700 group-hover:underline">
            Pick a category →
          </span>
        </Link>
      </section>

      {/* Study chapters */}
      <section>
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="text-lg font-semibold text-eucalypt-700">Study chapters</h2>
          <span className="text-xs text-slate-500">Reading + 10-question chapter test</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {CHAPTERS.map((ch) => (
            <Link
              key={ch.slug}
              href={`/chapters/${ch.slug}`}
              className="card transition hover:shadow-md hover:ring-eucalypt-500"
            >
              <h3 className="text-base font-semibold text-eucalypt-700">{ch.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{ch.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Australiana shortcuts */}
      <section>
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="text-lg font-semibold text-eucalypt-700">Australiana categories</h2>
          <Link href="/australiana" className="text-xs text-eucalypt-700 hover:underline">
            See all →
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {AUSTRALIANA_CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/australiana/${cat.slug}`}
              className="card transition hover:shadow-md hover:ring-wattle-400"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl" aria-hidden>
                  {cat.emoji}
                </span>
                <h3 className="text-base font-semibold text-eucalypt-700">{cat.title}</h3>
              </div>
              <p className="mt-1 text-sm text-slate-600">{cat.blurb}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
