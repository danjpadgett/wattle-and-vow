import { getChapter } from "@/lib/content";
import { pickChapterQuestions } from "@/lib/selection";
import { notFound } from "next/navigation";
import Quiz from "@/components/Quiz";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function ChapterTestPage({ params }: { params: { slug: string } }) {
  const chapter = getChapter(params.slug);
  if (!chapter) notFound();

  const questions = pickChapterQuestions(chapter.slug, 10);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href={`/chapters/${chapter.slug}`} className="btn-ghost text-sm">
          ← Back to reading
        </Link>
        <span className="text-sm text-slate-500">{chapter.title} — Test</span>
      </div>
      <Quiz mode="chapter" chapterSlug={chapter.slug} questions={questions} />
    </div>
  );
}
