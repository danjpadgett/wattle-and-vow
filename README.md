# Wattle & Vow

A small Next.js + Postgres web app to help study for the Australian citizenship test. *Wattle* for the national flower; *Vow* for the citizenship pledge. Chapter readings (SparkNotes-style) plus a "Test me" quiz per chapter, and a 20-question full practice test that mirrors the real exam's pass rules. Sign-in is via Google, gated by an allow-list of emails.

See [CLAUDE.md](CLAUDE.md) for the full plan and design decisions.

---

## Local development

### 1. Prerequisites
- **Node.js 20+**
- **PostgreSQL** running locally (or any reachable Postgres). Create a database, e.g. `citizen_test`.

### 2. Install
```bash
npm install
cp .env.example .env
```

Fill in `.env`:
- `DATABASE_URL` — your local Postgres connection string.
- `NEXTAUTH_URL` — `http://localhost:3000` for local dev.
- `NEXTAUTH_SECRET` — generate with `openssl rand -base64 32`.
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — see Google OAuth setup below.
- `ALLOWED_EMAILS` — comma-separated list of Google account emails allowed to sign in (e.g. your wife's and yours).

### 3. Initialise the database
```bash
npx prisma db push
```

### 4. Run
```bash
npm run dev
```
Open <http://localhost:3000>.

---

## Google OAuth setup (do this once)

You need a Google OAuth 2.0 Client ID. The same client can be used for both local dev and Railway — just add multiple redirect URIs.

1. Go to the **Google Cloud Console**: <https://console.cloud.google.com/>.
2. Create a new project (or select an existing one), e.g. `aussie-citizenship`.
3. In the left menu go to **APIs & Services → OAuth consent screen**:
   - **User Type:** External.
   - **App name:** Wattle & Vow.
   - **User support email:** your email.
   - **Developer contact:** your email.
   - Save and continue through Scopes (you don't need to add any beyond the default `openid`, `email`, `profile`).
   - Under **Test users**, add the Google account email of every person who will sign in (your wife, you, etc.). While the app is in "Testing" mode, only listed test users can sign in. That's fine for personal use — you don't have to publish the app.
4. Go to **APIs & Services → Credentials → Create Credentials → OAuth client ID**:
   - **Application type:** Web application.
   - **Name:** Wattle & Vow.
   - **Authorised JavaScript origins:**
     - `http://localhost:3000`
     - `https://YOUR-APP.up.railway.app` *(add after first Railway deploy)*
   - **Authorised redirect URIs:**
     - `http://localhost:3000/api/auth/callback/google`
     - `https://YOUR-APP.up.railway.app/api/auth/callback/google` *(add after first Railway deploy)*
   - Click **Create**.
5. Copy the **Client ID** and **Client secret** into your local `.env` and (later) into Railway's environment variables.

> Tip: every time the Railway URL changes (or you add a custom domain), come back and add the new origin and redirect URI here.

---

## Deploying to Railway

1. **Push the repo to GitHub.**
2. Go to <https://railway.app/> and **New Project → Deploy from GitHub repo**, select this repo.
3. In the project, click **+ New → Database → PostgreSQL**. Railway adds a `DATABASE_URL` variable to the project automatically — make sure the web service has access to it (it does by default if both are in the same project).
4. Open the web service's **Variables** tab and add:
   - `NEXTAUTH_SECRET` — `openssl rand -base64 32`
   - `NEXTAUTH_URL` — leave blank for now; you'll set it after the first deploy gives you a URL.
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `ALLOWED_EMAILS` — comma-separated allow-list, e.g. `wife@gmail.com,me@gmail.com`
   - (`DATABASE_URL` should already be there from the Postgres plugin — if not, reference it from the Postgres service.)
5. Click **Deploy**. Railway will use Nixpacks to detect Node/Next, run `npm install`, then `npm run build` (which runs `prisma generate && prisma db push && next build`), then `npm start`.
6. Once deployed, copy the public URL (something like `https://your-app.up.railway.app`) and:
   - Set `NEXTAUTH_URL` to that exact URL in Railway's Variables. Redeploy.
   - In the Google Cloud Console, add the URL to **Authorised JavaScript origins** and add `https://your-app.up.railway.app/api/auth/callback/google` to **Authorised redirect URIs**.
7. Visit the URL, click **Sign in with Google**, sign in with an allow-listed account, and you're in.

### Build & start commands (already configured)
- Build: `prisma generate && prisma db push && next build`
- Start: `next start -p ${PORT:-3000}`

Railway sets `PORT` automatically; the start script honours it.

### Updating later
Push to `main` → Railway auto-deploys. Schema changes (`prisma/schema.prisma`) are applied at build time via `prisma db push`.

---

## Troubleshooting

- **"AccessDenied" on sign-in** → the Google account isn't in `ALLOWED_EMAILS`, or it isn't a registered test user on the OAuth consent screen.
- **"redirect_uri_mismatch"** → the exact `https://.../api/auth/callback/google` URL isn't listed in the Google OAuth client's Authorised redirect URIs.
- **Prisma errors at build time on Railway** → confirm `DATABASE_URL` is set on the web service (not just the Postgres service).
- **Stale schema in production** → trigger a redeploy; build-time `prisma db push` will sync.

---

## Project layout

```
src/
  app/
    api/auth/[...nextauth]/route.ts   NextAuth handler
    api/progress/route.ts             Mark reading complete
    api/attempts/route.ts             Save test session + per-question attempts
    chapters/[slug]/page.tsx          Chapter reading
    chapters/[slug]/test/page.tsx     Chapter "Test me" quiz
    practice-test/page.tsx            Full 20-question practice test
    sign-in/page.tsx                  Sign-in page
    page.tsx                          Dashboard
    layout.tsx, providers.tsx, globals.css
  components/
    Quiz.tsx, SignInButton.tsx, SignOutButton.tsx, MarkReadingButton.tsx
  lib/
    auth.ts        NextAuth config + email allow-list
    prisma.ts      Prisma client singleton
    content.ts     Chapter readings + question pools
    selection.ts   Picking / shuffling / scoring logic
prisma/schema.prisma
```

Add more questions any time in [src/lib/content.ts](src/lib/content.ts) — each chapter pool is just an array.
