import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { pickPracticeTest } from "@/lib/selection";
import { redirect } from "next/navigation";
import Quiz from "@/components/Quiz";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function PracticeTestPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/sign-in");

  const questions = pickPracticeTest();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/" className="btn-ghost text-sm">
          ← Back to home
        </Link>
        <span className="text-sm text-slate-500">Full Practice Test</span>
      </div>
      <div className="card">
        <h1 className="text-2xl font-bold text-eucalypt-700">Full Practice Test</h1>
        <p className="mt-1 text-sm text-slate-600">
          20 questions. To pass: all 5 Australian Values questions correct AND at least 75%
          overall (15/20).
        </p>
      </div>
      <Quiz mode="full_test" questions={questions} />
    </div>
  );
}
