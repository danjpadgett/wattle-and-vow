import Link from "next/link";
import { AUSTRALIANA_CATEGORIES } from "@/lib/australiana";

export default function AustralianaIndex() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/" className="btn-ghost text-sm">
          ← Back to home
        </Link>
      </div>

      <header className="card">
        <h1 className="text-3xl font-bold text-eucalypt-700">Australiana</h1>
        <p className="mt-2 text-slate-700">
          A low-stakes quiz of everyday Aussie life. Multiple choice, tap-to-reveal cards, and
          silly real-world challenges. No grade, no pressure.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/australiana/shuffle"
          className="card transition hover:shadow-md hover:ring-wattle-400"
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl" aria-hidden>
              🎲
            </span>
            <h2 className="text-lg font-semibold text-eucalypt-700">Shuffle (10 random)</h2>
          </div>
          <p className="mt-1 text-sm text-slate-600">
            One big mixed-bag of 10 random items across every category.
          </p>
        </Link>

        {AUSTRALIANA_CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/australiana/${cat.slug}`}
            className="card transition hover:shadow-md hover:ring-wattle-400"
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl" aria-hidden>
                {cat.emoji}
              </span>
              <h2 className="text-lg font-semibold text-eucalypt-700">{cat.title}</h2>
            </div>
            <p className="mt-1 text-sm text-slate-600">{cat.blurb}</p>
            <p className="mt-2 text-xs text-slate-500">{cat.items.length} items</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
