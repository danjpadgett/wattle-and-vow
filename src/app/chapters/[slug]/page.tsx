import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getChapter } from "@/lib/content";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import MarkReadingButton from "@/components/MarkReadingButton";

export const dynamic = "force-dynamic";

export default async function ChapterPage({
  params
}: {
  params: { slug: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/sign-in");

  const chapter = getChapter(params.slug);
  if (!chapter) notFound();

  const userId = (session.user as { id?: string }).id!;
  const progress = await prisma.chapterProgress.findUnique({
    where: { userId_chapterSlug: { userId, chapterSlug: chapter.slug } }
  });

  return (
    <article className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/" className="btn-ghost text-sm">
          ← Back to chapters
        </Link>
        {typeof progress?.bestScore === "number" && (
          <span className="text-sm text-slate-500">
            Best test score: {progress.bestScore}/10
          </span>
        )}
      </div>

      <header className="card">
        <h1 className="text-3xl font-bold text-eucalypt-700">{chapter.title}</h1>
        <p className="mt-2 text-slate-700">{chapter.blurb}</p>
      </header>

      <div className="card space-y-6">
        {chapter.reading.map((section) => (
          <section key={section.heading}>
            <h2 className="text-xl font-semibold text-eucalypt-700">{section.heading}</h2>
            <div className="mt-2 space-y-2 text-slate-800 leading-relaxed">
              {section.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="card flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-eucalypt-700">Ready to test yourself?</h2>
          <p className="mt-1 text-sm text-slate-600">
            10 questions, no peeking at the reading. You can retake it as many times as you
            like — questions and answer choices refresh each time.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <MarkReadingButton
            chapterSlug={chapter.slug}
            initiallyDone={!!progress?.readingCompleted}
          />
          <Link href={`/chapters/${chapter.slug}/test`} className="btn-primary">
            Test me
          </Link>
        </div>
      </div>
    </article>
  );
}
