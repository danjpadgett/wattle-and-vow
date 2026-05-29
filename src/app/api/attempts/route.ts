import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type AttemptItem = {
  questionId: string;
  chapterSlug: string;
  answeredIndex: number;
  isCorrect: boolean;
};

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const userId = (session.user as { id?: string }).id!;

  const body = (await req.json()) as {
    mode: "chapter" | "full_test";
    chapterSlug?: string;
    items: AttemptItem[];
  };

  if (!Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json({ error: "no items" }, { status: 400 });
  }

  const total = body.items.length;
  const score = body.items.filter((i) => i.isCorrect).length;

  let passed: boolean | null = null;
  if (body.mode === "full_test") {
    const valuesItems = body.items.filter((i) => i.chapterSlug === "values");
    const valuesAllCorrect =
      valuesItems.length > 0 && valuesItems.every((i) => i.isCorrect);
    passed = valuesAllCorrect && score / total >= 0.75;
  }

  const testSession = await prisma.testSession.create({
    data: {
      userId,
      mode: body.mode,
      chapterSlug: body.mode === "chapter" ? body.chapterSlug ?? null : null,
      total,
      score,
      passed
    }
  });

  await prisma.attempt.createMany({
    data: body.items.map((i) => ({
      userId,
      questionId: i.questionId,
      chapterSlug: i.chapterSlug,
      answeredIndex: i.answeredIndex,
      isCorrect: i.isCorrect,
      testSessionId: testSession.id
    }))
  });

  if (body.mode === "chapter" && body.chapterSlug) {
    const existing = await prisma.chapterProgress.findUnique({
      where: { userId_chapterSlug: { userId, chapterSlug: body.chapterSlug } }
    });
    const newBest =
      existing?.bestScore != null ? Math.max(existing.bestScore, score) : score;
    await prisma.chapterProgress.upsert({
      where: { userId_chapterSlug: { userId, chapterSlug: body.chapterSlug } },
      create: {
        userId,
        chapterSlug: body.chapterSlug,
        bestScore: score,
        lastAttemptAt: new Date()
      },
      update: { bestScore: newBest, lastAttemptAt: new Date() }
    });
  }

  return NextResponse.json({ ok: true, score, total, passed });
}
