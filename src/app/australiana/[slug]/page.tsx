import {
  getAustralianaCategory,
  shuffleAustralianaItems,
  type AustralianaItem
} from "@/lib/australiana";
import { notFound } from "next/navigation";
import Link from "next/link";
import AustralianaQuiz from "@/components/AustralianaQuiz";

export const dynamic = "force-dynamic";

export default function AustralianaCategoryPage({
  params
}: {
  params: { slug: string };
}) {
  let title: string;
  let blurb: string;
  let emoji: string;
  let items: AustralianaItem[];

  if (params.slug === "shuffle") {
    title = "Shuffle";
    emoji = "🎲";
    blurb = "10 random items from every Australiana category.";
    items = shuffleAustralianaItems(10);
  } else {
    const cat = getAustralianaCategory(params.slug);
    if (!cat) notFound();
    title = cat.title;
    emoji = cat.emoji;
    blurb = cat.blurb;
    items = cat.items;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/australiana" className="btn-ghost text-sm">
          ← All categories
        </Link>
        <Link href={`/australiana/${params.slug}`} className="btn-ghost text-sm">
          ↻ Refresh
        </Link>
      </div>

      <header className="card">
        <div className="flex items-center gap-3">
          <span className="text-3xl" aria-hidden>
            {emoji}
          </span>
          <h1 className="text-2xl font-bold text-eucalypt-700">{title}</h1>
        </div>
        <p className="mt-2 text-sm text-slate-700">{blurb}</p>
      </header>

      <AustralianaQuiz items={items} />
    </div>
  );
}
