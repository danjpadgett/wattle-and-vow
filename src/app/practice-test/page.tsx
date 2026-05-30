import { pickPracticeTest } from "@/lib/selection";
import Quiz from "@/components/Quiz";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function PracticeTestPage() {
  const questions = pickPracticeTest();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/" className="btn-ghost text-sm">
          ← Back to home
        </Link>
        <span className="text-sm text-slate-500">Citizen Test</span>
      </div>
      <div className="card">
        <h1 className="text-2xl font-bold text-eucalypt-700">Citizen Test</h1>
        <p className="mt-1 text-sm text-slate-600">
          20 questions. To pass: all 5 Australian Values questions correct AND at least 75%
          overall (15/20).
        </p>
      </div>
      <Quiz mode="full_test" questions={questions} />
    </div>
  );
}
