import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Wattle & Vow",
  description: "Wattle & Vow — study for your Aussie citizenship test, or just have a crack at some Australiana."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen aussie-bg">
        <header className="border-b border-wattle-200 bg-white/70 backdrop-blur">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
            <Link href="/" className="flex items-center gap-2 font-semibold text-eucalypt-700">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.svg" alt="" aria-hidden className="h-7 w-7" />
              <span>Wattle &amp; Vow</span>
            </Link>
          </div>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
        <footer className="mx-auto max-w-5xl px-4 py-10 text-center text-xs text-slate-500">
          Citizenship content adapted from <em>Australian Citizenship: Our Common Bond</em>. For study and fun only.
        </footer>
      </body>
    </html>
  );
}
