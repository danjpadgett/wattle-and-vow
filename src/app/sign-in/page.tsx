import SignInButton from "@/components/SignInButton";

export default function SignInPage({
  searchParams
}: {
  searchParams?: { error?: string };
}) {
  return (
    <div className="card mx-auto max-w-md text-center">
      <h1 className="text-2xl font-bold text-eucalypt-700">Sign in</h1>
      <p className="mt-2 text-slate-600">
        Use your Google account. Only accounts that have been added to the allow-list can sign
        in.
      </p>
      <div className="mt-6 flex justify-center">
        <SignInButton />
      </div>
      {searchParams?.error && (
        <p className="mt-4 text-sm text-red-600">
          {searchParams.error === "AccessDenied"
            ? "That Google account is not on the allow-list."
            : "Something went wrong signing in. Please try again."}
        </p>
      )}
    </div>
  );
}
