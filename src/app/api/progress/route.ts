import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const userId = (session.user as { id?: string }).id!;

  const body = (await req.json()) as {
    chapterSlug?: string;
    readingCompleted?: boolean;
  };
  if (!body.chapterSlug) {
    return NextResponse.json({ error: "missing chapterSlug" }, { status: 400 });
  }

  const data: { readingCompleted?: boolean } = {};
  if (typeof body.readingCompleted === "boolean") {
    data.readingCompleted = body.readingCompleted;
  }

  await prisma.chapterProgress.upsert({
    where: { userId_chapterSlug: { userId, chapterSlug: body.chapterSlug } },
    create: {
      userId,
      chapterSlug: body.chapterSlug,
      readingCompleted: data.readingCompleted ?? false
    },
    update: data
  });

  return NextResponse.json({ ok: true });
}
