import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CHAPTERS } from "@/lib/content";
import Link from "next/link";
import SignInButton from "@/components/SignInButton";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return (
      <div className="card mx-auto max-w-xl text-center">
        <h1 className="text-3xl font-bold text-eucalypt-700">G'day!</h1>
        <p className="mt-3 text-slate-700">
          Study for your Australian citizenship test in four focused chapters, then put it all
          together with a full 20-question practice test.
        </p>
        <p className="mt-2 text-slate-600">
          Sign in with Google to save your progress across devices.
        </p>
        <div className="mt-6 flex justify-center">
          <SignInButton />
        </div>
      </div>
    );
  }

  const userId = (session.user as { id?: string }).id!;
  const progress = await prisma.chapterProgress.findMany({ where: { userId } });
  const progressBySlug = new Map(progress.map((p) => [p.chapterSlug, p]));

  const recentFullTest = await prisma.testSession.findFirst({
    where: { userId, mode: "full_test" },
    orderBy: { completedAt: "desc" }
  });

  return (
    <div className="space-y-8">
      <section className="card">
        <h1 className="text-2xl font-bold text-eucalypt-700">
          Welcome back{session.user.name ? `, ${session.user.name.split(" ")[0]}` : ""}.
        </h1>
        <p className="mt-2 text-slate-700">
          Work through the chapters below. When you're ready, take a full practice test.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {CHAPTERS.map((ch) => {
          const p = progressBySlug.get(ch.slug);
          return (
            <Link
              key={ch.slug}
              href={`/chapters/${ch.slug}`}
              className="card transition hover:shadow-md hover:ring-eucalypt-500"
            >
              <h2 className="text-lg font-semibold text-eucalypt-700">{ch.title}</h2>
              <p className="mt-1 text-sm text-slate-600">{ch.blurb}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span
                  className={
                    p?.readingCompleted
                      ? "rounded-full bg-eucalypt-100 px-2 py-0.5 text-eucalypt-700"
                      : "rounded-full bg-slate-100 px-2 py-0.5"
                  }
                >
                  {p?.readingCompleted ? "Reading completed" : "Reading not yet done"}
                </span>
                {typeof p?.bestScore === "number" && (
                  <span className="rounded-full bg-wattle-200 px-2 py-0.5 text-slate-800">
                    Best test: {p.bestScore}/10
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </section>

      <section className="card">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-eucalypt-700">Full practice test</h2>
            <p className="mt-1 text-sm text-slate-600">
              20 questions, mirrored on the real test. You must answer all 5 Australian Values
              questions correctly AND score at least 75% overall to pass.
            </p>
          </div>
          <Link href="/practice-test" className="btn-primary">
            Start practice test
          </Link>
        </div>
        {recentFullTest && (
          <p className="mt-3 text-xs text-slate-500">
            Last attempt: {recentFullTest.score}/{recentFullTest.total} —{" "}
            {recentFullTest.passed ? "PASSED ✓" : "Not yet passed"}
          </p>
        )}
      </section>
    </div>
  );
}
