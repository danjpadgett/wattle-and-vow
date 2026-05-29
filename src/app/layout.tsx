import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SignOutButton from "@/components/SignOutButton";

export const metadata: Metadata = {
  title: "Wattle & Vow",
  description: "Wattle & Vow — study smart for your Australian citizenship test."
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className="min-h-screen aussie-bg">
        <Providers>
          <header className="border-b border-wattle-200 bg-white/70 backdrop-blur">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
              <Link href="/" className="flex items-center gap-2 font-semibold text-eucalypt-700">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.svg" alt="" aria-hidden className="h-7 w-7" />
                <span>Wattle &amp; Vow</span>
              </Link>
              {session?.user ? (
                <div className="flex items-center gap-3 text-sm">
                  <span className="hidden sm:inline text-slate-600">
                    {session.user.email}
                  </span>
                  <SignOutButton />
                </div>
              ) : (
                <Link href="/sign-in" className="btn-primary text-sm">
                  Sign in
                </Link>
              )}
            </div>
          </header>
          <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
          <footer className="mx-auto max-w-5xl px-4 py-10 text-center text-xs text-slate-500">
            Practice content adapted from <em>Australian Citizenship: Our Common Bond</em>. For
            study purposes only.
          </footer>
        </Providers>
      </body>
    </html>
  );
}
